import type { Metadata } from 'next'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'William Gouldsmith is a Chartered Physiotherapist who built Telos AI by automating his own practice. This is the story of why.',
}

const values = [
  {
    title: 'Efficiency First',
    desc: 'Every automation we build is designed to return time to the people running the business. If it does not save meaningful effort, we do not build it.',
  },
  {
    title: 'Built for Results',
    desc: 'We measure the impact of everything we deploy. If a system is not performing, we fix it. We are not interested in delivering work that looks good on paper but does not move the needle.',
  },
  {
    title: 'Human-Centric',
    desc: 'Automation should make client relationships stronger, not replace them. Every system we build is designed to give people more time for the work that actually requires a human.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={`section section-bone ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroInner}>
            <Reveal>
              <span className="label">About Telos AI</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className={styles.heroHeadline}>
                Built by a practitioner,<br />for practitioners.
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story — green band */}
      <section className={`section section-green ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyLeft}>
              <Reveal>
                <span className="label">The story</span>
              </Reveal>
            </div>
            <div className={styles.storyRight}>
              <Reveal delay={0.06}>
                <p className={styles.storyLead}>
                  I am a Chartered Physiotherapist. For years I ran my own
                  practice and spent more time on admin than I did on anything else.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className={styles.storyBody}>
                  Missed calls. Unanswered messages. Leads that went nowhere because
                  follow-up fell through the cracks. Clients who did not rebook because
                  nobody reminded them. Reports that existed somewhere in a spreadsheet
                  I never had time to look at. It was not a lack of effort. It was a
                  structural problem.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={styles.storyBody}>
                  I started automating my own workflows out of necessity. AI receptionist
                  for out-of-hours calls. Automated follow-up sequences for people who
                  enquired but did not book. A simple system to re-engage clients who
                  had not been in for a while. The results were immediate and measurable.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p className={styles.storyBody}>
                  What I built for my practice works for any service business. The
                  problems are the same: too much admin, too many missed opportunities,
                  not enough time. Telos AI exists to solve exactly those problems, for
                  businesses run by people who are too busy doing the work to also be
                  managing the systems.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className={styles.storyBody}>
                  I know what it is like to run a service business. I know what actually
                  matters and what is just noise. That is the lens through which every
                  Telos automation is designed.
                </p>
              </Reveal>
              <Reveal delay={0.36}>
                <p className={styles.storySig}>William Gouldsmith<br />
                  <span className={styles.storySigTitle}>Chartered Physiotherapist, Founder of Telos AI</span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={`section section-bone ${styles.missionSection}`}>
        <div className="container">
          <Reveal>
            <span className="label">Our mission</span>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className={styles.mission}>
              To give service businesses back the time they are losing to admin,
              by building automations that are honest, practical, and built around
              how the business actually works.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className={`section section-panel ${styles.valuesSection}`}>
        <div className="container">
          <Reveal>
            <span className="label">What we stand for</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.valuesHeadline}>Three things that guide every decision.</h2>
          </Reveal>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section section-green ${styles.cta}`}>
        <div className="container">
          <Reveal>
            <h2 className={styles.ctaHeadline}>Let us have a conversation.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.ctaBody}>
              Fifteen minutes to understand your practice and whether we can help.
              No pitch, no pressure, no commitment.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <AnimatedButton href="/contact" variant="secondary">Book a Free Call</AnimatedButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
