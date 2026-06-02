// ─────────────────────────────────────────────────────────────
// Lead Finder — searches Google Places for businesses by type and
// location, then writes new leads to a Google Sheet (skipping duplicates).
//
// Env vars:
//   GOOGLE_PLACES_API_KEY
//   GOOGLE_SHEETS_ID
//   GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
//
// Run from a cron route, the admin panel, or a script. Sheet columns:
//   A Name | B Address | C Phone | D Website | E Maps URL | F Rating | G Email | H Status
// ─────────────────────────────────────────────────────────────

import { readSheet, appendRow } from '@/agents/shared/sheets'

const SHEET_RANGE = 'Leads!A:H'

interface PlaceLead {
  name: string
  address: string
  phone: string
  website: string
  mapsUrl: string
  rating: string
}

// Uses the Places API "Text Search" (v1).
async function searchPlaces(query: string): Promise<PlaceLead[]> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key) {
    console.error('[lead-finder] GOOGLE_PLACES_API_KEY not set')
    return []
  }

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask':
        'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.rating',
    },
    body: JSON.stringify({ textQuery: query, maxResultCount: 20 }),
  })

  if (!res.ok) {
    console.error(`[lead-finder] Places error ${res.status}: ${await res.text()}`)
    return []
  }

  const data = (await res.json()) as {
    places?: Array<{
      displayName?: { text?: string }
      formattedAddress?: string
      nationalPhoneNumber?: string
      websiteUri?: string
      googleMapsUri?: string
      rating?: number
    }>
  }

  return (data.places ?? []).map(p => ({
    name: p.displayName?.text ?? '',
    address: p.formattedAddress ?? '',
    phone: p.nationalPhoneNumber ?? '',
    website: p.websiteUri ?? '',
    mapsUrl: p.googleMapsUri ?? '',
    rating: p.rating != null ? String(p.rating) : '',
  }))
}

/**
 * Find leads for a business type + location and append the new ones to the
 * sheet. Returns how many new leads were added.
 */
export async function findLeads(businessType: string, location: string): Promise<number> {
  const sheetId = process.env.GOOGLE_SHEETS_ID
  if (!sheetId) {
    console.error('[lead-finder] GOOGLE_SHEETS_ID not set')
    return 0
  }

  const results = await searchPlaces(`${businessType} in ${location}`)
  if (!results.length) return 0

  // Dedupe against names already in the sheet (column A).
  const existing = await readSheet(sheetId, 'Leads!A:A')
  const seen = new Set(existing.flat().map(n => n.trim().toLowerCase()))

  let added = 0
  for (const lead of results) {
    if (!lead.name || seen.has(lead.name.trim().toLowerCase())) continue
    const ok = await appendRow(sheetId, SHEET_RANGE, [
      lead.name, lead.address, lead.phone, lead.website, lead.mapsUrl, lead.rating, '', 'new',
    ])
    if (ok) {
      seen.add(lead.name.trim().toLowerCase())
      added++
    }
  }

  console.log(`[lead-finder] added ${added} new leads for "${businessType} in ${location}"`)
  return added
}
