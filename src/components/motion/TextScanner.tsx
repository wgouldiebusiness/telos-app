'use client'

import { useEffect, useRef } from 'react'
import styles from './TextScanner.module.css'

interface Props {
  children: string
  tag?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  dark?: boolean
}

export default function TextScanner({ children, tag: Tag = 'h2', className, dark = true }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function update() {
      if (!el) return
      const words = el.querySelectorAll<HTMLSpanElement>('.' + styles.word)
      const vpH   = window.innerHeight
      const vpMid = vpH * 0.5

      words.forEach(word => {
        const rect   = word.getBoundingClientRect()
        const wMid   = rect.top + rect.height / 2
        const dist   = Math.abs(wMid - vpMid)
        const range  = vpH * 0.55
        const ratio  = Math.max(0, 1 - dist / range)
        const base   = dark ? 0.18 : 0.3
        const full   = dark ? 1    : 0.9
        const op     = base + (full - base) * ratio
        word.style.opacity = String(op)
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [dark])

  const wordNodes = children.split(' ').map((word, i) => (
    <span key={i} className={styles.word} style={{ opacity: dark ? 0.18 : 0.3 }}>
      {word}{i < children.split(' ').length - 1 ? ' ' : ''}
    </span>
  ))

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`${styles.scanner} ${dark ? styles.dark : styles.light} ${className ?? ''}`}>
      {wordNodes}
    </Tag>
  )
}
