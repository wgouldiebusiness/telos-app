/**
 * PERMISSIONS — tier-based permission checks, master overrides,
 * and the immutable audit log.
 */

import { ACCOUNT_CONFIG } from './config.js'

// In-memory stores — replace with DB in production
const overrideStore = new Map()   // accountId → { [permission]: { expiresAt, grantedBy } }
const auditStore    = []          // append-only audit log

// ─── PERMISSION CHECK ──────────────────────────────────────

/**
 * Core permission check. Checks base tier permissions + active master overrides.
 * @param {string} accountId
 * @param {string} action - e.g. 'canViewBilling', 'canManageAgents'
 * @returns {boolean}
 */
export function hasPermission(accountId, action) {
  // CONNECT: DB — load account tier
  // const account = await db.accounts.findById(accountId)
  const tier = getTierForAccount(accountId)  // mock lookup
  if (!tier) return false

  const tierConfig = ACCOUNT_CONFIG.tiers[tier]
  if (!tierConfig) return false

  // Base tier check
  const basePermission = tierConfig[action] ?? false
  if (basePermission) return true

  // Check master-granted overrides
  const overrides = overrideStore.get(accountId) ?? {}
  const override  = overrides[action]
  if (override && (!override.expiresAt || Date.now() < new Date(override.expiresAt).getTime())) {
    return true
  }

  return false
}

// Mock tier lookup — replace with real DB query
const mockTiers = new Map()
export function _setAccountTier(accountId, tier) { mockTiers.set(accountId, tier) }
function getTierForAccount(accountId) { return mockTiers.get(accountId) ?? 'client' }

// ─── OVERRIDES ─────────────────────────────────────────────

/**
 * Grants a temporary elevated permission to an account (master only).
 * @param {string} accountId
 * @param {string} permission
 * @param {string} grantedBy - masterAccountId
 * @param {string|null} expiresAt - ISO string, or null for no expiry
 * @returns {void}
 */
export function grantOverride(accountId, permission, grantedBy, expiresAt = null) {
  if (!overrideStore.has(accountId)) overrideStore.set(accountId, {})
  overrideStore.get(accountId)[permission] = { grantedBy, grantedAt: new Date().toISOString(), expiresAt }
  auditLog(accountId, 'grant_override', permission, 'granted', grantedBy)
  console.log(`[permissions] Override granted: ${permission} → ${accountId} by ${grantedBy}`)
}

/**
 * Revokes a master-granted permission override.
 * @param {string} accountId
 * @param {string} permission
 * @param {string} revokedBy
 * @returns {void}
 */
export function revokeOverride(accountId, permission, revokedBy) {
  const overrides = overrideStore.get(accountId)
  if (overrides) {
    delete overrides[permission]
    auditLog(accountId, 'revoke_override', permission, 'revoked', revokedBy)
  }
}

/**
 * Returns the full effective permission set for an account —
 * base tier permissions merged with any active overrides.
 * @param {string} accountId
 * @returns {Object} map of permission → boolean
 */
export function getEffectivePermissions(accountId) {
  const tier       = getTierForAccount(accountId)
  const tierConfig = ACCOUNT_CONFIG.tiers[tier] ?? {}
  const overrides  = overrideStore.get(accountId) ?? {}

  const result = { ...tierConfig }

  for (const [perm, override] of Object.entries(overrides)) {
    if (!override.expiresAt || Date.now() < new Date(override.expiresAt).getTime()) {
      result[perm] = true
    }
  }

  return result
}

// ─── AUDIT LOG ─────────────────────────────────────────────

/**
 * Appends an immutable entry to the audit log.
 * Called before every destructive or privileged action.
 * @param {string} accountId - account performing the action
 * @param {string} action - what was done
 * @param {string} resourceId - what it was done to
 * @param {string} outcome - 'success', 'denied', 'locked', etc.
 * @param {string} performedBy - accountId of actor (may differ if impersonating)
 * @returns {void}
 */
export function auditLog(accountId, action, resourceId, outcome, performedBy) {
  const entry = {
    id:          `audit_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp:   new Date().toISOString(),
    accountId,
    action,
    resourceId,
    outcome,
    performedBy,
  }
  auditStore.push(entry)
  // CONNECT: DB — persist to immutable audit table
  // await db.audit.insert(entry)
}

/**
 * Queries the audit log with optional filters.
 * @param {{ accountId?: string, action?: string, fromDate?: string, toDate?: string, outcome?: string }} filters
 * @returns {Object[]}
 */
export function queryAuditLog(filters = {}) {
  return auditStore.filter(entry => {
    if (filters.accountId && entry.accountId !== filters.accountId) return false
    if (filters.action && entry.action !== filters.action) return false
    if (filters.outcome && entry.outcome !== filters.outcome) return false
    if (filters.fromDate && new Date(entry.timestamp) < new Date(filters.fromDate)) return false
    if (filters.toDate && new Date(entry.timestamp) > new Date(filters.toDate)) return false
    return true
  })
}
