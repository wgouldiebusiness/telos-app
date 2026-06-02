// ─────────────────────────────────────────────────────────────
// GET /api/cron/invoice-chaser — runs daily (Vercel cron).
//
// For every unpaid invoice past its due date: at 3 days overdue send
// reminder 1, at 10 days reminder 2, at 21 days a final notice and mark
// the invoice escalated. Each reminder is written by Claude in the owner's
// voice and sent by email.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorisedCron } from '@/agents/shared/cron'
import { createAdminClient } from '@/lib/supabase/admin'
import { askClaude } from '@/agents/shared/claude'
import { sendEmail } from '@/agents/shared/email'
import {
  getInvoiceChaserConfig,
  buildReminderPrompt,
  type ReminderStage,
} from '@/agents/invoice-chaser/config'

function daysOverdue(due: string): number {
  return (Date.now() - new Date(due).getTime()) / (1000 * 60 * 60 * 24)
}

export async function GET(req: NextRequest) {
  if (!isAuthorisedCron(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('status', 'unpaid')

  if (error) {
    console.error('[invoice-chaser] DB error:', error.message)
    return NextResponse.json({ error: 'Database error.' }, { status: 500 })
  }

  let sent = 0

  for (const inv of invoices ?? []) {
    if (!inv.due_date || !inv.client_email) continue
    const config = getInvoiceChaserConfig(inv.business_id)
    if (!config) continue

    const overdue = daysOverdue(inv.due_date)
    let stage: ReminderStage | null = null
    let column: string | null = null
    let escalate = false

    if (overdue >= 21 && !inv.final_notice_sent_at) {
      stage = 'final'; column = 'final_notice_sent_at'; escalate = true
    } else if (overdue >= 10 && !inv.reminder_2_sent_at) {
      stage = 'second'; column = 'reminder_2_sent_at'
    } else if (overdue >= 3 && !inv.reminder_1_sent_at) {
      stage = 'first'; column = 'reminder_1_sent_at'
    }

    if (!stage || !column) continue

    try {
      const body = await askClaude({
        system: 'You write professional, polite overdue-invoice reminders. British English. No em dashes. Never aggressive.',
        messages: [{ role: 'user', content: buildReminderPrompt(config, stage, inv.client_name || 'there', Number(inv.amount) || 0) }],
        maxTokens: 400,
      })

      const result = await sendEmail({
        to: inv.client_email,
        from: config.fromEmail,
        subject:
          stage === 'final'
            ? `Final notice: invoice from ${config.businessName}`
            : `Reminder: invoice from ${config.businessName}`,
        text: body,
      })

      if (result.ok) {
        const update: Record<string, unknown> = { [column]: new Date().toISOString() }
        if (escalate) update.status = 'escalated'
        await supabase.from('invoices').update(update).eq('id', inv.id)
        sent++
      }
    } catch (err) {
      console.error(`[invoice-chaser] failed for invoice ${inv.id}:`, err)
    }
  }

  console.log(`[invoice-chaser] sent ${sent} reminders`)
  return NextResponse.json({ ok: true, sent })
}
