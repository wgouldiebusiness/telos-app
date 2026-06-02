# Monthly Report Agent

On the 1st of each month, generates a short plain-English performance report
for every active client, emails it to the owner, and posts it to their portal
activity feed.

## Setup

1. Supabase schema must be live (uses existing `businesses`, `metrics`,
   `activity_log` tables). A business must have `status = 'active'` and a
   `metrics` row for the previous month.
2. Set `RESEND_API_KEY` and `CRON_SECRET`. The Vercel cron runs at 08:00 on
   the 1st.

## Notes

- If there is no metrics row for last month, that client is skipped (no empty
  reports).
- The summary is written by Claude with strict rules: positive, honest, never
  invents numbers, max 150 words.
