'use client'

import { useEffect, useState } from 'react'
import styles from './PipelineDemo.module.css'

const steps = [
  {
    icon: '📞',
    label: 'Missed call',
    text: 'Missed call from: 07700 900 123',
  },
  {
    icon: '💬',
    label: 'AI responds',
    text: 'AI sends SMS within 30 seconds: "Hi, sorry we missed your call. We would love to help. Can we call you back, or book a time that suits you?"',
  },
  {
    icon: '✅',
    label: 'Lead replies',
    text: 'Lead replies: "Yes, tomorrow morning works"',
  },
  {
    icon: '📅',
    label: 'Booked',
    text: 'Booking confirmed. Lead added to CRM. Owner notified.',
  },
]

export default function PipelineDemo() {
  const [visible, setVisible] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false

    async function play() {
      while (!cancelled) {
        setVisible([])
        await sleep(800)
        for (let i = 0; i < steps.length; i++) {
          if (cancelled) return
          await sleep(i === 0 ? 0 : 2000)
          setVisible(prev => [...prev, i])
        }
        await sleep(3500)
      }
    }

    play()
    return () => { cancelled = true }
  }, [])

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.liveDot} />
          <span className={styles.agentName}>Telos Pipeline</span>
        </div>
        <span className={styles.liveLabel}>Live</span>
      </div>
      <div className={styles.tagline}>No lead goes cold. Ever.</div>

      <div className={styles.flow}>
        {steps.map((s, i) => (
          <div
            key={i}
            className={`${styles.step} ${visible.includes(i) ? styles.stepVisible : ''}`}
          >
            <div className={styles.stepIcon}>{s.icon}</div>
            <div className={styles.stepContent}>
              <span className={styles.stepLabel}>{s.label}</span>
              <p className={styles.stepText}>{s.text}</p>
            </div>
          </div>
        ))}
      </div>

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
