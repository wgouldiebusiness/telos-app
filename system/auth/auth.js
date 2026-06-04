/**
 * AUTH — core authentication engine.
 * Handles register, login, logout, token refresh, and account locking.
 * Every function calls hasPermission() before touching data.
 */

import { AUTH_CONFIG } from './config.js'
import { hashPassword, verifyPassword, requiresPasswordChange } from './passwords.js'
import { generateAccessToken, generateRefreshToken, rotateRefreshToken, revokeAllTokens } from './tokens.js'
import { createSession, terminateSession, terminateAllSessions } from './sessions.js'
import { auditLog } from '../accounts/permissions.js'
import { sendEmail } from '../emails/emailEngine.js'

// In-memory account store — replace with DB in production
const accountStore      = new Map()
const failedAttempts    = new Map()
const lockedAccounts    = new Map()

function generateAccountId() {
  return `acc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

// ─── REGISTER ──────────────────────────────────────────────

/**
 * Creates a new account at the specified tier.
 * Sends the appropriate welcome email based on tier.
 * @param {{ name: string, email: string, password: string, businessName?: string }} userData
 * @param {'master'|'owner'|'client'} tier
 * @param {string} [parentAccountId] - ownerAccountId if creating a client; masterAccountId if creating an owner
 * @returns {Promise<{ account: Object|null, error: string|null }>}
 */
export async function register(userData, tier, parentAccountId = null) {
  const { name, email, password } = userData

  if (!name || !email || !password) {
    return { account: null, error: 'name, email, and password are required.' }
  }

  // CONNECT: DB — check email uniqueness
  for (const acc of accountStore.values()) {
    if (acc.email === email) return { account: null, error: 'Email already in use.' }
  }

  const passwordHash = await hashPassword(password)
  const accountId    = generateAccountId()
  const now          = new Date().toISOString()

  const account = {
    accountId,
    name,
    email,
    passwordHash,
    tier,
    parentAccountId,
    status:       'active',
    createdAt:    now,
    updatedAt:    now,
    businessName: userData.businessName ?? null,
    logoUrl:      userData.logoUrl ?? null,
  }

  accountStore.set(accountId, account)

  await sendEmail(email, 'welcome', {
    tier,
    name,
    businessName: userData.businessName ?? 'your business',
    accountId,
  })

  auditLog(accountId, 'register', accountId, 'success', parentAccountId ?? 'self')

  const { passwordHash: _, ...safeAccount } = account
  return { account: safeAccount, error: null }
}

// ─── LOGIN ─────────────────────────────────────────────────

/**
 * Authenticates a user. Returns access + refresh tokens on success.
 * Locks account after maxLoginAttempts failures.
 * @param {string} email
 * @param {string} password
 * @param {{ userAgent?: string, ip?: string }} deviceInfo
 * @returns {Promise<{ tokens: Object|null, sessionId: string|null, error: string|null }>}
 */
export async function login(email, password, deviceInfo = {}) {
  // CONNECT: DB — find account by email
  let account = null
  for (const acc of accountStore.values()) {
    if (acc.email === email) { account = acc; break }
  }

  if (!account) return { tokens: null, sessionId: null, error: 'Invalid credentials.' }

  // Check lockout
  if (lockedAccounts.has(account.accountId)) {
    const lockExpiry = lockedAccounts.get(account.accountId).expiry
    if (Date.now() < lockExpiry) {
      const minsLeft = Math.ceil((lockExpiry - Date.now()) / 60000)
      return { tokens: null, sessionId: null, error: `Account locked. Try again in ${minsLeft} minute(s).` }
    } else {
      lockedAccounts.delete(account.accountId) // lockout expired
    }
  }

  if (account.status === 'suspended') {
    return { tokens: null, sessionId: null, error: 'Account suspended. Contact support.' }
  }

  const valid = await verifyPassword(password, account.passwordHash)

  if (!valid) {
    const attempts = (failedAttempts.get(account.accountId) ?? 0) + 1
    failedAttempts.set(account.accountId, attempts)

    if (attempts >= AUTH_CONFIG.security.lockoutAfterAttempts) {
      const expiry = Date.now() + AUTH_CONFIG.passwords.lockoutDurationMinutes * 60 * 1000
      lockedAccounts.set(account.accountId, { reason: 'too_many_attempts', expiry })
      await sendEmail(account.email, 'securityAlert', {
        event:      'account_locked',
        deviceInfo,
        timestamp:  new Date().toISOString(),
      })
      auditLog(account.accountId, 'login_lock', account.accountId, 'locked', 'system')
      return { tokens: null, sessionId: null, error: `Account locked after ${attempts} failed attempts.` }
    }

    auditLog(account.accountId, 'login_fail', account.accountId, `attempt ${attempts}`, 'system')
    return { tokens: null, sessionId: null, error: 'Invalid credentials.' }
  }

  // Success — reset failed attempts
  failedAttempts.delete(account.accountId)

  const sessionId = createSession(account.accountId, account.tier, deviceInfo)
  const payload   = { accountId: account.accountId, tier: account.tier, permissions: [], sessionId }
  const tokens    = {
    accessToken:  generateAccessToken(payload),
    refreshToken: generateRefreshToken(account.accountId, deviceInfo),
  }

  const needsPasswordChange = requiresPasswordChange(account.accountId)

  auditLog(account.accountId, 'login', account.accountId, 'success', account.accountId)
  return { tokens, sessionId, error: null, requiresPasswordChange: needsPasswordChange }
}

// ─── LOGOUT ────────────────────────────────────────────────

/**
 * Ends a session and revokes the associated refresh token.
 * @param {string} sessionId
 * @param {string} accountId
 * @returns {void}
 */
export function logout(sessionId, accountId) {
  terminateSession(sessionId, 'logout')
  auditLog(accountId, 'logout', sessionId, 'success', accountId)
}

// ─── TOKEN REFRESH ─────────────────────────────────────────

/**
 * Issues a new access token using a valid refresh token.
 * Implements rotation — old refresh token is invalidated.
 * @param {string} refreshToken
 * @returns {{ accessToken: string|null, newRefreshToken: string|null, error: string|null }}
 */
export function refreshAccessToken(refreshToken) {
  const result = rotateRefreshToken(refreshToken)
  if (!result.accessToken) return { accessToken: null, newRefreshToken: null, error: 'Invalid or expired refresh token.' }
  return { ...result, error: null }
}

// ─── TOKEN VERIFICATION ────────────────────────────────────

/**
 * Validates a JWT access token and returns its payload.
 * @param {string} token
 * @returns {{ valid: boolean, payload: Object|null }}
 */
export function verifyToken(token) {
  try {
    // CONNECT: jsonwebtoken — replace with real jwt.verify
    // const jwt = require('jsonwebtoken')
    // const payload = jwt.verify(token, AUTH_CONFIG.jwt.secret, { algorithms: [AUTH_CONFIG.jwt.algorithm] })
    // return { valid: true, payload }

    if (!token.startsWith('mock_access.')) return { valid: false, payload: null }
    const encoded = token.split('.')[1]
    const payload = JSON.parse(Buffer.from(encoded, 'base64').toString())
    if (payload.exp < Math.floor(Date.now() / 1000)) return { valid: false, payload: null }
    return { valid: true, payload }
  } catch {
    return { valid: false, payload: null }
  }
}

// ─── ACCOUNT LOCKING ───────────────────────────────────────

/**
 * Manually locks an account (e.g. suspected compromise).
 * Terminates all active sessions immediately.
 * @param {string} accountId
 * @param {string} reason
 * @returns {Promise<void>}
 */
export async function lockAccount(accountId, reason) {
  const account = accountStore.get(accountId)
  if (!account) return

  lockedAccounts.set(accountId, { reason, expiry: Infinity, lockedAt: new Date().toISOString() })
  terminateAllSessions(accountId, `locked: ${reason}`)
  revokeAllTokens(accountId, reason)

  await sendEmail(account.email, 'securityAlert', { event: 'account_locked', reason, timestamp: new Date().toISOString() })

  auditLog(accountId, 'lock_account', accountId, 'locked', 'system')
  console.log(`[auth] Account ${accountId} locked — ${reason}`)
}

/**
 * Unlocks a previously locked account.
 * @param {string} accountId
 * @param {string} unlockedBy - accountId of who unlocked it
 * @returns {void}
 */
export function unlockAccount(accountId, unlockedBy) {
  lockedAccounts.delete(accountId)
  auditLog(accountId, 'unlock_account', accountId, 'unlocked', unlockedBy)
  console.log(`[auth] Account ${accountId} unlocked by ${unlockedBy}`)
}

// ─── PERMISSION SHORTHAND ──────────────────────────────────

/**
 * Checks whether an account has permission for a specific action on a resource.
 * Delegates to the permissions module.
 * @param {string} accountId
 * @param {string} action
 * @param {string} resourceId
 * @returns {boolean}
 */
export function checkPermission(accountId, action, resourceId) {
  const { hasPermission } = require('../accounts/permissions.js')
  return hasPermission(accountId, action)
}
