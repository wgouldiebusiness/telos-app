'use client'

// ─────────────────────────────────────────────────────────────
// Prospect scoping wizard (four steps → review → done). This is the
// PRE-client intake shown at /get-started, distinct from the authed
// post-signup flow at /onboarding. UI only for now: submit shows the
// success state. Wire `onComplete` to a server action when ready.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import Link from 'next/link'
import styles from './GetStartedWizard.module.css'

const STEP_LABELS = ['Business', 'Challenges', 'Services', 'Review']

const INDUSTRIES = [
  'Field and trades',
  'Professional services',
  'Hospitality',
  'Retail and ecommerce',
  'Healthcare',
  'Other',
]
const TEAM_SIZES = ['1-5', '6-20', '21-50', '50+']
const CHALLENGES = [
  'Manual data entry eating hours',
  'Leads falling through the cracks',
  'No visibility into what is happening',
  'Too many disconnected tools',
  'Reporting takes too long',
  'Repetitive admin work',
]
const SERVICES = [
  'Custom software',
  'Workflow automation',
  'AI agents',
  'Systems integration',
  'Ongoing support and iteration',
]
const BUDGETS = ['Under £2k/mo', '£2k–£5k/mo', '£5k–£10k/mo', '£10k+/mo']
const TIMELINES = ['ASAP', 'Within a month', '1–3 months', 'Just exploring']

export default function GetStartedWizard() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  const [website, setWebsite] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [challenges, setChallenges] = useState<string[]>([])
  const [challengesOther, setChallengesOther] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')

  const toggle = (
    value: string,
    list: string[],
    set: (v: string[]) => void,
  ) => set(list.includes(value) ? list.filter(v => v !== value) : [...list, value])

  const canContinue = (s: number) => {
    if (s === 0) return businessName.trim().length > 0
    if (s === 1) return challenges.length > 0
    if (s === 2) return services.length > 0 && !!budget && !!timeline
    return true
  }

  const next = () => { if (canContinue(step)) setStep(s => Math.min(3, s + 1)) }
  const back = () => setStep(s => Math.max(0, s - 1))

  if (done) {
    return (
      <div className={styles.doneWrap}>
        <span className={styles.doneMark} aria-hidden="true">✓</span>
        <h1 className={styles.doneTitle}>You are all set.</h1>
        <p className={styles.doneText}>
          We have got what we need to start scoping {businessName.trim() || 'your business'}
          &rsquo;s build. We will be in touch within one business day.
        </p>
        <Link href="/" className={styles.doneLink}>Back to telosai.co.uk</Link>
      </div>
    )
  }

  return (
    <div className={styles.wizard}>
      {/* Step indicator */}
      <ol className={styles.steps} aria-label="Progress">
        {STEP_LABELS.map((label, i) => {
          const state = i < step ? 'done' : i === step ? 'active' : 'upcoming'
          return (
            <li key={label} className={styles.stepItem}>
              <span className={`${styles.stepCircle} ${styles[`circle_${state}`]}`}>
                {state === 'done' ? '✓' : i + 1}
              </span>
              <span className={`${styles.stepLabel} ${state === 'upcoming' ? styles.stepLabelMuted : ''}`}>
                {label}
              </span>
              {i < STEP_LABELS.length - 1 && (
                <span className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />
              )}
            </li>
          )
        })}
      </ol>

      {/* Step 0 — business details */}
      {step === 0 && (
        <div className={styles.section}>
          <div>
            <h1 className={styles.stepTitle}>Business details</h1>
            <p className={styles.stepSub}>Tell us who we are building for.</p>
          </div>
          <label className={styles.field}>
            <span className={styles.label}>Business name <span className={styles.req}>*</span></span>
            <input
              className={styles.input}
              type="text"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              placeholder="Acme Services Ltd"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Industry</span>
            <select className={styles.input} value={industry} onChange={e => setIndustry(e.target.value)}>
              <option value="">Select an industry</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </label>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Website</span>
              <input
                className={styles.input}
                type="text"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="acmeservices.co.uk"
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Team size</span>
              <select className={styles.input} value={teamSize} onChange={e => setTeamSize(e.target.value)}>
                <option value="">Select</option>
                {TEAM_SIZES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
          </div>
        </div>
      )}

      {/* Step 1 — operational challenges */}
      {step === 1 && (
        <div className={styles.section}>
          <div>
            <h1 className={styles.stepTitle}>Operational challenges</h1>
            <p className={styles.stepSub}>What is slowing your team down? Select all that apply.</p>
          </div>
          <div className={styles.chips}>
            {CHALLENGES.map(c => (
              <button
                key={c}
                type="button"
                className={`${styles.chip} ${challenges.includes(c) ? styles.chipActive : ''}`}
                onClick={() => toggle(c, challenges, setChallenges)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className={styles.field}>
            <span className={styles.label}>Anything else? <span className={styles.opt}>optional</span></span>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              rows={3}
              value={challengesOther}
              onChange={e => setChallengesOther(e.target.value)}
              placeholder="Add detail if it helps"
            />
          </label>
        </div>
      )}

      {/* Step 2 — service preferences */}
      {step === 2 && (
        <div className={styles.section}>
          <div>
            <h1 className={styles.stepTitle}>Service preferences</h1>
            <p className={styles.stepSub}>What are you hoping we build?</p>
          </div>
          <div className={styles.chips}>
            {SERVICES.map(s => (
              <button
                key={s}
                type="button"
                className={`${styles.chip} ${services.includes(s) ? styles.chipActive : ''}`}
                onClick={() => toggle(s, services, setServices)}
              >
                {s}
              </button>
            ))}
          </div>
          <div>
            <span className={styles.groupLabel}>Monthly budget</span>
            <div className={styles.chips}>
              {BUDGETS.map(b => (
                <button
                  key={b}
                  type="button"
                  className={`${styles.chip} ${budget === b ? styles.chipActive : ''}`}
                  onClick={() => setBudget(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={styles.groupLabel}>Timeline</span>
            <div className={styles.chips}>
              {TIMELINES.map(t => (
                <button
                  key={t}
                  type="button"
                  className={`${styles.chip} ${timeline === t ? styles.chipActive : ''}`}
                  onClick={() => setTimeline(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — review */}
      {step === 3 && (
        <div className={styles.section}>
          <div>
            <h1 className={styles.stepTitle}>Review</h1>
            <p className={styles.stepSub}>Check this over before we get started.</p>
          </div>
          {[
            {
              title: 'Business details',
              value: `${businessName || '—'}\n${industry || 'No industry set'}\n${website || 'No website'} · ${teamSize || 'Team size not set'}`,
              edit: 0,
            },
            {
              title: 'Operational challenges',
              value: (challenges.length ? challenges.join(', ') : '—') + (challengesOther ? `\n${challengesOther}` : ''),
              edit: 1,
            },
            {
              title: 'Service preferences',
              value: `${services.length ? services.join(', ') : '—'}\n${budget || 'Budget not set'} · ${timeline || 'Timeline not set'}`,
              edit: 2,
            },
          ].map(g => (
            <div key={g.title} className={styles.reviewCard}>
              <div className={styles.reviewHead}>
                <span className={styles.reviewTitle}>{g.title}</span>
                <button type="button" className={styles.reviewEdit} onClick={() => setStep(g.edit)}>Edit</button>
              </div>
              <div className={styles.reviewValue}>{g.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Nav */}
      <div className={styles.nav}>
        {step > 0
          ? <button type="button" className={styles.backBtn} onClick={back}>← Back</button>
          : <span />}
        {step < 3
          ? (
            <button
              type="button"
              className={styles.nextBtn}
              onClick={next}
              disabled={!canContinue(step)}
            >
              Continue →
            </button>
          )
          : (
            <button type="button" className={styles.nextBtn} onClick={() => setDone(true)}>
              Complete onboarding
            </button>
          )}
      </div>
    </div>
  )
}
