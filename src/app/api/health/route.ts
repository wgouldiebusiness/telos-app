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
// ─────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

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

export async function GET() {
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
      checkedAt: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 }
  )
}
