// ─────────────────────────────────────────────────────────────
// Missed-Call Recovery — per-client configuration.
//
// One Twilio webhook (/api/missed-call/[clientId]) serves every client.
// At onboarding, add the client's entry here (later: load from Supabase)
// with their own Twilio credentials and message wording.
// ─────────────────────────────────────────────────────────────

import type { TwilioCreds } from '@/agents/shared/sms'

export interface MissedCallConfig {
  businessName: string
  agentName: string
  bookingUrl: string
  /** Do not message the same number more than once per this many hours. */
  cooldownHours: number
  /** The client's own Twilio account. Filled in at onboarding. */
  twilio: TwilioCreds
}

// Build the recovery SMS for a client. Editable in one place.
export function buildMissedCallMessage(c: MissedCallConfig): string {
  return `Hi, sorry I missed your call. I am ${c.agentName} from ${c.businessName}. Happy to help. You can book a time here: ${c.bookingUrl}. Or just reply to this message.`
}

// Client registry. Empty until you onboard real clients.
// Example shape (do not commit real credentials — load from env/Supabase):
//
//   'acme-clinic': {
//     businessName: 'Acme Clinic',
//     agentName: 'Sarah',
//     bookingUrl: 'https://calendar.app.google/...',
//     cooldownHours: 24,
//     twilio: {
//       accountSid: process.env.ACME_TWILIO_SID!,
//       authToken: process.env.ACME_TWILIO_TOKEN!,
//       from: '+447700900123',
//     },
//   },
export const missedCallConfigs: Record<string, MissedCallConfig> = {}

export function getMissedCallConfig(id: string): MissedCallConfig | null {
  return missedCallConfigs[id] ?? null
}
