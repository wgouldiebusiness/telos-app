// ─────────────────────────────────────────────────────────────
// Resend — MARKETING contacts  (global Contacts + Segments model)
//
// Resend deprecated Audiences in favour of Segments: contacts are now
// GLOBAL entities keyed by email address, created via POST /contacts with
// no audience or segment required. A contact can then belong to zero, one,
// or many Segments.
//
// This file is the marketing side — SEPARATE product and billing from
// transactional email (see ./transactional.tsx). Nothing here sends mail;
// it only stores the contact so signups are collected in one place.
//
// Env:
//   RESEND_API_KEY               required (shared with transactional)
//   RESEND_WAITLIST_SEGMENT_ID   optional — if set, the contact is also
//                                tagged into that Segment; if unset the
//                                contact still lands in global Contacts.
//
// Uses the Resend REST API with fetch (no SDK dependency).
// ─────────────────────────────────────────────────────────────

export interface ContactResult {
  ok: boolean
  error?: string
  /** true when RESEND_API_KEY is not configured yet (not a real failure) */
  skipped?: boolean
}

export async function addContactToWaitlist(args: {
  email: string
  name?: string
}): Promise<ContactResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Not wired up yet. Skip without failing the signup.
    return { ok: false, skipped: true, error: 'RESEND_API_KEY is not set' }
  }

  const parts = (args.name ?? '').trim().split(/\s+/).filter(Boolean)
  const firstName = parts[0]
  const lastName = parts.slice(1).join(' ')

  // Optional segment tagging — the integration works fine without it.
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID

  try {
    const res = await fetch('https://api.resend.com/contacts', {
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
        ...(segmentId ? { segments: [segmentId] } : {}),
      }),
    })

    // Contacts are global and keyed by email — a repeat signup can come
    // back as a conflict. The contact already being stored is success as
    // far as the waitlist is concerned.
    if (res.status === 409) return { ok: true }

    if (!res.ok) {
      const detail = await res.text()
      return { ok: false, error: `Resend contacts API ${res.status}: ${detail}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}
