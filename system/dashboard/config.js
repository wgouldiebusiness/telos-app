// ============================================================
// DASHBOARD CONFIG — controls what each tier sees by default.
// ============================================================

export const DASHBOARD_CONFIG = {
  master: {
    recentActivityLimit:   20,
    healthAlertThresholds: {
      deliveryRateMin:         95,   // % — alert if email delivery drops below
      failedConnectionsMax:     2,   // alert if more than N integrations are failing
      overduePaymentDaysMax:   14,   // alert if payment overdue by more than N days
    },
  },
  owner: {
    upcomingBookingsDays:   7,
    recentClientsLimit:    10,
    reEngagementFlagDays:  42,   // clients not booked in this many days
  },
  client: {
    upcomingAppointmentsLimit: 5,
    paidInvoicesLimit:        10,
    documentsLimit:           20,
  },
}
