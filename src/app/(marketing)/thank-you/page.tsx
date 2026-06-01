import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Call Booked',
  description: 'Your call with Telos AI is confirmed.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.inner}`}>

        {/* Tick */}
        <div className={styles.icon}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="23" stroke="#7868E6" strokeWidth="2"/>
            <path d="M14 24l8 8 12-16" stroke="#7868E6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className={styles.heading}>You are booked in.</h1>

        <p className={styles.sub}>
          You will receive a calendar invite and confirmation shortly.
          The call is 15 minutes over Google Meet.
        </p>

        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepN}>01</span>
            <div>
              <h3 className={styles.stepTitle}>Check your inbox</h3>
              <p className={styles.stepDesc}>A confirmation email and calendar invite is on its way.</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepN}>02</span>
            <div>
              <h3 className={styles.stepTitle}>Think about your biggest bottleneck</h3>
              <p className={styles.stepDesc}>Where does the most time go in your business right now? That is usually where we start.</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepN}>03</span>
            <div>
              <h3 className={styles.stepTitle}>We will take it from there</h3>
              <p className={styles.stepDesc}>We will come prepared with questions and ideas specific to your type of business.</p>
            </div>
          </div>
        </div>

        <Link href="/" className={styles.homeBtn}>Back to home</Link>

      </div>
    </section>
  )
}
