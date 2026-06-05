'use client'
import { useState } from 'react'
import styles from './page.module.css'

interface Service {
  n: string
  title: string
  desc: string
  tags: string[]
}

export default function MediaAccordion({ services }: { services: Service[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className={styles.accordion}>
      {services.map((s, i) => (
        <div
          key={s.n}
          className={`${styles.accordionRow} ${open === i ? styles.accordionOpen : ''}`}
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div className={styles.accordionHead}>
            <span className={styles.accordionNum}>{s.n}</span>
            <span className={styles.accordionTitle}>{s.title}</span>
            <span className={styles.accordionArrow}>
              <svg
                width="20" height="20" viewBox="0 0 20 20" fill="none"
                style={{ transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}
              >
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          <div className={styles.accordionBody}>
            <p className={styles.accordionDesc}>{s.desc}</p>
            <div className={styles.accordionTags}>
              {s.tags.map(t => (
                <span key={t} className={styles.accordionTag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
