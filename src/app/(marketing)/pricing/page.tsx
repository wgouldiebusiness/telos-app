import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'One monthly fee, no lock-in, no surprises. Starter from £100/mo, Growth from £250/mo, or a fully bespoke build from £1,000/mo.',
}

const tiers = [
  {
    key: 'starter',
    name: 'Starter',
    desc: 'One AI agent, built and managed for you.',
    price: '£100',
    period: '/mo',
    best: 'Best for solo owners',
    features: [
      'One custom AI agent',
      'Built around your main pain point',
      'Connected to your existing tools',
      'Monthly performance summary',
      'Email support',
    ],
    featured: false,
  },
  {
    key: 'growth',
    name: 'Growth',
    desc: 'Several agents working together to capture and convert.',
    price: '£250',
    period: '/mo',
    best: 'Best for small teams',
    features: [
      'Multiple AI agents and integrations',
      'Pipeline and follow-up automation',
      'Live client dashboard',
      'Monthly and annual reporting',
      'Priority support',
    ],
    featured: true,
  },
  {
    key: 'bespoke',
    name: 'Bespoke',
    desc: 'A full, tailored AI system for a growing business.',
    price: '£1k',
    period: '+/mo',
    best: 'Priced to your business',
    features: [
      'A complete, custom AI build',
      'Unlimited agents and integrations',
      'Conversion website if needed',
      'Content, data and insights',
      'Dedicated support',
    ],
    featured: false,
  },
]

const faqs = [
  {
    q: 'Is there a long contract?',
    a: 'No. Plans are rolling monthly. You can change or cancel with reasonable notice. We earn your business every month.',
  },
  {
    q: 'What about the setup fee?',
    a: 'Most builds include a one-off setup, scoped on the call so you know the full number upfront before anything is agreed.',
  },
  {
    q: 'Not sure which plan you need?',
    a: 'That is what the call is for. We will tell you honestly what would help and what would not.',
  },
  {
    q: 'Do you guarantee results?',
    a: 'We build with real skill and care. We are honest that results depend on your business too, so we never make guarantees we cannot keep.',
  },
]

export default function PricingPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label">Pricing</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Plans that <span className={styles.accent}>pay for themselves.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              One monthly fee, no lock-in, no surprises. The right plan depends on your
              business and gets agreed on your call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.tiersSection}>
        <div className="container">
          <div className={styles.tiersGrid}>
            {tiers.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 0.1}>
                <div className={`${styles.tier} ${tier.featured ? styles.featured : ''}`}>
                  {tier.featured && <div className={styles.ribbon}>Most popular</div>}
                  <div className={styles.tierName}>{tier.name}</div>
                  <div className={styles.tierDesc}>{tier.desc}</div>
                  <div className={styles.tierPrice}>
                    {tier.price}<small>{tier.period}</small>
                  </div>
                  <div className={styles.tierBest}>{tier.best}</div>
                  <ul className={styles.features}>
                    {tier.features.map(f => (
                      <li key={f} className={styles.feature}>{f}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`${styles.tierBtn} ${tier.featured ? styles.tierBtnFeatured : ''}`}>
                    Book a Call
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className={styles.note}>
              Setup is scoped on your call so you know the exact cost upfront. No hidden fees.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <Reveal>
            <h2 className={styles.faqH2}>Common questions</h2>
          </Reveal>
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.06}>
              <div className={styles.qa}>
                <h3 className={styles.qaQ}>{faq.q}</h3>
                <p className={styles.qaA}>{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
