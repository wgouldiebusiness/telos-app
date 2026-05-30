import type { Metadata } from 'next'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Three tiers designed for UK service businesses: Starter, Growth, and Pro. Transparent pricing, no hidden fees.',
}

const tiers = [
  {
    key: 'starter',
    name: 'Starter',
    tagline: 'For practices ready to stop missing calls and leads.',
    price: 'From £497',
    period: 'build fee',
    retainer: '+ £197/mo',
    features: [
      'One core automation (AI Receptionist or Chat Assistant)',
      'Initial setup and integration',
      'One round of amendments after delivery',
      'Monthly performance report',
      'Email support',
    ],
    cta: 'Get started',
    stripeKey: 'NEXT_PUBLIC_STRIPE_LINK_STARTER',
    featured: false,
  },
  {
    key: 'growth',
    name: 'Growth',
    tagline: 'For practices ready to build a full automation stack.',
    price: 'From £1,197',
    period: 'build fee',
    retainer: '+ £397/mo',
    features: [
      'Up to three automations from our full solution library',
      'Full setup, integration, and testing',
      'Ongoing monitoring and refinement',
      'Monthly performance reports with written insights',
      'Priority support and quarterly strategy review',
    ],
    cta: 'Get started',
    stripeKey: 'NEXT_PUBLIC_STRIPE_LINK_GROWTH',
    featured: true,
  },
  {
    key: 'pro',
    name: 'Pro',
    tagline: 'For practices that want the complete system.',
    price: 'From £2,497',
    period: 'build fee',
    retainer: '+ £697/mo',
    features: [
      'Full automation stack: all relevant solutions',
      'Conversion website included',
      'Social media and content management',
      'Custom reporting and data insights dashboard',
      'Dedicated support and monthly strategy sessions',
    ],
    cta: 'Get started',
    stripeKey: 'NEXT_PUBLIC_STRIPE_LINK_PRO',
    featured: false,
  },
]

export default function PricingPage() {
  const starterLink  = process.env.NEXT_PUBLIC_STRIPE_LINK_STARTER  || '/contact'
  const growthLink   = process.env.NEXT_PUBLIC_STRIPE_LINK_GROWTH   || '/contact'
  const proLink      = process.env.NEXT_PUBLIC_STRIPE_LINK_PRO      || '/contact'

  const links: Record<string, string> = {
    starter: starterLink,
    growth:  growthLink,
    pro:     proLink,
  }

  return (
    <>
      {/* Hero */}
      <section className={`section section-green ${styles.hero}`}>
        <div className="container">
          <Reveal>
            <span className="label">Pricing</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroHeadline}>
              Transparent pricing.<br />No surprises.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              Three tiers built around how service businesses actually grow. A build
              fee covers the setup; a monthly retainer keeps everything running and
              improving. All prices are illustrative until confirmed in your Statement
              of Work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section section-bone">
        <div className="container">
          <div className={styles.tiersGrid}>
            {tiers.map((tier, i) => (
              <Reveal key={tier.key} delay={i * 0.08}>
                <div className={`${styles.tierCard} ${tier.featured ? styles.featured : ''}`}>
                  {tier.featured && (
                    <div className={styles.ribbon}>Most popular</div>
                  )}
                  <div className={styles.tierHead}>
                    <span className="label">{tier.name}</span>
                    <p className={styles.tierTagline}>{tier.tagline}</p>
                    <div className={styles.tierPrice}>
                      <span className={styles.priceMain}>{tier.price}</span>
                      <span className={styles.pricePeriod}>{tier.period}</span>
                    </div>
                    <div className={styles.retainer}>{tier.retainer} retainer</div>
                  </div>
                  <ul className={styles.featureList}>
                    {tier.features.map(f => (
                      <li key={f} className={styles.feature}>
                        <span className={styles.featureMark}>+</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.tierCta}>
                    <AnimatedButton
                      href={links[tier.key]}
                      variant={tier.featured ? 'primary' : 'outline'}
                    >
                      {tier.cta}
                    </AnimatedButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className={styles.disclaimer}>
              All prices are illustrative and will be confirmed in a signed Statement of Work
              before any work begins. Prices exclude VAT if applicable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bespoke band */}
      <section className={`section section-brown ${styles.bespoke}`}>
        <div className="container">
          <Reveal>
            <span className="label">Not sure which tier fits?</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.bespokeHeadline}>
              Every engagement starts with a conversation.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.bespokeBody}>
              The tiers above are a starting point. In practice, every build is scoped
              specifically for the client. Book a free call and we will recommend the
              right approach for your practice.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <AnimatedButton href="/contact" variant="secondary">Book a Free Call</AnimatedButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
