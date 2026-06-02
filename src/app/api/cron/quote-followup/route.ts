// ─────────────────────────────────────────────────────────────
// GET /api/cron/quote-followup — runs daily (Vercel cron).
//
// For every quote still "sent": at 2 days send follow-up 1, at 5 days
// send follow-up 2, at 10 days mark it cold and stop. Stops automatically
// the moment a quote is marked responded/accepted (status changes).
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorisedCron } from '@/agents/shared/cron'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendSms } from '@/agents/shared/sms'
import {
  getQuoteFollowupConfig,
  FOLLOW_UP_1,
  FOLLOW_UP_2,
} from '@/agents/quote-followup/config'

function daysSince(iso: string): number {
  return (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)
}

export async function GET(req: NextRequest) {
  if (!isAuthorisedCron(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('status', 'sent')

  if (error) {
    console.error('[quote-followup] DB error:', error.message)
    return NextResponse.json({ error: 'Database error.' }, { status: 500 })
  }

  let sent = 0
  let cooled = 0

  for (const q of quotes ?? []) {
    const config = getQuoteFollowupConfig(q.business_id)
    if (!config || !q.client_phone) continue

    const age = daysSince(q.sent_at)

    // 10+ days: mark cold and stop.
    if (age >= 10) {
      await supabase.from('quotes').update({ status: 'cold' }).eq('id', q.id)
      cooled++
      continue
    }

    // 5+ days and follow-up 2 not yet sent.
    if (age >= 5 && !q.follow_up_2_sent_at) {
      const msg = FOLLOW_UP_2.replaceAll('[NAME]', q.client_name || 'there')
      const r = await sendSms(config.twilio, q.client_phone, msg)
      if (r.ok) {
        await supabase.from('quotes').update({ follow_up_2_sent_at: new Date().toISOString() }).eq('id', q.id)
        sent++
      }
      continue
    }

    // 2+ days and follow-up 1 not yet sent.
    if (age >= 2 && !q.follow_up_1_sent_at) {
      const msg = FOLLOW_UP_1.replaceAll('[NAME]', q.client_name || 'there')
      const r = await sendSms(config.twilio, q.client_phone, msg)
      if (r.ok) {
        await supabase.from('quotes').update({ follow_up_1_sent_at: new Date().toISOString() }).eq('id', q.id)
        sent++
      }
    }
  }

  console.log(`[quote-followup] sent ${sent}, cooled ${cooled}`)
  return NextResponse.json({ ok: true, sent, cooled })
}
