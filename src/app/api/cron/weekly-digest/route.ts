// ─────────────────────────────────────────────────────────────
// GET /api/cron/weekly-digest — runs every Monday 7am (Vercel cron).
//
// Sends William a personal digest: portal activity in the last 7 days,
// upcoming Telos bookings this week (from the Telos Google Calendar), and a
// one-line AI summary of the week ahead. Email via Resend.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorisedCron } from '@/agents/shared/cron'
import { createAdminClient } from '@/lib/supabase/admin'
import { askClaude } from '@/agents/shared/claude'
import { sendEmail } from '@/agents/shared/email'
import { getGoogleAccessToken, SCOPE_CALENDAR } from '@/agents/shared/google'

const TO = 'william.gouldsmith@telosai.co.uk'

async function upcomingEvents(): Promise<string[]> {
  const calId = process.env.GOOGLE_CALENDAR_ID
  if (!calId) return []
  const token = await getGoogleAccessToken([SCOPE_CALENDAR])
  if (!token) return []

  const now = new Date().toISOString()
  const weekAhead = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events?timeMin=${now}&timeMax=${weekAhead}&singleEvents=true&orderBy=startTime`

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    console.error(`[weekly-digest] calendar error ${res.status}`)
    return []
  }
  const data = (await res.json()) as {
    items?: Array<{ summary?: string; start?: { dateTime?: string; date?: string } }>
  }
  return (data.items ?? []).map(e => {
    const when = e.start?.dateTime || e.start?.date || ''
    const label = when ? new Date(when).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''
    return `${label} — ${e.summary || 'Untitled'}`
  })
}

export async function GET(req: NextRequest) {
  if (!isAuthorisedCron(req)) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const { data: activity } = await supabase
    .from('activity_log')
    .select('description, created_at')
    .gte('created_at', weekAgo)
    .order('created_at', { ascending: false })
    .limit(20)

  const events = await upcomingEvents()

  // One-line AI summary of the week ahead.
  let summary = ''
  try {
    summary = await askClaude({
      system: 'You write a single encouraging one-line summary of the week ahead for a solo business owner. British English. No em dashes. One sentence only.',
      messages: [{
        role: 'user',
        content: `Upcoming this week: ${events.length ? events.join('; ') : 'nothing booked yet'}. Recent activity items: ${activity?.length ?? 0}.`,
      }],
      maxTokens: 80,
    })
  } catch {
    summary = 'A fresh week ahead. Keep the momentum going.'
  }

  const activityList = (activity ?? []).map(a => `<li style="margin-bottom:6px;color:#3A3A3C;">${escapeHtml(a.description || '')}</li>`).join('') || '<li style="color:#6B6B6F;">No portal activity this week.</li>'
  const eventList = events.map(e => `<li style="margin-bottom:6px;color:#3A3A3C;">${escapeHtml(e)}</li>`).join('') || '<li style="color:#6B6B6F;">Nothing booked this week yet.</li>'

  const html = `<!DOCTYPE html><html lang="en-GB"><body style="margin:0;background:#0A0510;font-family:Inter,sans-serif;padding:40px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#0A0510;padding:26px 32px;">
          <div style="font-size:18px;font-weight:800;letter-spacing:-0.03em;color:#fff;">Telos AI — your week</div>
        </td></tr>
        <tr><td style="padding:30px 32px;">
          <p style="font-size:16px;font-weight:600;color:#1D1D1F;margin:0 0 24px;">${escapeHtml(summary)}</p>
          <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.1em;color:#7868E6;margin:0 0 10px;">Booked this week</h2>
          <ul style="margin:0 0 24px;padding-left:18px;font-size:14px;line-height:1.6;">${eventList}</ul>
          <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.1em;color:#7868E6;margin:0 0 10px;">Recent activity</h2>
          <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.6;">${activityList}</ul>
        </td></tr>
      </table>
    </td></tr></table>
  </body></html>`

  const result = await sendEmail({ to: TO, subject: 'Your Telos week ahead', html })
  return NextResponse.json({ ok: result.ok, events: events.length, activity: activity?.length ?? 0 })
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
