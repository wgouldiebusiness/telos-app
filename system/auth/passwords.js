/**
 * PASSWORDS — hashing, validation, reset tokens.
 * Uses bcrypt for all password operations.
 */

import { randomBytes } from 'crypto'
import { AUTH_CONFIG } from './config.js'

// In-memory store — replace with DB table in production
const resetTokenStore = new Map()
const forceChangeFlags = new Map()

// ─── HASHING ───────────────────────────────────────────────

/**
 * Hashes a plaintext password with bcrypt.
 * @param {string} plaintext
 * @returns {Promise<string>} bcrypt hash
 */
export async function hashPassword(plaintext) {
  // CONNECT: bcrypt — replace with real bcrypt call
  // const bcrypt = require('bcrypt')
  // return bcrypt.hash(plaintext, AUTH_CONFIG.passwords.saltRounds)

  console.log('[passwords][MOCK] bcrypt.hash called')
  return `mock_hash_${Buffer.from(plaintext).toString('base64')}`
}

/**
 * Verifies a plaintext password against a stored hash.
 * @param {string} plaintext
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(plaintext, hash) {
  // CONNECT: bcrypt — replace with real bcrypt call
  // return bcrypt.compare(plaintext, hash)

  return hash === `mock_hash_${Buffer.from(plaintext).toString('base64')}`
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
  const token   = randomBytes(32).toString('hex')
  const expiry  = Date.now() + AUTH_CONFIG.passwords.resetTokenExpiry
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
  console.log(`[passwords][MOCK] Password-changed email → account ${accountId}`)

  return { success: true, error: null }
}

/**
 * Flags an account as requiring a password change on next login.
 * @param {string} accountId
 * @param {string} initiatedBy - accountId of who triggered this
 * @param {string} reason
 * @returns {void}
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
