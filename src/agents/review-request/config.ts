// ─────────────────────────────────────────────────────────────
// Review Request — per-client configuration.
//
// After a job or appointment is marked complete, the client's system (or
// the Telos portal) calls /api/review-request to text the customer a
// Google review link. One endpoint serves every client.
// ─────────────────────────────────────────────────────────────

import type { TwilioCreds } from '@/agents/shared/sms'

export interface ReviewRequestConfig {
  businessName: string
  googleReviewUrl: string
  /** How long to wait after the trigger before texting (production: via cron). */
  delayHours: number
  /** Optional override of the default message. Use [NAME], [BUSINESS], [LINK]. */
  smsTemplate?: string
  twilio: TwilioCreds
}

const DEFAULT_TEMPLATE =
  'Hi [NAME], thank you for choosing [BUSINESS]. If you have a moment, we would really appreciate a quick review. It makes a huge difference for a small business. Here is the link: [LINK]. Thank you.'

export function buildReviewMessage(
  config: ReviewRequestConfig,
  customerName: string
): string {
  const template = config.smsTemplate || DEFAULT_TEMPLATE
  return template
    .replaceAll('[NAME]', customerName || 'there')
    .replaceAll('[BUSINESS]', config.businessName)
    .replaceAll('[LINK]', config.googleReviewUrl)
}

// Client registry. Empty until onboarding; load real creds from env/Supabase.
export const reviewRequestConfigs: Record<string, ReviewRequestConfig> = {}

export function getReviewRequestConfig(id: string): ReviewRequestConfig | null {
  return reviewRequestConfigs[id] ?? null
}
