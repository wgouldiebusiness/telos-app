/**
 * AGENT 02 — LEAD SCORING + ROUTING
 *
 * Scores every inbound enquiry 0–100 based on source, message
 * keywords, time of day, and contact completeness.
 * Hot leads → owner immediately via SMS + email.
 * Warm leads → timed nurture sequence.
 * Cold leads → logged only.
 */

import { CLIENT_CONFIG } from './config.js'

// ─── UTILITIES ─────────────────────────────────────────────

function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

function isBusinessHours(timestamp) {
  const d = new Date(timestamp)
  const h = d.getHours()
  const day = d.getDay()  // 0 = Sun, 6 = Sat
  return day >= 1 && day <= 5 && h >= 9 && h < 17
}

// ─── MAIN FUNCTIONS ────────────────────────────────────────

/**
 * Scores an inbound enquiry 0–100.
 * @param {Object} enquiryData - { name, email, phone, message, source, timestamp }
 * @returns {number} score 0–100
 */
export function scoreEnquiry(enquiryData) {
  const { scoring } = CLIENT_CONFIG
  let score = 0

  // Source weight
  const sourceScore = scoring.sourceWeights[enquiryData.source?.toLowerCase()] ?? 5
  score += sourceScore

  // Keyword scan of message
  const msg = (enquiryData.message ?? '').toLowerCase()
  for (const [keyword, weight] of Object.entries(scoring.keywordWeights)) {
    if (msg.includes(keyword)) score += weight
  }

  // Time of day
  if (isBusinessHours(enquiryData.timestamp ?? Date.now())) {
    score += scoring.timeWeights.businessHours
  } else {
    const d = new Date(enquiryData.timestamp ?? Date.now())
    if (d.getDay() === 0 || d.getDay() === 6) score += scoring.timeWeights.weekend
  }

  // Phone number provided
  if (enquiryData.phone) score += 10

  // Message length (up to +10 for 200+ chars)
  const msgLength = enquiryData.message?.length ?? 0
  score += Math.min(10, Math.floor(msgLength / 20))

  return Math.min(100, Math.max(0, score))
}

/**
 * Classifies a score into hot / warm / cold.
 * @param {number} score
 * @returns {'hot' | 'warm' | 'cold'}
 */
export function classifyLead(score) {
  if (score >= CLIENT_CONFIG.scoring.hotThreshold)  return 'hot'
  if (score >= CLIENT_CONFIG.scoring.warmThreshold) return 'warm'
  return 'cold'
}

/**
 * Routes a hot lead — immediate SMS + email to owner, CRM tag.
 * @param {Object} enquiryData
 * @param {number} score
 * @returns {Promise<void>}
 */
export async function routeHotLead(enquiryData, score) {
  const smsBody = interpolate(CLIENT_CONFIG.routing.ownerSmsTemplate, {
    name:    enquiryData.name,
    score:   String(score),
    source:  enquiryData.source,
    message: enquiryData.message?.slice(0, 80),
  })

  // CONNECT: Twilio — replace with real SDK call
  // await twilio.messages.create({ body: smsBody, from: ..., to: CLIENT_CONFIG.ownerPhone })
  console.log(`[02-lead][MOCK] Owner SMS: ${smsBody}`)

  // CONNECT: Email provider — send summary email to owner
  console.log(`[02-lead][MOCK] Owner email → ${CLIENT_CONFIG.ownerEmail}: hot lead from ${enquiryData.email}`)

  await logToBoard(enquiryData, score, 'hot')
}

/**
 * Enrolls a warm lead in the nurture email sequence.
 * @param {Object} enquiryData
 * @param {number[]} cadence - days after enquiry to send each email
 * @returns {Promise<void>}
 */
export async function addToNurtureSequence(enquiryData, cadence) {
  const sequence = cadence.map((day, i) => ({
    sendOnDay: day,
    subject:   i === 0
      ? `Thanks for reaching out, ${enquiryData.name?.split(' ')[0]}`
      : i === 1 ? `A quick thought for you`
      : `Still here if you need us`,
    body: `[Personalised follow-up copy for day ${day}]`,
  }))

  // CONNECT: Job queue or email automation platform (ActiveCampaign, Mailchimp, etc.)
  // await emailAutomation.enrollContact({ email: enquiryData.email, sequence })
  console.log(`[02-lead][MOCK] Nurture sequence enrolled for ${enquiryData.email}:`)
  sequence.forEach(s => console.log(`  Day ${s.sendOnDay}: "${s.subject}"`))

  await logToBoard(enquiryData, null, 'warm')
}

/**
 * Logs any enquiry to the CRM regardless of score.
 * @param {Object} enquiryData
 * @param {number|null} score
 * @param {'hot'|'warm'|'cold'} classification
 * @returns {Promise<void>}
 */
export async function logToBoard(enquiryData, score, classification) {
  const tag = CLIENT_CONFIG.crm[`${classification}LeadTag`] ?? 'lead'

  // CONNECT: CRM API — upsert contact + log enquiry
  // await crm.contacts.upsert({ email: enquiryData.email, tags: [tag], properties: { score, source: enquiryData.source } })
  console.log(`[02-lead][MOCK] CRM log: ${enquiryData.email} [${classification}] score=${score} tag=${tag}`)
}

/**
 * Generates a plain-English daily summary email for the owner.
 * @param {Object[]} enquiries - all enquiries from the past 24 hours
 * @returns {string} formatted email body
 */
export function generateDailySummary(enquiries) {
  const scored = enquiries.map(e => ({
    ...e,
    score:          scoreEnquiry(e),
    classification: classifyLead(scoreEnquiry(e)),
  }))

  const total  = scored.length
  const hot    = scored.filter(e => e.classification === 'hot').length
  const warm   = scored.filter(e => e.classification === 'warm').length
  const cold   = scored.filter(e => e.classification === 'cold').length
  const avgScore = total > 0
    ? Math.round(scored.reduce((s, e) => s + e.score, 0) / total)
    : 0

  const sourceCounts = {}
  scored.forEach(e => {
    sourceCounts[e.source] = (sourceCounts[e.source] ?? 0) + 1
  })
  const topSource = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'n/a'

  return `
Daily Lead Summary — ${CLIENT_CONFIG.businessName}
================================================
Total enquiries:   ${total}
Hot leads:         ${hot}
Warm leads:        ${warm}
Cold leads:        ${cold}
Average score:     ${avgScore}/100
Top source:        ${topSource}
`.trim()
}
