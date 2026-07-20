// ─────────────────────────────────────────────────────────────
// POST /api/experts — one route serves every expert agent.
//
// Body: { slug: string, message: string, history?: ChatTurn[] }
//
// Access control (fail closed):
//   - caller must have a live Supabase session
//   - masters can use every agent
//   - a client can use an agent only when the matching module is assigned
//     to their business (managed from the admin panel)
// The membership lookup runs on the caller's OWN RLS-bound client, so a
// user can never read another business's assignments.
//
// Rate limits: 8 messages per user per minute (burst) and 30 per hour.
// Model: EXPERTS_MODEL env override, defaulting to claude-sonnet-5 so the
// experts run on a stronger model than the lightweight site widgets.
// Replies are screened so the system prompt can never leak verbatim, and
// every conversation turn writes a structured usage log line.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isMasterEmail } from '@/lib/security'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { askClaude, type ChatTurn } from '@/agents/shared/claude'
import { getExpertAgent } from '@/agents/experts/registry'

const MAX_MESSAGE_LENGTH = 4000
const MAX_HISTORY_TURNS = 30

// The experts warrant a stronger model than the site widgets. Override per
// environment without a deploy via EXPERTS_MODEL (e.g. claude-opus-4-8).
const EXPERTS_MODEL = process.env.EXPERTS_MODEL || 'claude-sonnet-5'

// Distinctive markers from the registry's private instructions. If a reply
// contains one, the model has been manipulated into quoting its prompt;
// refuse the output rather than leak it.
const LEAK_MARKERS = ['CONDUCT RULES (these override', 'ADVANCED PLAYBOOK:', 'ACCURACY DISCIPLINE:', 'DELIVERABLE STANDARD:']

export async function POST(req: NextRequest) {
  // 1. Session required — these agents are never public. If Supabase is
  //    unreachable or unconfigured, fail CLOSED as signed-out, never crash.
  let user: { id: string; email?: string } | null = null
  let supabase: Awaited<ReturnType<typeof createClient>> | null = null
  try {
    supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (err) {
    console.error('[experts] auth check failed:', err)
  }
  if (!user || !supabase) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 })
  }

  // 2. Parse and validate input.
  let body: { slug?: string; message?: string; history?: ChatTurn[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const agent = body.slug ? getExpertAgent(body.slug) : undefined
  if (!agent) {
    return NextResponse.json({ error: 'Unknown agent.' }, { status: 404 })
  }

  const message = (body.message ?? '').trim()
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
  }

  // 3. Access: master, or module assigned to the caller's business.
  if (!isMasterEmail(user.email)) {
    const { data: rows } = await supabase
      .from('business_modules')
      .select('active, modules ( name )')
      .eq('active', true)
    const allowed = (rows ?? []).some(r => {
      const mod = Array.isArray(r.modules) ? r.modules[0] : r.modules
      return (mod as { name?: string } | null)?.name === agent.moduleName
    })
    if (!allowed) {
      return NextResponse.json(
        { error: 'This agent is not enabled for your account. Ask Telos to switch it on.' },
        { status: 403 }
      )
    }
  }

  // 4. Rate limits per user across all agents: a per-minute burst cap on
  //    top of the hourly cap, so scripted rapid-fire cannot drain tokens.
  if (!rateLimit(`experts-burst:${user.id}`, 8, 60 * 1000)) {
    return NextResponse.json(
      { error: 'Slow down a little. Try again in a minute.' },
      { status: 429 }
    )
  }
  if (!rateLimit(`experts:${user.id}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'You have sent a lot of messages this hour. Please take a short break.' },
      { status: 429 }
    )
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'The agents are not available right now.' },
      { status: 503 }
    )
  }

  // 5. Sanitise history and ask the model.
  const history: ChatTurn[] = Array.isArray(body.history)
    ? body.history
        .slice(-MAX_HISTORY_TURNS)
        .filter(
          h =>
            (h.role === 'user' || h.role === 'assistant') &&
            typeof h.content === 'string' &&
            h.content.length > 0
        )
        .map(h => ({ role: h.role, content: h.content.slice(0, MAX_MESSAGE_LENGTH) }))
    : []

  try {
    const started = Date.now()
    const reply = await askClaude({
      system: agent.systemPrompt,
      messages: [...history, { role: 'user', content: message }],
      maxTokens: agent.maxTokens,
      model: EXPERTS_MODEL,
    })

    // Prompt-leak guard: never return output that quotes the private brief.
    if (LEAK_MARKERS.some(m => reply.includes(m))) {
      console.warn(`[experts] leak guard tripped agent=${agent.slug} user=${user.id}`)
      return NextResponse.json({
        reply:
          'I keep my internal working notes to myself, but I am glad to help with the actual job. What are you trying to get done?',
      })
    }

    // Structured usage log: who used which agent, how much, how fast.
    console.log(
      `[experts] agent=${agent.slug} user=${user.id} turns=${history.length + 1} in=${message.length} out=${reply.length} ms=${Date.now() - started}`
    )
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
