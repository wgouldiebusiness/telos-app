'use server'

import { headers } from 'next/headers'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { isValidEmail } from '@/lib/security'
import { sendEmail } from '@/agents/shared/email'

const MAX_FIELD = 200
const MAX_MESSAGE = 4000
const ENQUIRY_TO = 'william.gouldsmith@telosai.co.uk'

export interface EnquiryInput {
  name: string
  email: string
  company?: string
  message: string
  /** Which brand/page the enquiry came from, e.g. 'media'. */
  source?: string
  /** Honeypot. Real users never see or fill this; bots do. */
  company_website?: string
}

export interface EnquiryResult {
  ok: boolean
  error?: string
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Sends a contact-form enquiry to the Telos inbox. The email IS the
 * enquiry, so a failed send must return an honest error, never a fake
 * success.
 */
export async function sendEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(`enquiry:${ip}`, 5, 60 * 60 * 1000)) {
    return { ok: false, error: 'Too many messages. Please try again in a little while.' }
  }

  // Honeypot: pretend success, send nothing.
  if (input.company_website && input.company_website.trim() !== '') {
    return { ok: true }
  }

  const name = (input.name ?? '').trim().slice(0, MAX_FIELD)
  const email = (input.email ?? '').trim().toLowerCase()
  const company = (input.company ?? '').trim().slice(0, MAX_FIELD)
  const message = (input.message ?? '').trim().slice(0, MAX_MESSAGE)
  const source = (input.source ?? 'website').trim().slice(0, 50)

  if (!name || !message) {
    return { ok: false, error: 'Please add your name and a short message.' }
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  const result = await sendEmail({
    to: ENQUIRY_TO,
    subject: `New ${source} enquiry from ${name}`,
    html: `
      <h2>New enquiry (${esc(source)})</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${esc(company)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${esc(message).replace(/\n/g, '<br/>')}</p>
    `,
    text: `New enquiry (${source})\n\nName: ${name}\nEmail: ${email}\n${company ? `Company: ${company}\n` : ''}\nMessage:\n${message}`,
  })

  if (!result.ok) {
    // The email is the enquiry — do not pretend it worked.
    console.error('[enquiry] send failed:', result.error)
    return {
      ok: false,
      error: `We could not send your message just now. Please email ${ENQUIRY_TO} directly.`,
    }
  }

  return { ok: true }
}
