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
  'A look at where your time is actually going',
  'Which tasks are good candidates for automation',
  'An honest view of whether AI can help your business',
  'A clear picture of what working together would look like',
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
              Fifteen minutes. <span className={styles.accent}>Honest answers.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              A free, no-pressure conversation. We look at your business, identify
              where time and revenue are being lost, and tell you plainly whether
              automation is the right answer.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.bodySection}>
        <div className="container">
          <div className={styles.grid}>
            <Reveal>
              <div className={styles.agendaCard}>
                <span className="label">What we will cover</span>
                <ul className={styles.agendaList}>
                  {agenda.map(item => (
                    <li key={item} className={styles.agendaItem}>
                      <span className={styles.agendaDot} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={styles.agendaNote}>
                  No pitch. No pressure. You leave knowing exactly whether Telos AI
                  is right for your business.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={styles.bookCard}>
                <span className="label">Book your slot</span>
                <h2 className={styles.bookTitle}>Free 15-minute consultation</h2>
                <p className={styles.bookDesc}>
                  Select a time that works for you. The call takes place over Google
                  Meet. You will receive a confirmation and a calendar invite straight away.
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
