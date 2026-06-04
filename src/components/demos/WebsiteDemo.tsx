'use client'

import { useState } from 'react'
import styles from './WebsiteDemo.module.css'

export interface DemoPage {
  label:      string
  screenshot: string
  href:       string
}

interface Props {
  name:     string
  category: string
  url:      string
  pages:    DemoPage[]
}

export default function WebsiteDemo({ name, category, url, pages }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className={styles.card}>
      {/* Browser chrome */}
      <div className={styles.chrome}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
        </div>
        <div className={styles.urlBar}>
          <span className={styles.urlText}>{url}</span>
        </div>
      </div>

      {/* Page tabs */}
      <div className={styles.tabs}>
        {pages.map((p, i) => (
          <button
            key={p.label}
            className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
            onClick={() => setActive(i)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Screenshot preview */}
      <a
        href={pages[active].href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.preview}
        title={`Open ${name} — ${pages[active].label}`}
      >
        <img
          key={pages[active].screenshot}
          src={pages[active].screenshot}
          alt={`${name} — ${pages[active].label}`}
          className={styles.screenshot}
        />
        <div className={styles.previewOverlay}>
          <span className={styles.previewLabel}>Open demo →</span>
        </div>
      </a>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.category}>{category}</span>
          <span className={styles.siteName}>{name}</span>
        </div>
        <a
          href={pages[active].href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openBtn}
        >
          View full demo
        </a>
      </div>
    </div>
  )
}
