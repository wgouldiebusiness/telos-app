'use client'
import { useState, useTransition } from 'react'
import { joinWaitlist } from '@/app/actions/waitlist'
import styles from './WaitlistForm.module.css'

// ── Swap the call-to-action copy here, in ONE place. ──
// "Join the waitlist" reads best next to the homepage section; "Request a demo"
// is the obvious alternative. Change the default, or pass `submitText` per use.
const DEFAULT_SUBMIT_TEXT = 'Join the waitlist'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Props {
  /** Tags the signup so you can tell later where it came from. */
  source?: string
  /** Override the button copy for a specific placement. */
  submitText?: string
}

export default function WaitlistForm({
  source = 'homepage',
  submitText = DEFAULT_SUBMIT_TEXT,
}: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [honeypot, setHoneypot] = useState('') // bots fill this; humans never see it
  const [emailError, setEmailError] = useState('')
  const [formError, setFormError] = useState('')
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')

    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')

    startTransition(async () => {
      // The action handles its own failures, but if the call itself throws
      // (network drop, deploy mid-flight) the user must still see an honest
      // error — never a silent reset.
      try {
        const res = await joinWaitlist({
          email: trimmed,
          name,
          business,
          source,
          company_website: honeypot,
        })
        if (res.ok) setDone(true)
        else setFormError(res.error ?? 'Something went wrong. Please try again.')
      } catch {
        setFormError('We could not reach the server. Please check your connection and try again.')
      }
    })
  }

  if (done) {
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <span className={styles.successMark} aria-hidden="true">✓</span>
          <h3 className={styles.successTitle}>You’re on the list.</h3>
          <p className={styles.successText}>
            Thanks for joining. We’ll be in touch the moment there’s a slot worth
            your time. Keep an eye on your inbox for a confirmation.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Honeypot — visually hidden, off-screen, not tabbable. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="wl-email" className={styles.label}>
            Email <span className={styles.req}>*</span>
          </label>
          <input
            id="wl-email"
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            placeholder="you@business.com"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            className={`${styles.input} ${emailError ? styles.inputError : ''}`}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? 'wl-email-error' : undefined}
          />
          {emailError && (
            <p id="wl-email-error" className={styles.error}>
              {emailError}
            </p>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="wl-name" className={styles.label}>
              Name <span className={styles.opt}>optional</span>
            </label>
            <input
              id="wl-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="wl-business" className={styles.label}>
              Business <span className={styles.opt}>optional</span>
            </label>
            <input
              id="wl-business"
              name="business"
              type="text"
              autoComplete="organization"
              placeholder="Business name"
              value={business}
              onChange={e => setBusiness(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        {formError && (
          <p className={styles.error} role="alert">
            {formError}
          </p>
        )}

        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? 'Joining…' : submitText}
        </button>
        <p className={styles.note}>No spam. Just a note when it matters.</p>
      </form>
    </div>
  )
}
