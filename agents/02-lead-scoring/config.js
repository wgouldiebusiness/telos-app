// ============================================================
// AGENT 02 — LEAD SCORING + ROUTING
// CLIENT CONFIG — fill these in when onboarding a new client.
// ============================================================

export const CLIENT_CONFIG = {
  businessName: 'CLIENT_BUSINESS_NAME',
  ownerEmail:   'CLIENT_OWNER_EMAIL',
  ownerPhone:   'CLIENT_OWNER_PHONE',

  scoring: {
    hotThreshold:  70,   // score >= this → route immediately to owner
    warmThreshold: 40,   // score >= this → nurture sequence
    // score < warmThreshold → log only

    sourceWeights: {
      'google-ads': 25,
      'referral':   30,
      'organic':    15,
      'social':     10,
      'direct':     20,
    },

    keywordWeights: {
      urgent: 20,
      asap:   20,
      today:  15,
      budget: 10,
      price:   8,
      quote:  12,
      help:    5,
    },

    timeWeights: {
      businessHours:  10,  // bonus: enquiry arrives 09:00–17:00
      weekend:        -5,  // slight de-prioritise weekend
    },
  },

  routing: {
    hotLeadMethod:    'email_and_sms',
    ownerSmsTemplate: '🔥 Hot lead: {{name}} (score {{score}}) via {{source}} — "{{message}}"',
    nurtureCadence:   [1, 3, 7, 14],   // days after enquiry to send follow-ups
  },

  crm: {
    apiKey:      'CRM_API_KEY',
    hotLeadTag:  'hot-lead',
    warmLeadTag: 'nurture',
    coldLeadTag: 'cold',
  },
}
