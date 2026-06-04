/**
 * SESSIONS — tracks active sessions, enforces concurrency limits,
 * detects inactivity timeouts, logs device history.
 */

import { AUTH_CONFIG } from './config.js'

// In-memory — replace with Redis or DB table in production
const sessionStore = new Map()  // sessionId → session record
const accountSessions = new Map()  // accountId → Set<sessionId>

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Creates a new session for an account after successful login.
 * Enforces maxConcurrentSessions — oldest session is terminated if over limit.
 * @param {string} accountId
 * @param {string} tier
 * @param {{ userAgent?: string, ip?: string, deviceName?: string }} deviceInfo
 * @returns {string} sessionId
 */
export function createSession(accountId, tier, deviceInfo = {}) {
  const sessionId = generateSessionId()
  const now       = new Date().toISOString()

  const session = {
    sessionId,
    accountId,
    tier,
    deviceInfo,
    createdAt:    now,
    lastActiveAt: now,
    active:       true,
  }

  sessionStore.set(sessionId, session)

  if (!accountSessions.has(accountId)) accountSessions.set(accountId, new Set())
  const sessions = accountSessions.get(accountId)
  sessions.add(sessionId)

  // Enforce concurrent session limit — evict oldest if over
  if (sessions.size > AUTH_CONFIG.sessions.maxConcurrentSessions) {
    const oldest = [...sessions][0]
    terminateSession(oldest, 'concurrent_limit_exceeded')
  }

  console.log(`[sessions] Created ${sessionId} for account ${accountId}`)
  return sessionId
}

/**
 * Validates a session is active and not timed out due to inactivity.
 * Updates lastActiveAt on success.
 * @param {string} sessionId
 * @returns {{ valid: boolean, session: Object|null }}
 */
export function validateSession(sessionId) {
  const session = sessionStore.get(sessionId)
  if (!session || !session.active) return { valid: false, session: null }

  const inactivityMs = AUTH_CONFIG.sessions.inactivityTimeoutMinutes * 60 * 1000
  if (Date.now() - new Date(session.lastActiveAt).getTime() > inactivityMs) {
    terminateSession(sessionId, 'inactivity_timeout')
    return { valid: false, session: null }
  }

  session.lastActiveAt = new Date().toISOString()
  return { valid: true, session }
}

/**
 * Terminates a specific session.
 * @param {string} sessionId
 * @param {string} reason
 */
export function terminateSession(sessionId, reason = 'logout') {
  const session = sessionStore.get(sessionId)
  if (!session) return

  session.active        = false
  session.terminatedAt  = new Date().toISOString()
  session.terminatedReason = reason

  const sessions = accountSessions.get(session.accountId)
  if (sessions) sessions.delete(sessionId)

  console.log(`[sessions] Terminated ${sessionId} — reason: ${reason}`)
}

/**
 * Terminates ALL sessions for an account (e.g. on password reset or lockout).
 * @param {string} accountId
 * @param {string} reason
 * @returns {number} number of sessions terminated
 */
export function terminateAllSessions(accountId, reason) {
  const sessions = accountSessions.get(accountId)
  if (!sessions) return 0

  let count = 0
  for (const sessionId of [...sessions]) {
    terminateSession(sessionId, reason)
    count++
  }

  console.log(`[sessions] Terminated all (${count}) sessions for account ${accountId} — reason: ${reason}`)
  return count
}

/**
 * Returns all active sessions for an account.
 * @param {string} accountId
 * @returns {Object[]}
 */
export function getActiveSessions(accountId) {
  const ids = accountSessions.get(accountId) ?? new Set()
  return [...ids]
    .map(id => sessionStore.get(id))
    .filter(s => s?.active)
}
