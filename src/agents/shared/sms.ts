// ─────────────────────────────────────────────────────────────
// Twilio SMS wrapper — credential-agnostic (multi-tenant).
//
// Credentials are passed IN per call, not read from global env, so each
// client uses their own Twilio account/number. At onboarding you store a
// client's { accountSid, authToken, from } in their agent config.
//
// Uses Twilio's REST API directly via fetch — no SDK dependency, so the
// bundle stays small and cold starts stay fast.
// ─────────────────────────────────────────────────────────────

import crypto from 'crypto'

export interface TwilioCreds {
  accountSid: string
  authToken: string
  from: string // the client's Twilio phone number, E.164 e.g. +447700900000
}

export interface SmsResult {
  ok: boolean
  error?: string
}

/** Send one SMS through the given client's Twilio account. */
export async function sendSms(
  creds: TwilioCreds,
  to: string,
  body: string
): Promise<SmsResult> {
  if (!creds.accountSid || !creds.authToken || !creds.from) {
    return { ok: false, error: 'Twilio is not configured for this client.' }
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${creds.accountSid}/Messages.json`
  const auth = Buffer.from(`${creds.accountSid}:${creds.authToken}`).toString('base64')
  const params = new URLSearchParams({ To: to, From: creds.from, Body: body })

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error(`[sms] Twilio error ${res.status}: ${detail}`)
      return { ok: false, error: `Twilio returned ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    console.error('[sms] Network error:', err)
    return { ok: false, error: 'Could not reach Twilio.' }
  }
}

/**
 * Validate an incoming Twilio webhook signature so nobody can spoof a request
 * to our endpoint and make us send messages. Twilio signs the exact URL plus
 * the POST params with the account auth token (HMAC-SHA1, base64).
 *
 * https://www.twilio.com/docs/usage/security#validating-requests
 */
export function validateTwilioSignature(
  authToken: string,
  url: string,
  params: Record<string, string>,
  signature: string | null
): boolean {
  if (!signature || !authToken) return false

  // Concatenate the URL, then each param key+value sorted by key.
  const data =
    url +
    Object.keys(params)
      .sort()
      .map(key => key + params[key])
      .join('')

  const expected = crypto
    .createHmac('sha1', authToken)
    .update(Buffer.from(data, 'utf-8'))
    .digest('base64')

  // Constant-time compare to avoid timing attacks.
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  } catch {
    return false
  }
}
