import type { Metadata } from 'next'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Results',
  description:
    'Telos AI tracks the real impact of every automation: efficiency, growth, scalability, and return. Real results coming soon.',
}

const metrics = [
  {
    area: 'Efficiency',
    desc: 'Hours of admin returned to the business every week. Calls answered, appointments booked, and follow-ups sent without a single manual action.',
  },
  {
    area: 'Growth',
    desc: 'Leads captured that would otherwise have been missed. Lapsed clients re-engaged. Pipelines that run themselves while you focus on delivery.',
  },
  {
    area: 'Scalability',
    desc: 'Systems that grow with the business. Adding capacity without adding headcount. Consistent service quality regardless of how busy things get.',
  },
  {
    area: 'Return',
    desc: 'Revenue recovered from missed calls, lapsed clients, and unconverted leads. Most clients see their automations pay for themselves within the first quarter.',
  },
]

export default function ResultsPage() {
  return (
    <>
      {/* Hero */}
      <section className={`section section-green ${styles.hero}`}>
        <div className="container">
          <Reveal>
            <span className="label">Results</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroHeadline}>
              Real results.<br />Coming soon.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              We are in our early client phase. Case studies and measured outcomes
              are being documented. In the meantime, here is what we track and why
              it matters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we measure */}
      <section className="section section-bone">
        <div className="container">
          <Reveal>
            <span className="label">What we track</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.sectionHeadline}>
              Four areas that actually matter.
            </h2>
          </Reveal>
          <div className={styles.metricsGrid}>
            {metrics.map((m, i) => (
              <Reveal key={m.area} delay={i * 0.09}>
                <div className={styles.metricCard}>
                  <h3 className={styles.metricArea}>{m.area}</h3>
                  <p className={styles.metricDesc}>{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honest note */}
      <section className={`section section-panel ${styles.honestSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.honestInner}>
              <span className="label">A note on honesty</span>
              <p className={styles.honestText}>
                We will not publish made-up numbers or fictional case studies to look
                more established than we are. When we have real results from real
                clients, we will share them here with their permission and in full
                detail. That is the standard we hold ourselves to.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={`section section-green ${styles.cta}`}>
        <div className="container">
          <Reveal>
            <h2 className={styles.ctaHeadline}>Be our next success story.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.ctaBody}>
              We are building our case study library one client at a time. If you work with us now,
              you get our best attention and we get your story. That is a fair exchange.
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
