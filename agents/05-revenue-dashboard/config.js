// ============================================================
// AGENT 05 — REVENUE REPORTING DASHBOARD
// CLIENT CONFIG — fill these in when onboarding a new client.
// ============================================================

export const CLIENT_CONFIG = {
  businessName: 'CLIENT_BUSINESS_NAME',
  ownerEmail:   'CLIENT_OWNER_EMAIL',

  reporting: {
    weeklyReportDay:  'monday',
    weeklyReportTime: '08:00',
    timezone:         'Europe/London',
    currency:         'GBP',
    currencySymbol:   '£',

    goals: {
      weeklyRevenueTarget:  0,   // e.g. 2000
      monthlyRevenueTarget: 0,   // e.g. 8000
      targetBookingsPerWeek: 0,  // e.g. 12
    },

    includeInReport: {
      totalRevenue:       true,
      bookingCount:       true,
      cancellations:      true,
      averageJobValue:    true,
      topServices:        true,
      revenueVsTarget:    true,
      weekOnWeekChange:   true,
    },

    anomalyThresholds: {
      revenueDropPercent:       30,  // alert if revenue drops > 30% week-on-week
      cancellationRatePercent:  20,  // alert if cancellation rate > 20%
      noBookingsHours:          48,  // alert if no bookings in 48 hours
    },
  },

  stripe: {
    secretKey: 'STRIPE_SECRET_KEY',
  },

  crm: {
    apiKey: 'CRM_API_KEY',
  },
}
