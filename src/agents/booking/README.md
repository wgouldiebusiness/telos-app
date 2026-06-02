# Appointment Booking Agent

A full booking flow for any service business: the visitor picks a service, sees
real free slots from the client's Google Calendar, and books in. A calendar
invite is sent automatically. Slot lookup and booking are deterministic, so it
never double-books.

## Setup (per client)

1. **Service account** (shared Telos one). Set `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
2. **Share the client's Google Calendar** with the service account email, with
   "Make changes to events" permission.
3. Add the client to `config.ts` with their `calendarId` (usually the calendar's
   email), services + durations, and timezone.

## Use it

Drop the widget into any page:

```tsx
<BookingWidget
  configId="acme-clinic"
  businessName="Acme Clinic"
  services={[{ name: 'Consultation', durationMins: 30 }]}
/>
```

The widget talks to `/api/booking` (`slots`, `book`, and an optional `chat`
action for natural questions).

## Notes

- Free slots are computed from the calendar's free/busy over the next 7 days,
  9am to 5pm, in the configured timezone. Adjust the working hours in
  `calendar.ts` if needed, or make them per-client config later.
- The `chat` action uses Claude only for answering questions and nudging toward
  booking; the actual booking never depends on the model.
