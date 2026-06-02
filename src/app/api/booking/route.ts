// ─────────────────────────────────────────────────────────────
// POST /api/booking — appointment booking for any client.
//
// Actions (one route, three jobs):
//   { configId, action: 'slots', service }                       -> { slots }
//   { configId, action: 'book', service, slotStart, name, email }-> { ok }
//   { configId, action: 'chat', message, history }               -> { reply }
//
// Slot lookup and event creation are deterministic (no model in the loop)
// so bookings are reliable. The chat action uses Claude only for natural
// questions and to nudge toward booking.
//
// Rate limit: 30 calls per IP per hour.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/agents/shared/rateLimiter'
import { askClaude, type ChatTurn } from '@/agents/shared/claude'
import { getBookingConfig } from '@/agents/booking/config'
import { getFreeSlots, createEvent } from '@/agents/booking/calendar'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(`booking:${ip}`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 })
  }

  let body: {
    configId?: string
    action?: 'slots' | 'book' | 'chat'
    service?: string
    slotStart?: string
    name?: string
    email?: string
    message?: string
    history?: ChatTurn[]
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const config = body.configId ? getBookingConfig(body.configId) : null
  if (!config) return NextResponse.json({ error: 'Unknown business.' }, { status: 404 })

  const service = config.services.find(s => s.name === body.service) ?? config.services[0]

  // ── Slots ──
  if (body.action === 'slots') {
    if (!service) return NextResponse.json({ slots: [] })
    const slots = await getFreeSlots(config.calendarId, service.durationMins)
    return NextResponse.json({ slots })
  }

  // ── Book ──
  if (body.action === 'book') {
    if (!service || !body.slotStart || !body.name) {
      return NextResponse.json({ error: 'Service, slot, and name are required.' }, { status: 400 })
    }
    const end = new Date(new Date(body.slotStart).getTime() + service.durationMins * 60 * 1000).toISOString()
    const ok = await createEvent({
      calendarId: config.calendarId,
      summary: `${service.name} - ${body.name}`,
      description: `Booked via ${config.businessName} online assistant.`,
      start: body.slotStart,
      end,
      attendeeEmail: body.email,
      timezone: config.timezone,
    })
    return ok
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: 'Could not create the booking. Please try another time.' }, { status: 502 })
  }

  // ── Chat ──
  if (body.action === 'chat') {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'The assistant is not available right now.' }, { status: 503 })
    }
    const message = (body.message ?? '').trim()
    if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 })

    const system = `You are the booking assistant for ${config.businessName}. You help visitors choose a service and book an appointment. Services: ${config.services.map(s => `${s.name} (${s.durationMins} mins)`).join(', ')}. Be warm and brief. When the visitor seems ready, tell them to pick a service and you will show available times. Never invent availability. British English. No em dashes.`

    const history = Array.isArray(body.history) ? body.history.slice(-10) : []
    try {
      const reply = await askClaude({
        system,
        messages: [...history, { role: 'user', content: message }],
        maxTokens: 300,
      })
      return NextResponse.json({ reply })
    } catch {
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
}
