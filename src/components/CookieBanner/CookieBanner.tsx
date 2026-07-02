'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './CookieBanner.module.css'
import { getConsent, setConsent, type Consent } from '@/lib/consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show only if no choice has been recorded yet.
    if (!getConsent()) setVisible(true)
  }, [])

  function choose(value: Consent) {
    setConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.inner}>
        <p className={styles.text}>
          We use essential cookies to keep the site working. With your consent we
          also use optional analytics cookies, and advertising cookies when we run
          ad campaigns. Decline and only essential cookies are set.{' '}
          <Link href="/cookies" className={styles.link}>Cookie Policy</Link>
        </p>
        <div className={styles.actions}>
          <button className={styles.btnDecline} onClick={() => choose('declined')}>
            Essential only
          </button>
          <button className={styles.btnAccept} onClick={() => choose('accepted')}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
