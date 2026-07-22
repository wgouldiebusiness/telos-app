// ─────────────────────────────────────────────────────────────
// GET /api/health — is the funnel alive?
//
// Pings Supabase (a real query against the waitlist table) and Resend
// (an authenticated API call) and reports plainly whether each is
// reachable. Load it in a browser and you know in two seconds.
//
// Also serves as the daily keep-alive: the Vercel cron hits this route,
// and the Supabase query counts as project activity, which stops the
// free-tier auto-pause that has been silently killing signups.
//
// Public by design (it must be loadable from a phone in a hurry), so it
// reports status only — no keys, no config detail, no error internals.
//
// One authenticated extra: call it with `Authorization: Bearer <CRON_SECRET>`
// and the JSON gains an `env` block listing which environment variables the
// RUNNING deployment can actually see (presence booleans only, never values).
// This is the fast way to confirm a var like RESEND_API_KEY genuinely reached
// the deployment after a redeploy — env vars only apply to builds made AFTER
// they were added in Vercel, so a "set but empty at runtime" key is almost
// always a stale deployment, which this block makes visible in one request.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAuthorisedCron } from '@/agents/shared/cron'

export const dynamic = 'force-dynamic'

// Presence-only view of the env vars the funnel depends on. Never returns a
// value — only whether the running deployment has a non-empty entry for it.
function envPresence(): Record<string, boolean> {
  const has = (v?: string) => Boolean(v && v.trim())
  return {
    NEXT_PUBLIC_SUPABASE_URL:      has(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: has(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY:     has(process.env.SUPABASE_SERVICE_ROLE_KEY),
    RESEND_API_KEY:                has(process.env.RESEND_API_KEY),
    RESEND_WAITLIST_SEGMENT_ID:    has(process.env.RESEND_WAITLIST_SEGMENT_ID),
    WAITLIST_ALERT_EMAIL:          has(process.env.WAITLIST_ALERT_EMAIL),
    CRON_SECRET:                   has(process.env.CRON_SECRET),
    MASTER_EMAILS:                 has(process.env.MASTER_EMAILS),
    NEXT_PUBLIC_SITE_URL:          has(process.env.NEXT_PUBLIC_SITE_URL),
    // LLM provider keys — whichever is set decides which provider the agents
    // use (LLM_PROVIDER can force one explicitly).
    ANTHROPIC_API_KEY:             has(process.env.ANTHROPIC_API_KEY),
    GEMINI_API_KEY:                has(process.env.GEMINI_API_KEY),
    GROQ_API_KEY:                  has(process.env.GROQ_API_KEY),
    LLM_PROVIDER:                  has(process.env.LLM_PROVIDER),
  }
}

interface Check {
  ok: boolean
  status: 'ok' | 'failed' | 'not configured'
  ms?: number
}

const TIMEOUT_MS = 6000

async function withTimeout<T>(p: PromiseLike<T>): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)
    ),
  ])
}

async function checkSupabase(): Promise<Check> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, status: 'not configured' }
  }
  const start = Date.now()
  try {
    const admin = createAdminClient()
    const { error } = await withTimeout(
      admin.from('waitlist').select('id', { count: 'exact', head: true }).limit(1)
    )
    if (error) throw new Error(error.message)
    return { ok: true, status: 'ok', ms: Date.now() - start }
  } catch (err) {
    console.error('[health] supabase check failed:', err)
    return { ok: false, status: 'failed', ms: Date.now() - start }
  }
}

async function checkResend(): Promise<Check> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, status: 'not configured' }
  }
  const start = Date.now()
  try {
    const res = await withTimeout(
      fetch('https://api.resend.com/domains', {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        cache: 'no-store',
      })
    )
    if (!res.ok) throw new Error(`status ${res.status}`)
    return { ok: true, status: 'ok', ms: Date.now() - start }
  } catch (err) {
    console.error('[health] resend check failed:', err)
    return { ok: false, status: 'failed', ms: Date.now() - start }
  }
}

export async function GET(req: NextRequest) {
  const [supabase, resend] = await Promise.all([checkSupabase(), checkResend()])
  const ok = supabase.ok && resend.ok

  return NextResponse.json(
    {
      ok,
      summary: ok
        ? 'Funnel is alive: Supabase and Resend both reachable.'
        : `PROBLEM: ${[
            !supabase.ok ? `Supabase ${supabase.status}` : null,
            !resend.ok ? `Resend ${resend.status}` : null,
          ].filter(Boolean).join('; ')}.`,
      supabase,
      resend,
      // Only present for an authenticated caller (Bearer CRON_SECRET). Presence
      // booleans only, so it is safe to look at without leaking any secret.
      ...(isAuthorisedCron(req) ? { env: envPresence() } : {}),
      checkedAt: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 }
  )
}
