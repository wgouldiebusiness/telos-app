# Review Request Agent

After a job or appointment is completed, this agent texts the customer a
friendly message with the client's Google review link. More reviews, on
autopilot.

## How it is wired (per client)

1. Add the client to `config.ts` with their Twilio credentials, business name,
   and Google review URL.
2. Trigger it when a job completes by POSTing to `/api/review-request`:
   ```
   POST https://telosai.co.uk/api/review-request
   Headers: x-telos-secret: <TELOS_INTERNAL_SECRET>
   Body: { "clientId": "acme-clinic", "customerName": "Jane", "customerPhone": "+447700900123" }
   ```
   This call comes from the Telos portal or the client's CRM, never from a
   public page.

## Security

- The endpoint requires the `x-telos-secret` header to match the
  `TELOS_INTERNAL_SECRET` environment variable. Without it, every request is
  rejected with 401, so the public cannot trigger SMS sends.
- One ask per customer per client (dedupe), so nobody is pestered twice.

## The 2-hour delay

The spec calls for waiting ~2 hours after job completion before texting. In a
serverless environment a real delay needs a scheduled job, not an in-process
timer. Recommended production setup:

- On trigger, insert a row into a `review_queue` table (Supabase) with a
  `send_after` timestamp.
- A Vercel cron (e.g. every 15 minutes) hits a protected
  `/api/cron/review-queue` route that sends any due messages.

The current endpoint sends immediately on trigger, which is correct behaviour
once you call it 2 hours after completion (e.g. schedule the trigger itself).

## Environment variables

```
TELOS_INTERNAL_SECRET=   # long random string; also set on whatever calls this
```
