// ─────────────────────────────────────────────────────────────
// Resend — TRANSACTIONAL email  ("Emails" product)
//
// A 1:1 message triggered by a user action (here: a waitlist signup).
// This is billed and handled SEPARATELY from the marketing contact side
// (see ./contacts.ts). Keep that boundary clear: anything in this file is
// transactional; anything that touches the contact store lives in contacts.ts.
//
// Sends via the Resend REST API with fetch — matching the existing
// src/agents/shared/email.ts approach (no SDK dependency).
// ─────────────────────────────────────────────────────────────
import { render } from '@react-email/render'
import WaitlistConfirmation from '@/emails/WaitlistConfirmation'

const FROM = 'Telos AI <noreply@telosai.co.uk>'

export interface SendResult {
  ok: boolean
  error?: string
  /** true when RESEND_API_KEY is not configured yet (not a real failure) */
  skipped?: boolean
}

export async function sendWaitlistConfirmationEmail(args: {
  to: string
  name?: string
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Not wired up yet. The signup itself has already been saved, so we
    // skip rather than fail. Drop RESEND_API_KEY in and this starts working.
    return { ok: false, skipped: true, error: 'RESEND_API_KEY is not set' }
  }

  const element = <WaitlistConfirmation name={args.name} />
  const html = await render(element)
  const text = await render(element, { plainText: true })

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: args.to,
        subject: 'You’re on the Telos AI waitlist',
        html,
        text,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      return { ok: false, error: `Resend emails API ${res.status}: ${detail}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}
