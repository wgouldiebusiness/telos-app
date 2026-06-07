/**
 * TOKENS — JWT access tokens, refresh tokens, magic links, invite tokens.
 * Uses HMAC-SHA256 for JWT signing (Node.js built-in, no extra dependencies).
 * Implements refresh token rotation: old token invalidated on each refresh.
 */

import { randomBytes, createHmac, timingSafeEqual } from 'crypto'
import { AUTH_CONFIG } from './config.js'

// In-memory stores — replace with Redis/DB in production
const refreshTokenStore = new Map()
const magicLinkStore    = new Map()
const inviteTokenStore  = new Map()
const revokedTokens     = new Set()

// ─── JWT HELPERS ───────────────────────────────────────────

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

function base64urlDecode(input) {
  return Buffer.from(input, 'base64url').toString('utf8')
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET ?? AUTH_CONFIG.jwt.secret
  if (!secret || secret === 'JWT_SECRET_KEY') {
    throw new Error('[tokens] JWT_SECRET env var is not set. Set a 64-char random value.')
  }
  return secret
}

// ─── JWT ───────────────────────────────────────────────────

/**
 * Signs a JWT access token (HS256) containing the account's identity.
 * @param {{ accountId: string, tier: string, permissions: string[], sessionId?: string }} payload
 * @returns {string} signed JWT
 */
export function generateAccessToken(payload) {
  const secret = getJwtSecret()
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body   = base64url(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 900, // 15 minutes
  }))
  const sig = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url')
  return `${header}.${body}.${sig}`
}

/**
 * Validates a JWT access token and returns its payload.
 * Uses constant-time comparison to prevent timing attacks on the signature.
 * @param {string} token
 * @returns {{ valid: boolean, payload: Object|null }}
 */
export function verifyToken(token) {
  try {
    const secret = getJwtSecret()
    const parts  = token.split('.')
    if (parts.length !== 3) return { valid: false, payload: null }
    const [header, body, sig] = parts

    const expectedSig = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url')
    const sigBuf      = Buffer.from(sig, 'base64url')
    const expBuf      = Buffer.from(expectedSig, 'base64url')
    if (sigBuf.length !== expBuf.length) return { valid: false, payload: null }
    if (!timingSafeEqual(sigBuf, expBuf)) return { valid: false, payload: null }

    const payload = JSON.parse(base64urlDecode(body))
    if (payload.exp < Math.floor(Date.now() / 1000)) return { valid: false, payload: null }
    return { valid: true, payload }
  } catch {
    return { valid: false, payload: null }
  }
}

// ─── REFRESH TOKENS ────────────────────────────────────────

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

// ─── MAGIC LINKS ───────────────────────────────────────────

/**
 * Generates a short-lived single-use magic link token (15 minutes).
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
  record.used = true
  return { valid: true, email: record.email }
}

// ─── INVITE TOKENS ─────────────────────────────────────────

/**
 * Generates a 48-hour invitation token for a new account.
 * @param {string} email
 * @param {'owner'|'client'} tier
 * @param {string} invitedBy
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

  record.revoked = true // invalidate immediately (rotation)

  // CONNECT: DB — load account to get current permissions
  const mockPayload     = { accountId: record.accountId, tier: 'owner', permissions: [] }
  const accessToken     = generateAccessToken(mockPayload)
  const newRefreshToken = generateRefreshToken(record.accountId, record.deviceInfo)

  return { accessToken, newRefreshToken, accountId: record.accountId }
}

// ─── REVOCATION ────────────────────────────────────────────

/**
 * Revokes ALL tokens for an account immediately.
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
 * Checks if a token ID has been explicitly revoked.
 * @param {string} jti
 * @returns {boolean}
 */
export function isTokenRevoked(jti) {
  return revokedTokens.has(jti)
}
