import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>This page does not exist.</h1>
        <p className={styles.sub}>
          The link may have changed or the page may have been removed.
        </p>
        <div className={styles.links}>
          <Link href="/" className={styles.btnPri}>Back to homepage</Link>
          <Link href="/contact" className={styles.btnSec}>Get in touch</Link>
        </div>
      </div>
    </div>
  )
}
