'use client'
import { useEffect, useRef } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import styles from './ShaderBackground.module.css'

export default function ShaderBackground() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!innerRef.current) return
        innerRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`
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
      {/* Parallax mesh gradient */}
      <div ref={innerRef} className={styles.inner}>
        <MeshGradient
          className={styles.layer}
          colors={['#000000', '#080010', '#7868E6', '#000000', '#0D0820']}
          speed={0.1}
        />
      </div>

      {/* Fixed CSS blob glows — visible behind every section */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      <div className={styles.blob4} />
    </div>
  )
}
