import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Log in to your Telos AI client portal.',
}

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <Logo size="lg" />
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.sub}>Log in to your Telos AI portal</p>
        </div>

        <form className={styles.form} action="#">
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
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            <span>Log in</span>
          </button>
        </form>

        <p className={styles.footer}>
          Do not have an account?{' '}
          <Link href="/signup" className={styles.link}>Create one</Link>
        </p>
      </div>
    </div>
  )
}
