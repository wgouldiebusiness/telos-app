import type { Metadata } from 'next'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'Book a free 15-minute consultation with Telos AI. We will map your workflow, identify where automation will help, and tell you honestly whether we can add value.',
}

const agenda = [
  'Current bottleneck analysis',
  'Missed call and lead recovery strategy',
  'Automation implementation roadmap',
  'ROI estimation for your specific practice',
]

export default function ContactPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || '#'

  return (
    <>
      {/* Hero */}
      <section className={`section section-bone ${styles.hero}`}>
        <div className="container">
          <Reveal>
            <span className="label">Book a Call</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroHeadline}>
              Let us optimise your service workflow.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              A free, no-commitment 15-minute conversation. We will look honestly at
              your practice, identify where time and revenue are being lost, and tell
              you whether automation is the right answer. No pitch, no pressure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Booking card */}
      <section className="section section-bone" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.grid}>
            {/* What we cover */}
            <Reveal>
              <div className={`section-green ${styles.agendaCard}`}>
                <span className="label">What we will cover</span>
                <ul className={styles.agendaList}>
                  {agenda.map(item => (
                    <li key={item} className={styles.agendaItem}>
                      <span className={styles.agendaDot} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={styles.agendaNote}>
                  <p>
                    Fifteen minutes. Honest assessment. You will leave knowing exactly
                    whether Telos AI is right for your practice.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Booking action */}
            <Reveal delay={0.1}>
              <div className={styles.bookCard}>
                <span className="label" style={{ color: 'var(--brown)' }}>Book your slot</span>
                <h2 className={styles.bookTitle}>Free 15-minute consultation</h2>
                <p className={styles.bookDesc}>
                  Select a time that works for you. The call takes place over Google Meet.
                  You will receive a confirmation and a calendar invite immediately.
                </p>
                <AnimatedButton
                  href={bookingUrl}
                  variant="primary"
                  target="_blank"
                >
                  Book via Google Meet
                </AnimatedButton>
                <p className={styles.bookNote}>
                  Prefer email first? Reach us at{' '}
                  <a href="mailto:william.gouldsmith@telosai.co.uk" className={styles.emailLink}>
                    william.gouldsmith@telosai.co.uk
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
