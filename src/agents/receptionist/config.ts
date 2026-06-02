// ─────────────────────────────────────────────────────────────
// AI Receptionist — per-client configuration.
//
// One config object per client business. The same API route + widget
// serve every client; only the config changes. To deploy for a new
// client, add an entry to `receptionistConfigs` (or, later, load it
// from Supabase) and pass its key as `configId`.
// ─────────────────────────────────────────────────────────────

export interface ReceptionistConfig {
  businessName: string
  businessType: string
  services: string[]
  openingHours: string
  bookingUrl: string
  ownerName: string
  tone: 'professional' | 'friendly' | 'casual'
  customFaqs: Array<{ question: string; answer: string }>
}

// Telos's own receptionist doubles as the live demo on the website.
export const receptionistConfigs: Record<string, ReceptionistConfig> = {
  telos: {
    businessName: 'Telos AI',
    businessType: 'AI automation studio for service businesses',
    services: [
      'AI receptionists',
      'Website chat assistants',
      'Lead follow-up and CRM automation',
      'Missed-call recovery',
    ],
    openingHours: 'Monday to Friday, 9am to 6pm',
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || 'https://telosai.co.uk/contact',
    ownerName: 'William',
    tone: 'professional',
    customFaqs: [
      { question: 'How much does it cost?', answer: 'Plans start from £100 a month. The right fit is agreed on a short call.' },
      { question: 'How long does setup take?', answer: 'Most builds are live within two weeks. We handle everything.' },
    ],
  },
}

export function getReceptionistConfig(id: string): ReceptionistConfig | null {
  return receptionistConfigs[id] ?? null
}
