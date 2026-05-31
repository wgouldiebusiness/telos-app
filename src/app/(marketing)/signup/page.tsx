'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import { createClient } from '@/lib/supabase/client'
import styles from '../login/page.module.css'
import signupStyles from './page.module.css'

export default function SignupPage() {
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function update(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.contactName,
          business_name: form.businessName,
          phone: form.phone,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.session) {
      // Email confirmation disabled: go straight to onboarding
      window.location.href = '/onboarding'
      return
    }

    // Email confirmation required: show success message
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <Logo size="lg" />
            <h1 className={styles.title}>Check your email</h1>
            <p className={styles.sub}>
              We have sent a confirmation link to <strong>{form.email}</strong>.
              Click the link to confirm your account and complete setup.
            </p>
          </div>
          <p className={styles.footer}>
            Wrong email?{' '}
            <button
              className={styles.link}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              onClick={() => setSuccess(false)}
            >
              Go back
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${signupStyles.wider}`}>
        <div className={styles.cardHead}>
          <Logo size="lg" />
          <h1 className={styles.title}>Create a business account</h1>
          <p className={styles.sub}>Get access to your Telos AI client portal</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={signupStyles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="businessName">Business name</label>
              <input id="businessName" name="businessName" type="text" required className={styles.input} placeholder="Your Business Ltd" value={form.businessName} onChange={update('businessName')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="contactName">Your name</label>
              <input id="contactName" name="contactName" type="text" autoComplete="name" required className={styles.input} placeholder="Full name" value={form.contactName} onChange={update('contactName')} />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" required className={styles.input} placeholder="+44 7700 000000" value={form.phone} onChange={update('phone')} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Business email</label>
            <input id="email" name="email" type="email" autoComplete="email" required className={styles.input} placeholder="you@yourbusiness.co.uk" value={form.email} onChange={update('email')} />
          </div>
          <div className={signupStyles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required className={styles.input} placeholder="Min. 8 characters" value={form.password} onChange={update('password')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirm">Confirm password</label>
              <input id="confirm" name="confirm" type="password" autoComplete="new-password" required className={styles.input} placeholder="Repeat password" value={form.confirm} onChange={update('confirm')} />
            </div>
          </div>
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <span>{loading ? 'Creating account...' : 'Create account'}</span>
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link href="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  )
}
