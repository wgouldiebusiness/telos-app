// ─────────────────────────────────────────────────────────────
// Google Sheets wrapper — read, append, and update rows via the Sheets
// REST API using the shared service-account token. No SDK.
//
// Share the target spreadsheet with GOOGLE_SERVICE_ACCOUNT_EMAIL (Editor).
// ─────────────────────────────────────────────────────────────

import { getGoogleAccessToken, SCOPE_SHEETS } from './google'

const BASE = 'https://sheets.googleapis.com/v4/spreadsheets'

/** Read a range, e.g. "Leads!A1:H". Returns rows as string arrays. */
export async function readSheet(spreadsheetId: string, range: string): Promise<string[][]> {
  const token = await getGoogleAccessToken([SCOPE_SHEETS])
  if (!token) return []

  const res = await fetch(`${BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    console.error(`[sheets] read failed ${res.status}: ${await res.text()}`)
    return []
  }
  const data = (await res.json()) as { values?: string[][] }
  return data.values ?? []
}

/** Append one row to the end of a sheet/range. */
export async function appendRow(spreadsheetId: string, range: string, row: (string | number)[]): Promise<boolean> {
  const token = await getGoogleAccessToken([SCOPE_SHEETS])
  if (!token) return false

  const url = `${BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [row] }),
  })
  if (!res.ok) {
    console.error(`[sheets] append failed ${res.status}: ${await res.text()}`)
    return false
  }
  return true
}

/** Overwrite a specific range, e.g. "Leads!F2" with a single value. */
export async function updateCell(spreadsheetId: string, range: string, value: string | number): Promise<boolean> {
  const token = await getGoogleAccessToken([SCOPE_SHEETS])
  if (!token) return false

  const url = `${BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`
  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [[value]] }),
  })
  if (!res.ok) {
    console.error(`[sheets] update failed ${res.status}: ${await res.text()}`)
    return false
  }
  return true
}
