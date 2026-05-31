import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
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
    desc: 'Revenue recovered from missed calls, lapsed clients, and unconverted leads. We track what changed so you can see the difference clearly.',
  },
]

export default function ResultsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <span className="label">Results</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Real results. <span className={styles.accent}>Coming soon.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              We are in our early client phase. Case studies and measured outcomes
              are being documented. In the meantime, here is what we track and why
              it matters.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.metricsSection}>
        <div className="container">
          <Reveal>
            <span className="label">What we track</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.sectionH2}>
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

      <section className={styles.honestSection}>
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

      <section className={styles.cta}>
        <div className="container">
          <Reveal>
            <span className="label">Get started</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              Be our next <span className={styles.accent}>success story.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              We are building our case study library one client at a time. If you work
              with us now, you get our best attention and we get your story.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.btnPri}>Book a Free Call</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
