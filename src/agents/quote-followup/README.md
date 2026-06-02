# Quote Follow-Up Agent

For trades and service businesses. After a quote is sent, this agent gently
follows up: a nudge at 2 days, a final message at 5 days, and it stops at 10
days (marked cold). It stops immediately if the client responds (status change).

## Setup

1. Run the updated `supabase/schema.sql` (adds the `quotes` table).
2. Add the client to `config.ts` keyed by their `business_id`, with their Twilio
   credentials.
3. The Vercel cron in `vercel.json` already runs this daily at 9am.

## How quotes get in

Insert a row into `quotes` when a quote is sent (from the portal, or the
client's system):

```
{ business_id, client_name, client_phone, amount, status: 'sent' }
```

When the client responds or accepts, set `status` to `responded` or `accepted`
and the agent leaves them alone.

## Security

Protected by `CRON_SECRET` (Vercel sends it as a Bearer token). Manual runs need
the same header.
