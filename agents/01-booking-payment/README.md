# Agent 01 — Booking + Payment Backend

## What it does

Handles the full journey from booking form submission to confirmed appointment with zero manual steps:

1. Client submits a booking form
2. Stripe PaymentIntent created for the deposit
3. Client completes payment on the frontend
4. Stripe webhook fires → Telos receives confirmation
5. Client added/updated in CRM, tagged as active
6. Confirmation email sent to client with booking details
7. Owner notified by email (and SMS if configured)
8. Reminder scheduled to fire 24 hours before appointment
9. Calendar event created in owner's calendar

## Config values to fill in per client

| Key | Description |
|-----|-------------|
| `businessName` | Displayed in emails and notifications |
| `logoUrl` | Used in branded email templates |
| `primaryColour` | Brand colour for email styling |
| `ownerEmail` | Where owner notifications go |
| `ownerPhone` | Owner's mobile for SMS alerts (E.164 format) |
| `stripe.secretKey` | Stripe secret key from client's Stripe dashboard |
| `stripe.webhookSecret` | From Stripe webhook settings |
| `stripe.defaultDepositPercent` | % charged at booking (e.g. 25 = 25%) |
| `crm.provider` | `hubspot`, `airtable`, or `notion` |
| `crm.apiKey` | CRM API key |
| `crm.pipelineId` | Pipeline/board to add bookings to |
| `notifications.reminderHoursBefore` | How early to send the reminder (default: 24) |
| `notifications.twilioFrom` | Twilio number for owner SMS |
| `calendar.calendarId` | Google Calendar ID |
| `calendar.timezone` | Client's timezone |

## External services to connect

- **Stripe** — payments and webhooks (`npm install stripe`)
- **Twilio** — SMS to owner (`npm install twilio`)
- **Email provider** — SendGrid / Resend / Postmark
- **CRM** — HubSpot, Airtable, or Notion SDK
- **Google Calendar** — `npm install googleapis`
- **Job queue** — BullMQ / Inngest for scheduled reminders

## How to deploy for a new client

1. Copy this folder: `cp -r agents/01-booking-payment clients/[client-name]/booking`
2. Fill in `config.js` with client details
3. Replace all `// CONNECT:` mock functions with real SDK calls
4. Set environment variables for all secret keys
5. Wire `handleBookingRequest` to the booking form endpoint
6. Wire `onPaymentSuccess` to the Stripe webhook endpoint
