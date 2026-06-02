# Email Outreach Agent

Reads the lead list produced by the Lead Finder, writes a personalised cold
email draft for each new lead (in William's voice), and saves it back to the
sheet for review. Nothing is ever sent automatically.

## Setup

- Uses the same Google Sheet and service account as the Lead Finder. The sheet
  needs an `Email Draft` column (column I).
- `ANTHROPIC_API_KEY` and `TELOS_INTERNAL_SECRET`.

## Run it

```
POST https://telosai.co.uk/api/outreach
Headers: x-telos-secret: <TELOS_INTERNAL_SECRET>
```

It fills column I with a draft and sets column H (Status) to "draft ready" for
every lead that does not already have a draft. William reviews them in the sheet
and sends the ones he likes.

## Next step (optional)

A review queue UI in the admin panel can list "draft ready" rows with Approve
and Send buttons (send via the shared `email.ts` Resend wrapper, then mark the
row "sent"). The data and draft generation are in place for that.
