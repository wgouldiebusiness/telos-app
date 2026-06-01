import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Results',
  description:
    'We track the real impact of every automation we build. Case studies coming as our clients give permission to share.',
}

const metrics = [
  {
    area: 'Time recovered',
    desc: 'Hours of admin, scheduling, and follow-up returned to the business every week. Not redistributed. Eliminated.',
  },
  {
    area: 'Revenue captured',
    desc: 'Leads recovered from missed calls, slow replies, and lapsed pipelines. Money that was leaving the business before the system existed.',
  },
  {
    area: 'Capacity added',
    desc: 'Businesses handling more enquiries, more clients, and more complexity, without hiring additional staff to manage the operational layer.',
  },
  {
    area: 'Consistency delivered',
    desc: 'Every lead followed up. Every missed call acknowledged. Every client touched at the right moment. Regardless of how busy things get.',
  },
]

export default function ResultsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>Results</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              What changes when the <span className={styles.accent}>system runs properly.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={styles.heroSub}>
              We are in our early client phase and building our documented case study
              library. We will share real results with real numbers, with client
              permission, as they come in.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.metricsSection}>
        <div className="container">
          <Reveal><span className="label">What we measure</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.sectionH2}>The four things that actually matter.</h2>
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
              <span className="label">Our position on case studies</span>
              <p className={styles.honestText}>
                We will not fabricate numbers, invent client names, or publish results
                we cannot verify. When we have documented outcomes from real businesses
                who have agreed to share them, we will publish them here in full.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>Early clients</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              The businesses that move now <span className={styles.accent}>get our best work.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              Early clients get the full weight of our attention and become the case
              studies that demonstrate what is possible.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.btnPri}>Book a call</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
