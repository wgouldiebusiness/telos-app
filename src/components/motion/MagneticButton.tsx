'use client'

import { useRef, ReactNode } from 'react'
import styles from './MagneticButton.module.css'

interface Props {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  target?: string
}

export default function MagneticButton({ children, className, href, onClick, type = 'button', disabled, target }: Props) {
  const btnRef = useRef<HTMLElement>(null)

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x    = e.clientX - rect.left - rect.width  / 2
    const y    = e.clientY - rect.top  - rect.height / 2
    btnRef.current.style.transform = `translate(${x * 0.28}px, ${y * 0.36}px)`
  }

  function onLeave() {
    if (!btnRef.current) return
    btnRef.current.style.transform = ''
    btnRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
  }

  function onEnter() {
    if (!btnRef.current) return
    btnRef.current.style.transition = 'transform 0.1s ease'
  }

  const shared = {
    ref: btnRef as React.Ref<HTMLAnchorElement & HTMLButtonElement>,
    className: `${styles.btn} ${className ?? ''}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onMouseEnter: onEnter,
  }

  if (href) {
    return (
      <a {...shared} href={href} target={target}>
        {children}
      </a>
    )
  }

  return (
    <button {...shared} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
