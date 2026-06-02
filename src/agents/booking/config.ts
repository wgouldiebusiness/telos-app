// ─────────────────────────────────────────────────────────────
// Appointment Booking — per-client configuration.
//
// Keyed by configId. Share each client's Google Calendar with the Telos
// service account email (write access) so the agent can read free slots and
// create events.
// ─────────────────────────────────────────────────────────────

export interface BookingService {
  name: string
  durationMins: number
}

export interface BookingConfig {
  businessName: string
  /** Google Calendar ID (often the calendar's email address). */
  calendarId: string
  services: BookingService[]
  /** Timezone, e.g. 'Europe/London'. */
  timezone: string
}

export const bookingConfigs: Record<string, BookingConfig> = {}

export function getBookingConfig(id: string): BookingConfig | null {
  return bookingConfigs[id] ?? null
}
