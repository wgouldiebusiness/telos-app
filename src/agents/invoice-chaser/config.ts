// ─────────────────────────────────────────────────────────────
// Invoice Chaser — per-client configuration.
//
// Keyed by businessId (matches invoices.business_id). Claude writes each
// reminder in the business owner's voice based on their tone.
// ─────────────────────────────────────────────────────────────

export interface InvoiceChaserConfig {
  businessName: string
  ownerName: string
  tone: 'professional' | 'friendly' | 'casual'
  /** "from" address for reminder emails, e.g. 'Acme Clinic <billing@acme.co.uk>'. */
  fromEmail: string
}

export const invoiceChaserConfigs: Record<string, InvoiceChaserConfig> = {}

export function getInvoiceChaserConfig(businessId: string): InvoiceChaserConfig | null {
  return invoiceChaserConfigs[businessId] ?? null
}

export type ReminderStage = 'first' | 'second' | 'final'

const STAGE_BRIEF: Record<ReminderStage, string> = {
  first: 'A gentle first reminder, 3 days overdue. Assume it was simply missed. Warm and light.',
  second: 'A second reminder, 10 days overdue. Polite but a little firmer. Ask them to arrange payment.',
  final: 'A final notice, 21 days overdue. Firm and clear, still professional and never aggressive. State that the account will be escalated if unpaid.',
}

/** Builds the Claude prompt for a single reminder email body. */
export function buildReminderPrompt(
  config: InvoiceChaserConfig,
  stage: ReminderStage,
  clientName: string,
  amount: number
): string {
  return `Write a short overdue-invoice reminder email body for ${config.businessName}, signed off by ${config.ownerName}.

Customer: ${clientName}
Amount outstanding: £${amount.toFixed(2)}
Stage: ${STAGE_BRIEF[stage]}
Tone: ${config.tone}

Rules: British English. No em dashes. Firm but polite, never aggressive. Three short paragraphs maximum. Do not invent payment links or account numbers. Return only the email body text, no subject line.`
}
