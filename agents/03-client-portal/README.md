# Agent 03 — Client Portal

## What it does

A secure, branded self-service portal for clients. They log in via a magic link (no passwords to forget), then see:

- All upcoming and past appointments
- Outstanding and paid invoices with payment links
- Documents the owner has shared (contracts, guides, forms)
- A message box to contact the owner directly

Clients can cancel appointments within the configured notice window. Everything is real-time from the connected CRM and booking system.

## Config values to fill in per client

| Key | Description |
|-----|-------------|
| `businessName` | Shown in welcome message and portal title |
| `logoUrl` | Displayed in the portal header |
| `primaryColour` | Brand colour for portal styling |
| `portal.loginMethod` | `magic_link` (recommended), `password`, or `google` |
| `portal.sessionDurationHours` | How long a login session lasts (default: 72) |
| `portal.allowClientCancellation` | Whether clients can cancel themselves |
| `portal.cancellationWindowHours` | Minimum notice required to cancel |
| `features.*` | Toggle which sections appear in the portal |
| `branding.welcomeMessage` | Personalised welcome text |
| `email.fromAddress` | Magic link sender email |
| `crm.apiKey` | CRM API key |

## External services to connect

- **CRM** — to fetch client records, appointments, invoices, and documents
- **Email provider** — for magic link emails
- **Redis or DB** — to store/validate tokens (replace the in-memory Map in production)
- **Booking system** — Calendly, Jane App, Cliniko, etc.
- **Stripe** — for invoice payment links
- **Storage** — S3 or Google Drive for shared documents

## How to deploy for a new client

1. Copy this folder
2. Fill in `config.js`
3. Replace the in-memory token store with Redis or a DB table
4. Connect the CRM and booking system in the fetch functions
5. Build a minimal React/HTML frontend that calls these backend functions
6. Host on Vercel or your preferred platform
