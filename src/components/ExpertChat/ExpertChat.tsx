'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './ExpertChat.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  slug: string
  agentName: string
  starters: string[]
}

/**
 * Full-page chat for an expert agent. All intelligence lives server-side
 * (/api/experts); this component only renders the conversation.
 */
export default function ExpertChat({ slug, agentName, starters }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  async function send(text: string) {
    const message = text.trim()
    if (!message || busy) return
    setError('')
    setInput('')
    const nextMessages: Message[] = [...messages, { role: 'user', content: message }]
    setMessages(nextMessages)
    setBusy(true)

    try {
      const res = await fetch('/api/experts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, message, history: messages }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        // roll the failed user turn back so a retry does not duplicate it
        setMessages(messages)
        setInput(message)
      } else {
        setMessages([...nextMessages, { role: 'assistant', content: data.reply ?? '' }])
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
      setMessages(messages)
      setInput(message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={styles.chat}>
      <div ref={scrollRef} className={styles.scroll}>
        {messages.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyText}>
              Ask {agentName} anything in its specialism, or start with one of these:
            </p>
            <div className={styles.starters}>
              {starters.map(sQ => (
                <button
                  key={sQ}
                  type="button"
                  className={styles.starter}
                  onClick={() => send(sQ)}
                  disabled={busy}
                >
                  {sQ}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === 'user' ? styles.userMsg : styles.agentMsg}
          >
            {m.content}
          </div>
        ))}

        {busy && (
          <div className={styles.agentMsg}>
            <span className={styles.typing} aria-label={`${agentName} is typing`}>
              <span /><span /><span />
            </span>
          </div>
        )}
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      <form
        className={styles.inputRow}
        onSubmit={e => {
          e.preventDefault()
          send(input)
        }}
      >
        <textarea
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send(input)
            }
          }}
          placeholder={`Message ${agentName}…`}
          rows={2}
          maxLength={4000}
          aria-label={`Message ${agentName}`}
        />
        <button type="submit" className={styles.send} disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
