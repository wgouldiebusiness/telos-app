'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChatTurn } from '@/agents/shared/claude'
import styles from './ChatWidget.module.css'

const GREETING =
  'Hi, I am Telos. Ask me anything about what we build, or how we could help your business.'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ChatTurn[]>([])
  const threadRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight
  }, [history, loading])

  async function send() {
    const message = input.trim()
    if (!message || loading) return

    const next: ChatTurn[] = [...history, { role: 'user', content: message }]
    setHistory(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      })
      const data = await res.json()
      const reply = data.reply || data.error || 'Sorry, please try again.'
      setHistory([...next, { role: 'assistant', content: reply }])
    } catch {
      setHistory([
        ...next,
        { role: 'assistant', content: 'Something went wrong. Please try again, or book a call.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating launch button */}
      <button
        className={styles.launcher}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Telos AI chat">
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.dot} />
              <span className={styles.headerName}>Telos AI</span>
            </div>
            <span className={styles.headerStatus}>Online</span>
          </div>

          <div ref={threadRef} className={styles.thread}>
            <div className={`${styles.bubble} ${styles.bubbleAgent}`}>{GREETING}</div>
            {history.map((m, i) => (
              <div
                key={i}
                className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleAgent}`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className={`${styles.bubble} ${styles.bubbleAgent} ${styles.typing}`}>
                <span /><span /><span />
              </div>
            )}
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a message..."
              aria-label="Message"
            />
            <button className={styles.send} onClick={send} disabled={loading || !input.trim()} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
