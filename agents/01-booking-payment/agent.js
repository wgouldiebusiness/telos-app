/**
 * AGENT 01 — BOOKING + PAYMENT BACKEND
 *
 * One-flow booking system: form submission → Stripe deposit →
 * confirmation email → CRM entry → owner notification →
 * reminder scheduled → calendar event created.
 *
 * All client-specific values come from config.js.
 * Third-party calls are mocked with clear CONNECT comments.
 */

import { CLIENT_CONFIG } from './config.js'

// ─── UTILITIES ─────────────────────────────────────────────

function generateRef() {
  return `BK-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

// ─── MAIN FUNCTIONS ────────────────────────────────────────

/**
 * Entry point. Validates inbound booking form data.
 * @param {Object} bookingData - { name, email, phone, service, dateTime, price }
 * @returns {{ valid: boolean, ref: string, errors: string[] }}
 */
export function handleBookingRequest(bookingData) {
  const required = ['name', 'email', 'phone', 'service', 'dateTime', 'price']
  const errors = required.filter(f => !bookingData[f])

  if (errors.length) {
    return { valid: false, ref: null, errors: errors.map(f => `${f} is required`) }
  }

  const ref = generateRef()
  console.log(`[01-booking] New booking request ${ref} for ${bookingData.name}`)
  return { valid: true, ref, errors: [] }
}

/**
 * Creates a Stripe PaymentIntent for the deposit amount.
 * @param {number} totalAmount - in pence/cents
 * @param {string} customerEmail
 * @param {string} bookingRef
 * @returns {Promise<{ clientSecret: string, paymentIntentId: string }>}
 */
export async function createStripePaymentIntent(totalAmount, customerEmail, bookingRef) {
  const depositAmount = Math.round(totalAmount * (CLIENT_CONFIG.stripe.defaultDepositPercent / 100))

  // CONNECT: Stripe — replace with real Stripe SDK call
  // const stripe = require('stripe')(CLIENT_CONFIG.stripe.secretKey)
  // const intent = await stripe.paymentIntents.create({
  //   amount:   depositAmount,
  //   currency: CLIENT_CONFIG.stripe.currency,
  //   metadata: { bookingRef, customerEmail },
  // })
  // return { clientSecret: intent.client_secret, paymentIntentId: intent.id }

  console.log(`[01-booking][MOCK] Stripe PaymentIntent: £${(depositAmount / 100).toFixed(2)} for ${customerEmail}`)
  return {
    clientSecret:    `mock_secret_${bookingRef}`,
    paymentIntentId: `mock_pi_${bookingRef}`,
  }
}

/**
 * Stripe webhook handler. Called when payment is confirmed.
 * Orchestrates all downstream actions in sequence.
 * @param {Object} stripeEvent - raw Stripe webhook event
 * @returns {Promise<void>}
 */
export async function onPaymentSuccess(stripeEvent) {
  // CONNECT: Stripe — verify webhook signature before processing
  // stripe.webhooks.constructEvent(payload, sig, CLIENT_CONFIG.stripe.webhookSecret)

  const { bookingRef, customerEmail } = stripeEvent?.data?.object?.metadata ?? {}
  console.log(`[01-booking] Payment confirmed for ${bookingRef}`)

  // In production these would be queued jobs, not sequential awaits
  const clientData  = { email: customerEmail, name: 'From CRM Lookup' }
  const bookingData = { ref: bookingRef }

  await addClientToCRM(clientData, bookingData)
  await sendConfirmationEmail(clientData, bookingData)
  await sendOwnerNotification(bookingData)
  await scheduleReminder(clientData, bookingData)
  await addToCalendar(bookingData)
}

/**
 * Adds or updates the client in the configured CRM.
 * Tags them as 'active client'.
 * @param {Object} clientData - { name, email, phone }
 * @param {Object} bookingData - { ref, service, dateTime, price }
 * @returns {Promise<{ crmContactId: string }>}
 */
export async function addClientToCRM(clientData, bookingData) {
  // CONNECT: HubSpot — replace with real SDK call
  // const hubspot = require('@hubspot/api-client')
  // const client = new hubspot.Client({ accessToken: CLIENT_CONFIG.crm.apiKey })
  // Upsert contact, add deal to pipeline, tag as active client

  console.log(`[01-booking][MOCK] CRM upsert: ${clientData.email} — booking ${bookingData.ref}`)
  return { crmContactId: `mock_contact_${Date.now()}` }
}

/**
 * Sends a branded confirmation email to the client.
 * @param {Object} clientData - { name, email }
 * @param {Object} bookingData - { ref, service, dateTime }
 * @returns {Promise<void>}
 */
export async function sendConfirmationEmail(clientData, bookingData) {
  const subject = interpolate(CLIENT_CONFIG.notifications.confirmationSubject, {
    businessName: CLIENT_CONFIG.businessName,
  })

  // CONNECT: Email provider (SendGrid / Resend / Postmark)
  // await sendgrid.send({
  //   to:      clientData.email,
  //   from:    CLIENT_CONFIG.ownerEmail,
  //   subject,
  //   html:    buildConfirmationHtml(clientData, bookingData),
  // })

  console.log(`[01-booking][MOCK] Confirmation email → ${clientData.email}: "${subject}"`)
}

/**
 * Notifies the owner immediately via email and optional SMS.
 * @param {Object} bookingData - { ref, service, dateTime, clientName }
 * @returns {Promise<void>}
 */
export async function sendOwnerNotification(bookingData) {
  // CONNECT: Email provider — same as above
  console.log(`[01-booking][MOCK] Owner email → ${CLIENT_CONFIG.ownerEmail}: new booking ${bookingData.ref}`)

  if (CLIENT_CONFIG.notifications.sendOwnerSms) {
    // CONNECT: Twilio — replace with real Twilio SDK call
    // const twilio = require('twilio')(accountSid, authToken)
    // await twilio.messages.create({
    //   body: `New booking ${bookingData.ref}: ${bookingData.service} — ${bookingData.clientName}`,
    //   from: CLIENT_CONFIG.notifications.twilioFrom,
    //   to:   CLIENT_CONFIG.ownerPhone,
    // })

    console.log(`[01-booking][MOCK] Owner SMS → ${CLIENT_CONFIG.ownerPhone}`)
  }
}

/**
 * Schedules a reminder to the client before their appointment.
 * @param {Object} clientData - { name, email, phone }
 * @param {Object} bookingData - { ref, service, dateTime }
 * @returns {Promise<void>}
 */
export async function scheduleReminder(clientData, bookingData) {
  const hoursBeforeMs = CLIENT_CONFIG.notifications.reminderHoursBefore * 60 * 60 * 1000
  const appointmentTs = new Date(bookingData.dateTime).getTime()
  const sendAt        = new Date(appointmentTs - hoursBeforeMs).toISOString()

  // CONNECT: Job queue (BullMQ / Inngest / Trigger.dev)
  // await queue.add('send-reminder', { clientData, bookingData }, { delay: ..., jobId: bookingData.ref })

  console.log(`[01-booking][MOCK] Reminder scheduled for ${sendAt} → ${clientData.email}`)
}

/**
 * Creates a calendar event in the owner's connected calendar.
 * @param {Object} bookingData - { ref, service, dateTime, clientName, clientPhone }
 * @returns {Promise<{ eventId: string }>}
 */
export async function addToCalendar(bookingData) {
  // CONNECT: Google Calendar
  // const { google } = require('googleapis')
  // const calendar = google.calendar({ version: 'v3', auth })
  // await calendar.events.insert({
  //   calendarId: CLIENT_CONFIG.calendar.calendarId,
  //   resource: {
  //     summary:  `${bookingData.service} — ${bookingData.clientName}`,
  //     start:    { dateTime: bookingData.dateTime, timeZone: CLIENT_CONFIG.calendar.timezone },
  //     end:      { dateTime: ..., timeZone: CLIENT_CONFIG.calendar.timezone },
  //     description: `Booking ref: ${bookingData.ref}\nPhone: ${bookingData.clientPhone}`,
  //   }
  // })

  console.log(`[01-booking][MOCK] Calendar event created for ${bookingData.dateTime}`)
  return { eventId: `mock_event_${bookingData.ref}` }
}
