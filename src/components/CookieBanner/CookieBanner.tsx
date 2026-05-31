'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './CookieBanner.module.css'

const KEY = 'telos-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choice = localStorage.getItem(KEY)
    if (!choice) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.inner}>
        <p className={styles.text}>
          We use essential cookies to keep the portal working and optional analytics
          cookies to understand how the site is used. No advertising. No cross-site
          tracking.{' '}
          <Link href="/cookies" className={styles.link}>Cookie Policy</Link>
        </p>
        <div className={styles.actions}>
          <button className={styles.btnDecline} onClick={decline}>
            Essential only
          </button>
          <button className={styles.btnAccept} onClick={accept}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
