import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Telos AI was built by someone who automated his own service business first, then helped others do the same. No theory. No guesswork.',
}

const values = [
  {
    n: '01',
    title: 'Straight talking',
    desc: 'We tell you exactly what AI can do for your business and what it cannot. We will not oversell the technology or dress up a limitation as a feature.',
  },
  {
    n: '02',
    title: 'Built to your specification',
    desc: 'There are no templates here. Everything is designed around how your business actually works. If it does not fit, we do not use it.',
  },
  {
    n: '03',
    title: 'In it for the long term',
    desc: 'We keep our client base small on purpose. Every business we work with gets proper attention. We earn the monthly fee by continuing to deliver.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label">About Telos</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Built for people who are serious{' '}
              <span className={styles.accent}>about their business.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              We work with owners who are not looking for a shortcut. They want a
              properly built system that runs correctly, improves over time, and
              frees them to focus on the work that actually grows their business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionTwo}>
            <Reveal><span className="label">What we believe</span></Reveal>
            <div>
              <Reveal delay={0.06}>
                <p className={styles.missionLead}>
                  The businesses that scale are not run by people who work harder.
                  They are run by people who have stopped doing by hand what a system
                  can do better.
                </p>
              </Reveal>
              <div className={styles.vals}>
                {values.map((v, i) => (
                  <Reveal key={v.n} delay={i * 0.08}>
                    <div className={styles.val}>
                      <div className={styles.valN}>{v.n}</div>
                      <h3 className={styles.valTitle}>{v.title}</h3>
                      <p className={styles.valDesc}>{v.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyInner}>
            <div>
              <Reveal><span className="label">The founder</span></Reveal>
            </div>
            <div className={styles.storyContent}>
              <Reveal delay={0.06}>
                <h2 className={styles.storyH2}>
                  Will Gouldsmith.{' '}
                  <span className={styles.accent}>Chartered Physiotherapist.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className={styles.storyP}>
                  Will ran his own clinic and spent years buried in the operational
                  layer that surrounds clinical work. Appointment reminders. Invoice
                  chasing. Follow-up sequences. Enquiries that came in at 9pm. Work
                  that had nothing to do with treating patients but consumed real hours
                  every day.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className={styles.storyP}>
                  He did not hire help. He automated it. Not because he had an
                  interest in technology for its own sake, but because he could see
                  exactly what each piece of admin was costing him in time and
                  opportunity. He built the systems himself, tested them against a
                  real business, and refined them until they worked properly.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={styles.storyP}>
                  When colleagues and other owners started asking how, Telos AI
                  became the answer. A small, deliberate team with one purpose: to
                  build AI systems for service business owners who are done doing
                  everything manually.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <Reveal><span className="label">Work with us</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              We take on a limited number of clients.{' '}
              <span className={styles.accent}>Every build gets our full attention.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              If you are ready to have a serious conversation about what AI can do
              for your business, the first step is a short call.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.btnPri}>Book a Call</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
