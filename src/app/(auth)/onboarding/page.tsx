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

const SIZES = [
  'Just me (solo)',
  '2 to 5 people',
  '6 to 20 people',
  '21 or more',
]

const GOAL_OPTIONS = [
  { value: 'admin',      label: 'Admin and scheduling' },
  { value: 'sales',      label: 'Lead capture and sales' },
  { value: 'customer',   label: 'Customer queries and support' },
  { value: 'reporting',  label: 'Reporting and analytics' },
  { value: 'invoicing',  label: 'Invoicing and payments' },
  { value: 'reviews',    label: 'Getting more reviews' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [industry, setIndustry] = useState('')
  const [size, setSize] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function toggleGoal(value: string) {
    setGoals(prev =>
      prev.includes(value) ? prev.filter(g => g !== value) : [...prev, value]
    )
  }

  async function handleFinish() {
    if (goals.length === 0) {
      setError('Please select at least one goal.')
      return
    }
    setError('')
    setLoading(true)

    const result = await completeOnboarding({
      businessName: '',
      industry,
      size,
      goals,
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // On success, the server action redirects to /portal
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
            <h1 className={styles.title}>How big is your team?</h1>
            <p className={styles.sub}>We scale the approach to fit your operation.</p>
            <div className={styles.grid}>
              {SIZES.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`${styles.pill} ${size === s ? styles.pillActive : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className={styles.btnRow}>
              <button className={styles.backBtn} type="button" onClick={() => setStep(1)}>Back</button>
              <button
                className={styles.nextBtn}
                onClick={() => { if (size) setStep(3) }}
                disabled={!size}
              >
                <span>Continue</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.section}>
            <h1 className={styles.title}>What do you want to automate first?</h1>
            <p className={styles.sub}>Select everything that applies. You can change this later.</p>
            <div className={styles.checkGrid}>
              {GOAL_OPTIONS.map(opt => (
                <label key={opt.value} className={`${styles.checkItem} ${goals.includes(opt.value) ? styles.checkActive : ''}`}>
                  <input
                    type="checkbox"
                    checked={goals.includes(opt.value)}
                    onChange={() => toggleGoal(opt.value)}
                    className={styles.checkInput}
                  />
                  <span className={styles.checkMark}>{goals.includes(opt.value) ? '✓' : ''}</span>
                  <span className={styles.checkLabel}>{opt.label}</span>
                </label>
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
