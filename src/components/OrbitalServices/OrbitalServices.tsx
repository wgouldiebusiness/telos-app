'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './OrbitalServices.module.css'

interface Service {
  id: number
  title: string
  desc: string
  icon: string
}

const services: Service[] = [
  { id: 1, title: 'AI Receptionist',        desc: 'Your calls answered, appointments booked, and leads qualified around the clock.',       icon: '📞' },
  { id: 2, title: 'Website Chat',           desc: 'An intelligent assistant on your site that converts visitors into booked clients.',       icon: '💬' },
  { id: 3, title: 'Lead Follow-Up',         desc: 'Every lead captured and followed up at the right time with the right message.',          icon: '🔄' },
  { id: 4, title: 'CRM Automation',         desc: 'Contacts organised, tasks triggered, and your pipeline kept moving automatically.',      icon: '⚙️' },
  { id: 5, title: 'Missed-Call Recovery',   desc: 'The moment a call goes unanswered, an intelligent message goes out immediately.',        icon: '📲' },
]

export default function OrbitalServices() {
  const [rotation, setRotation] = useState(0)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!autoRotate) return
    timerRef.current = setInterval(() => {
      setRotation(r => (r + 0.25) % 360)
    }, 50)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [autoRotate])

  function handleClick(id: number) {
    if (activeId === id) {
      setActiveId(null)
      setAutoRotate(true)
    } else {
      setActiveId(id)
      setAutoRotate(false)
    }
  }

  function nodePosition(index: number) {
    const angle = ((index / services.length) * 360 + rotation) * (Math.PI / 180)
    const r = 190
    const x = r * Math.cos(angle)
    const y = r * Math.sin(angle)
    const depth = Math.sin(angle)
    const opacity = Math.max(0.35, 0.35 + 0.65 * ((1 + depth) / 2))
    const scale = Math.max(0.7, 0.7 + 0.3 * ((1 + depth) / 2))
    const zIndex = Math.round(100 + 50 * depth)
    return { x, y, opacity, scale, zIndex }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.orbit}>
        {/* Orbit ring */}
        <div className={styles.ring} />

        {/* Centre pulse */}
        <div className={styles.centre}>
          <div className={styles.centrePulse} />
          <div className={styles.centreInner} />
        </div>

        {services.map((s, i) => {
          const pos = nodePosition(i)
          const isActive = activeId === s.id
          return (
            <div
              key={s.id}
              className={`${styles.node} ${isActive ? styles.nodeActive : ''}`}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${isActive ? 1.3 : pos.scale})`,
                opacity: isActive ? 1 : pos.opacity,
                zIndex: isActive ? 200 : pos.zIndex,
              }}
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
    </div>
  )
}
