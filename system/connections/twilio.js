/**
 * TWILIO — SMS and call helpers used by agents.
 */

/**
 * Sends an SMS message.
 * @param {string} to - E.164 phone number
 * @param {string} body - message text
 * @param {string} from - Twilio number from config
 * @returns {Promise<{ success: boolean, sid: string|null }>}
 */
export async function sendSms(to, body, from) {
  // CONNECT: Twilio — replace with real SDK
  // const twilio = require('twilio')(accountSid, authToken)
  // const msg = await twilio.messages.create({ to, from, body })
  // return { success: true, sid: msg.sid }

  console.log(`[twilio][MOCK] SMS → ${to}: "${body.slice(0, 60)}${body.length > 60 ? '...' : ''}"`)
  return { success: true, sid: `mock_SM_${Date.now()}` }
}

/**
 * Sends a WhatsApp message via Twilio.
 * @param {string} to - E.164 phone number (will be prefixed with whatsapp:)
 * @param {string} body
 * @returns {Promise<{ success: boolean }>}
 */
export async function sendWhatsApp(to, body) {
  // CONNECT: Twilio WhatsApp sandbox or approved number
  console.log(`[twilio][MOCK] WhatsApp → ${to}: "${body.slice(0, 60)}"`)
  return { success: true }
}
