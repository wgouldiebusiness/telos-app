/**
 * CONNECTION MANAGER — connects, tests, rotates, and monitors
 * third-party integrations per owner account.
 */

import { hasPermission, auditLog } from '../accounts/permissions.js'
import { sendEmail } from '../emails/emailEngine.js'

// In-memory — replace with encrypted DB store in production
const connectionStore = new Map()  // `${accountId}:${service}` → connection record

// ─── CONNECT ───────────────────────────────────────────────

/**
 * Connects a new service integration to an owner account.
 * Validates credentials before storing. Fires agentConnected email on success.
 * @param {string} accountId
 * @param {string} service - 'stripe' | 'twilio' | 'googleCalendar' | 'hubspot' | 'airtable'
 * @param {Object} credentials - service-specific key/secret pairs
 * @returns {Promise<{ success: boolean, error: string|null }>}
 */
export async function connectIntegration(accountId, service, credentials) {
  if (!hasPermission(accountId, 'canManageAgents')) {
    auditLog(accountId, 'connect_integration', service, 'denied', accountId)
    return { success: false, error: 'Permission denied.' }
  }

  const testResult = await _testCredentials(service, credentials)
  if (!testResult.valid) {
    auditLog(accountId, 'connect_integration', service, 'invalid_credentials', accountId)
    return { success: false, error: testResult.error }
  }

  // CONNECT: Encryption service — encrypt credentials before storing
  // const encrypted = await encrypt(credentials)
  const key = `${accountId}:${service}`
  connectionStore.set(key, {
    accountId,
    service,
    credentials,   // REPLACE with encrypted version in production
    connectedAt:   new Date().toISOString(),
    lastTestedAt:  new Date().toISOString(),
    status:        'healthy',
  })

  await sendEmail(accountId, 'agentConnected', {
    event:       'agent_connected',
    agentId:     service,
    connectedBy: 'Owner',
    timestamp:   new Date().toISOString(),
  })

  auditLog(accountId, 'connect_integration', service, 'success', accountId)
  console.log(`[connections] ${service} connected for account ${accountId}`)
  return { success: true, error: null }
}

/**
 * Disconnects an integration. Master disconnections notify the owner.
 * @param {string} accountId
 * @param {string} service
 * @param {string} requestedBy - accountId of caller
 * @returns {Promise<void>}
 */
export async function disconnectIntegration(accountId, service, requestedBy) {
  const isMaster = hasPermission(requestedBy, 'canManageAgents') && requestedBy !== accountId

  auditLog(requestedBy, 'disconnect_integration', `${accountId}:${service}`, 'executing', requestedBy)

  connectionStore.delete(`${accountId}:${service}`)

  if (isMaster) {
    await sendEmail(accountId, 'agentConnected', {
      event:    'agent_disconnected_by_telos',
      agentId:  service,
      timestamp: new Date().toISOString(),
    })
  }

  auditLog(requestedBy, 'disconnect_integration', `${accountId}:${service}`, 'success', requestedBy)
}

/**
 * Returns all active integrations for an account with status.
 * @param {string} accountId
 * @returns {Object[]}
 */
export function getConnectedServices(accountId) {
  const result = []
  for (const [key, record] of connectionStore.entries()) {
    if (record.accountId === accountId) {
      const { credentials: _, ...safe } = record
      result.push(safe)
    }
  }
  return result
}

/**
 * Fires a test call to the connected service and returns health status.
 * @param {string} accountId
 * @param {string} service
 * @returns {Promise<{ status: 'healthy'|'degraded'|'down', error: string|null }>}
 */
export async function testConnection(accountId, service) {
  const record = connectionStore.get(`${accountId}:${service}`)
  if (!record) return { status: 'down', error: 'Not connected.' }

  const result = await _testCredentials(service, record.credentials)
  record.lastTestedAt = new Date().toISOString()
  record.status       = result.valid ? 'healthy' : 'down'

  return { status: record.status, error: result.error ?? null, testedAt: record.lastTestedAt }
}

/**
 * Replaces stored credentials without disconnecting the service.
 * Validates new credentials first.
 * @param {string} accountId
 * @param {string} service
 * @param {Object} newCredentials
 * @returns {Promise<{ success: boolean, error: string|null }>}
 */
export async function rotateCredentials(accountId, service, newCredentials) {
  const testResult = await _testCredentials(service, newCredentials)
  if (!testResult.valid) return { success: false, error: testResult.error }

  const record = connectionStore.get(`${accountId}:${service}`)
  if (!record) return { success: false, error: 'Integration not connected.' }

  record.credentials  = newCredentials
  record.rotatedAt    = new Date().toISOString()
  record.lastTestedAt = new Date().toISOString()
  record.status       = 'healthy'

  auditLog(accountId, 'rotate_credentials', service, 'success', accountId)
  return { success: true, error: null }
}

/**
 * Master-level view of all integrations across all owner accounts.
 * Flags failing or untested connections.
 * @returns {Object[]}
 */
export function getConnectionHealth() {
  const all = [...connectionStore.values()].map(({ credentials: _, ...safe }) => safe)
  const failing = all.filter(c => c.status !== 'healthy')
  return { total: all.length, failing, all }
}

// ─── INTERNAL ──────────────────────────────────────────────

async function _testCredentials(service, credentials) {
  // CONNECT: per-service SDK test call
  // switch (service) {
  //   case 'stripe': return await testStripe(credentials)
  //   case 'twilio': return await testTwilio(credentials)
  //   case 'googleCalendar': return await testGoogleCalendar(credentials)
  //   default: return { valid: false, error: `Unknown service: ${service}` }
  // }

  console.log(`[connections][MOCK] Testing ${service} credentials`)
  if (!credentials || Object.keys(credentials).length === 0) {
    return { valid: false, error: 'No credentials provided.' }
  }
  return { valid: true, error: null }
}
