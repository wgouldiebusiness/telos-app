import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import styles from '../login/page.module.css'
import signupStyles from './page.module.css'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a Telos AI client account.',
}

export default function SignupPage() {
  return (
    <div className={styles.page}>
      <div className={`${styles.card} ${signupStyles.wider}`}>
        <div className={styles.cardHead}>
          <Logo size="lg" />
          <h1 className={styles.title}>Create a business account</h1>
          <p className={styles.sub}>Get access to your Telos AI client portal</p>
        </div>

        <form className={styles.form} action="#">
          <div className={signupStyles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="businessName">Business name</label>
              <input id="businessName" name="businessName" type="text" required className={styles.input} placeholder="Your Business Ltd" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="contactName">Your name</label>
              <input id="contactName" name="contactName" type="text" autoComplete="name" required className={styles.input} placeholder="Full name" />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" required className={styles.input} placeholder="+44 7700 000000" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Business email</label>
            <input id="email" name="email" type="email" autoComplete="email" required className={styles.input} placeholder="you@yourbusiness.co.uk" />
          </div>
          <div className={signupStyles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required className={styles.input} placeholder="Min. 8 characters" />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirm">Confirm password</label>
              <input id="confirm" name="confirm" type="password" autoComplete="new-password" required className={styles.input} placeholder="Repeat password" />
            </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
            <span>Create account</span>
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
