// ─────────────────────────────────────────────────────────────
// Waitlist nurture sequence — TRANSACTIONAL sends, scheduled up front.
//
// Called once per NEW signup. Instead of building a scheduler, we lean on
// Resend's native `scheduled_at` (up to 30 days ahead): all three follow-ups
// are scheduled at signup time and Resend holds the timers.
//
//   Day 0   confirmation            (sent immediately — transactional.tsx)
//   Day 3   WaitlistValue           show the demo sites
//   Day 8   WaitlistCase            the missed-call maths, soft ask
//   Day 14  WaitlistCall            direct booking invitation, sequence ends
//
// Sends come from Will's address with reply-to enabled, because every email
// invites a reply ("reply 'no thanks' and I'll stop"). To cancel a sequence
// for someone (they booked, they replied no thanks): Resend dashboard →
// Emails → filter Scheduled → cancel their remaining sends.
//
// Fails gracefully: a scheduling failure is logged and never surfaces to
// the visitor or blocks the signup. Skips cleanly when RESEND_API_KEY is
// absent — nothing is faked.
// ─────────────────────────────────────────────────────────────
import { render } from '@react-email/render'
import WaitlistValue from '@/emails/WaitlistValue'
import WaitlistCase from '@/emails/WaitlistCase'
import WaitlistCall from '@/emails/WaitlistCall'

const FROM = 'Will at Telos AI <william.gouldsmith@telosai.co.uk>'
const REPLY_TO = 'william.gouldsmith@telosai.co.uk'

interface SequenceStep {
  dayOffset: number
  subject: string
  element: (name?: string) => React.ReactElement
}

const SEQUENCE: SequenceStep[] = [
  {
    dayOffset: 3,
    subject: 'Easier to show you than tell you',
    element: name => <WaitlistValue name={name} />,
  },
  {
    dayOffset: 8,
    subject: 'The maths on a missed call',
    element: name => <WaitlistCase name={name} />,
  },
  {
    dayOffset: 14,
    subject: 'Want to talk it through?',
    element: name => <WaitlistCall name={name} />,
  },
]

export interface NurtureResult {
  ok: boolean
  scheduled: number
  /** true when RESEND_API_KEY is not configured yet (not a real failure) */
  skipped?: boolean
  errors?: string[]
}

export async function scheduleNurtureSequence(args: {
  to: string
  name?: string
}): Promise<NurtureResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, scheduled: 0, skipped: true }
  }

  const errors: string[] = []
  let scheduled = 0

  for (const step of SEQUENCE) {
    try {
      const el = step.element(args.name)
      const html = await render(el)
      const text = await render(el, { plainText: true })
      const scheduledAt = new Date(
        Date.now() + step.dayOffset * 24 * 60 * 60 * 1000
      ).toISOString()

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM,
          to: args.to,
          reply_to: REPLY_TO,
          subject: step.subject,
          html,
          text,
          scheduled_at: scheduledAt,
        }),
      })

      if (!res.ok) {
        const detail = await res.text()
        errors.push(`day ${step.dayOffset}: ${res.status} ${detail.slice(0, 120)}`)
      } else {
        scheduled++
      }
    } catch (err) {
      errors.push(`day ${step.dayOffset}: ${err instanceof Error ? err.message : 'error'}`)
    }
  }

  return {
    ok: errors.length === 0,
    scheduled,
    errors: errors.length ? errors : undefined,
  }
}
