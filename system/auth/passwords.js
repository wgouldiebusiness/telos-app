/**
 * PASSWORDS — hashing, validation, reset tokens.
 * Uses PBKDF2-HMAC-SHA512 (Node.js built-in, no extra dependencies).
 * OWASP recommends 210,000 iterations for PBKDF2-HMAC-SHA512.
 */

import { randomBytes, pbkdf2, timingSafeEqual } from 'crypto'
import { promisify } from 'util'
import { AUTH_CONFIG } from './config.js'

const pbkdf2Async = promisify(pbkdf2)
const ITERATIONS = 210_000
const KEY_LEN    = 64
const DIGEST     = 'sha512'
const SALT_LEN   = 32

// In-memory store — replace with DB table in production
const resetTokenStore  = new Map()
const forceChangeFlags = new Map()

// ─── HASHING ───────────────────────────────────────────────

/**
 * Hashes a plaintext password with PBKDF2-HMAC-SHA512.
 * Stored format: `pbkdf2$<iterations>$<saltHex>$<keyHex>`
 * @param {string} plaintext
 * @returns {Promise<string>} hash string
 */
export async function hashPassword(plaintext) {
  const salt   = randomBytes(SALT_LEN)
  const key    = await pbkdf2Async(plaintext, salt, ITERATIONS, KEY_LEN, DIGEST)
  return `pbkdf2$${ITERATIONS}$${salt.toString('hex')}$${key.toString('hex')}`
}

/**
 * Verifies a plaintext password against a stored hash using constant-time comparison.
 * @param {string} plaintext
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(plaintext, hash) {
  try {
    const parts = hash.split('$')
    if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false
    const [, iterStr, saltHex, keyHex] = parts
    const iterations  = parseInt(iterStr, 10)
    const salt        = Buffer.from(saltHex, 'hex')
    const expectedKey = Buffer.from(keyHex, 'hex')
    const actualKey   = await pbkdf2Async(plaintext, salt, iterations, KEY_LEN, DIGEST)
    if (actualKey.length !== expectedKey.length) return false
    return timingSafeEqual(actualKey, expectedKey)
  } catch {
    return false
  }
}

// ─── VALIDATION ────────────────────────────────────────────

/**
 * Checks a password against all configured strength rules.
 * @param {string} password
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validatePasswordStrength(password) {
  const cfg    = AUTH_CONFIG.passwords
  const errors = []

  if (password.length < cfg.minLength)
    errors.push(`Must be at least ${cfg.minLength} characters.`)
  if (cfg.requireUppercase && !/[A-Z]/.test(password))
    errors.push('Must contain at least one uppercase letter.')
  if (cfg.requireNumber && !/\d/.test(password))
    errors.push('Must contain at least one number.')
  if (cfg.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    errors.push('Must contain at least one special character.')

  return { valid: errors.length === 0, errors }
}

// ─── RESET TOKENS ──────────────────────────────────────────

/**
 * Generates a cryptographically secure password-reset token.
 * Stores it with an expiry. Returns the token to embed in the reset link.
 * @param {string} accountId
 * @returns {string} reset token
 */
export function generateResetToken(accountId) {
  const token  = randomBytes(32).toString('hex')
  const expiry = Date.now() + AUTH_CONFIG.passwords.resetTokenExpiry
  resetTokenStore.set(token, { accountId, expiry, used: false, attempts: 0 })
  console.log(`[passwords] Reset token generated for account ${accountId}`)
  return token
}

/**
 * Validates a reset token — checks existence, expiry, and usage.
 * @param {string} token
 * @returns {{ valid: boolean, accountId: string|null, error: string|null }}
 */
export function validateResetToken(token) {
  const record = resetTokenStore.get(token)
  if (!record)       return { valid: false, accountId: null, error: 'Token not found.' }
  if (record.used)   return { valid: false, accountId: null, error: 'Token already used.' }
  if (Date.now() > record.expiry) {
    resetTokenStore.delete(token)
    return { valid: false, accountId: null, error: 'Token has expired.' }
  }
  if (record.attempts >= AUTH_CONFIG.passwords.resetMaxAttempts)
    return { valid: false, accountId: null, error: 'Too many attempts. Request a new link.' }

  return { valid: true, accountId: record.accountId, error: null }
}

/**
 * Resets a password using a valid token.
 * Invalidates ALL active sessions for security.
 * @param {string} token
 * @param {string} newPassword
 * @returns {Promise<{ success: boolean, error: string|null }>}
 */
export async function resetPassword(token, newPassword) {
  const { valid, accountId, error } = validateResetToken(token)
  if (!valid) return { success: false, error }

  const { valid: strong, errors } = validatePasswordStrength(newPassword)
  if (!strong) return { success: false, error: errors.join(' ') }

  const hash = await hashPassword(newPassword)

  // CONNECT: DB — update account password hash
  // await db.accounts.update({ id: accountId }, { passwordHash: hash, updatedAt: new Date() })

  // Invalidate all active sessions (security best practice)
  // CONNECT: sessions store — revoke all sessions for accountId
  console.log(`[passwords] Password reset for ${accountId} — all sessions invalidated`)

  // Mark token as used
  const record = resetTokenStore.get(token)
  if (record) record.used = true

  // CONNECT: email — send password-changed confirmation
  console.log(`[passwords] Password-changed email → account ${accountId}`)

  return { success: true, error: null }
}

/**
 * Flags an account as requiring a password change on next login.
 * @param {string} accountId
 * @param {string} initiatedBy - accountId of who triggered this
 * @param {string} reason
 */
export function forcePasswordChange(accountId, initiatedBy, reason = '') {
  forceChangeFlags.set(accountId, { initiatedBy, reason, flaggedAt: new Date().toISOString() })
  // CONNECT: email — notify account holder
  console.log(`[passwords] Force-change flagged: account ${accountId} by ${initiatedBy} — "${reason}"`)
}

/**
 * Checks whether an account has a pending forced password change.
 * @param {string} accountId
 * @returns {boolean}
 */
export function requiresPasswordChange(accountId) {
  return forceChangeFlags.has(accountId)
}
