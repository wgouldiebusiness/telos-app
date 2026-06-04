/**
 * CRM — HubSpot / Airtable contact helpers shared across agents.
 */

/**
 * Upserts a contact in the CRM.
 * @param {string} provider - 'hubspot' | 'airtable'
 * @param {{ email: string, name: string, phone?: string, tags?: string[] }} contactData
 * @returns {Promise<{ contactId: string }>}
 */
export async function upsertContact(provider, contactData) {
  // CONNECT: HubSpot or Airtable SDK — upsert by email
  console.log(`[crm][MOCK] Upsert contact in ${provider}: ${contactData.email}`)
  return { contactId: `mock_contact_${Date.now()}` }
}

/**
 * Adds a tag to a contact.
 * @param {string} provider
 * @param {string} contactId
 * @param {string} tag
 * @returns {Promise<void>}
 */
export async function tagContact(provider, contactId, tag) {
  // CONNECT: CRM SDK
  console.log(`[crm][MOCK] Tag "${tag}" → ${contactId} in ${provider}`)
}

/**
 * Queries contacts by tag.
 * @param {string} provider
 * @param {string} tag
 * @returns {Promise<Object[]>}
 */
export async function getContactsByTag(provider, tag) {
  // CONNECT: CRM SDK — filter by tag
  console.log(`[crm][MOCK] Get contacts tagged "${tag}" from ${provider}`)
  return []
}
