// ─────────────────────────────────────────────────────────────
// GET /api/cron/monthly-report — runs on the 1st of each month.
//
// For every active business, pulls last month's metrics, has Claude write
// a short plain-English summary, emails it to the owner, and posts it to
// the portal activity feed.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorisedCron } from '@/agents/shared/cron'
import { createAdminClient } from '@/lib/supabase/admin'
import { askClaude } from '@/agents/shared/claude'
import { sendEmail } from '@/agents/shared/email'
import { monthlyReportEmail } from '@/agents/monthly-report/template'

function lastMonth(): { iso: string; label: string } {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() - 1)
  const iso = d.toISOString().slice(0, 10) // YYYY-MM-01
  const label = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  return { iso, label }
}

const REPORT_SYSTEM =
  'You write short monthly performance reports for small business owners. Plain English, no jargon. Positive and honest. Never exaggerate or invent numbers. British English. No em dashes. Exactly three short paragraphs: what happened this month, what it means for the business, and one thing to look forward to next month. Maximum 150 words total.'

// Core job, callable directly by the daily dispatcher (see /api/cron/daily),
// which runs it on the 1st of each month.
export async function runMonthlyReport(): Promise<{ sent: number; month: string }> {
  const supabase = createAdminClient()
  const { iso, label } = lastMonth()

  // Active businesses + their owner email (via profiles).
  const { data: businesses, error } = await supabase
    .from('businesses')
    .select('id, name, owner_id, status, profiles:owner_id ( email )')
    .eq('status', 'active')

  if (error) {
    console.error('[monthly-report] DB error:', error.message)
    throw new Error(error.message)
  }

  let sent = 0

  for (const biz of businesses ?? []) {
    const { data: metrics } = await supabase
      .from('metrics')
      .select('leads_captured, admin_hours_saved, sales_recovered, website_visits')
      .eq('business_id', biz.id)
      .eq('month', iso)
      .single()

    if (!metrics) continue // no data for last month, skip

    const ownerEmail = (biz as { profiles?: { email?: string } }).profiles?.email

    try {
      const body = await askClaude({
        system: REPORT_SYSTEM,
        messages: [{
          role: 'user',
          content: `Business: ${biz.name}. Metrics for ${label}: leads captured ${metrics.leads_captured}, admin hours saved ${metrics.admin_hours_saved}, sales recovered £${metrics.sales_recovered}, website visits ${metrics.website_visits}. Write the report.`,
        }],
        maxTokens: 400,
      })

      // Post to the portal activity feed.
      await supabase.from('activity_log').insert({
        business_id: biz.id,
        type: 'report',
        description: `Your ${label} performance report is ready.`,
      })

      // Email the owner.
      if (ownerEmail) {
        const r = await sendEmail({
          to: ownerEmail,
          subject: `Your ${label} report from Telos AI`,
          html: monthlyReportEmail(biz.name, body, label),
        })
        if (r.ok) sent++
      }
    } catch (err) {
      console.error(`[monthly-report] failed for ${biz.id}:`, err)
    }
  }

  console.log(`[monthly-report] sent ${sent} reports for ${label}`)
  return { sent, month: label }
}

// Thin endpoint for manual/testing triggers.
export async function GET(req: NextRequest) {
  if (!isAuthorisedCron(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }
  try {
    const r = await runMonthlyReport()
    return NextResponse.json({ ok: true, ...r })
  } catch {
    return NextResponse.json({ error: 'Database error.' }, { status: 500 })
  }
}
