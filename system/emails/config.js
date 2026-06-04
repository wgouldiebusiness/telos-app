// ============================================================
// EMAIL CONFIG — fill EMAIL_API_KEY and TELOS_LOGO_URL.
// clientBranding overrides apply when emailing on behalf
// of an owner account (e.g. end-client welcome emails).
// ============================================================

export const EMAIL_CONFIG = {
  provider:    'sendgrid',   // 'sendgrid' | 'mailgun' | 'ses' | 'resend'
  apiKey:      'EMAIL_API_KEY',
  fromAddress: 'noreply@telosai.co.uk',
  fromName:    'Telos AI',
  replyTo:     'hello@telosai.co.uk',

  branding: {
    logoUrl:         'TELOS_LOGO_URL',
    primaryColour:   '#6366F1',
    footerText:      'Telos AI · Bristol, UK · telosai.co.uk',
    unsubscribeText: "You're receiving this because you have a Telos account.",
  },

  clientBranding: {
    enabled:           true,
    useClientLogo:     true,
    useClientColours:  true,
    useClientFromName: true,
  },
}
