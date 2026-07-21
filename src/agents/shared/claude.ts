// ─────────────────────────────────────────────────────────────
// Shared Claude API wrapper — every agent imports askClaude from here.
//
// Env vars:
//   ANTHROPIC_API_KEY   (required)
//
// The model lives in ONE place (CLAUDE_MODEL) so every agent can be
// upgraded by changing a single line. The build spec named
// claude-sonnet-4-20250514 (now deprecated); we use the current Sonnet.
// ─────────────────────────────────────────────────────────────

import Anthropic from '@anthropic-ai/sdk'

// Current Sonnet — fast and cost-effective, ideal for chat-style agents.
// Swap to 'claude-opus-4-8' here if an agent needs maximum capability.
export const CLAUDE_MODEL = 'claude-sonnet-4-6'

// Instantiate lazily so the API key is read at REQUEST time, not at module
// import / cold-start. Reading a secret at module top level bakes whatever the
// env held when the module first loaded, which is exactly the "set in the
// dashboard but empty at runtime" trap; a request-time read avoids it and
// keeps a stale client from surviving an env change. The SDK auto-retries
// 429 and 5xx with exponential backoff.
let _anthropic: Anthropic | null = null
function getAnthropic(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 3,
    })
  }
  return _anthropic
}

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

interface AskClaudeOptions {
  /** The system prompt. Cached automatically to cut cost on repeat calls. */
  system: string
  /** Full conversation history, oldest first. Must start with a user turn. */
  messages: ChatTurn[]
  /** Max output tokens. Keep low for chat (fast, cheap). Default 512. */
  maxTokens?: number
  /** Override the model for this call. Defaults to CLAUDE_MODEL. */
  model?: string
}

/**
 * Send a conversation to Claude and return the assistant's text reply.
 * Errors are logged clearly and re-thrown so the caller can respond gracefully.
 */
export async function askClaude({
  system,
  messages,
  maxTokens = 512,
  model = CLAUDE_MODEL,
}: AskClaudeOptions): Promise<string> {
  try {
    const response = await getAnthropic().messages.create({
      model,
      max_tokens: maxTokens,
      // cache_control caches the (stable) system prompt for ~5 minutes,
      // so repeat requests pay ~0.1x for it instead of full price.
      system: [
        { type: 'text', text: system, cache_control: { type: 'ephemeral' } },
      ],
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    })

    const block = response.content.find(b => b.type === 'text')
    return block && block.type === 'text' ? block.text : ''
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      console.error(`[claude] API error ${err.status}: ${err.message}`)
    } else {
      console.error('[claude] Unexpected error:', err)
    }
    throw err
  }
}
