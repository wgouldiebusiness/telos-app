# Agent 02 — Lead Scoring + Routing

## What it does

Every inbound enquiry is scored 0–100 the moment it arrives. Based on the score:

- **Hot (70+)** — Owner gets an SMS and email immediately with the lead summary
- **Warm (40–69)** — Lead enrolled in a timed nurture email sequence
- **Cold (<40)** — Logged in CRM only, no active follow-up

Scoring factors: traffic source, keywords in the message, time of day, whether a phone number was given, and message length. Every weight is configurable per client.

A daily summary email goes to the owner each morning.

## Config values to fill in per client

| Key | Description |
|-----|-------------|
| `ownerEmail` | Daily summary and hot-lead email destination |
| `ownerPhone` | SMS for hot leads (E.164 format) |
| `scoring.hotThreshold` | Score above this = hot (default 70) |
| `scoring.warmThreshold` | Score above this = warm (default 40) |
| `scoring.sourceWeights` | Points per traffic source — adjust per client's main channels |
| `scoring.keywordWeights` | Points per intent keyword |
| `routing.nurtureCadence` | Days after enquiry to send nurture emails (e.g. [1, 3, 7, 14]) |
| `crm.apiKey` | CRM API key |

## External services to connect

- **CRM** — HubSpot, Airtable, or Notion for logging and tagging
- **Twilio** — SMS to owner for hot leads
- **Email provider** — for owner alerts and nurture sequences
- **Email automation** — ActiveCampaign / Mailchimp / ConvertKit for sequences

## How to deploy for a new client

1. Copy this folder
2. Fill in `config.js` — pay particular attention to `sourceWeights` based on where this client's leads come from
3. Wire `scoreEnquiry` → `classifyLead` → route to the appropriate handler to your contact form or CRM webhook
4. Set up a daily cron to call `generateDailySummary`
