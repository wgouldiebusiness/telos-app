// ============================================================
// AGENT 04 — AUTOMATED RE-ENGAGEMENT PIPELINE
// CLIENT CONFIG — fill these in when onboarding a new client.
// ============================================================

export const CLIENT_CONFIG = {
  businessName: 'CLIENT_BUSINESS_NAME',
  ownerEmail:   'CLIENT_OWNER_EMAIL',

  reEngagement: {
    inactivityThresholdDays: 42,   // flag clients who haven't booked in 6 weeks
    checkFrequency:          'daily',
    maxSequenceAttempts:     3,    // stop after 3 emails with no response

    sequence: [
      {
        day:                      0,
        subject:                  'We miss you at {{businessName}}',
        tone:                     'warm_personal',
        includeLastServiceMention: true,
        includeSoftCta:           true,
      },
      {
        day:          5,
        subject:      'A little something for you, {{firstName}}',
        tone:         'value_offer',
        includeOffer: true,
        offerType:    'discount_or_bonus',
        offerValue:   'CLIENT_OFFER',  // e.g. '10% off your next session'
      },
      {
        day:              12,
        subject:          'Still thinking about you',
        tone:             'final_gentle',
        includeFinalCta:  true,
        suppressAfterThis: true,
      },
    ],
  },

  crm: {
    apiKey:          'CRM_API_KEY',
    reEngagedTag:    're-engaged',
    suppressedTag:   'unsubscribed-re-engage',
    inSequenceTag:   're-engage-sequence',
  },
}
