'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Proxy redirects master users to /admin automatically
    router.push('/portal')
    router.refresh()
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <Logo size="lg" />
          <h1 className={styles.title}>The Members Room</h1>
          <p className={styles.sub}>Sign in to view your dashboard, reports, and requests.</p>
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
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">Password</label>
              <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={styles.input}
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <span>{loading ? 'Entering...' : 'Enter the Portal'}</span>
          </button>
        </form>

        <p className={styles.footer}>
          No account yet?{' '}
          <Link href="/signup" className={styles.link}>Create one</Link>
        </p>
      </div>
    </div>
  )
}
