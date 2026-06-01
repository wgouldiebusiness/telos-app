import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import PricingFAQ from '@/components/PricingFAQ/PricingFAQ'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'A fixed monthly fee. Scope agreed upfront. No lock-in. The right plan depends on your business and is confirmed on your call.',
}

const tiers = [
  {
    key: 'starter',
    name: 'Starter',
    desc: 'One custom AI agent, built and maintained for your business. From £100 per month.',
    price: '£100',
    period: '/mo',
    best: 'One focused problem, solved properly',
    features: [
      'One custom AI agent',
      'Built around your highest-value problem',
      'Wired into your existing tools',
      'Monthly performance report',
      'Email support',
    ],
    featured: false,
  },
  {
    key: 'growth',
    name: 'Growth',
    desc: 'Two or more agents working together. More coverage, more automation. From £250 per month depending on the number of agents.',
    price: '£250',
    period: '/mo',
    best: 'Multiple problems, one coordinated system',
    features: [
      'Multiple AI agents working together',
      'Pipeline, follow-up, and lead recovery',
      'Live client dashboard',
      'Monthly and annual reporting',
      'Priority support',
    ],
    featured: true,
  },
  {
    key: 'bespoke',
    name: 'Bespoke',
    desc: 'Full custom AI infrastructure built from the ground up for your business. Priced on your requirements. Agreed on your call.',
    price: '£1k',
    period: '+/mo',
    best: 'Scoped to your requirements',
    features: [
      'Full custom AI architecture',
      'Unlimited agents and integrations',
      'Conversion website if required',
      'Content, data and intelligence layer',
      'Dedicated build and support',
    ],
    featured: false,
  },
]

const faqs = [
  {
    q: 'Is there a minimum contract term?',
    a: 'No. Plans run monthly. You can change plan or cancel with reasonable notice. We earn your continued business by delivering results, not by locking you in.',
  },
  {
    q: 'What does setup cost?',
    a: 'Every build includes a one-off setup fee. The exact figure is scoped on your call so you know the full number before you agree to anything. No surprises.',
  },
  {
    q: 'How do I know which plan is right?',
    a: 'The call resolves that. We look at what you need and tell you plainly which plan fits, or whether a bespoke scope makes more sense. We will not upsell you into something you do not need.',
  },
  {
    q: 'Do you guarantee specific results?',
    a: 'We build with precision and we care about performance deeply. We will not make claims we cannot substantiate. What we will guarantee is that if something underperforms, we investigate and fix it.',
  },
  {
    q: 'What kind of business is this for?',
    a: 'UK-based service businesses that are serious about growth: clinics, agencies, trades, professional services, coaches, and anyone who has more work running the business than they should. If you are still managing leads by hand, this is for you.',
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
              An investment that <span className={styles.accent}>earns back.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              A fixed monthly fee with no lock-in and no hidden costs. The question
              is not whether you can afford this. It is what continuing without it
              is costing you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.tiersSection}>
        <div className="container">
          <div className={styles.tiersGrid}>
            {tiers.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 0.1}>
                <div className={styles.tier}>
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
                  <Link href="/contact" className={styles.tierBtn}>
                    Book a Call
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className={styles.note}>
              Every plan includes a one-off build, scoped and agreed before we start.
              The monthly fee covers maintenance, monitoring, and ongoing support.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <Reveal>
            <h2 className={styles.faqH2}>Questions worth answering directly</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <PricingFAQ faqs={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
