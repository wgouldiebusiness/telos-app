import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos AI — Intelligence, applied with intent.',
  description:
    'AI automation built for UK service businesses. Streamline admin, recover missed clients, and grow your pipeline.',
}

const coreServices = [
  {
    title: 'AI Receptionist',
    desc: 'Handles inbound calls and messages, books appointments, and captures leads, even when you are with a client.',
    href: '/solutions',
  },
  {
    title: 'Website and Chat Assistant',
    desc: 'A trained AI assistant on your website that qualifies leads and books consultations around the clock.',
    href: '/solutions',
  },
  {
    title: 'Pipeline and Follow-Up',
    desc: 'Automated follow-up sequences for leads who do not book immediately. Consistent outreach without manual effort.',
    href: '/solutions',
  },
  {
    title: 'Missed-Client Recovery',
    desc: 'A quiet, consistent system that re-engages lapsed clients and brings them back without manual chasing.',
    href: '/solutions',
  },
]

const steps = [
  {
    n: '01',
    title: 'Understand your workflow',
    desc: 'A focused discovery session to map exactly where time and revenue are being lost.',
  },
  {
    n: '02',
    title: 'Build your automations',
    desc: 'Custom-built systems integrated directly into how you already work.',
  },
  {
    n: '03',
    title: 'Optimise and grow',
    desc: 'Ongoing refinement so your automations improve as your business does.',
  },
]

const pillars = [
  'Honest',
  'Plain-spoken',
  'Built around you',
  'No false promises',
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <Reveal>
              <Logo size="lg" float className={styles.heroLogo} />
            </Reveal>
            <Reveal delay={0.1}>
              <span className="label">AI Automation for Service Businesses</span>
            </Reveal>
            <Reveal delay={0.18}>
              <h1 className={styles.heroHeadline}>
                Intelligence,<br />applied with intent.
              </h1>
            </Reveal>
            <Reveal delay={0.26}>
              <p className={styles.heroSub}>
                Custom automations built around your practice. Designed to save you hours,
                recover missed revenue, and keep clients coming back.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className={styles.pills}>
                {['Streamline automation', 'Scale without hiring', 'Increase clientele'].map(p => (
                  <span key={p} className={styles.pill}>{p}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.38}>
              <div className={styles.heroActions}>
                <AnimatedButton href="/contact" variant="primary">Book a Consultation</AnimatedButton>
                <AnimatedButton href="/solutions" variant="outline">See Our Solutions</AnimatedButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Honest strip */}
      <section className={styles.honestStrip}>
        <div className="container">
          <div className={styles.stripInner}>
            {pillars.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <div className={styles.stripItem}>
                  <span className={styles.stripDot} />
                  <span className={styles.stripLabel}>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we do — green band */}
      <section className={`section section-green ${styles.offeringSection}`}>
        <div className="container">
          <Reveal>
            <span className="label">What we actually do</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.sectionHeadline}>
              Built around how you actually work.
            </h2>
          </Reveal>
          <div className={styles.offeringGrid}>
            {[
              'We build automations that handle the admin, so you can focus on the work that matters.',
              'We recover the clients and leads that would otherwise slip through the cracks.',
              'We give you visibility into your business, so decisions are easier.',
              'We create a consistent, professional presence for your business online.',
            ].map((text, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={styles.offeringCard}>
                  <span className={styles.offeringNum}>{String(i + 1).padStart(2, '0')}</span>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core solutions — bone */}
      <section className={`section section-bone ${styles.solutionsSection}`}>
        <div className="container">
          <Reveal>
            <span className="label">Our solutions</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.sectionHeadline}>
              Automations for every part of your practice.
            </h2>
          </Reveal>
          <div className={styles.solutionGrid}>
            {coreServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.09}>
                <Link href={s.href} className={styles.solutionCard}>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardDesc}>{s.desc}</p>
                  <span className={styles.cardArrow}>See more &rarr;</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — brown band */}
      <section className={`section section-brown ${styles.processSection}`}>
        <div className="container">
          <Reveal>
            <span className="label">How it works</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.sectionHeadline}>Three steps to a running system.</h2>
          </Reveal>
          <div className={styles.stepGrid}>
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1}>
                <div className={styles.step}>
                  <span className={styles.stepNum}>{step.n}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — green */}
      <section className={`section section-green ${styles.ctaSection}`}>
        <div className="container">
          <Reveal>
            <h2 className={styles.ctaHeadline}>Ready to reclaim your time?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.ctaBody}>
              Start with a free 15-minute conversation. No commitment, no pitch: just a
              clear-eyed look at what automation could do for your business.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <AnimatedButton href="/contact" variant="secondary">
              Book a Free Call
            </AnimatedButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
