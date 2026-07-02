'use server'

import { headers } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { isValidEmail } from '@/lib/security'
import { sendWaitlistConfirmationEmail } from '@/lib/resend/transactional'
import { addContactToWaitlistAudience } from '@/lib/resend/audience'

const MAX_FIELD = 200

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

export async function joinWaitlist(input: JoinWaitlistInput): Promise<JoinWaitlistResult> {
  // 1. Rate limit per IP — same guard the public API routes use, so a bot
  //    can't flood the table (or the Resend send) through this action.
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

  // 4. Store the signup. Service-role client, server-side only — never the
  //    browser. This is the source of truth; everything after is best-effort.
  const admin = createAdminClient()
  const { error } = await admin
    .from('waitlist')
    .insert({ email, name, business, source })

  if (error) {
    // 23505 = unique violation → already signed up. Treat as success.
    if ((error as { code?: string }).code === '23505') {
      return { ok: true, message: 'You’re already on the list. We’ll be in touch.' }
    }
    console.error('[waitlist] Supabase insert failed:', error)
    return { ok: false, error: 'Something went wrong on our end. Please try again.' }
  }

  // 5. Post-signup side effects. The signup is ALREADY saved at this point, so
  //    a failure here must not lose the signup. We log and still return success.

  // (a) TRANSACTIONAL: send the confirmation email.
  try {
    const sent = await sendWaitlistConfirmationEmail({ to: email, name: name ?? undefined })
    if (!sent.ok && !sent.skipped) {
      console.error('[waitlist] confirmation email failed:', sent.error)
    }
  } catch (err) {
    console.error('[waitlist] confirmation email threw:', err)
  }

  // (b) MARKETING: add the contact to the Resend audience/list.
  try {
    const added = await addContactToWaitlistAudience({ email, name: name ?? undefined })
    if (!added.ok && !added.skipped) {
      console.error('[waitlist] audience add failed:', added.error)
    }
  } catch (err) {
    console.error('[waitlist] audience add threw:', err)
  }

  return { ok: true, message: 'You’re on the list.' }
}
