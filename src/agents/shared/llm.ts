// ─────────────────────────────────────────────────────────────
// LLM provider abstraction.
//
// One function, askLLM(), serves every agent. The model provider is a
// single config change (the LLM_PROVIDER env var), not a rewrite:
//
//   LLM_PROVIDER=gemini     (default)  →  Google Gemini, free tier available
//   LLM_PROVIDER=groq                  →  Groq (Llama), free tier available
//   LLM_PROVIDER=anthropic             →  Claude (needs ANTHROPIC_API_KEY credit)
//
// Add the matching key (GEMINI_API_KEY / GROQ_API_KEY / ANTHROPIC_API_KEY)
// and the agents switch with no code change. Gemini and Groq are called
// over their REST APIs with fetch (no SDK), matching the house pattern in
// src/lib/resend and src/agents/shared/email.ts.
//
// The caller-facing shape is provider-agnostic: a system prompt plus a
// list of {role, content} turns. Everything upstream (registry, access
// control, rate limiting, leak guard) is unchanged.
// ─────────────────────────────────────────────────────────────

import { askClaude, type ChatTurn } from './claude'

export type { ChatTurn }
export type LLMProvider = 'anthropic' | 'gemini' | 'groq'

export interface AskLLMOptions {
  /** The system prompt. */
  system: string
  /** Conversation history, oldest first, ending on the latest user turn. */
  messages: ChatTurn[]
  /** Max output tokens. */
  maxTokens?: number
  /** Optional explicit model id. Defaults to the active provider's default. */
  model?: string
}

/** The provider the agents currently run on. Defaults to Gemini. */
export function activeProvider(): LLMProvider {
  const p = (process.env.LLM_PROVIDER || 'gemini').trim().toLowerCase()
  if (p === 'anthropic' || p === 'claude') return 'anthropic'
  if (p === 'groq') return 'groq'
  return 'gemini'
}

function providerKey(p: LLMProvider): string | undefined {
  if (p === 'anthropic') return process.env.ANTHROPIC_API_KEY
  if (p === 'groq') return process.env.GROQ_API_KEY
  return process.env.GEMINI_API_KEY
}

/** Whether the active provider has its API key set in this environment. */
export function isLLMConfigured(): boolean {
  return Boolean(providerKey(activeProvider())?.trim())
}

function defaultModel(p: LLMProvider): string {
  if (p === 'anthropic') {
    return process.env.ANTHROPIC_MODEL || process.env.EXPERTS_MODEL || 'claude-sonnet-5'
  }
  if (p === 'groq') {
    return process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
  }
  return process.env.GEMINI_MODEL || 'gemini-2.5-flash'
}

/**
 * Send a system prompt + conversation to the active provider and return the
 * assistant's text reply. Throws on a provider/network error so the caller
 * can respond gracefully (the /api/experts route already try/catches).
 */
export async function askLLM(opts: AskLLMOptions): Promise<string> {
  const provider = activeProvider()
  const model = opts.model || defaultModel(provider)
  const maxTokens = opts.maxTokens ?? 512

  if (provider === 'anthropic') {
    // Reuse the existing Anthropic path (prompt caching, retries).
    return askClaude({ system: opts.system, messages: opts.messages, maxTokens, model })
  }
  if (provider === 'groq') {
    return askGroq({ ...opts, model, maxTokens })
  }
  return askGemini({ ...opts, model, maxTokens })
}

// ── Gemini (generativelanguage REST) ──
// Roles are 'user' and 'model'; the system prompt is a separate field.
async function askGemini(opts: Required<Pick<AskLLMOptions, 'system' | 'messages' | 'maxTokens' | 'model'>>): Promise<string> {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY is not set')

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(opts.model)}:generateContent`
  const body = {
    system_instruction: { parts: [{ text: opts.system }] },
    contents: opts.messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    generationConfig: { maxOutputTokens: opts.maxTokens },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error(`[llm] gemini error ${res.status}: ${detail.slice(0, 300)}`)
    throw new Error(`Gemini API ${res.status}`)
  }

  const data = await res.json()
  const parts = data?.candidates?.[0]?.content?.parts
  const text = Array.isArray(parts) ? parts.map((p: { text?: string }) => p.text ?? '').join('') : ''
  return text.trim()
}

// ── Groq (OpenAI-compatible REST) ──
async function askGroq(opts: Required<Pick<AskLLMOptions, 'system' | 'messages' | 'maxTokens' | 'model'>>): Promise<string> {
  const key = process.env.GROQ_API_KEY
  if (!key) throw new Error('GROQ_API_KEY is not set')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: opts.model,
      max_tokens: opts.maxTokens,
      messages: [
        { role: 'system', content: opts.system },
        ...opts.messages.map(m => ({ role: m.role, content: m.content })),
      ],
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error(`[llm] groq error ${res.status}: ${detail.slice(0, 300)}`)
    throw new Error(`Groq API ${res.status}`)
  }

  const data = await res.json()
  return (data?.choices?.[0]?.message?.content ?? '').trim()
}
