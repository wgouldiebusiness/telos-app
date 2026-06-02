# Lead Finder Agent

Searches Google Places for businesses by type and location and writes the new
ones to a Google Sheet, skipping duplicates. Gives William a fresh prospect
list whenever he wants one.

## Setup

1. **Google Cloud project** with the **Places API (New)** enabled. Create an
   API key, set `GOOGLE_PLACES_API_KEY`.
2. **Service account** (same one used for Sheets/Calendar). Set
   `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
3. **A Google Sheet** with a tab named `Leads` and headers in row 1:
   `Name | Address | Phone | Website | Maps URL | Rating | Email | Status`.
   Share the sheet with the service account email (Editor). Set
   `GOOGLE_SHEETS_ID` to the sheet ID from its URL.

## Running it

Trigger a search (internal use, needs the secret):

```
POST https://telosai.co.uk/api/lead-finder
Headers: x-telos-secret: <TELOS_INTERNAL_SECRET>
Body: { "businessType": "physiotherapy clinic", "location": "Manchester" }
```

Or import `findLeads(type, location)` from `./index` in a script or scheduled
job and call it directly.

## Notes

- Dedupe is by business name against column A, so re-running the same search
  only adds genuinely new results.
- An optional enrichment step (visit each website to find a contact email) can
  be added later; the `Email` column is left blank for it to fill.
