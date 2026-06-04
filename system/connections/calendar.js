/**
 * CALENDAR — Google Calendar helpers used by booking agent.
 */

/**
 * Creates a calendar event.
 * @param {string} calendarId
 * @param {{ summary: string, start: string, end: string, description?: string }} event
 * @returns {Promise<{ eventId: string|null }>}
 */
export async function createEvent(calendarId, event) {
  // CONNECT: Google Calendar API
  // const { google } = require('googleapis')
  // const calendar = google.calendar({ version: 'v3', auth })
  // const res = await calendar.events.insert({ calendarId, resource: { summary: event.summary, start: { dateTime: event.start }, end: { dateTime: event.end }, description: event.description } })
  // return { eventId: res.data.id }

  console.log(`[calendar][MOCK] Event created: "${event.summary}" at ${event.start}`)
  return { eventId: `mock_event_${Date.now()}` }
}

/**
 * Deletes a calendar event.
 * @param {string} calendarId
 * @param {string} eventId
 * @returns {Promise<void>}
 */
export async function deleteEvent(calendarId, eventId) {
  // CONNECT: Google Calendar API
  console.log(`[calendar][MOCK] Event deleted: ${eventId}`)
}
