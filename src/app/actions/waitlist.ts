'use server'

import { headers } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { isValidEmail } from '@/lib/security'
import { sendEmail } from '@/agents/shared/email'
import { sendWaitlistConfirmationEmail } from '@/lib/resend/transactional'
import { addContactToWaitlist } from '@/lib/resend/contacts'

const MAX_FIELD = 200

// Where the "signup could not be saved" alert goes so the lead can be
// recovered by hand. Override with WAITLIST_ALERT_EMAIL.
const ALERT_EMAIL = process.env.WAITLIST_ALERT_EMAIL || 'william.gouldsmith@telosai.co.uk'

export interface JoinWaitlistInput {
  email: string
  name?: string
  business?: string
  source?: string
  /** Honeypot. Real users never see or fill this; bots do. */
  company_website?: string
}

export interface JoinWaitlistResult {
  ok: boolean
  message?: string
  error?: string
}

/**
 * Waitlist signup. The Supabase row is the source of truth, but a signup is
 * never lost silently: if the insert fails for ANY reason (paused project,
 * network, RLS, schema), the full error is logged, an alert email with the
 * signup details goes to ALERT_EMAIL for manual recovery, and the visitor
 * only sees success if the lead genuinely landed somewhere.
 */
export async function joinWaitlist(input: JoinWaitlistInput): Promise<JoinWaitlistResult> {
  // 1. Rate limit per IP — same guard the public API routes use.
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(`waitlist:${ip}`, 5, 60 * 60 * 1000)) {
    return { ok: false, error: 'Too many attempts. Please try again in a little while.' }
  }

  // 2. Spam honeypot — if filled, pretend success and write nothing.
  if (input.company_website && input.company_website.trim() !== '') {
    return { ok: true, message: 'You’re on the list.' }
  }

  // 3. Validate server-side — never trust the client.
  const email = (input.email ?? '').trim().toLowerCase()
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  const name = input.name?.trim().slice(0, MAX_FIELD) || null
  const business = input.business?.trim().slice(0, MAX_FIELD) || null
  const source = input.source?.trim().slice(0, 50) || 'homepage'

  // 4. Store the signup. Service-role client, server-side only. supabase-js
  //    returns most failures as an error object, but a paused/unreachable
  //    project can also THROW — catch both so nothing fails silently.
  let saved = false
  let insertFailure = ''
  try {
    const admin = createAdminClient()
    const { error } = await admin
      .from('waitlist')
      .insert({ email, name, business, source })

    if (!error) {
      saved = true
    } else if ((error as { code?: string }).code === '23505') {
      // Unique violation → already signed up. Treat as success, skip resend.
      return { ok: true, message: 'You’re already on the list. We’ll be in touch.' }
    } else {
      insertFailure = `${(error as { code?: string }).code ?? 'no-code'}: ${error.message}`
    }
  } catch (err) {
    insertFailure = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
  }

  if (!saved) {
    // LOUD failure — the real error, clearly tagged for log search.
    console.error(
      `[waitlist] SUPABASE INSERT FAILED (project paused?): ${insertFailure} — signup: ${email}${name ? ` / ${name}` : ''}${business ? ` / ${business}` : ''} (source: ${source})`
    )

    // 4b. Fallback: get the lead somewhere recoverable before telling the
    //     visitor anything. The alert email to us IS the recovery copy.
    const alert = await sendEmail({
      to: ALERT_EMAIL,
      subject: '⚠ Waitlist signup NOT saved to Supabase — manual recovery needed',
      text: [
        'A waitlist signup could not be written to Supabase. Recover it by hand:',
        '',
        `Email:    ${email}`,
        `Name:     ${name ?? '(not given)'}`,
        `Business: ${business ?? '(not given)'}`,
        `Source:   ${source}`,
        `Time:     ${new Date().toISOString()}`,
        '',
        `Insert error: ${insertFailure}`,
        '',
        'Likely cause: the Supabase project is paused (free tier auto-pause).',
        'Restore it from the Supabase dashboard, then add this row to the waitlist table.',
      ].join('\n'),
    })

    if (!alert.ok) {
      // DB down AND alert email failed — the lead genuinely has nowhere to
      // land. Be honest with the visitor instead of faking success.
      console.error(`[waitlist] ALERT EMAIL ALSO FAILED: ${alert.error} — lead is NOT captured: ${email}`)
      return {
        ok: false,
        error: 'We could not save your signup just now. Please try again in a minute, or email us directly.',
      }
    }
    console.warn(`[waitlist] signup recovered via alert email to ${ALERT_EMAIL}: ${email}`)
  }

  // 5. Post-signup side effects. The lead is captured (DB row or alert
  //    email) — a failed nicety here must not lose the signup or scare the
  //    visitor. Log and carry on.

  // (a) TRANSACTIONAL: confirmation email to the signer-upper.
  try {
    const sent = await sendWaitlistConfirmationEmail({ to: email, name: name ?? undefined })
    if (!sent.ok && !sent.skipped) {
      console.error('[waitlist] confirmation email failed:', sent.error)
    }
  } catch (err) {
    console.error('[waitlist] confirmation email threw:', err)
  }

  // (b) MARKETING: store the contact in Resend (global contacts + optional segment).
  try {
    const added = await addContactToWaitlist({ email, name: name ?? undefined })
    if (!added.ok && !added.skipped) {
      console.error('[waitlist] contact store failed:', added.error)
    }
  } catch (err) {
    console.error('[waitlist] contact store threw:', err)
  }

  return { ok: true, message: 'You’re on the list.' }
}
