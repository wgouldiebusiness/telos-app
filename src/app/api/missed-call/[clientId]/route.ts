// ─────────────────────────────────────────────────────────────
// POST /api/missed-call/[clientId] — Twilio "call status" webhook.
//
// Twilio calls this when a call to the client's number ends. If the call
// was not answered, we send the caller a recovery SMS within seconds.
//
// Security: every request is verified against the client's Twilio auth
// token (signature check) so nobody can spoof us into sending messages.
// Cooldown: the same caller is not messaged more than once per window.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { sendSms, validateTwilioSignature } from '@/agents/shared/sms'
import { getMissedCallConfig, buildMissedCallMessage } from '@/agents/missed-call/config'

// In-memory cooldown. Note: resets on cold start, so for durable cooldown
// across serverless instances move this to Supabase or Redis later.
const lastMessaged = new Map<string, number>()
let lastCooldownSweep = 0

function sweepCooldown(windowMs: number): void {
  const now = Date.now()
  if (now - lastCooldownSweep < 60_000) return
  lastCooldownSweep = now
  for (const [key, ts] of lastMessaged) {
    if (now - ts > windowMs) lastMessaged.delete(key)
  }
}

// Empty TwiML — tells Twilio "received, do nothing further".
const EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>'
function twiml() {
  return new NextResponse(EMPTY_TWIML, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  })
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await ctx.params
  const config = getMissedCallConfig(clientId)
  if (!config) {
    // Always 200 to Twilio to avoid retries, but do nothing.
    return twiml()
  }

  // Read the form-encoded Twilio payload.
  const form = await req.formData()
  const params: Record<string, string> = {}
  form.forEach((value, key) => {
    params[key] = typeof value === 'string' ? value : ''
  })

  // Verify the request really came from Twilio.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://telosai.co.uk'
  const fullUrl = `${siteUrl}/api/missed-call/${clientId}`
  const signature = req.headers.get('x-twilio-signature')
  if (!validateTwilioSignature(config.twilio.authToken, fullUrl, params, signature)) {
    console.warn(`[missed-call] Rejected unsigned request for ${clientId}`)
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Only act on calls that were actually missed.
  const status = (params.CallStatus || params.DialCallStatus || '').toLowerCase()
  const missed = ['no-answer', 'busy', 'failed', 'canceled'].includes(status)
  const caller = params.From
  if (!missed || !caller) return twiml()

  // Cooldown check.
  const key = `${clientId}:${caller}`
  const now = Date.now()
  const windowMs = config.cooldownHours * 60 * 60 * 1000
  sweepCooldown(windowMs)
  const last = lastMessaged.get(key)
  if (last && now - last < windowMs) return twiml()

  // Send the recovery SMS.
  const result = await sendSms(config.twilio, caller, buildMissedCallMessage(config))
  if (result.ok) {
    lastMessaged.set(key, now)
  } else {
    console.error(`[missed-call] Send failed for ${clientId}: ${result.error}`)
  }

  return twiml()
}
