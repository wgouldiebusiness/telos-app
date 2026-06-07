'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './OrbitalServices.module.css'

interface Service {
  id: number
  title: string
  desc: string
  icon: string
}

const services: Service[] = [
  { id: 1,  title: 'AI Receptionist',        desc: 'Your calls answered, appointments booked, and leads qualified around the clock.',                          icon: '📞' },
  { id: 2,  title: 'Website Chat',           desc: 'An intelligent assistant on your site that converts visitors into booked clients.',                         icon: '💬' },
  { id: 3,  title: 'Lead Follow-Up',         desc: 'Every lead captured and followed up at the right time with the right message.',                            icon: '🔄' },
  { id: 4,  title: 'CRM Automation',         desc: 'Contacts organised, tasks triggered, and your pipeline kept moving without manual input.',                  icon: '⚙️' },
  { id: 5,  title: 'Missed-Call Recovery',   desc: 'The moment a call goes unanswered, an intelligent message goes out immediately to recover the lead.',       icon: '📲' },
  { id: 6,  title: 'Lead Generation',        desc: 'Systematic outreach and qualification built around your ideal client. More conversations with the right people.', icon: '🎯' },
  { id: 7,  title: 'Conversion Website',     desc: 'A fast, focused website built around your offer and wired into your agents from day one.',                 icon: '🌐' },
  { id: 8,  title: 'Content & Design',        desc: 'Custom graphic design, on-brand content, and social posts produced in your voice — published on your behalf every week.', icon: '✍️' },
  { id: 9,  title: 'Backend Systems',        desc: 'Custom APIs, databases, and third-party integrations that connect every tool your business relies on.',     icon: '🔧' },
  { id: 10, title: 'Marketing Automation',   desc: 'Email sequences, campaign triggers, and audience segmentation running on autopilot so no lead goes cold.', icon: '📣' },
]

const R = 220

export default function OrbitalServices() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const nodeRefs    = useRef<(HTMLDivElement | null)[]>([])
  const rotRef      = useRef(0)
  const rafRef      = useRef<number>(0)
  const lastTs      = useRef<number>(0)
  const activeIdRef = useRef<number | null>(null)

  activeIdRef.current = activeId

  // Dismiss active card when clicking outside any node
  useEffect(() => {
    if (activeId === null) return
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      const hitNode = nodeRefs.current.some(el => el && el.contains(target))
      if (!hitNode) setActiveId(null)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [activeId])

  const animate = useCallback((ts: number) => {
    const delta = lastTs.current ? ts - lastTs.current : 16
    lastTs.current = ts
    rotRef.current = (rotRef.current + delta * 0.018) % 360

    nodeRefs.current.forEach((el, i) => {
      if (!el) return
      const angle    = ((i / services.length) * 360 + rotRef.current) * (Math.PI / 180)
      const x        = R * Math.cos(angle)
      const y        = R * Math.sin(angle)
      const depth    = Math.sin(angle)
      const isActive = activeIdRef.current === services[i].id
      const opacity  = isActive ? 1 : Math.max(0.35, 0.35 + 0.65 * ((1 + depth) / 2))
      const scale    = isActive ? 1.3 : Math.max(0.7, 0.7 + 0.3 * ((1 + depth) / 2))
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      el.style.opacity   = String(opacity)
      el.style.zIndex    = isActive ? '200' : String(Math.round(100 + 50 * depth))
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  // Start/stop loop based on visibility — no wasted frames when off-screen
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        lastTs.current = 0
        rafRef.current = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(rafRef.current)
      }
    }, { threshold: 0.01 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [animate])

  function handleClick(id: number) {
    setActiveId(prev => prev === id ? null : id)
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.orbit}>
        <div className={styles.ring} />

        <div className={styles.centre}>
          <div className={styles.centrePulse} />
          <div className={styles.centreInner} />
        </div>

        {services.map((s, i) => {
          const isActive = activeId === s.id
          return (
            <div
              key={s.id}
              ref={el => { nodeRefs.current[i] = el }}
              className={`${styles.node} ${isActive ? styles.nodeActive : ''}`}
              onClick={() => handleClick(s.id)}
            >
              <div className={styles.nodeIcon}>{s.icon}</div>
              <div className={styles.nodeLabel}>{s.title}</div>

              {isActive && (
                <div className={styles.card}>
                  <div className={styles.cardConnector} />
                  <div className={styles.cardTitle}>{s.title}</div>
                  <p className={styles.cardDesc}>{s.desc}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className={styles.hint}>Tap any agent to learn more</p>

      <div className={styles.mobileList}>
        {services.map(s => (
          <div key={s.id} className={styles.mobileItem}>
            <span className={styles.mobileIcon}>{s.icon}</span>
            <div className={styles.mobileText}>
              <span className={styles.mobileName}>{s.title}</span>
              <p className={styles.mobileDesc}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
