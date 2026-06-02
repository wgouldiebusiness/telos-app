// ─────────────────────────────────────────────────────────────
// POST /api/chatbot — the Telos website chatbot endpoint.
//
// The agent logic (system prompt + Claude call) lives in
// src/agents/website-chatbot and src/agents/shared. This file is the
// thin Next.js route handler that wires them to the web.
//
// Rate limit: 20 messages per IP per hour.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { askClaude, type ChatTurn } from '@/agents/shared/claude'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { CHATBOT_SYSTEM_PROMPT } from '@/agents/website-chatbot/config'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (!rateLimit(`chatbot:${ip}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'You have sent a lot of messages. Please try again in a little while, or book a call.' },
      { status: 429 }
    )
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[chatbot] ANTHROPIC_API_KEY is not set')
    return NextResponse.json(
      { error: 'The assistant is not available right now. Please book a call instead.' },
      { status: 503 }
    )
  }

  let body: { message?: string; history?: ChatTurn[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const message = (body.message ?? '').trim()
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  // Keep the last 10 turns to bound token usage, then append the new message.
  const history = Array.isArray(body.history) ? body.history.slice(-10) : []
  const messages: ChatTurn[] = [...history, { role: 'user', content: message }]

  try {
    const reply = await askClaude({
      system: CHATBOT_SYSTEM_PROMPT,
      messages,
      maxTokens: 400,
    })
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again, or email william.gouldsmith@telosai.co.uk.' },
      { status: 500 }
    )
  }
}
