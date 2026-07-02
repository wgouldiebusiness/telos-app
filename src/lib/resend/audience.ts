// ─────────────────────────────────────────────────────────────
// Resend — MARKETING audience  ("Audiences / Contacts" product)
//
// Adds a signup to a Resend contact list so they are collected in one place
// for later marketing. This is a SEPARATE Resend product with SEPARATE billing
// from transactional email (see ./transactional.tsx). Nothing here sends mail —
// it only manages contacts.
//
// Uses the Resend REST API with fetch (no SDK dependency).
// ─────────────────────────────────────────────────────────────

export interface AudienceResult {
  ok: boolean
  error?: string
  /** true when the audience env vars are not configured yet (not a real failure) */
  skipped?: boolean
}

export async function addContactToWaitlistAudience(args: {
  email: string
  name?: string
}): Promise<AudienceResult> {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_WAITLIST_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    // Not wired up yet. Skip without failing the signup. Add RESEND_API_KEY
    // and RESEND_WAITLIST_AUDIENCE_ID and this starts working.
    return {
      ok: false,
      skipped: true,
      error: 'RESEND_API_KEY or RESEND_WAITLIST_AUDIENCE_ID is not set',
    }
  }

  const parts = (args.name ?? '').trim().split(/\s+/).filter(Boolean)
  const firstName = parts[0]
  const lastName = parts.slice(1).join(' ')

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          unsubscribed: false,
        }),
      }
    )

    if (!res.ok) {
      const detail = await res.text()
      return { ok: false, error: `Resend audiences API ${res.status}: ${detail}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}
