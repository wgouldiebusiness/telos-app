'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import { createClient } from '@/lib/supabase/client'
import styles from '../login/page.module.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <Logo size="lg" />
            <h1 className={styles.title}>Email sent</h1>
            <p className={styles.sub}>
              If an account exists for <strong>{email}</strong>, you will receive a reset link shortly.
              Check your inbox and spam folder.
            </p>
          </div>
          <p className={styles.footer}>
            <Link href="/login" className={styles.link}>Back to log in</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <Logo size="lg" />
          <h1 className={styles.title}>Reset your password</h1>
          <p className={styles.sub}>Enter your email and we will send you a reset link.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={styles.input}
              placeholder="you@yourbusiness.co.uk"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <span>{loading ? 'Sending...' : 'Send reset link'}</span>
          </button>
        </form>

        <p className={styles.footer}>
          <Link href="/login" className={styles.link}>Back to log in</Link>
        </p>
      </div>
    </div>
  )
}
