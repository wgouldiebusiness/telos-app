// ─────────────────────────────────────────────────────────────
// GET /api/cron/daily — the ONE scheduled cron (Vercel).
//
// Vercel Hobby allows at most 2 cron jobs, so five separate crons meant
// three silently never fired — including the Supabase keep-alive, which is
// why the project kept auto-pausing and the waitlist broke. This single
// daily dispatcher runs everything on one schedule and decides what to do
// by the date, so nothing is dropped:
//
//   every day    → Supabase keep-alive (explicit, first), quote follow-ups,
//                  invoice chasers
//   Mondays      → weekly digest
//   1st of month → monthly reports
//
// The keep-alive is a first-class step here, not a side effect of the
// health check, so the database is always pinged even if a later job fails.
// The individual /api/cron/* routes still exist for manual/testing triggers.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorisedCron } from '@/agents/shared/cron'
import { createAdminClient } from '@/lib/supabase/admin'
import { runQuoteFollowup } from '../quote-followup/route'
import { runInvoiceChaser } from '../invoice-chaser/route'
import { runWeeklyDigest } from '../weekly-digest/route'
import { runMonthlyReport } from '../monthly-report/route'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Explicit Supabase keep-alive: a tiny query that counts as project
// activity and stops the free-tier auto-pause. Runs every day, first,
// independent of every other job.
async function keepAlive(): Promise<{ ok: boolean }> {
  try {
    const admin = createAdminClient()
    const { error } = await admin
      .from('waitlist')
      .select('id', { count: 'exact', head: true })
      .limit(1)
    if (error) throw new Error(error.message)
    console.log('[cron/daily] keep-alive ok')
    return { ok: true }
  } catch (err) {
    console.error('[cron/daily] keep-alive FAILED:', err)
    return { ok: false }
  }
}

// Run a job without letting its failure stop the others.
async function safe<T>(name: string, fn: () => Promise<T>): Promise<T | { error: string }> {
  try {
    return await fn()
  } catch (err) {
    console.error(`[cron/daily] ${name} failed:`, err)
    return { error: err instanceof Error ? err.message : 'failed' }
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorisedCron(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const now = new Date()
  const isMonday = now.getUTCDay() === 1
  const isFirstOfMonth = now.getUTCDate() === 1

  const results: Record<string, unknown> = {}

  // 1. Keep-alive first, always.
  results.keepAlive = await keepAlive()

  // 2. Daily jobs.
  results.quoteFollowup = await safe('quote-followup', runQuoteFollowup)
  results.invoiceChaser = await safe('invoice-chaser', runInvoiceChaser)

  // 3. Weekly (Mondays).
  if (isMonday) results.weeklyDigest = await safe('weekly-digest', runWeeklyDigest)

  // 4. Monthly (1st).
  if (isFirstOfMonth) results.monthlyReport = await safe('monthly-report', runMonthlyReport)

  console.log(`[cron/daily] ran at ${now.toISOString()} (monday=${isMonday} firstOfMonth=${isFirstOfMonth})`)
  return NextResponse.json({ ok: true, ranAt: now.toISOString(), results })
}
