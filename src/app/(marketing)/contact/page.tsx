import type { Metadata } from 'next'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'A focused diagnostic, not a sales call. We look at your business, identify where automation will make a real difference, and tell you exactly what it would cost.',
}

const agenda = [
  'A precise look at where time and revenue are being lost',
  'Which problems are the right candidates for automation',
  'What a bespoke system for your business would look like',
  'The full cost and timeline before you commit to anything',
]

export default function ContactPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || '#'

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <span className="label">Book a Call</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              A focused diagnostic.{' '}
              <span className={styles.accent}>Not a sales call.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              We look at your business, identify precisely where AI will make a
              real difference, and tell you what it would cost. You leave with
              clarity either way. We take on a small number of new clients at any
              one time, so availability is limited.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.bodySection}>
        <div className="container">
          <div className={styles.grid}>
            <Reveal>
              <div className={styles.agendaCard}>
                <span className="label">What we cover</span>
                <ul className={styles.agendaList}>
                  {agenda.map(item => (
                    <li key={item} className={styles.agendaItem}>
                      <span className={styles.agendaDot} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={styles.agendaNote}>
                  Thirty minutes. You walk away knowing exactly what is possible,
                  what it costs, and whether working together makes sense.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={styles.bookCard}>
                <span className="label">Reserve your slot</span>
                <h2 className={styles.bookTitle}>Discovery call</h2>
                <p className={styles.bookDesc}>
                  Select a time below. The call takes place over Google Meet and
                  runs to thirty minutes. You will receive a confirmation and a
                  calendar invite immediately.
                </p>
                <AnimatedButton
                  href={bookingUrl}
                  variant="primary"
                  target="_blank"
                >
                  Book via Google Meet
                </AnimatedButton>
                <p className={styles.bookNote}>
                  Prefer to reach out by email first?{' '}
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
