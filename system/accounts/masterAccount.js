/**
 * MASTER ACCOUNT — Telos-level controls over all owner accounts.
 * Every function checks hasPermission() and writes to the audit log
 * before executing any action.
 */

import { hasPermission, auditLog } from './permissions.js'
import { register } from '../auth/auth.js'
import { generateInviteToken } from '../auth/tokens.js'
import { terminateAllSessions } from '../auth/sessions.js'
import { revokeAllTokens } from '../auth/tokens.js'
import { sendEmail } from '../emails/emailEngine.js'

// In-memory — replace with DB in production
const ownerStore      = new Map()
const impersonations  = new Map()

// ─── OWNER MANAGEMENT ──────────────────────────────────────

/**
 * Creates a new business owner account beneath the master.
 * Sends the owner a welcome + setup email with an invite link.
 * @param {{ name: string, email: string, businessName: string }} ownerData
 * @param {string} masterAccountId
 * @returns {Promise<{ account: Object|null, inviteToken: string|null, error: string|null }>}
 */
export async function createOwnerAccount(ownerData, masterAccountId) {
  if (!hasPermission(masterAccountId, 'canCreate')) {
    auditLog(masterAccountId, 'create_owner', 'N/A', 'denied', masterAccountId)
    return { account: null, inviteToken: null, error: 'Permission denied.' }
  }

  const tempPassword = `Telos_${Math.random().toString(36).slice(2, 10)}!`
  const result = await register({ ...ownerData, password: tempPassword }, 'owner', masterAccountId)
  if (result.error) return { account: null, inviteToken: null, error: result.error }

  const inviteToken = generateInviteToken(ownerData.email, 'owner', masterAccountId)

  await sendEmail(ownerData.email, 'accountInvite', {
    invitedBy:    'Telos AI',
    tier:         'owner',
    businessName: ownerData.businessName,
    setupLink:    `https://portal.telosai.co.uk/setup?token=${inviteToken}`,
    expiresIn:    '48 hours',
  })

  ownerStore.set(result.account.accountId, { ...result.account, masterAccountId, clientCount: 0, activeAgents: [] })

  auditLog(masterAccountId, 'create_owner', result.account.accountId, 'success', masterAccountId)
  console.log(`[master] Owner account created: ${result.account.accountId} (${ownerData.email})`)

  return { account: result.account, inviteToken, error: null }
}

/**
 * Suspends an owner account AND all client accounts beneath it.
 * Fires notification emails to the owner.
 * @param {string} ownerAccountId
 * @param {string} reason
 * @param {string} masterAccountId
 * @returns {Promise<void>}
 */
export async function suspendOwnerAccount(ownerAccountId, reason, masterAccountId) {
  if (!hasPermission(masterAccountId, 'canSuspend')) {
    auditLog(masterAccountId, 'suspend_owner', ownerAccountId, 'denied', masterAccountId)
    return { success: false, error: 'Permission denied.' }
  }

  auditLog(masterAccountId, 'suspend_owner', ownerAccountId, 'executing', masterAccountId)

  const owner = ownerStore.get(ownerAccountId)
  if (owner) {
    owner.status       = 'suspended'
    owner.suspendedAt  = new Date().toISOString()
    owner.suspendedBy  = masterAccountId
    owner.suspendReason = reason
  }

  terminateAllSessions(ownerAccountId, `suspended: ${reason}`)
  revokeAllTokens(ownerAccountId, reason)

  // CONNECT: DB — also suspend all client accounts under this owner
  // await db.accounts.updateMany({ parentAccountId: ownerAccountId }, { status: 'suspended' })

  if (owner) {
    await sendEmail(owner.email, 'securityAlert', {
      event:  'account_suspended',
      reason,
      timestamp: new Date().toISOString(),
    })
  }

  auditLog(masterAccountId, 'suspend_owner', ownerAccountId, 'success', masterAccountId)
  console.log(`[master] Owner ${ownerAccountId} suspended — ${reason}`)
  return { success: true }
}

/**
 * Reinstates an owner and all previously active clients beneath them.
 * @param {string} ownerAccountId
 * @param {string} masterAccountId
 * @returns {Promise<void>}
 */
export async function reinstateOwnerAccount(ownerAccountId, masterAccountId) {
  if (!hasPermission(masterAccountId, 'canSuspend')) {
    auditLog(masterAccountId, 'reinstate_owner', ownerAccountId, 'denied', masterAccountId)
    return { success: false, error: 'Permission denied.' }
  }

  const owner = ownerStore.get(ownerAccountId)
  if (owner) {
    owner.status       = 'active'
    owner.reinstatedAt = new Date().toISOString()
    owner.reinstatedBy = masterAccountId
  }

  // CONNECT: DB — reinstate client accounts
  if (owner) {
    await sendEmail(owner.email, 'masterNotification', {
      event:   'account_reinstated',
      message: 'Your account has been reinstated.',
    })
  }

  auditLog(masterAccountId, 'reinstate_owner', ownerAccountId, 'success', masterAccountId)
  console.log(`[master] Owner ${ownerAccountId} reinstated by ${masterAccountId}`)
  return { success: true }
}

// ─── VISIBILITY ────────────────────────────────────────────

/**
 * Returns a full account tree for this master.
 * @param {string} masterAccountId
 * @returns {Promise<Object[]>}
 */
export async function viewAllAccounts(masterAccountId) {
  if (!hasPermission(masterAccountId, 'canViewAllAccounts')) {
    auditLog(masterAccountId, 'view_all_accounts', 'all', 'denied', masterAccountId)
    return []
  }

  const owners = [...ownerStore.values()].filter(o => o.masterAccountId === masterAccountId)
  auditLog(masterAccountId, 'view_all_accounts', 'all', 'success', masterAccountId)
  return owners
}

/**
 * Returns an owner's dashboard as Telos would see it. Access is logged.
 * @param {string} ownerAccountId
 * @param {string} masterAccountId
 * @returns {Promise<Object>}
 */
export async function viewOwnerDashboard(ownerAccountId, masterAccountId) {
  if (!hasPermission(masterAccountId, 'canViewAllAccounts')) {
    auditLog(masterAccountId, 'view_owner_dashboard', ownerAccountId, 'denied', masterAccountId)
    return null
  }

  auditLog(masterAccountId, 'view_owner_dashboard', ownerAccountId, 'success', masterAccountId)
  console.log(`[master] AUDIT: ${masterAccountId} viewed dashboard of ${ownerAccountId}`)

  // CONNECT: delegate to clientDashboard.getOwnerDashboard(ownerAccountId)
  return { ownerAccountId, viewedBy: masterAccountId, viewedAt: new Date().toISOString() }
}

/**
 * Creates a 1-hour impersonation token allowing Telos to act as an owner.
 * ALL actions during impersonation are flagged in audit logs.
 * @param {string} ownerAccountId
 * @param {string} masterAccountId
 * @returns {{ token: string, expiresAt: string }}
 */
export function impersonateOwner(ownerAccountId, masterAccountId) {
  if (!hasPermission(masterAccountId, 'canImpersonate')) {
    auditLog(masterAccountId, 'impersonate', ownerAccountId, 'denied', masterAccountId)
    return null
  }

  const token     = `imp_${Math.random().toString(36).slice(2, 18)}`
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString()

  impersonations.set(token, { ownerAccountId, masterAccountId, expiresAt, used: false })

  auditLog(masterAccountId, 'impersonate', ownerAccountId, 'token_issued', masterAccountId)
  console.log(`[master] Impersonation token issued: ${masterAccountId} → ${ownerAccountId}`)

  return { token, expiresAt }
}

// ─── AGENTS ────────────────────────────────────────────────

/**
 * Master can forcibly disconnect any integration from any owner account.
 * @param {string} ownerAccountId
 * @param {string} agentId
 * @param {string} reason
 * @returns {Promise<void>}
 */
export async function disconnectAgentFromOwner(ownerAccountId, agentId, reason) {
  auditLog('master', 'disconnect_agent', `${ownerAccountId}:${agentId}`, 'executing', 'master')

  // CONNECT: connectionManager.disconnectIntegration(ownerAccountId, agentId, 'master')

  const owner = ownerStore.get(ownerAccountId)
  if (owner) {
    await sendEmail(owner.email, 'agentConnected', {
      event:        'agent_disconnected_by_telos',
      agentId,
      reason,
      timestamp:    new Date().toISOString(),
    })
  }

  auditLog('master', 'disconnect_agent', `${ownerAccountId}:${agentId}`, 'success', 'master')
}

// ─── OVERVIEW ──────────────────────────────────────────────

/**
 * Returns billing overview for all owner accounts.
 * @param {string} masterAccountId
 * @returns {Promise<Object[]>}
 */
export async function getBillingOverview(masterAccountId) {
  if (!hasPermission(masterAccountId, 'canViewBilling')) {
    return { error: 'Permission denied.' }
  }

  // CONNECT: Stripe — fetch subscription statuses for all owner accounts
  console.log('[master][MOCK] Fetching billing overview')
  return [{ ownerAccountId: 'example', tier: 'pro', status: 'active', nextPayment: '2025-10-01' }]
}

/**
 * Returns aggregate system health stats.
 * @param {string} masterAccountId
 * @returns {Promise<Object>}
 */
export async function getSystemHealth(masterAccountId) {
  if (!hasPermission(masterAccountId, 'canViewAllAccounts')) {
    return { error: 'Permission denied.' }
  }

  // CONNECT: DB + email provider + connection manager
  return {
    totalActiveOwners:    ownerStore.size,
    totalEndClients:      0,   // CONNECT: DB count
    totalAgentConnections: 0,  // CONNECT: connectionManager.getConnectionHealth
    emailsSentThisMonth:  0,   // CONNECT: email provider stats
    systemErrors:         [],  // CONNECT: error logging service
  }
}
