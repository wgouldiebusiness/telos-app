/**
 * TELOS AI — SYSTEM LAYER
 * ─────────────────────────────────────────────────────────────────────
 *
 * THREE-TIER ACCOUNT HIERARCHY
 * ─────────────────────────────
 *
 * TIER 1 — TELOS MASTER (us)
 *   Full visibility and control over everything.
 *   Creates owner accounts, can suspend/reinstate,
 *   impersonates for support, sees billing across all accounts.
 *
 * TIER 2 — BUSINESS OWNER (our clients)
 *   e.g. salon owner, cleaning company, physio clinic.
 *   Controls their own portal, agents, and client accounts.
 *   Cannot see other businesses or Telos-level controls.
 *
 * TIER 3 — END CLIENT (our clients' customers)
 *   e.g. the salon's clients.
 *   Read-only portal: appointments, invoices, documents.
 *   Cannot configure anything.
 *
 * ─────────────────────────────────────────────────────────────────────
 * HOW TO ONBOARD A NEW CLIENT — QUICK REFERENCE
 * ─────────────────────────────────────────────────────────────────────
 *
 * See SETUP.md for the full step-by-step checklist.
 *
 * 1.  Call createOwnerAccount(ownerData, TELOS_MASTER_ID)
 *     → Account created, invite email sent automatically.
 *
 * 2.  Owner accepts invite, sets password, accesses their portal.
 *
 * 3.  Owner connects integrations via connectIntegration()
 *     → agentConnected email sent automatically.
 *
 * 4.  Owner creates client accounts via createClientAccount()
 *     → Welcome email with magic link sent automatically.
 *
 * 5.  Done. Telos monitors via getMasterOverview().
 *
 * ─────────────────────────────────────────────────────────────────────
 * CONFIG FILES TO FILL IN
 * ─────────────────────────────────────────────────────────────────────
 *
 * /system/auth/config.js          JWT_SECRET_KEY
 * /system/emails/config.js        EMAIL_API_KEY, TELOS_LOGO_URL
 * /system/connections/config.js   All third-party API keys
 *
 * ─────────────────────────────────────────────────────────────────────
 */

// Auth
export { register, login, logout, refreshAccessToken, verifyToken, lockAccount, unlockAccount }
  from './auth/auth.js'

export { hashPassword, verifyPassword, validatePasswordStrength, generateResetToken, validateResetToken, resetPassword, forcePasswordChange }
  from './auth/passwords.js'

export { generateAccessToken, generateRefreshToken, generateMagicLinkToken, generateInviteToken, revokeAllTokens, revokeRefreshToken }
  from './auth/tokens.js'

export { createSession, validateSession, terminateSession, terminateAllSessions, getActiveSessions }
  from './auth/sessions.js'

// Accounts
export { hasPermission, grantOverride, revokeOverride, getEffectivePermissions, auditLog, queryAuditLog }
  from './accounts/permissions.js'

export { createOwnerAccount, suspendOwnerAccount, reinstateOwnerAccount, viewAllAccounts, viewOwnerDashboard, impersonateOwner, disconnectAgentFromOwner, getBillingOverview, getSystemHealth }
  from './accounts/masterAccount.js'

export { createClientAccount, getClientProfile, updateClientProfile, suspendClientAccount, getClientActivity }
  from './accounts/clientAccount.js'

export { getTierLabel, getTierLevel, outranks, getCreatableRoles, getTierCapabilitySummary }
  from './accounts/accountRoles.js'

// Emails
export { sendEmail, sendBulk, queueEmail, cancelQueuedEmail, getEmailHistory }
  from './emails/emailEngine.js'

// Connections
export { connectIntegration, disconnectIntegration, getConnectedServices, testConnection, rotateCredentials, getConnectionHealth }
  from './connections/connectionManager.js'

export { createPaymentIntent, handleWebhook, listCharges }
  from './connections/stripe.js'

export { sendSms, sendWhatsApp }
  from './connections/twilio.js'

export { createEvent, deleteEvent }
  from './connections/calendar.js'

export { upsertContact, tagContact, getContactsByTag }
  from './connections/crm.js'

// Dashboards
export { getMasterOverview, getOwnerSummaryCard, getAuditLog }
  from './dashboard/masterDashboard.js'

export { getOwnerDashboard, getEndClientPortal, getDashboardDiff }
  from './dashboard/clientDashboard.js'
