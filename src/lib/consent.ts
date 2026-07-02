// ─────────────────────────────────────────────────────────────
// Cookie-consent state.
//
// Stored as a first-party cookie (not just localStorage) so it persists and so
// any future non-essential scripts can gate on it. The Cookie Policy documents
// this cookie as `telos-cookie-consent` (~12 months).
//
// When you add analytics or advertising (GA, Meta Pixel, Google Ads, …), load
// those scripts ONLY when hasOptionalConsent() is true, and re-check on the
// CONSENT_EVENT so a later "accept" can switch them on without a reload.
// ─────────────────────────────────────────────────────────────

export const CONSENT_COOKIE = 'telos-cookie-consent'
export const CONSENT_EVENT = 'telos-consent-change'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export type Consent = 'accepted' | 'declined'

export function getConsent(): Consent | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)telos-cookie-consent=(accepted|declined)/)
  return (match?.[1] as Consent) ?? null
}

export function setConsent(value: Consent): void {
  if (typeof document === 'undefined') return
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

/** True only once the visitor has explicitly accepted optional cookies. */
export function hasOptionalConsent(): boolean {
  return getConsent() === 'accepted'
}
