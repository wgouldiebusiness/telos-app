/**
 * TELOS AI — AGENT LIBRARY
 * ─────────────────────────────────────────────────────────────
 *
 * Five pre-built, client-ready agent modules.
 * Each one follows the same pattern:
 *
 *   config.js  — ALL client-specific values in one place.
 *                When onboarding a new client, only touch this file.
 *
 *   agent.js   — All logic. Imports from config.js only.
 *                Zero hardcoded client values.
 *
 *   README.md  — Plain-English guide, config checklist,
 *                and list of external services to wire up.
 *
 * ─────────────────────────────────────────────────────────────
 * HOW TO DEPLOY AN AGENT FOR A NEW CLIENT
 * ─────────────────────────────────────────────────────────────
 * 1. Copy the agent folder:
 *      cp -r agents/01-booking-payment clients/[client-slug]/booking
 *
 * 2. Fill in config.js with the client's details
 *    (business name, API keys, email, phone, targets).
 *
 * 3. Replace every // CONNECT: comment in agent.js with a real
 *    SDK call to the appropriate service (Stripe, Twilio, etc.).
 *
 * 4. Set environment variables for all secrets — never commit keys.
 *
 * 5. Wire the agent functions to your API routes or cron jobs.
 *
 * 6. Test with the mock mode first, then switch to live keys.
 * ─────────────────────────────────────────────────────────────
 */

export { handleBookingRequest, createStripePaymentIntent, onPaymentSuccess, addClientToCRM, sendConfirmationEmail, sendOwnerNotification, scheduleReminder, addToCalendar }
  from './01-booking-payment/agent.js'

export { scoreEnquiry, classifyLead, routeHotLead, addToNurtureSequence, logToBoard, generateDailySummary }
  from './02-lead-scoring/agent.js'

export { requestMagicLink, verifyToken, getClientDashboard, getAppointments, getInvoices, getDocuments, requestCancellation, sendOwnerMessage }
  from './03-client-portal/agent.js'

export { scanForInactiveClients, enrollInSequence, generateSequenceEmail, sendSequenceEmail, handleResponse, getDailySequenceQueue, getReEngagementStats }
  from './04-re-engagement/agent.js'

export { pullWeeklyData, calculateMetrics, generateWeeklyReport, formatReportAsEmail, sendWeeklyReport, getRealtimeSummary, identifyAnomaly }
  from './05-revenue-dashboard/agent.js'

/**
 * AGENTS DIRECTORY
 *
 * 01-booking-payment  Booking form → Stripe deposit → CRM → email → calendar
 * 02-lead-scoring     Score enquiries, route hot leads, nurture warm leads
 * 03-client-portal    Magic-link portal: appointments, invoices, documents
 * 04-re-engagement    Detect lapsed clients, 3-email re-engagement sequence
 * 05-revenue-dashboard Weekly revenue report + anomaly detection
 */
