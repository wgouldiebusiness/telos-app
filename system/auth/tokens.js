/**
 * TOKENS — JWT access tokens, refresh tokens, magic links, invite tokens.
 * Implements refresh token rotation: old token invalidated on each refresh.
 */

import { randomBytes } from 'crypto'
import { AUTH_CONFIG } from './config.js'

// In-memory stores — replace with Redis/DB in production
const refreshTokenStore  = new Map()
const magicLinkStore     = new Map()
const inviteTokenStore   = new Map()
const revokedTokens      = new Set()

// ─── JWT ───────────────────────────────────────────────────

/**
 * Signs a JWT access token containing the account's identity and permissions.
 * @param {{ accountId: string, tier: string, permissions: string[], masterAccountId?: string }} payload
 * @returns {string} signed JWT
 */
export function generateAccessToken(payload) {
  // CONNECT: jsonwebtoken — replace with real JWT sign call
  // const jwt = require('jsonwebtoken')
  // return jwt.sign(payload, AUTH_CONFIG.jwt.secret, {
  //   expiresIn:  AUTH_CONFIG.jwt.accessTokenExpiry,
  //   algorithm:  AUTH_CONFIG.jwt.algorithm,
  // })

  const encoded = Buffer.from(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 900, // 15 min mock
  })).toString('base64')
  return `mock_access.${encoded}.sig`
}

/**
 * Generates a long-lived refresh token and stores it with device info.
 * @param {string} accountId
 * @param {{ userAgent?: string, ip?: string }} deviceInfo
 * @returns {string} refresh token
 */
export function generateRefreshToken(accountId, deviceInfo = {}) {
  const token  = randomBytes(40).toString('hex')
  const expiry = Date.now() + AUTH_CONFIG.sessions.rememberMeDays * 24 * 60 * 60 * 1000

  refreshTokenStore.set(token, {
    accountId,
    deviceInfo,
    createdAt: new Date().toISOString(),
    expiry,
    revoked: false,
  })

  return token
}

/**
 * Generates a short-lived single-use magic link token.
 * Expires in 15 minutes. Carries the email for lookup.
 * @param {string} email
 * @returns {string} magic link token
 */
export function generateMagicLinkToken(email) {
  const token  = randomBytes(32).toString('hex')
  const expiry = Date.now() + 15 * 60 * 1000

  magicLinkStore.set(token, { email, expiry, used: false })
  return token
}

/**
 * Verifies a magic link token. One-time use — invalidated immediately.
 * @param {string} token
 * @returns {{ valid: boolean, email: string|null }}
 */
export function verifyMagicLinkToken(token) {
  const record = magicLinkStore.get(token)
  if (!record || record.used || Date.now() > record.expiry) {
    return { valid: false, email: null }
  }
  record.used = true // one-time use
  return { valid: true, email: record.email }
}

/**
 * Generates a 48-hour invitation token for a new account.
 * @param {string} email - intended recipient email
 * @param {'owner'|'client'} tier - account tier being invited to
 * @param {string} invitedBy - accountId of the inviter
 * @returns {string} invite token
 */
export function generateInviteToken(email, tier, invitedBy) {
  const token  = randomBytes(32).toString('hex')
  const expiry = Date.now() + 48 * 60 * 60 * 1000

  inviteTokenStore.set(token, { email, tier, invitedBy, expiry, accepted: false })
  return token
}

/**
 * Validates and consumes an invite token.
 * @param {string} token
 * @returns {{ valid: boolean, email: string|null, tier: string|null, invitedBy: string|null }}
 */
export function validateInviteToken(token) {
  const record = inviteTokenStore.get(token)
  if (!record || record.accepted || Date.now() > record.expiry) {
    return { valid: false, email: null, tier: null, invitedBy: null }
  }
  record.accepted = true
  return { valid: true, email: record.email, tier: record.tier, invitedBy: record.invitedBy }
}

// ─── REFRESH TOKEN ROTATION ────────────────────────────────

/**
 * Validates a refresh token and issues a new access token + rotated refresh token.
 * Old refresh token is immediately revoked.
 * @param {string} refreshToken
 * @returns {{ accessToken: string|null, newRefreshToken: string|null, accountId: string|null }}
 */
export function rotateRefreshToken(refreshToken) {
  const record = refreshTokenStore.get(refreshToken)

  if (!record || record.revoked || Date.now() > record.expiry) {
    return { accessToken: null, newRefreshToken: null, accountId: null }
  }

  // Revoke old token immediately (rotation)
  record.revoked = true

  // CONNECT: DB — load account to get current permissions
  const mockPayload = { accountId: record.accountId, tier: 'owner', permissions: [] }
  const accessToken    = generateAccessToken(mockPayload)
  const newRefreshToken = generateRefreshToken(record.accountId, record.deviceInfo)

  return { accessToken, newRefreshToken, accountId: record.accountId }
}

// ─── REVOCATION ────────────────────────────────────────────

/**
 * Revokes ALL tokens for an account immediately.
 * Used on account compromise, suspension, or password reset.
 * @param {string} accountId
 * @param {string} reason
 */
export function revokeAllTokens(accountId, reason) {
  let count = 0
  for (const [token, record] of refreshTokenStore.entries()) {
    if (record.accountId === accountId) {
      record.revoked = true
      revokedTokens.add(token)
      count++
    }
  }
  console.log(`[tokens] All tokens revoked for ${accountId} (${count} refresh tokens) — reason: ${reason}`)
}

/**
 * Revokes a single refresh token (called on logout).
 * @param {string} token
 */
export function revokeRefreshToken(token) {
  const record = refreshTokenStore.get(token)
  if (record) {
    record.revoked = true
    revokedTokens.add(token)
  }
}

/**
 * Checks if an access token has been explicitly revoked.
 * (For short-lived access tokens we rely on expiry, but this catches
 * immediate revocations like account suspension.)
 * @param {string} jti - JWT token ID
 * @returns {boolean}
 */
export function isTokenRevoked(jti) {
  return revokedTokens.has(jti)
}
