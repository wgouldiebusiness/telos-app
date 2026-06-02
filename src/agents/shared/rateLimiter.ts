// ─────────────────────────────────────────────────────────────
// Simple in-memory rate limiter — shared by all agents.
//
// Good enough for a single-instance deployment. If Telos scales to
// multiple serverless instances, swap the Map for Upstash Redis here
// and every agent gets distributed limiting for free.
// ─────────────────────────────────────────────────────────────

interface Bucket {
  count: number
  reset: number
}

const store = new Map<string, Bucket>()

/**
 * Returns true if the request is allowed, false if the limit is hit.
 *
 * @param key       Unique key, e.g. `chatbot:${ip}`
 * @param max       Maximum requests allowed in the window
 * @param windowMs  Window length in milliseconds
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = store.get(key)

  if (!bucket || now > bucket.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return true
  }

  if (bucket.count >= max) return false

  bucket.count++
  return true
}
