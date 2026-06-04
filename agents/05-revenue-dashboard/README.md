# Agent 05 — Revenue Reporting Dashboard

## What it does

Every Monday morning at 08:00, the owner gets a clean HTML email with the previous week's numbers:

- Total revenue
- Completed booking count
- Cancellations and cancellation rate
- Average job value
- Top-performing services by revenue
- Revenue vs weekly target
- Week-on-week change vs last week

If anything looks unusual — revenue dropped sharply, cancellation rate spiked, no bookings in 48 hours — it flags the anomaly in the summary line.

There is also a `getRealtimeSummary` function to power a live dashboard widget showing today's and this week's numbers on demand.

## Config values to fill in per client

| Key | Description |
|-----|-------------|
| `ownerEmail` | Where the weekly report goes |
| `reporting.weeklyReportDay` | Day to send (default: `monday`) |
| `reporting.weeklyReportTime` | Time to send (default: `08:00`) |
| `reporting.timezone` | Client's local timezone |
| `reporting.currencySymbol` | Display currency (default: `£`) |
| `reporting.goals.weeklyRevenueTarget` | Target revenue per week in pounds (e.g. 2000) |
| `reporting.goals.monthlyRevenueTarget` | Monthly target in pounds |
| `reporting.goals.targetBookingsPerWeek` | Booking count target |
| `reporting.includeInReport.*` | Toggle which metrics appear in the email |
| `reporting.anomalyThresholds.*` | Thresholds for alerts |
| `stripe.secretKey` | Stripe secret key |
| `crm.apiKey` | CRM API key |

## External services to connect

- **Stripe** — to pull payment data for the week
- **CRM / booking system** — to pull appointment and cancellation data
- **Email provider** — to send the formatted HTML report
- **Cron scheduler** — to run `sendWeeklyReport` on schedule

## How to deploy for a new client

1. Copy this folder
2. Fill in `config.js` — especially the revenue targets
3. Connect `pullWeeklyData` to their Stripe account and booking system
4. Set up a weekly cron calling `sendWeeklyReport`
5. Optional: expose `getRealtimeSummary` as an API endpoint for a live dashboard
