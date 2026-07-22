'use client'

// ─────────────────────────────────────────────────────────────
// Legal document shell: renders the header block and a two-column
// layout with a sticky, scroll-spy table of contents on the left and
// the document body on the right. The TOC is built automatically from
// the <h2> headings in the body, so pages just supply their sections
// as children — no manual id wiring.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import styles from './legal.module.css'

interface Props {
  title: string
  updated: string
  email?: string
  children: React.ReactNode
}

export default function LegalShell({
  title,
  updated,
  email = 'william.gouldsmith@telosai.co.uk',
  children,
}: Props) {
  const articleRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<{ id: string; label: string }[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const root = articleRef.current
    if (!root) return

    const headings = Array.from(root.querySelectorAll('h2'))
    const next = headings.map((h, i) => {
      const id = h.id || `sec-${i}`
      h.id = id
      return { id, label: h.textContent?.trim() || `Section ${i + 1}` }
    })
    setItems(next)
    setActive(next[0]?.id ?? '')

    const onScroll = () => {
      const y = 140
      let current = next[0]?.id ?? ''
      for (const { id } of next) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= y) current = id
      }
      setActive(prev => (prev === current ? prev : current))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [children])

  return (
    <div className={styles.page}>
      <div className={styles.docHead}>
        <span className={styles.kicker}>Legal &middot; {title}</span>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.badges}>
          <span className={styles.meta}>Last updated {updated}</span>
          <a href={`mailto:${email}`} className={styles.emailPill}>{email}</a>
        </div>
      </div>

      <div className={styles.grid}>
        <nav className={styles.toc} aria-label="On this page">
          {items.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.tocLink} ${active === item.id ? styles.tocLinkActive : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.article} ref={articleRef}>
          {children}
        </div>
      </div>
    </div>
  )
}
