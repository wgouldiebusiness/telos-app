'use client'

import { useState } from 'react'
import styles from './PricingFAQ.module.css'

type FAQ = { q: string; a: string }

export default function PricingFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className={styles.list}>
      {faqs.map((faq, i) => {
        const isOpen = open === i
        return (
          <div key={faq.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
            <button
              className={styles.trigger}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={styles.q}>{faq.q}</span>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div className={styles.answer} aria-hidden={!isOpen}>
              <p className={styles.a}>{faq.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
