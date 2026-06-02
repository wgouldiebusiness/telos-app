// ─────────────────────────────────────────────────────────────
// Google service-account auth — mints an OAuth access token from a
// service account, no googleapis SDK (keeps the bundle small).
//
// Env vars (one Telos service account can serve Sheets + Calendar):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY   (PEM; \n escaped is fine)
//
// For Calendar, share each client's calendar with the service account
// email. For Sheets, share the sheet with the service account email.
// Places uses a plain API key (see places helper), not this.
// ─────────────────────────────────────────────────────────────

import crypto from 'crypto'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'

// Cache tokens per scope set until shortly before they expire.
const cache = new Map<string, { token: string; expires: number }>()

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function getGoogleAccessToken(scopes: string[]): Promise<string | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  if (!email || !rawKey) {
    console.error('[google] Service account env vars are not set.')
    return null
  }
  const privateKey = rawKey.replace(/\\n/g, '\n')

  const scopeKey = scopes.join(' ')
  const cached = cache.get(scopeKey)
  if (cached && cached.expires > Date.now() + 60_000) return cached.token

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64url(JSON.stringify({
    iss: email,
    scope: scopeKey,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }))
  const signingInput = `${header}.${claim}`

  let signature: string
  try {
    signature = base64url(crypto.createSign('RSA-SHA256').update(signingInput).sign(privateKey))
  } catch (err) {
    console.error('[google] Failed to sign JWT (check the private key):', err)
    return null
  }

  const assertion = `${signingInput}.${signature}`

  try {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }).toString(),
    })
    if (!res.ok) {
      console.error(`[google] Token exchange failed ${res.status}: ${await res.text()}`)
      return null
    }
    const data = (await res.json()) as { access_token: string; expires_in: number }
    cache.set(scopeKey, { token: data.access_token, expires: Date.now() + data.expires_in * 1000 })
    return data.access_token
  } catch (err) {
    console.error('[google] Token request error:', err)
    return null
  }
}

// Common scopes.
export const SCOPE_SHEETS = 'https://www.googleapis.com/auth/spreadsheets'
export const SCOPE_CALENDAR = 'https://www.googleapis.com/auth/calendar'
