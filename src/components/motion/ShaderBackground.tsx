'use client'
import { useEffect, useRef } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './ShaderBackground.module.css'

export default function ShaderBackground() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    let lastY = 0

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!innerRef.current) return
        // Parallax: canvas drifts down at 18% of scroll speed
        const y = window.scrollY * 0.18
        innerRef.current.style.transform = `translateY(${y}px)`
        lastY = y
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className={styles.root} aria-hidden="true">
      {/* Inner div is 140% tall, centred, so parallax never shows blank edges */}
      <div ref={innerRef} className={styles.inner}>
        <MeshGradient
          className={styles.layer}
          colors={['#000000', '#0A0010', '#7868E6', '#000000', '#0D0820']}
          speed={0.12}
        />
      </div>
    </div>
  )
}
