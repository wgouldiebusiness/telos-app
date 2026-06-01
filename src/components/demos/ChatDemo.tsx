'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ChatDemo.module.css'

export type ChatMessage = {
  from:          'user' | 'ai'
  text:          string
  typingDelay?:  number   // ms to show typing indicator before message appears
}

interface Props {
  agentName:    string
  tagline:      string
  messages:     ChatMessage[]
  loopPause?:   number   // ms to pause before restarting (default 3000)
}

export default function ChatDemo({ agentName, tagline, messages, loopPause = 3000 }: Props) {
  const [shown, setShown]           = useState<{ from: 'user'|'ai'; text: string }[]>([])
  const [typing, setTyping]         = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [typingIdx, setTypingIdx]   = useState(-1)
  const listRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    let cancelled = false

    async function play() {
      while (!cancelled) {
        setShown([])
        setTyping(false)
        setDisplayedText('')
        setTypingIdx(-1)
        await sleep(600)

        for (let i = 0; i < messages.length; i++) {
          if (cancelled) return
          const msg = messages[i]

          if (msg.from === 'ai') {
            setTypingIdx(i)
            setTyping(true)
            await sleep(msg.typingDelay ?? 1000)
            if (cancelled) return
            setTyping(false)
            setTypingIdx(-1)
            // type out character by character
            let str = ''
            for (const char of msg.text) {
              if (cancelled) return
              str += char
              setDisplayedText(str)
              await sleep(18)
            }
            setShown(prev => [...prev, { from: 'ai', text: msg.text }])
            setDisplayedText('')
          } else {
            await sleep(400)
            if (cancelled) return
            setShown(prev => [...prev, { from: 'user', text: msg.text }])
          }
          await sleep(450)
        }

        await sleep(loopPause)
      }
    }

    play()
    return () => { cancelled = true; clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [shown, typing, displayedText])

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.liveDot} />
          <span className={styles.agentName}>{agentName}</span>
        </div>
        <span className={styles.liveLabel}>Live</span>
      </div>

      {/* Tagline */}
      <div className={styles.tagline}>{tagline}</div>

      {/* Chat window */}
      <div ref={listRef} className={styles.chat}>
        {shown.map((msg, i) => (
          <div key={i} className={`${styles.bubble} ${msg.from === 'ai' ? styles.bubbleAi : styles.bubbleUser}`}>
            {msg.text}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className={`${styles.bubble} ${styles.bubbleAi} ${styles.typingBubble}`}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        )}

        {/* Current AI message being typed */}
        {displayedText && (
          <div className={`${styles.bubble} ${styles.bubbleAi}`}>
            {displayedText}
            <span className={styles.cursor} />
          </div>
        )}
      </div>

      {/* Disabled input */}
      <div className={styles.inputRow}>
        <input className={styles.input} placeholder="Type a message..." disabled />
        <button className={styles.sendBtn} disabled aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
