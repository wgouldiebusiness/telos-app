// ─────────────────────────────────────────────────────────────
// Quote Follow-Up — per-client configuration + message templates.
//
// Keyed by businessId (matches quotes.business_id). At onboarding, add the
// client's Twilio credentials here (or load from env/Supabase).
// ─────────────────────────────────────────────────────────────

import type { TwilioCreds } from '@/agents/shared/sms'

export interface QuoteFollowupConfig {
  businessName: string
  twilio: TwilioCreds
}

export const quoteFollowupConfigs: Record<string, QuoteFollowupConfig> = {}

export function getQuoteFollowupConfig(businessId: string): QuoteFollowupConfig | null {
  return quoteFollowupConfigs[businessId] ?? null
}

// Fixed, friendly templates. [NAME] is replaced at send time.
export const FOLLOW_UP_1 =
  'Hi [NAME], just checking in on the quote I sent over. Happy to answer any questions or adjust anything. Let me know.'

export const FOLLOW_UP_2 =
  'Hi [NAME], final follow-up on the quote. No pressure at all. If the timing is not right, no problem. Just let me know either way.'
