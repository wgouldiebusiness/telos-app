// ─────────────────────────────────────────────────────────────
// Resend email wrapper.
//
// Telos sends transactional/agent email from one verified sending domain,
// so the API key defaults to the global RESEND_API_KEY. You can still pass
// a per-client key if a client wants email sent from their own Resend.
//
// Uses Resend's REST API directly via fetch — no SDK dependency.
// ─────────────────────────────────────────────────────────────

export interface SendEmailArgs {
  to: string
  subject: string
  /** Provide html or text (or both). */
  html?: string
  text?: string
  /** Defaults to "Telos AI <noreply@telosai.co.uk>". */
  from?: string
  /** Optional per-client Resend key; falls back to RESEND_API_KEY. */
  apiKey?: string
}

export interface EmailResult {
  ok: boolean
  error?: string
}

export async function sendEmail(args: SendEmailArgs): Promise<EmailResult> {
  const apiKey = args.apiKey ?? process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'Resend is not configured (RESEND_API_KEY missing).' }
  }
  if (!args.html && !args.text) {
    return { ok: false, error: 'Email needs html or text content.' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: args.from ?? 'Telos AI <noreply@telosai.co.uk>',
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: args.text,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error(`[email] Resend error ${res.status}: ${detail}`)
      return { ok: false, error: `Resend returned ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    console.error('[email] Network error:', err)
    return { ok: false, error: 'Could not reach Resend.' }
  }
}
