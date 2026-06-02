# Missed-Call Recovery Agent

When a call to a client's Twilio number goes unanswered, this agent texts the
caller within seconds with a friendly message and a booking link, so the lead
is not lost.

## How it is wired (per client)

1. **The client gets a Twilio number** (their own account, or a subaccount
   under the Telos master account).
2. **Add the client to `config.ts`** with their Twilio credentials, business
   name, agent name, booking URL, and cooldown.
3. **Point the Twilio number's "Call Status Changes" webhook** at:
   ```
   https://telosai.co.uk/api/missed-call/<clientId>
   ```
   (Twilio Console → Phone Numbers → the number → Voice / Call status callback,
   method POST.)

That is it. One endpoint serves every client; the `clientId` in the URL selects
the config.

## Security

- Every request is verified with `validateTwilioSignature` against the client's
  auth token. Unsigned or forged requests get a 403, so the endpoint cannot be
  abused to send messages.
- A per-caller cooldown (default 24h) prevents repeat-texting the same number.

## Notes for production

- The cooldown map is in-memory and resets on cold start. For durable cooldown
  across serverless instances, move `lastMessaged` to Supabase or Upstash Redis.
- Never commit real Twilio credentials. Load them from environment variables or
  Supabase, referenced from `config.ts`.
