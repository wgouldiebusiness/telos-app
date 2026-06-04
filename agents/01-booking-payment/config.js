// ============================================================
// AGENT 01 — BOOKING + PAYMENT BACKEND
// CLIENT CONFIG — fill these in when onboarding a new client.
// This is the ONLY file you need to touch per client.
// ============================================================

export const CLIENT_CONFIG = {
  businessName: 'CLIENT_BUSINESS_NAME',
  logoUrl:      'CLIENT_LOGO_URL',
  primaryColour: '#000000',
  ownerEmail:   'CLIENT_OWNER_EMAIL',
  ownerPhone:   'CLIENT_OWNER_PHONE',  // E.164 format, e.g. +447911123456

  stripe: {
    secretKey:            'STRIPE_SECRET_KEY',
    webhookSecret:        'STRIPE_WEBHOOK_SECRET',
    currency:             'gbp',
    defaultDepositPercent: 25,          // % of total charged at booking
  },

  crm: {
    provider:   'hubspot',              // 'hubspot' | 'airtable' | 'notion'
    apiKey:     'CRM_API_KEY',
    pipelineId: 'CRM_PIPELINE_ID',
  },

  notifications: {
    confirmationSubject:   'Your booking is confirmed',
    reminderHoursBefore:   24,
    sendOwnerSms:          true,
    twilioFrom:            'TWILIO_PHONE_NUMBER',
  },

  calendar: {
    provider:   'google',               // 'google' | 'outlook' | 'calendly'
    calendarId: 'GOOGLE_CALENDAR_ID',
    timezone:   'Europe/London',
  },
}
