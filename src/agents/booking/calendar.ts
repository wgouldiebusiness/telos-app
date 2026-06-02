// ─────────────────────────────────────────────────────────────
// Google Calendar helpers for the booking agent — free/busy lookup and
// event creation via the Calendar REST API and the shared service-account
// token. No SDK.
// ─────────────────────────────────────────────────────────────

import { getGoogleAccessToken, SCOPE_CALENDAR } from '@/agents/shared/google'

const CAL_BASE = 'https://www.googleapis.com/calendar/v3'

export interface Slot {
  start: string // ISO
  end: string   // ISO
}

/**
 * Return free slots over the next `days`, between workStartHour and
 * workEndHour local-ish time, of the given duration. Uses the freeBusy API
 * to avoid clashes with existing events.
 */
export async function getFreeSlots(
  calendarId: string,
  durationMins: number,
  days = 7,
  workStartHour = 9,
  workEndHour = 17
): Promise<Slot[]> {
  const token = await getGoogleAccessToken([SCOPE_CALENDAR])
  if (!token) return []

  const now = new Date()
  const timeMin = now.toISOString()
  const timeMax = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString()

  const res = await fetch(`${CAL_BASE}/freeBusy`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ timeMin, timeMax, items: [{ id: calendarId }] }),
  })
  if (!res.ok) {
    console.error(`[booking] freeBusy error ${res.status}: ${await res.text()}`)
    return []
  }

  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: Array<{ start: string; end: string }> }>
  }
  const busy = data.calendars?.[calendarId]?.busy ?? []

  const slots: Slot[] = []
  const durMs = durationMins * 60 * 1000

  for (let d = 0; d < days; d++) {
    const day = new Date(now)
    day.setDate(now.getDate() + d)
    for (let h = workStartHour; h < workEndHour; h++) {
      const start = new Date(day)
      start.setHours(h, 0, 0, 0)
      if (start.getTime() < now.getTime()) continue
      const end = new Date(start.getTime() + durMs)
      const clashes = busy.some(b => start < new Date(b.end) && end > new Date(b.start))
      if (!clashes) slots.push({ start: start.toISOString(), end: end.toISOString() })
      if (slots.length >= 12) return slots // enough to offer
    }
  }
  return slots
}

export interface CreateEventInput {
  calendarId: string
  summary: string
  start: string
  end: string
  attendeeEmail?: string
  description?: string
  timezone: string
}

/** Create an event and (if an attendee email is given) send them an invite. */
export async function createEvent(input: CreateEventInput): Promise<boolean> {
  const token = await getGoogleAccessToken([SCOPE_CALENDAR])
  if (!token) return false

  const url = `${CAL_BASE}/calendars/${encodeURIComponent(input.calendarId)}/events?sendUpdates=all`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.start, timeZone: input.timezone },
      end: { dateTime: input.end, timeZone: input.timezone },
      attendees: input.attendeeEmail ? [{ email: input.attendeeEmail }] : undefined,
    }),
  })
  if (!res.ok) {
    console.error(`[booking] createEvent error ${res.status}: ${await res.text()}`)
    return false
  }
  return true
}
