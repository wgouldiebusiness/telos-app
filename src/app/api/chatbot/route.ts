// ─────────────────────────────────────────────────────────────
// POST /api/chatbot — the Telos website chatbot endpoint.
//
// Runs on its own built-in brain (src/agents/website-chatbot/brain.ts).
// No external AI, no API key, no per-message cost. It answers FAQs and
// sends anything it cannot answer to "book a meeting".
//
// Rate limit: 30 messages per IP per hour (light abuse protection).
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { answer } from '@/agents/website-chatbot/brain'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (!rateLimit(`chatbot:${ip}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'You have sent a lot of messages. Please book a meeting and we will help directly.' },
      { status: 429 }
    )
  }

  let body: { message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const message = (body.message ?? '').trim()
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  return NextResponse.json({ reply: answer(message) })
}
