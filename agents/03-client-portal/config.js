// ============================================================
// AGENT 03 — CLIENT PORTAL
// CLIENT CONFIG — fill these in when onboarding a new client.
// ============================================================

export const CLIENT_CONFIG = {
  businessName:  'CLIENT_BUSINESS_NAME',
  logoUrl:       'CLIENT_LOGO_URL',
  primaryColour: '#000000',
  accentColour:  '#ffffff',

  portal: {
    loginMethod:                'magic_link',  // 'magic_link' | 'password' | 'google'
    sessionDurationHours:       72,
    allowClientCancellation:    true,
    cancellationWindowHours:    24,            // minimum notice to cancel
  },

  features: {
    showAppointments: true,
    showInvoices:     true,
    showDocuments:    true,
    showMessages:     true,
    allowRebooking:   true,
  },

  branding: {
    welcomeMessage: 'Welcome back, {{firstName}}. Here\'s everything in one place.',
    portalTitle:    '{{businessName}} Client Portal',
  },

  crm: {
    apiKey:  'CRM_API_KEY',
  },

  email: {
    magicLinkSubject:  'Your secure login link',
    magicLinkExpirySec: 900,   // 15 minutes
    fromAddress:       'CLIENT_FROM_EMAIL',
  },
}
