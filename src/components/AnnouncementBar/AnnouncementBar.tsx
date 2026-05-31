'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './AnnouncementBar.module.css'

const KEY    = 'telos-bar-v1'
const BAR_H  = '44px'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(KEY)) {
      setVisible(true)
      document.documentElement.style.setProperty('--bar-h', BAR_H)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(KEY, '1')
    document.documentElement.style.setProperty('--bar-h', '0px')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.bar} role="banner">
      <div className={styles.inner}>
        <span className={styles.dot} aria-hidden="true" />
        <p className={styles.text}>
          Now taking on new clients for Q3 2026. Places are limited.{' '}
          <Link href="/contact" className={styles.link} onClick={dismiss}>
            Book a call to secure yours
          </Link>
        </p>
        <button className={styles.close} onClick={dismiss} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  )
}
