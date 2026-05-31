'use client'

import { useState } from 'react'
import Logo from '@/components/Logo/Logo'
import { completeOnboarding } from '@/app/actions/onboarding'
import styles from './page.module.css'

const INDUSTRIES = [
  'Healthcare and wellness',
  'Professional services',
  'Trades and construction',
  'Retail and e-commerce',
  'Hospitality and events',
  'Education and coaching',
  'Financial services',
  'Other',
]

const HEARD_OPTIONS = [
  'Google or web search',
  'Social media',
  'Referral from someone I know',
  'LinkedIn',
  'Word of mouth',
  'Other',
]

export default function OnboardingPage() {
  const [step, setStep]           = useState(1)
  const [industry, setIndustry]   = useState('')
  const [painPoint, setPainPoint] = useState('')
  const [heard, setHeard]         = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  async function handleFinish() {
    if (!heard) {
      setError('Please tell us how you found us.')
      return
    }
    setError('')
    setLoading(true)

    const result = await completeOnboarding({ industry, painPoint, heard })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.head}>
          <Logo size="lg" />
          <div className={styles.steps}>
            <span className={step >= 1 ? styles.stepActive : styles.stepDot} />
            <span className={step >= 2 ? styles.stepActive : styles.stepDot} />
            <span className={step >= 3 ? styles.stepActive : styles.stepDot} />
          </div>
        </div>

        {step === 1 && (
          <div className={styles.section}>
            <h1 className={styles.title}>What does your business do?</h1>
            <p className={styles.sub}>This helps us recommend the right automations for you.</p>
            <div className={styles.grid}>
              {INDUSTRIES.map(ind => (
                <button
                  key={ind}
                  type="button"
                  className={`${styles.pill} ${industry === ind ? styles.pillActive : ''}`}
                  onClick={() => setIndustry(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>
            <button
              className={styles.nextBtn}
              onClick={() => { if (industry) setStep(2) }}
              disabled={!industry}
            >
              <span>Continue</span>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.section}>
            <h1 className={styles.title}>What is your biggest time drain?</h1>
            <p className={styles.sub}>Be specific. Even a single sentence helps us build the right solution.</p>
            <textarea
              className={styles.textArea}
              rows={5}
              placeholder="For example: I spend two hours a day on appointment reminders and chasing unpaid invoices."
              value={painPoint}
              onChange={e => setPainPoint(e.target.value)}
            />
            <div className={styles.btnRow}>
              <button className={styles.backBtn} type="button" onClick={() => setStep(1)}>Back</button>
              <button
                className={styles.nextBtn}
                onClick={() => { if (painPoint.trim()) setStep(3) }}
                disabled={!painPoint.trim()}
              >
                <span>Continue</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.section}>
            <h1 className={styles.title}>How did you find us?</h1>
            <p className={styles.sub}>Helps us understand where our clients come from.</p>
            <div className={styles.grid}>
              {HEARD_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={`${styles.pill} ${heard === opt ? styles.pillActive : ''}`}
                  onClick={() => setHeard(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <div className={styles.btnRow}>
              <button className={styles.backBtn} type="button" onClick={() => setStep(2)}>Back</button>
              <button
                className={styles.nextBtn}
                onClick={handleFinish}
                disabled={loading}
              >
                <span>{loading ? 'Setting up...' : 'Go to my portal'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
