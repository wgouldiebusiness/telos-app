'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onboardingQuestions } from './questions'
import styles from './OnboardingChat.module.css'

interface Line {
  from: 'bot' | 'user'
  text: string
}

export default function OnboardingChat() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [lines, setLines] = useState<Line[]>([{ from: 'bot', text: onboardingQuestions[0].question }])
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight
  }, [lines, saving])

  async function submit() {
    const value = input.trim()
    if (!value || saving) return

    const q = onboardingQuestions[step]
    const nextAnswers = { ...answers, [q.field]: value }
    const nextLines: Line[] = [...lines, { from: 'user', text: value }]
    setAnswers(nextAnswers)
    setInput('')

    const isLast = step === onboardingQuestions.length - 1
    if (!isLast) {
      const next = step + 1
      nextLines.push({ from: 'bot', text: onboardingQuestions[next].question })
      setLines(nextLines)
      setStep(next)
      return
    }

    // Final answer — save the brief.
    nextLines.push({ from: 'bot', text: 'Thank you. Putting your brief together now...' })
    setLines(nextLines)
    setSaving(true)

    try {
      const res = await fetch('/api/onboarding-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: nextAnswers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setLines(l => [
        ...l,
        { from: 'bot', text: 'Your brief is ready. William will begin building your agent within one working day.' },
      ])
      setDone(true)
    } catch {
      setLines(l => [
        ...l,
        { from: 'bot', text: 'Something went wrong saving your brief. Please try again, or contact William directly.' },
      ])
    } finally {
      setSaving(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const progress = Math.round(((done ? onboardingQuestions.length : step) / onboardingQuestions.length) * 100)

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.head}>
          <div className={styles.brandRow}>
            <span className={styles.dot} />
            <span className={styles.brand}>Telos AI</span>
          </div>
          <span className={styles.progressLabel}>
            {done ? 'Complete' : `${step + 1} of ${onboardingQuestions.length}`}
          </span>
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <div ref={threadRef} className={styles.thread}>
          {lines.map((l, i) => (
            <div key={i} className={`${styles.bubble} ${l.from === 'user' ? styles.user : styles.bot}`}>
              {l.text}
            </div>
          ))}
          {saving && (
            <div className={`${styles.bubble} ${styles.bot} ${styles.typing}`}><span /><span /><span /></div>
          )}
        </div>

        {done ? (
          <button className={styles.finish} onClick={() => router.push('/portal')}>
            Go to my dashboard
          </button>
        ) : (
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your answer..."
              disabled={saving}
              aria-label="Your answer"
            />
            <button className={styles.send} onClick={submit} disabled={saving || !input.trim()} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
