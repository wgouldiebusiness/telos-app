// ─────────────────────────────────────────────────────────────
// Email Outreach — reads leads from the Sheet, writes a personalised cold
// email draft for each one (Claude), and saves it back to the sheet for
// William to review. Nothing is sent automatically.
//
// Sheet columns (from the Lead Finder):
//   A Name | B Address | C Phone | D Website | E Maps URL | F Rating | G Email | H Status | I Email Draft
// We fill column I and set status to "draft ready".
// ─────────────────────────────────────────────────────────────

import { readSheet, updateCell } from '@/agents/shared/sheets'
import { askLLM } from '@/agents/shared/llm'

const EMAIL_SYSTEM = `Write a short cold email to a service business owner. The email is from William Gouldsmith, founder of Telos AI. It should be warm, direct, and personal. No more than four sentences. Do not use buzzwords or make promises. Mention one specific thing about their business that shows you have actually looked at it. The goal is to start a conversation, not to sell. End with a simple question. No subject line needed, just the email body. British English. No em dashes.`

/** Generate drafts for every lead that does not have one yet. Returns the count. */
export async function writeOutreachDrafts(): Promise<number> {
  const sheetId = process.env.GOOGLE_SHEETS_ID
  if (!sheetId) {
    console.error('[outreach] GOOGLE_SHEETS_ID not set')
    return 0
  }

  const rows = await readSheet(sheetId, 'Leads!A2:I') // skip header
  if (!rows.length) return 0

  let written = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const name = row[0]?.trim()
    const website = row[3]?.trim() || ''
    const address = row[1]?.trim() || ''
    const existingDraft = row[8]?.trim() || ''
    if (!name || existingDraft) continue

    try {
      const draft = await askLLM({
        system: EMAIL_SYSTEM,
        messages: [{
          role: 'user',
          content: `Business name: ${name}. Location: ${address}. Website: ${website || 'not listed'}. Write the email body.`,
        }],
        maxTokens: 300,
      })

      const sheetRow = i + 2 // account for header + 0-index
      const okDraft = await updateCell(sheetId, `Leads!I${sheetRow}`, draft)
      if (okDraft) {
        await updateCell(sheetId, `Leads!H${sheetRow}`, 'draft ready')
        written++
      }
    } catch (err) {
      console.error(`[outreach] draft failed for ${name}:`, err)
    }
  }

  console.log(`[outreach] wrote ${written} drafts`)
  return written
}
