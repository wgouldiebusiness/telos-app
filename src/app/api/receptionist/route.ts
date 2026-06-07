// ─────────────────────────────────────────────────────────────
// POST /api/receptionist — one route serves every client.
//
// Body: { configId: string, message: string, history?: ChatTurn[] }
// Looks up the client config, builds its system prompt, calls Claude.
//
// Rate limit: 20 messages per IP per config per hour.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { askClaude, type ChatTurn } from '@/agents/shared/claude'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { getReceptionistConfig } from '@/agents/receptionist/config'
import { buildReceptionistPrompt } from '@/agents/receptionist/systemPrompt'

const MAX_MESSAGE_LENGTH = 2000

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  let body: { configId?: string; message?: string; history?: ChatTurn[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const configId = (body.configId ?? '').trim()
  const config = configId ? getReceptionistConfig(configId) : null
  if (!config) {
    return NextResponse.json({ error: 'Unknown business.' }, { status: 404 })
  }

  if (!rateLimit(`receptionist:${configId}:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'You have sent a lot of messages. Please try again shortly.' },
      { status: 429 }
    )
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[receptionist] ANTHROPIC_API_KEY is not set')
    return NextResponse.json(
      { error: 'The assistant is not available right now.' },
      { status: 503 }
    )
  }

  const message = (body.message ?? '').trim()
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
  }

  // Validate history: only allow well-formed turns so arbitrary data cannot
  // be injected into the prompt.
  const history: ChatTurn[] = Array.isArray(body.history)
    ? body.history
        .slice(-10)
        .filter(
          h =>
            (h.role === 'user' || h.role === 'assistant') &&
            typeof h.content === 'string'
        )
        .map(h => ({ role: h.role, content: h.content.slice(0, MAX_MESSAGE_LENGTH) }))
    : []

  const messages: ChatTurn[] = [...history, { role: 'user', content: message }]

  try {
    const reply = await askClaude({
      system: buildReceptionistPrompt(config),
      messages,
      maxTokens: 400,
    })
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
