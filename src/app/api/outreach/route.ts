// ─────────────────────────────────────────────────────────────
// POST /api/outreach — generate cold-email drafts for new leads.
//
// Reads the lead sheet, writes a personalised draft per lead, saves them
// back to the sheet (column I) marked "draft ready". Nothing is sent.
// Security: requires x-telos-secret (internal use only).
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { timingSafeCompare } from '@/lib/security'
import { writeOutreachDrafts } from '@/agents/outreach'

export async function POST(req: NextRequest) {
  const secret = process.env.TELOS_INTERNAL_SECRET
  const provided = req.headers.get('x-telos-secret') ?? ''
  if (!secret || !timingSafeCompare(provided, secret)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Claude is not configured.' }, { status: 503 })
  }

  const written = await writeOutreachDrafts()
  return NextResponse.json({ ok: true, written })
}
