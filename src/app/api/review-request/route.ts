// ─────────────────────────────────────────────────────────────
// POST /api/review-request — text a customer a Google review link.
//
// Called by the Telos portal or a client's CRM when a job is completed.
// Body: { clientId, customerName, customerPhone }
//
// Security: requires the x-telos-secret header to match TELOS_INTERNAL_SECRET,
// so only our own systems can trigger SMS sends.
// Cooldown: the same phone is not asked twice per client.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { sendSms } from '@/agents/shared/sms'
import { getReviewRequestConfig, buildReviewMessage } from '@/agents/review-request/config'

// Per (client, phone) one ask. Move to Supabase for durability in production.
const alreadyAsked = new Set<string>()

export async function POST(req: NextRequest) {
  // Internal-only: verify the shared secret.
  const secret = process.env.TELOS_INTERNAL_SECRET
  if (!secret || req.headers.get('x-telos-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  let body: { clientId?: string; customerName?: string; customerPhone?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { clientId, customerName, customerPhone } = body
  if (!clientId || !customerPhone) {
    return NextResponse.json({ error: 'clientId and customerPhone are required.' }, { status: 400 })
  }

  const config = getReviewRequestConfig(clientId)
  if (!config) {
    return NextResponse.json({ error: 'Unknown client.' }, { status: 404 })
  }

  const key = `${clientId}:${customerPhone}`
  if (alreadyAsked.has(key)) {
    return NextResponse.json({ ok: true, skipped: 'already asked' })
  }

  const message = buildReviewMessage(config, customerName ?? '')
  const result = await sendSms(config.twilio, customerPhone, message)

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  alreadyAsked.add(key)
  return NextResponse.json({ ok: true })
}
