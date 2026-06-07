// ─────────────────────────────────────────────────────────────
// Cron authorisation helper.
//
// Vercel Cron sends `Authorization: Bearer <CRON_SECRET>` when the
// CRON_SECRET env var is set. Every scheduled agent route checks this so
// the public cannot trigger jobs that send messages or emails.
// ─────────────────────────────────────────────────────────────

import type { NextRequest } from 'next/server'
import { timingSafeCompare } from '@/lib/security'

export function isAuthorisedCron(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const provided = req.headers.get('authorization') ?? ''
  return timingSafeCompare(provided, `Bearer ${secret}`)
}
