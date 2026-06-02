'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mouse = useRef({ x: 0, y: 0 })
  const ring  = useRef({ x: 0, y: 0 })
  const raf   = useRef<number>(0)

  useEffect(() => {
    // Only show on desktop pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    setVisible(true)

    function onMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    function onOver(e: MouseEvent) {
      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')
      setHovered(!!interactive)
    }

    function animate() {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <div ref={dotRef}  className={`${styles.dot}  ${hovered ? styles.dotHover  : ''}`} />
      <div ref={ringRef} className={`${styles.ring} ${hovered ? styles.ringHover : ''}`} />
    </>
  )
}
