/**
 * AGENT 03 — CLIENT PORTAL
 *
 * Secure, branded self-service portal for clients.
 * Magic-link login → dashboard showing appointments,
 * invoices, documents, and direct messaging to the owner.
 * No back-and-forth email chains.
 */

import { CLIENT_CONFIG } from './config.js'
import { createHash, randomBytes } from 'crypto'

// ─── UTILITIES ─────────────────────────────────────────────

function generateToken() {
  return randomBytes(32).toString('hex')
}

function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

// In-memory token store — replace with Redis or DB in production
const tokenStore = new Map()

// ─── AUTH ───────────────────────────────────────────────────

/**
 * Sends a magic login link to a client's email.
 * @param {string} email
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function requestMagicLink(email) {
  // CONNECT: CRM — check client exists
  // const client = await crm.contacts.findByEmail(email)
  // if (!client) return { success: false, message: 'No account found for this email.' }

  const token   = generateToken()
  const expiry  = Date.now() + CLIENT_CONFIG.email.magicLinkExpirySec * 1000
  tokenStore.set(token, { email, expiry })

  const link = `https://YOUR_DOMAIN/portal/auth?token=${token}`

  // CONNECT: Email provider — send magic link email
  // await emailProvider.send({
  //   to:      email,
  //   subject: CLIENT_CONFIG.email.magicLinkSubject,
  //   html:    `<p>Click to log in: <a href="${link}">${link}</a></p>`,
  // })

  console.log(`[03-portal][MOCK] Magic link for ${email}: ${link}`)
  return { success: true, message: 'Login link sent. Check your email.' }
}

/**
 * Validates a magic link token and returns session data.
 * @param {string} token
 * @returns {{ valid: boolean, email: string|null, clientId: string|null }}
 */
export function verifyToken(token) {
  const record = tokenStore.get(token)
  if (!record) return { valid: false, email: null, clientId: null }
  if (Date.now() > record.expiry) {
    tokenStore.delete(token)
    return { valid: false, email: null, clientId: null }
  }

  tokenStore.delete(token) // one-time use
  console.log(`[03-portal] Token verified for ${record.email}`)
  return { valid: true, email: record.email, clientId: `mock_client_${createHash('md5').update(record.email).digest('hex').slice(0, 8)}` }
}

// ─── DASHBOARD ─────────────────────────────────────────────

/**
 * Returns the full dashboard data object for a client.
 * @param {string} clientId
 * @returns {Promise<Object>}
 */
export async function getClientDashboard(clientId) {
  const [appointments, invoices, documents] = await Promise.all([
    getAppointments(clientId),
    getInvoices(clientId),
    getDocuments(clientId),
  ])

  const welcomeMsg = interpolate(CLIENT_CONFIG.branding.welcomeMessage, {
    firstName:    'Client', // real name comes from CRM lookup
    businessName: CLIENT_CONFIG.businessName,
  })

  return { welcomeMessage: welcomeMsg, appointments, invoices, documents }
}

/**
 * Fetches all appointments for a client (upcoming + past).
 * @param {string} clientId
 * @returns {Promise<{ upcoming: Object[], past: Object[] }>}
 */
export async function getAppointments(clientId) {
  // CONNECT: Booking system / CRM — fetch appointments by clientId
  // const all = await crm.appointments.findByContact(clientId)

  console.log(`[03-portal][MOCK] Fetching appointments for ${clientId}`)
  return {
    upcoming: [{ id: 'apt_001', service: 'Consultation', dateTime: '2025-09-15T14:00:00Z', duration: 60 }],
    past:     [{ id: 'apt_000', service: 'Initial Assessment', dateTime: '2025-08-01T10:00:00Z', duration: 60 }],
  }
}

/**
 * Fetches invoices for a client, split by status.
 * @param {string} clientId
 * @returns {Promise<{ outstanding: Object[], paid: Object[] }>}
 */
export async function getInvoices(clientId) {
  // CONNECT: Stripe / Xero / Quickbooks — fetch invoices by customer
  console.log(`[03-portal][MOCK] Fetching invoices for ${clientId}`)
  return {
    outstanding: [{ id: 'inv_002', amount: 9500, currency: 'gbp', dueDate: '2025-09-30', paymentLink: 'https://pay.stripe.com/mock' }],
    paid:        [{ id: 'inv_001', amount: 7500, currency: 'gbp', paidDate: '2025-08-10' }],
  }
}

/**
 * Returns documents the owner has shared with this client.
 * @param {string} clientId
 * @returns {Promise<Object[]>}
 */
export async function getDocuments(clientId) {
  // CONNECT: CRM or file storage (S3, Google Drive) — fetch shared docs
  console.log(`[03-portal][MOCK] Fetching documents for ${clientId}`)
  return [
    { id: 'doc_001', name: 'Intake Form', url: 'https://storage.example.com/intake.pdf', sharedAt: '2025-08-01' },
    { id: 'doc_002', name: 'Aftercare Guide', url: 'https://storage.example.com/aftercare.pdf', sharedAt: '2025-08-01' },
  ]
}

// ─── ACTIONS ───────────────────────────────────────────────

/**
 * Attempts to cancel an appointment, checking cancellation policy.
 * @param {string} clientId
 * @param {string} appointmentId
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function requestCancellation(clientId, appointmentId) {
  if (!CLIENT_CONFIG.portal.allowClientCancellation) {
    return { success: false, message: 'Please contact us directly to cancel.' }
  }

  // CONNECT: Booking system — fetch appointment, check window
  const appointmentTime = new Date('2025-09-15T14:00:00Z') // mock
  const hoursUntil = (appointmentTime - Date.now()) / (1000 * 60 * 60)

  if (hoursUntil < CLIENT_CONFIG.portal.cancellationWindowHours) {
    return {
      success: false,
      message: `Cancellations require at least ${CLIENT_CONFIG.portal.cancellationWindowHours} hours notice. Please call us.`,
    }
  }

  // CONNECT: Booking system — cancel appointment
  // await bookingSystem.cancel(appointmentId)
  // CONNECT: Calendar — remove event
  // await calendar.events.delete(...)
  // CONNECT: Email / SMS — notify owner
  console.log(`[03-portal][MOCK] Appointment ${appointmentId} cancelled for ${clientId}`)
  return { success: true, message: 'Appointment cancelled. We hope to see you again soon.' }
}

/**
 * Sends a client message to the owner via email.
 * @param {string} clientId
 * @param {string} message
 * @returns {Promise<void>}
 */
export async function sendOwnerMessage(clientId, message) {
  // CONNECT: Email provider — forward message to owner with client context
  console.log(`[03-portal][MOCK] Message from ${clientId} → ${CLIENT_CONFIG.ownerEmail}: "${message}"`)
}
