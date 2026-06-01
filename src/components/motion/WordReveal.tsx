'use client'

import { useEffect, useRef } from 'react'
import styles from './WordReveal.module.css'

interface Props {
  children: string
  tag?: 'h1' | 'h2'
  className?: string
  delay?: number
}

export default function WordReveal({ children, tag: Tag = 'h1', className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll<HTMLSpanElement>('.' + styles.word)
    words.forEach((w, i) => {
      setTimeout(() => {
        w.classList.add(styles.wordVisible)
      }, delay + i * 80)
    })
  }, [delay])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`${styles.heading} ${className ?? ''}`} aria-label={children}>
      {children.split(' ').map((word, i) => (
        <span key={i} className={styles.word} aria-hidden="true">
          {word}{i < children.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
