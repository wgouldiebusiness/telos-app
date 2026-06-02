# Invoice Chaser Agent

Reads unpaid invoices and emails the customer a reminder, written by Claude in
the business owner's voice. Reminder 1 at 3 days overdue, reminder 2 at 10 days,
a final notice at 21 days (then marked escalated). Firm but polite, never
aggressive.

## Setup

1. Run the updated `supabase/schema.sql` (adds the `invoices` table).
2. Add the client to `config.ts` keyed by `business_id`, with their business
   name, owner name, tone, and a `fromEmail` (verified in Resend).
3. Set `RESEND_API_KEY`. The Vercel cron runs this daily at 9am.

## How invoices get in

Insert a row when an invoice is raised:

```
{ business_id, client_name, client_email, amount, due_date, status: 'unpaid' }
```

Mark `status: 'paid'` when paid and the agent stops chasing it.

## Security

Protected by `CRON_SECRET`. Each reminder stage is sent once (tracked by the
`reminder_*_sent_at` / `final_notice_sent_at` columns).
