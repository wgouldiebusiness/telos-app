/**
 * AGENT 04 — AUTOMATED RE-ENGAGEMENT PIPELINE
 *
 * Detects clients who have gone quiet, enrolls them in a
 * 3-email sequence personalised with their last service and
 * name, and stops automatically when they book or unsubscribe.
 */

import { CLIENT_CONFIG } from './config.js'

// ─── UTILITIES ─────────────────────────────────────────────

function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

function daysSince(dateString) {
  return Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24))
}

// ─── DETECTION ─────────────────────────────────────────────

/**
 * Queries the CRM for clients overdue for re-engagement.
 * Excludes those already in a sequence or suppressed.
 * @returns {Promise<Object[]>} array of inactive client records
 */
export async function scanForInactiveClients() {
  const { inactivityThresholdDays } = CLIENT_CONFIG.reEngagement

  // CONNECT: CRM — query all active clients
  // const allClients = await crm.contacts.list({ tags: ['active-client'] })
  // const inSequence = await crm.contacts.list({ tags: [CLIENT_CONFIG.crm.inSequenceTag] })
  // const suppressed = await crm.contacts.list({ tags: [CLIENT_CONFIG.crm.suppressedTag] })

  // Mock: return one example inactive client
  const mockClients = [
    {
      id:              'contact_mock_01',
      firstName:       'Sarah',
      lastName:        'Jenkins',
      email:           'sarah@example.com',
      lastBookingDate: '2025-06-01',
      lastServiceType: 'Deep Tissue Massage',
    },
  ]

  const inactive = mockClients.filter(c => daysSince(c.lastBookingDate) >= inactivityThresholdDays)
  console.log(`[04-re-engage] Scan: ${inactive.length} inactive clients found (threshold: ${inactivityThresholdDays} days)`)
  return inactive
}

/**
 * Enrolls a client in the re-engagement sequence.
 * @param {Object} clientData - CRM client record
 * @returns {Promise<void>}
 */
export async function enrollInSequence(clientData) {
  // CONNECT: CRM — add inSequenceTag, record enrollment date
  // await crm.contacts.tag(clientData.id, CLIENT_CONFIG.crm.inSequenceTag)
  // await crm.contacts.setProperty(clientData.id, 're_engage_enrolled_at', new Date().toISOString())

  console.log(`[04-re-engage] Enrolled: ${clientData.email} (last service: ${clientData.lastServiceType})`)
}

/**
 * Generates a personalised email for this client at this sequence step.
 * @param {Object} clientData - { firstName, email, lastServiceType, lastBookingDate }
 * @param {Object} sequenceStep - config step object
 * @returns {string} full email body as plain text
 */
export function generateSequenceEmail(clientData, sequenceStep) {
  const vars = {
    firstName:       clientData.firstName,
    businessName:    CLIENT_CONFIG.businessName,
    lastService:     clientData.lastServiceType,
    lastVisit:       new Date(clientData.lastBookingDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    offer:           sequenceStep.offerValue ?? '',
  }

  const subject = interpolate(sequenceStep.subject, vars)

  let body = ''

  if (sequenceStep.tone === 'warm_personal') {
    body = `
Hi ${vars.firstName},

It's been a little while since we last saw you — you came in for ${vars.lastService} back in ${vars.lastVisit}.

We wanted to reach out and check in. If there's anything we can help with, we'd love to have you back.

No pressure at all — just wanted you to know the door is always open.

Warm regards,
${vars.businessName}
`.trim()
  }

  if (sequenceStep.tone === 'value_offer') {
    body = `
Hi ${vars.firstName},

We have a little something for you — ${vars.offer || 'a special offer'} on your next visit.

We loved having you as a client and would genuinely love to see you again. This is our way of saying so.

To book: just reply to this email or visit our website.

Warmly,
${vars.businessName}
`.trim()
  }

  if (sequenceStep.tone === 'final_gentle') {
    body = `
Hi ${vars.firstName},

This will be our last message for a while — we do not want to fill your inbox.

If you ever want to come back, we are here. No awkwardness, no questions. Just book whenever you are ready.

Take care,
${vars.businessName}
`.trim()
  }

  return JSON.stringify({ subject, body, to: clientData.email })
}

/**
 * Sends the sequence email for a given step.
 * @param {Object} clientData
 * @param {Object} sequenceStep
 * @returns {Promise<void>}
 */
export async function sendSequenceEmail(clientData, sequenceStep) {
  const email = generateSequenceEmail(clientData, sequenceStep)
  const parsed = JSON.parse(email)

  // CONNECT: Email provider — send email
  // await emailProvider.send({ to: parsed.to, subject: parsed.subject, text: parsed.body })

  console.log(`[04-re-engage][MOCK] Email sent → ${parsed.to}: "${parsed.subject}"`)
}

/**
 * Handles a client's response to a sequence email.
 * @param {string} clientId
 * @param {'booked' | 'replied' | 'unsubscribed'} responseType
 * @returns {Promise<void>}
 */
export async function handleResponse(clientId, responseType) {
  // CONNECT: CRM — update tags based on response

  if (responseType === 'booked' || responseType === 'replied') {
    // await crm.contacts.removeTag(clientId, CLIENT_CONFIG.crm.inSequenceTag)
    // await crm.contacts.addTag(clientId, CLIENT_CONFIG.crm.reEngagedTag)
    console.log(`[04-re-engage] ${clientId} re-engaged (${responseType}) — removed from sequence`)
  }

  if (responseType === 'unsubscribed') {
    // await crm.contacts.removeTag(clientId, CLIENT_CONFIG.crm.inSequenceTag)
    // await crm.contacts.addTag(clientId, CLIENT_CONFIG.crm.suppressedTag)
    console.log(`[04-re-engage] ${clientId} unsubscribed — permanently suppressed`)
  }
}

/**
 * Returns all clients due for a sequence email today.
 * @returns {Promise<Array<{ client: Object, step: Object }>>}
 */
export async function getDailySequenceQueue() {
  // CONNECT: CRM — query all contacts with inSequenceTag + enrollment date
  console.log('[04-re-engage][MOCK] Building daily sequence queue')
  return [] // populated from CRM in production
}

/**
 * Returns re-engagement statistics.
 * @returns {Promise<Object>}
 */
export async function getReEngagementStats() {
  // CONNECT: CRM — query tag counts
  console.log('[04-re-engage][MOCK] Fetching re-engagement stats')
  return {
    currentlyInSequence: 0,
    reEngagedThisMonth:  0,
    suppressedTotal:     0,
    reEngagementRate:    '0%',
  }
}
