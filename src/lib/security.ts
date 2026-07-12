import crypto from 'crypto'

/**
 * Compare two strings in constant time to prevent timing attacks on secrets.
 * Returns false if lengths differ — length itself leaks no useful information
 * when both values are HMAC-derived or fixed-format secrets.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  try {
    const aBuf = Buffer.from(a, 'utf8')
    const bBuf = Buffer.from(b, 'utf8')
    if (aBuf.length !== bBuf.length) return false
    return crypto.timingSafeEqual(aBuf, bBuf)
  } catch {
    return false
  }
}

/** Loose but practical email format check (RFC 5321 limits). */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 320) return false
  const at = email.lastIndexOf('@')
  if (at < 1) return false
  const local = email.slice(0, at)
  const domain = email.slice(at + 1)
  return (
    local.length >= 1 &&
    local.length <= 64 &&
    domain.length >= 3 &&
    domain.includes('.')
  )
}

/**
 * Validate that a `next` redirect path is local-only (no open-redirect).
 * Accepts only paths starting with a single `/` that aren't protocol-relative.
 */
export function safeRedirectPath(next: string | null, fallback = '/'): string {
  if (!next) return fallback
  if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/\\')) {
    return next
  }
  return fallback
}

/** Master (admin) account emails from MASTER_EMAILS — single source of truth. */
export function getMasterEmails(): string[] {
  return (process.env.MASTER_EMAILS ?? '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
}

/** True when the given email belongs to a master account. Fails closed. */
export function isMasterEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return getMasterEmails().includes(email.toLowerCase())
}
