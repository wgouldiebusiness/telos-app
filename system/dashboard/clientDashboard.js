/**
 * CLIENT DASHBOARD — two views: owner dashboard and end-client portal.
 * Same file, different data shapes returned based on who's asking.
 */

import { hasPermission, auditLog } from '../accounts/permissions.js'
import { getConnectedServices } from '../connections/connectionManager.js'
import { DASHBOARD_CONFIG } from './config.js'
import { getTierCapabilitySummary } from '../accounts/accountRoles.js'

/**
 * Returns the full owner dashboard for a business.
 * @param {string} ownerAccountId
 * @returns {Promise<Object>}
 */
export async function getOwnerDashboard(ownerAccountId) {
  // CONNECT: Booking system, CRM, Stripe — pull live data

  const agents = getConnectedServices(ownerAccountId)
  const alerts = agents.filter(a => a.status !== 'healthy').map(a => `${a.service} needs attention`)

  const dashboard = {
    business: {
      name:               'CONNECT: fetch owner.businessName',
      activeClients:      0,
      newClientsThisMonth: 0,
    },
    bookings: {
      todaysBookings:       [],  // CONNECT: booking system
      upcomingWeek:         [],
      pendingConfirmation:  [],
    },
    revenue: {
      today:        0,  // CONNECT: Stripe
      thisWeek:     0,
      thisMonth:    0,
      vsLastMonth:  0,
    },
    agents: {
      connected: agents,
      alerts,
    },
    clients: {
      recentlyActive:        [],  // CONNECT: CRM — last activity
      awaitingReEngagement:  [],  // CONNECT: clients > inactivityThresholdDays
    },
    quickActions: [
      'Add new client',
      'View this week\'s bookings',
      'Check revenue report',
      'Send message to client',
    ],
  }

  auditLog(ownerAccountId, 'view_owner_dashboard', ownerAccountId, 'success', ownerAccountId)
  return dashboard
}

/**
 * Returns the end-client portal view.
 * @param {string} clientId
 * @returns {Promise<Object>}
 */
export async function getEndClientPortal(clientId) {
  // CONNECT: CRM + booking system + Stripe — fetch client's own data

  const portal = {
    welcome: {
      firstName:    'CONNECT: fetch client.name.split(" ")[0]',
      businessName: 'CONNECT: fetch owner.businessName',
      businessLogo: 'CONNECT: fetch owner.logoUrl',
    },
    appointments: {
      next:     null,   // CONNECT: booking system — next upcoming
      upcoming: [],
      past:     [],
    },
    invoices: {
      outstanding:     [],  // CONNECT: Stripe — unpaid
      paid:            [],
      totalOutstanding: 0,
    },
    documents: [],          // CONNECT: CRM / file storage
    messages:  [],          // CONNECT: message store
    quickActions: [
      'Book again',
      'View next appointment',
      'Pay outstanding invoice',
      'Send a message',
    ],
  }

  auditLog(clientId, 'view_client_portal', clientId, 'success', clientId)
  return portal
}

/**
 * Returns a structured diff of what each tier can/cannot see.
 * Used by the frontend to conditionally render components.
 * @returns {Object}
 */
export function getDashboardDiff() {
  return {
    tiers: getTierCapabilitySummary(),
    visibility: {
      master: {
        sees: ['All owner accounts', 'All agent connections', 'All billing', 'Full audit log', 'System health'],
        cannotSee: ['End client personal data without audit log entry'],
      },
      owner: {
        sees: ['Own business data', 'Own clients', 'Own billing', 'Own agent connections'],
        cannotSee: ['Other businesses', 'Telos master controls', 'Telos billing'],
      },
      client: {
        sees: ['Own appointments', 'Own invoices', 'Own documents', 'Own messages'],
        cannotSee: ['Other clients', 'Business config', 'Agent settings', 'Revenue data'],
      },
    },
  }
}
