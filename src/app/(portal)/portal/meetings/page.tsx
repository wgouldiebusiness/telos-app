import type { Metadata } from 'next'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from '../portal.module.css'

export const metadata: Metadata = { title: 'Book a Meeting | Telos AI Portal' }

export default function MeetingsPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || '#'

  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Book a Meeting</span>
        <h1 className={styles.pageTitle}>Schedule time with your account manager.</h1>
      </div>
      <div className={styles.meetCard}>
        <p className={styles.meetDesc}>
          Book a call to discuss your automations, review performance, or plan next steps.
          Select a time that works for you below.
        </p>
        <AnimatedButton href={bookingUrl} variant="primary" target="_blank">
          Open booking calendar
        </AnimatedButton>
      </div>
    </div>
  )
}
