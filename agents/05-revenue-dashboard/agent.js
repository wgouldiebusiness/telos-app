/**
 * AGENT 05 — REVENUE REPORTING DASHBOARD
 *
 * Pulls bookings, payments, and cancellations weekly.
 * Calculates key metrics, detects anomalies, and delivers
 * a clean HTML summary email the owner can read in 30 seconds.
 */

import { CLIENT_CONFIG } from './config.js'

const { currencySymbol, currency } = CLIENT_CONFIG.reporting

// ─── UTILITIES ─────────────────────────────────────────────

function fmt(pence) {
  return `${currencySymbol}${(pence / 100).toFixed(2)}`
}

function weekStart(date = new Date()) {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay() + 1) // Monday
  d.setHours(0, 0, 0, 0)
  return d
}

// ─── DATA LAYER ────────────────────────────────────────────

/**
 * Aggregates all bookings, payments, and cancellations for a given week.
 * @param {Date} weekStartDate
 * @returns {Promise<Object>} raw data object
 */
export async function pullWeeklyData(weekStartDate) {
  const start = new Date(weekStartDate)
  const end   = new Date(start)
  end.setDate(end.getDate() + 7)

  // CONNECT: Stripe — list charges for the week
  // const charges = await stripe.charges.list({ created: { gte: start.getTime()/1000, lt: end.getTime()/1000 } })

  // CONNECT: CRM / booking system — list appointments and cancellations for the week
  // const appointments = await bookingSystem.list({ from: start, to: end })

  console.log(`[05-dashboard][MOCK] Pulling data for week of ${start.toDateString()}`)

  // Mock data
  return {
    payments: [
      { id: 'ch_001', amount: 9500, service: 'Consultation',     status: 'succeeded' },
      { id: 'ch_002', amount: 7500, service: 'Follow-up',        status: 'succeeded' },
      { id: 'ch_003', amount: 9500, service: 'Consultation',     status: 'succeeded' },
      { id: 'ch_004', amount: 7500, service: 'Follow-up',        status: 'succeeded' },
    ],
    bookings: [
      { id: 'bk_001', service: 'Consultation', status: 'completed' },
      { id: 'bk_002', service: 'Follow-up',    status: 'completed' },
      { id: 'bk_003', service: 'Consultation', status: 'completed' },
      { id: 'bk_004', service: 'Follow-up',    status: 'completed' },
      { id: 'bk_005', service: 'Consultation', status: 'cancelled' },
    ],
    previousWeekRevenue: 28000,
  }
}

/**
 * Calculates all metrics from raw weekly data.
 * @param {Object} rawData
 * @returns {Object} calculated metrics
 */
export function calculateMetrics(rawData) {
  const cfg     = CLIENT_CONFIG.reporting
  const { payments, bookings, previousWeekRevenue } = rawData

  const totalRevenue    = payments.filter(p => p.status === 'succeeded').reduce((s, p) => s + p.amount, 0)
  const completedCount  = bookings.filter(b => b.status === 'completed').length
  const cancelledCount  = bookings.filter(b => b.status === 'cancelled').length
  const totalCount      = bookings.length
  const cancellationRate = totalCount > 0 ? Math.round((cancelledCount / totalCount) * 100) : 0
  const avgJobValue     = completedCount > 0 ? Math.round(totalRevenue / completedCount) : 0

  const serviceRevenue = {}
  payments.forEach(p => {
    if (p.status === 'succeeded') serviceRevenue[p.service] = (serviceRevenue[p.service] ?? 0) + p.amount
  })
  const topServices = Object.entries(serviceRevenue)
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => ({ name, amount }))

  const weekOnWeekChange = previousWeekRevenue > 0
    ? Math.round(((totalRevenue - previousWeekRevenue) / previousWeekRevenue) * 100)
    : 0

  const revenueVsTarget = cfg.goals.weeklyRevenueTarget > 0
    ? Math.round((totalRevenue / (cfg.goals.weeklyRevenueTarget * 100)) * 100)
    : null

  return {
    totalRevenue, completedCount, cancelledCount, cancellationRate,
    avgJobValue, topServices, weekOnWeekChange, revenueVsTarget,
    weeklyTarget: cfg.goals.weeklyRevenueTarget,
  }
}

/**
 * Generates a structured report object from metrics.
 * @param {Object} metrics
 * @returns {Object} report
 */
export function generateWeeklyReport(metrics) {
  const cfg = CLIENT_CONFIG.reporting
  const report = {}

  if (cfg.includeInReport.totalRevenue)     report.totalRevenue     = fmt(metrics.totalRevenue)
  if (cfg.includeInReport.bookingCount)     report.bookingCount     = metrics.completedCount
  if (cfg.includeInReport.cancellations)    report.cancellations    = `${metrics.cancelledCount} (${metrics.cancellationRate}%)`
  if (cfg.includeInReport.averageJobValue)  report.averageJobValue  = fmt(metrics.avgJobValue)
  if (cfg.includeInReport.topServices)      report.topServices      = metrics.topServices.map(s => `${s.name}: ${fmt(s.amount)}`)
  if (cfg.includeInReport.revenueVsTarget && metrics.revenueVsTarget !== null)
    report.revenueVsTarget = `${metrics.revenueVsTarget}% of ${currencySymbol}${cfg.goals.weeklyRevenueTarget} target`
  if (cfg.includeInReport.weekOnWeekChange)
    report.weekOnWeekChange = `${metrics.weekOnWeekChange >= 0 ? '+' : ''}${metrics.weekOnWeekChange}% vs last week`

  return report
}

/**
 * Formats the report as a clean HTML email.
 * @param {Object} report
 * @param {Object} metrics - needed for summary line
 * @returns {string} HTML email
 */
export function formatReportAsEmail(report, metrics) {
  const change = metrics.weekOnWeekChange
  const summary = change > 5
    ? `Good week — revenue up ${change}% vs last week.`
    : change < -10
    ? `Quiet week — revenue down ${Math.abs(change)}% vs last week.`
    : `Steady week — revenue broadly in line with last week.`

  const rows = Object.entries(report)
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
      const value = Array.isArray(v) ? `<ul>${v.map(i => `<li>${i}</li>`).join('')}</ul>` : v
      return `<tr><td style="padding:8px 16px;color:#666;font-size:14px;">${label}</td><td style="padding:8px 16px;font-weight:600;font-size:14px;">${value}</td></tr>`
    }).join('')

  return `
<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:40px auto;color:#1a1a1a;">
<h2 style="margin:0 0 8px;">${CLIENT_CONFIG.businessName}</h2>
<p style="margin:0 0 24px;color:#666;font-size:14px;">Weekly Report</p>
<p style="background:#f5f5f5;padding:16px;border-radius:8px;margin-bottom:24px;font-weight:500;">${summary}</p>
<table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:8px;overflow:hidden;">
${rows}
</table>
</body></html>`.trim()
}

/**
 * Full weekly report pipeline: pull → calculate → generate → format → send.
 * @returns {Promise<void>}
 */
export async function sendWeeklyReport() {
  const rawData = await pullWeeklyData(weekStart())
  const metrics = calculateMetrics(rawData)
  const report  = generateWeeklyReport(metrics)
  const html    = formatReportAsEmail(report, metrics)

  // CONNECT: Email provider — send HTML email to owner
  // await emailProvider.send({ to: CLIENT_CONFIG.ownerEmail, subject: 'Your weekly report', html })

  console.log(`[05-dashboard][MOCK] Weekly report sent to ${CLIENT_CONFIG.ownerEmail}`)
  console.log(html)
}

/**
 * Live snapshot of the current week so far.
 * @returns {Promise<Object>}
 */
export async function getRealtimeSummary() {
  const raw     = await pullWeeklyData(weekStart())
  const metrics = calculateMetrics(raw)

  return {
    revenueToday:    fmt(0),      // CONNECT: filter payments to today only
    revenueThisWeek: fmt(metrics.totalRevenue),
    bookingsToday:   0,
    bookingsThisWeek: metrics.completedCount,
    nextBooking:     'Fetch from calendar in production',
  }
}

/**
 * Flags anomalies comparing current week to previous week.
 * @param {Object} current  - calculateMetrics result
 * @param {Object} previous - calculateMetrics result
 * @returns {Object[]} array of alert objects
 */
export function identifyAnomaly(current, previous) {
  const { anomalyThresholds } = CLIENT_CONFIG.reporting
  const alerts = []

  if (previous.totalRevenue > 0) {
    const drop = ((previous.totalRevenue - current.totalRevenue) / previous.totalRevenue) * 100
    if (drop > anomalyThresholds.revenueDropPercent) {
      alerts.push({ type: 'revenue_drop', message: `Revenue down ${Math.round(drop)}% vs last week.` })
    }
  }

  if (current.cancellationRate > anomalyThresholds.cancellationRatePercent) {
    alerts.push({ type: 'high_cancellations', message: `Cancellation rate ${current.cancellationRate}% — above threshold.` })
  }

  // CONNECT: Booking system — check timestamp of most recent booking
  // if (hoursSinceLastBooking > anomalyThresholds.noBookingsHours) alerts.push(...)

  if (alerts.length) {
    console.log(`[05-dashboard] ${alerts.length} anomaly alert(s):`, alerts.map(a => a.message))
  }

  return alerts
}
