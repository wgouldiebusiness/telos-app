'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './PhoneShowcase.module.css'

export interface PhoneDemo {
  name:     string
  category: string
  path:     string
}

interface Props {
  demos: PhoneDemo[]
}

const IFRAME_W = 390
const IFRAME_H = 4700

function dims(pw: number) {
  const scale     = (pw - 20) / IFRAME_W   // 20 = 2×10px horizontal bezel padding
  const screenH   = pw * 496 / 252
  const maxScroll = Math.max(0, Math.round(IFRAME_H * scale - screenH))
  return { scale, maxScroll }
}

export default function PhoneShowcase({ demos }: Props) {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const rowRef        = useRef<HTMLDivElement>(null)
  const firstPhoneRef = useRef<HTMLDivElement>(null)
  const wrapRefs      = useRef<(HTMLDivElement | null)[]>([])
  const rafRef        = useRef<number>(0)
  const maxScrollRef  = useRef(dims(252).maxScroll)
  const inView        = useInView(rowRef, { once: true, margin: '-100px 0px' })

  const [scale, setScale] = useState(dims(252).scale)

  // Measure the actual rendered phone width → update scale + CSS custom prop
  useEffect(() => {
    const phone = firstPhoneRef.current
    const row   = rowRef.current
    if (!phone || !row) return

    function measure() {
      const pw = phone!.offsetWidth
      if (!pw) return
      const d = dims(pw)
      row!.style.setProperty('--pw', `${pw}px`)
      setScale(d.scale)
      maxScrollRef.current = d.maxScroll
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(phone)
    return () => ro.disconnect()
  }, [])

  // Scroll-sync rAF — reads maxScrollRef so it never goes stale on resize
  useEffect(() => {
    function tick() {
      if (sectionRef.current) {
        // Skip scroll animation below mobile breakpoint
        if (window.innerWidth < 700) {
          wrapRefs.current.forEach(w => { if (w) w.style.transform = 'translateY(0)' })
        } else {
          const rect     = sectionRef.current.getBoundingClientRect()
          const total    = sectionRef.current.offsetHeight - window.innerHeight
          const progress = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0
          const ty       = -Math.round(progress * maxScrollRef.current)
          wrapRefs.current.forEach(w => { if (w) w.style.transform = `translateY(${ty}px)` })
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>

        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className={styles.label}>See it live</span>
          <h2 className={styles.heading}>Real websites. Scroll to explore.</h2>
          <p className={styles.sub}>Four builds, four industries. Scroll to browse each one.</p>
        </motion.div>

        <div ref={rowRef} className={styles.phonesRow}>
          {demos.map((demo, i) => (
            <motion.div
              key={demo.name}
              className={styles.phoneWrap}
              initial={{ opacity: 0, y: 72 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                ref={i === 0 ? firstPhoneRef : null}
                className={styles.phone}
              >
                <span className={styles.volUp} />
                <span className={styles.volDn} />
                <span className={styles.power} />

                <div className={styles.screen}>
                  <div
                    ref={el => { wrapRefs.current[i] = el }}
                    className={styles.iframeWrap}
                  >
                    <iframe
                      src={demo.path}
                      className={styles.frame}
                      style={{
                        width:           `${IFRAME_W}px`,
                        height:          `${IFRAME_H}px`,
                        transform:       `scale(${scale})`,
                        transformOrigin: '0 0',
                      }}
                      title={demo.name}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                  <div className={styles.island} />
                  <div className={styles.homeBar} />
                </div>
              </div>

              <div className={styles.demoLabel}>
                <span className={styles.demoCat}>{demo.category}</span>
                <span className={styles.demoName}>{demo.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: demos.length * 0.12 + 0.25 }}
        >
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="5.5" y="4" width="3" height="4" rx="1.5" fill="currentColor" className={styles.scrollDot}/>
          </svg>
          <span>Scroll to browse</span>
        </motion.div>

      </div>
    </section>
  )
}
