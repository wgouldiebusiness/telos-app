'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import { createClient } from '@/lib/supabase/client'
import styles from '@/app/(marketing)/login/page.module.css'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.updateUser({ password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/portal')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <Logo size="lg" />
          <h1 className={styles.title}>Set a new password</h1>
          <p className={styles.sub}>Choose a strong password for your account.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">New password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className={styles.input}
              placeholder="Min. 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              className={styles.input}
              placeholder="Repeat password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <span>{loading ? 'Updating...' : 'Update password'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
