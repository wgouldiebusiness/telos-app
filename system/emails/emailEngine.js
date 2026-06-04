/**
 * EMAIL ENGINE — sends, queues, and cancels emails.
 * All emails are logged. Branding can be overridden per send.
 */

import { EMAIL_CONFIG } from './config.js'
import { welcome }            from './templates/welcome.js'
import { passwordReset }      from './templates/passwordReset.js'
import { magicLink }          from './templates/magicLink.js'
import { securityAlert }      from './templates/securityAlert.js'
import { accountInvite }      from './templates/accountInvite.js'
import { agentConnected }     from './templates/agentConnected.js'
import { masterNotification } from './templates/masterNotification.js'

const templates = { welcome, passwordReset, magicLink, securityAlert, accountInvite, agentConnected, masterNotification }

// In-memory stores — replace with DB/queue in production
const emailLog   = []
const emailQueue = new Map()

function getBranding(override) {
  if (!override) return EMAIL_CONFIG.branding
  return { ...EMAIL_CONFIG.branding, ...override }
}

// ─── SEND ──────────────────────────────────────────────────

/**
 * Sends a single email via the configured provider.
 * @param {string} to - recipient email address
 * @param {string} templateName - key matching a template function
 * @param {Object} variables - template interpolation values
 * @param {Object|null} brandingOverride - replaces default Telos branding
 * @returns {Promise<{ success: boolean, messageId: string|null }>}
 */
export async function sendEmail(to, templateName, variables = {}, brandingOverride = null) {
  const templateFn = templates[templateName]
  if (!templateFn) {
    console.error(`[email] Unknown template: ${templateName}`)
    return { success: false, messageId: null }
  }

  const branding = getBranding(brandingOverride)
  const { subject, html, text } = templateFn(variables, branding)

  // CONNECT: SendGrid — replace with real SDK call
  // const sgMail = require('@sendgrid/mail')
  // sgMail.setApiKey(EMAIL_CONFIG.apiKey)
  // const [res] = await sgMail.send({
  //   to,
  //   from: { email: EMAIL_CONFIG.fromAddress, name: EMAIL_CONFIG.fromName },
  //   replyTo: EMAIL_CONFIG.replyTo,
  //   subject,
  //   html,
  //   text,
  // })
  // const messageId = res.headers['x-message-id']

  const messageId = `mock_msg_${Date.now()}`
  emailLog.push({ to, templateName, variables, subject, sentAt: new Date().toISOString(), messageId, success: true })
  console.log(`[email][MOCK] → ${to} | ${templateName} | "${subject}"`)

  return { success: true, messageId }
}

/**
 * Sends personalised emails to multiple recipients.
 * Throttled to 10/sec to respect provider rate limits.
 * @param {string[]} recipients
 * @param {string} templateName
 * @param {Object[]} variablesArray - one object per recipient, same order
 * @param {Object|null} brandingOverride
 * @returns {Promise<{ sent: number, failed: number }>}
 */
export async function sendBulk(recipients, templateName, variablesArray, brandingOverride = null) {
  let sent = 0, failed = 0
  for (let i = 0; i < recipients.length; i++) {
    const result = await sendEmail(recipients[i], templateName, variablesArray[i] ?? {}, brandingOverride)
    result.success ? sent++ : failed++
    // Throttle: 100ms between sends to avoid rate limits
    if (i < recipients.length - 1) await new Promise(r => setTimeout(r, 100))
  }
  return { sent, failed }
}

/**
 * Schedules an email for future delivery.
 * @param {string} to
 * @param {string} templateName
 * @param {Object} variables
 * @param {string} sendAt - ISO timestamp
 * @param {Object|null} brandingOverride
 * @returns {string} emailQueueId
 */
export function queueEmail(to, templateName, variables, sendAt, brandingOverride = null) {
  const queueId = `q_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  emailQueue.set(queueId, { to, templateName, variables, sendAt, brandingOverride, status: 'queued' })
  // CONNECT: Job queue (BullMQ / Inngest) — schedule job for sendAt
  console.log(`[email] Queued ${queueId} → ${to} [${templateName}] at ${sendAt}`)
  return queueId
}

/**
 * Cancels a queued email before it sends.
 * @param {string} emailQueueId
 * @returns {{ success: boolean }}
 */
export function cancelQueuedEmail(emailQueueId) {
  const entry = emailQueue.get(emailQueueId)
  if (!entry || entry.status !== 'queued') return { success: false }
  entry.status = 'cancelled'
  // CONNECT: Job queue — cancel the scheduled job
  console.log(`[email] Cancelled queued email ${emailQueueId}`)
  return { success: true }
}

/**
 * Returns all emails sent to or about an account.
 * @param {string} accountId
 * @returns {Object[]}
 */
export function getEmailHistory(accountId) {
  // CONNECT: DB — query email_log by accountId
  return emailLog.filter(e => e.variables?.accountId === accountId || e.to.includes(accountId))
}
