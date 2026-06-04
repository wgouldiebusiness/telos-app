# Agent 04 — Automated Re-Engagement Pipeline

## What it does

Runs daily, detects clients who haven't booked in 6 weeks (configurable), and sends a 3-email sequence to bring them back:

1. **Day 0** — Warm, personal check-in mentioning their last service
2. **Day 5** — Value offer (discount, bonus session, or gift — set per client)
3. **Day 12** — Final gentle nudge, then suppressed to avoid spam

As soon as the client books or replies, they are removed from the sequence and tagged as re-engaged. Unsubscribers are permanently suppressed.

The owner gets stats on request: how many are in sequence, how many re-engaged this month, and re-engagement rate.

## Config values to fill in per client

| Key | Description |
|-----|-------------|
| `ownerEmail` | For stat reports |
| `reEngagement.inactivityThresholdDays` | Days without booking before flagging (default: 42) |
| `reEngagement.maxSequenceAttempts` | Emails before suppressing (default: 3) |
| `reEngagement.sequence[1].offerValue` | The actual offer text, e.g. "10% off your next session" |
| `crm.apiKey` | CRM API key |
| `crm.reEngagedTag` | CRM tag applied when client re-engages |
| `crm.suppressedTag` | CRM tag applied when client unsubscribes |

## External services to connect

- **CRM** — to query inactive clients, update tags, and record enrollment
- **Email provider** — to send the sequence emails
- **Job queue / cron** — to run the daily scan and send scheduled emails
- **Email webhook** — to detect replies and unsubscribes (`handleResponse`)

## How to deploy for a new client

1. Copy this folder
2. Fill in `config.js` — especially `offerValue` and the inactivity threshold
3. Set up a daily cron to call `scanForInactiveClients` → `enrollInSequence`
4. Set up a daily cron to call `getDailySequenceQueue` and send due emails
5. Wire `handleResponse` to your email platform's reply/unsubscribe webhook
