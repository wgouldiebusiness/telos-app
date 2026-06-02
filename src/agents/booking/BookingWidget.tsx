'use client'

// Drop-in booking widget for any client site:
//   <BookingWidget configId="acme-clinic" businessName="Acme Clinic"
//                  services={[{ name: 'Consultation', durationMins: 30 }]} />
//
// Guided flow: choose service -> pick a time -> enter details -> confirmed.
// Slot lookup and booking are deterministic, so it never double-books.

import { useState } from 'react'
import styles from './BookingWidget.module.css'

interface Service { name: string; durationMins: number }
interface Slot { start: string; end: string }

interface BookingWidgetProps {
  configId: string
  businessName: string
  services: Service[]
}

type Stage = 'service' | 'slot' | 'details' | 'done'

export default function BookingWidget({ configId, businessName, services }: BookingWidgetProps) {
  const [stage, setStage] = useState<Stage>('service')
  const [service, setService] = useState<Service | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [slot, setSlot] = useState<Slot | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function chooseService(s: Service) {
    setService(s)
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configId, action: 'slots', service: s.name }),
      })
      const data = await res.json()
      setSlots(data.slots || [])
      setStage('slot')
    } catch {
      setError('Could not load available times. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function confirm() {
    if (!service || !slot || !name.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          configId,
          action: 'book',
          service: service.name,
          slotStart: slot.start,
          name: name.trim(),
          email: email.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) setError(data.error || 'Could not book.')
      else setStage('done')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function fmt(iso: string) {
    return new Date(iso).toLocaleString('en-GB', {
      weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.brand}>{businessName}</span>
        <span className={styles.sub}>Book an appointment</span>
      </div>

      <div className={styles.body}>
        {error && <p className={styles.error}>{error}</p>}

        {stage === 'service' && (
          <>
            <p className={styles.prompt}>What can we book you in for?</p>
            <div className={styles.list}>
              {services.map(s => (
                <button key={s.name} className={styles.option} onClick={() => chooseService(s)} disabled={loading}>
                  <span>{s.name}</span>
                  <span className={styles.mins}>{s.durationMins} mins</span>
                </button>
              ))}
            </div>
          </>
        )}

        {stage === 'slot' && (
          <>
            <p className={styles.prompt}>Pick a time that suits you.</p>
            {loading ? (
              <p className={styles.muted}>Loading times...</p>
            ) : slots.length === 0 ? (
              <p className={styles.muted}>No times available right now. Please check back soon.</p>
            ) : (
              <div className={styles.slots}>
                {slots.map(s => (
                  <button key={s.start} className={styles.slot} onClick={() => { setSlot(s); setStage('details') }}>
                    {fmt(s.start)}
                  </button>
                ))}
              </div>
            )}
            <button className={styles.back} onClick={() => setStage('service')}>Back</button>
          </>
        )}

        {stage === 'details' && slot && (
          <>
            <p className={styles.prompt}>You are booking {service?.name} on {fmt(slot.start)}.</p>
            <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" aria-label="Your name" />
            <input className={styles.input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email (for the invite)" aria-label="Your email" type="email" />
            <button className={styles.confirm} onClick={confirm} disabled={loading || !name.trim()}>
              {loading ? 'Booking...' : 'Confirm booking'}
            </button>
            <button className={styles.back} onClick={() => setStage('slot')}>Back</button>
          </>
        )}

        {stage === 'done' && (
          <div className={styles.success}>
            <div className={styles.tick}>✓</div>
            <p className={styles.prompt}>You are booked in.</p>
            <p className={styles.muted}>
              {service?.name} on {slot && fmt(slot.start)}. {email ? 'A calendar invite is on its way.' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
