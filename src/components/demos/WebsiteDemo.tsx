'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './WebsiteDemo.module.css'

export interface DemoPage {
  label: string
  path:  string
}

interface Props {
  name:     string
  category: string
  url:      string
  pages:    DemoPage[]
}

const IFRAME_WIDTH = 1280

export default function WebsiteDemo({ name, category, url, pages }: Props) {
  const [active, setActive]       = useState(0)
  const [scale, setScale]         = useState(0)
  const [frameHeight, setFrameHeight] = useState(900)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function update() {
      if (!wrapRef.current) return
      const w = wrapRef.current.offsetWidth
      if (!w) return
      const s = w / IFRAME_WIDTH
      setScale(s)
      // fixed preview area is 380px tall; iframe height fills it exactly
      setFrameHeight(Math.round(380 / s))
    }

    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div className={styles.card}>
      {/* Browser chrome */}
      <div className={styles.chrome}>
        <div className={styles.dots}>
          <span className={styles.dotR} />
          <span className={styles.dotY} />
          <span className={styles.dotG} />
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

      {/* Scaled iframe — shows real website, non-interactive */}
      <div ref={wrapRef} className={styles.previewWrap}>
        {scale > 0 && (
          <iframe
            key={pages[active].path}
            src={pages[active].path}
            className={styles.frame}
            style={{
              width:           `${IFRAME_WIDTH}px`,
              height:          `${frameHeight}px`,
              transform:       `scale(${scale})`,
              transformOrigin: '0 0',
            }}
            title={`${name} ${pages[active].label}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>

      {/* Footer — info only, no links */}
      <div className={styles.footer}>
        <span className={styles.category}>{category}</span>
        <span className={styles.siteName}>{name}</span>
      </div>
    </div>
  )
}
