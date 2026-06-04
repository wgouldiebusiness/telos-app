/**
 * CLIENT ACCOUNT — owner creates and manages end-client accounts.
 * Every data access checks hasPermission() first.
 * Every mutation writes to the audit log.
 */

import { hasPermission, auditLog } from './permissions.js'
import { register } from '../auth/auth.js'
import { generateMagicLinkToken } from '../auth/tokens.js'
import { terminateAllSessions } from '../auth/sessions.js'
import { sendEmail } from '../emails/emailEngine.js'

const clientStore = new Map()

// ─── CREATE ────────────────────────────────────────────────

/**
 * Owner creates a new end-client account and sends a magic-link welcome.
 * @param {{ name: string, email: string, phone?: string }} clientData
 * @param {string} ownerAccountId
 * @returns {Promise<{ account: Object|null, error: string|null }>}
 */
export async function createClientAccount(clientData, ownerAccountId) {
  if (!hasPermission(ownerAccountId, 'canCreate')) {
    auditLog(ownerAccountId, 'create_client', 'N/A', 'denied', ownerAccountId)
    return { account: null, error: 'Permission denied.' }
  }

  const tempPassword = `Client_${Math.random().toString(36).slice(2, 10)}!`
  const result = await register({ ...clientData, password: tempPassword }, 'client', ownerAccountId)
  if (result.error) return { account: null, error: result.error }

  // CONNECT: DB — load owner's business name/logo for branded email
  const magicToken = generateMagicLinkToken(clientData.email)
  await sendEmail(clientData.email, 'welcome', {
    tier:         'client',
    name:         clientData.name,
    businessName: 'Your Business',  // CONNECT: fetch from owner account
    portalLink:   `https://portal.telosai.co.uk/login?token=${magicToken}`,
  })

  clientStore.set(result.account.accountId, { ...result.account, ownerAccountId })

  auditLog(ownerAccountId, 'create_client', result.account.accountId, 'success', ownerAccountId)
  return { account: result.account, error: null }
}

// ─── READ ──────────────────────────────────────────────────

/**
 * Returns a client's profile. Tier-aware: client gets own profile,
 * owner/master get full profile with audit note.
 * @param {string} clientId
 * @param {string} requestedBy - accountId of caller
 * @returns {Promise<Object|null>}
 */
export async function getClientProfile(clientId, requestedBy) {
  const client = clientStore.get(clientId)
  if (!client) return null

  const isSelf   = requestedBy === clientId
  const isOwner  = client.ownerAccountId === requestedBy
  const isMaster = hasPermission(requestedBy, 'canViewAllAccounts')

  if (!isSelf && !isOwner && !isMaster) {
    auditLog(requestedBy, 'view_client_profile', clientId, 'denied', requestedBy)
    return null
  }

  if (isMaster && !isSelf) {
    auditLog(requestedBy, 'view_client_profile', clientId, 'master_access', requestedBy)
  }

  const { passwordHash: _, ...safeProfile } = client
  return safeProfile
}

/**
 * Returns the full activity log for a client. Owner and master access only.
 * @param {string} clientId
 * @param {string} requestedBy
 * @returns {Promise<Object[]>}
 */
export async function getClientActivity(clientId, requestedBy) {
  const client  = clientStore.get(clientId)
  const isOwner = client?.ownerAccountId === requestedBy
  const isMaster = hasPermission(requestedBy, 'canViewAllAccounts')

  if (!isOwner && !isMaster) {
    auditLog(requestedBy, 'view_client_activity', clientId, 'denied', requestedBy)
    return []
  }

  auditLog(requestedBy, 'view_client_activity', clientId, 'success', requestedBy)
  // CONNECT: DB — fetch activity log for clientId
  return []
}

// ─── UPDATE ────────────────────────────────────────────────

/**
 * Updates a client profile. Client can update own contact details.
 * Owner/master can update anything.
 * @param {string} clientId
 * @param {Object} updates
 * @param {string} requestedBy
 * @returns {Promise<{ success: boolean, error: string|null }>}
 */
export async function updateClientProfile(clientId, updates, requestedBy) {
  const client  = clientStore.get(clientId)
  if (!client) return { success: false, error: 'Client not found.' }

  const isSelf   = requestedBy === clientId
  const isOwner  = client.ownerAccountId === requestedBy
  const isMaster = hasPermission(requestedBy, 'canViewAllAccounts')

  if (!isSelf && !isOwner && !isMaster) {
    auditLog(requestedBy, 'update_client_profile', clientId, 'denied', requestedBy)
    return { success: false, error: 'Permission denied.' }
  }

  // Clients can only update contact fields
  const allowedSelfFields = ['name', 'phone']
  const safeUpdates = isSelf ? Object.fromEntries(
    Object.entries(updates).filter(([k]) => allowedSelfFields.includes(k))
  ) : updates

  Object.assign(client, safeUpdates, { updatedAt: new Date().toISOString() })
  // CONNECT: DB — persist update

  auditLog(requestedBy, 'update_client_profile', clientId, 'success', requestedBy)
  return { success: true, error: null }
}

// ─── SUSPEND ───────────────────────────────────────────────

/**
 * Suspends a client account. Client immediately loses portal access.
 * Can be done by their owner or the master.
 * @param {string} clientId
 * @param {string} reason
 * @param {string} suspendedBy
 * @returns {Promise<{ success: boolean, error: string|null }>}
 */
export async function suspendClientAccount(clientId, reason, suspendedBy) {
  const client  = clientStore.get(clientId)
  if (!client) return { success: false, error: 'Client not found.' }

  const isOwner  = client.ownerAccountId === suspendedBy
  const isMaster = hasPermission(suspendedBy, 'canSuspend')

  if (!isOwner && !isMaster) {
    auditLog(suspendedBy, 'suspend_client', clientId, 'denied', suspendedBy)
    return { success: false, error: 'Permission denied.' }
  }

  auditLog(suspendedBy, 'suspend_client', clientId, 'executing', suspendedBy)

  client.status       = 'suspended'
  client.suspendedAt  = new Date().toISOString()
  client.suspendedBy  = suspendedBy
  client.suspendReason = reason

  terminateAllSessions(clientId, `suspended: ${reason}`)

  await sendEmail(client.email, 'securityAlert', {
    event:     'account_suspended',
    reason,
    timestamp: new Date().toISOString(),
  })

  auditLog(suspendedBy, 'suspend_client', clientId, 'success', suspendedBy)
  return { success: true, error: null }
}
