/**
 * MASTER DASHBOARD — Telos-level aggregate view of all accounts,
 * agents, emails, billing, and recent activity.
 */

import { hasPermission, auditLog, queryAuditLog } from '../accounts/permissions.js'
import { getConnectionHealth } from '../connections/connectionManager.js'
import { DASHBOARD_CONFIG } from './config.js'

/**
 * Returns the full master overview object.
 * @param {string} masterAccountId
 * @returns {Promise<Object>}
 */
export async function getMasterOverview(masterAccountId) {
  if (!hasPermission(masterAccountId, 'canViewAllAccounts')) {
    auditLog(masterAccountId, 'master_overview', 'all', 'denied', masterAccountId)
    return null
  }

  // CONNECT: DB — aggregate queries for accounts, agents, emails, billing
  const connectionHealth = getConnectionHealth()
  const recentActivity   = queryAuditLog({}).slice(-DASHBOARD_CONFIG.master.recentActivityLimit).reverse()

  const overview = {
    accounts: {
      totalOwners:     0,   // CONNECT: DB count
      activeOwners:    0,
      suspendedOwners: 0,
      totalEndClients: 0,
    },
    agents: {
      totalActive:        connectionHealth.total,
      byType:             { booking: 0, leadScoring: 0, portal: 0, reEngagement: 0, reporting: 0 },
      failingConnections: connectionHealth.failing,
    },
    emails: {
      sentThisMonth: 0,    // CONNECT: email provider stats API
      deliveryRate:  100,
      openRate:      0,
    },
    billing: {
      totalMrr:          0,   // CONNECT: Stripe subscription MRR
      overdueAccounts:   [],
      upcomingRenewals:  [],
    },
    recentActivity,
  }

  auditLog(masterAccountId, 'master_overview', 'all', 'success', masterAccountId)
  return overview
}

/**
 * Returns a compact summary card for one owner account.
 * Used in the master's account list view.
 * @param {string} ownerAccountId
 * @returns {Promise<Object>}
 */
export async function getOwnerSummaryCard(ownerAccountId) {
  // CONNECT: DB — load owner record, connection count, client count, last activity
  const connections = getConnectionHealth().all.filter(c => c.accountId === ownerAccountId)
  const allHealthy  = connections.every(c => c.status === 'healthy')
  const health      = connections.length === 0 ? 'amber' : allHealthy ? 'green' : 'red'

  return {
    ownerAccountId,
    businessName:  'CONNECT: fetch from DB',
    tier:          'owner',
    activeAgents:  connections.length,
    clientCount:   0,   // CONNECT: DB count
    lastActive:    null, // CONNECT: last session timestamp
    health,
    alerts:        connections.filter(c => c.status !== 'healthy').map(c => `${c.service} connection failing`),
  }
}

/**
 * Queries the full audit log with optional filters.
 * Only accessible to master accounts.
 * @param {string} masterAccountId
 * @param {{ accountId?: string, action?: string, fromDate?: string, toDate?: string }} filters
 * @returns {Object[]}
 */
export function getAuditLog(masterAccountId, filters = {}) {
  if (!hasPermission(masterAccountId, 'canViewAllAccounts')) {
    auditLog(masterAccountId, 'query_audit_log', 'all', 'denied', masterAccountId)
    return []
  }

  return queryAuditLog(filters)
}
