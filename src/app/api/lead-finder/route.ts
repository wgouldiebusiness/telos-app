// ─────────────────────────────────────────────────────────────
// POST /api/lead-finder — trigger a lead search.
//
// Body: { businessType: string, location: string }
// Security: requires x-telos-secret header (internal use only).
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { findLeads } from '@/agents/lead-finder'

export async function POST(req: NextRequest) {
  const secret = process.env.TELOS_INTERNAL_SECRET
  if (!secret || req.headers.get('x-telos-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  let body: { businessType?: string; location?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { businessType, location } = body
  if (!businessType || !location) {
    return NextResponse.json({ error: 'businessType and location are required.' }, { status: 400 })
  }

  const added = await findLeads(businessType, location)
  return NextResponse.json({ ok: true, added })
}
