// ============================================================
// CONNECTION CONFIG — one set of credentials per service.
// Each owner account stores their OWN encrypted credentials
// at the account level. These are Telos-level defaults/test keys.
// ============================================================

export const CONNECTION_CONFIG = {
  stripe: {
    publicKey:     'STRIPE_PUBLIC_KEY',
    secretKey:     'STRIPE_SECRET_KEY',
    webhookSecret: 'STRIPE_WEBHOOK_SECRET',
    testMode:      true,
  },
  twilio: {
    accountSid: 'TWILIO_ACCOUNT_SID',
    authToken:  'TWILIO_AUTH_TOKEN',
    fromNumber: 'TWILIO_FROM_NUMBER',
  },
  googleCalendar: {
    clientId:     'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    redirectUri:  'GOOGLE_REDIRECT_URI',
    scopes:       ['calendar.events', 'calendar.readonly'],
  },
  hubspot: {
    apiKey:   'HUBSPOT_API_KEY',
    portalId: 'HUBSPOT_PORTAL_ID',
  },
  airtable: {
    apiKey: 'AIRTABLE_API_KEY',
    baseId: 'AIRTABLE_BASE_ID',
  },
}
