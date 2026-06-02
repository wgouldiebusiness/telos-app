# Weekly Digest Agent (for William)

Every Monday at 7am, emails William a personal digest: what is booked this week
(from the Telos Google Calendar), portal activity from the last 7 days, and a
one-line AI summary of the week ahead.

## Setup

- `RESEND_API_KEY`, `CRON_SECRET`.
- `GOOGLE_CALENDAR_ID` set to the Telos calendar, shared with the service
  account (read access is enough). If it is not set, the digest still sends with
  portal activity only.
- The Vercel cron (`vercel.json`) runs it Mondays at 07:00.

The recipient is hard-coded to william.gouldsmith@telosai.co.uk in the route.
