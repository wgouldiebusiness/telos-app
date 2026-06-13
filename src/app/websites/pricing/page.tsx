import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Pricing | Telos Websites',
  description:
    'A fixed build fee, scoped to your business. Ongoing management available. No hidden costs.',
}

const tiers = [
  {
    name: 'Starter Site',
    price: '£295',
    period: '+ from',
    build: 'One-off build fee',
    desc: 'A clean, fast, professional website for businesses that need a proper online presence without a big upfront commitment.',
    features: [
      'Up to 5 pages',
      'Custom design (no templates)',
      'Mobile and desktop optimised',
      'Contact form or booking link',
      'SEO foundations built in',
      'Delivered in two weeks',
    ],
    note: '£65/mo ongoing: hosting, maintenance, security & updates',
  },
  {
    name: 'Business Site',
    price: '£595',
    period: '+ from',
    build: 'One-off build fee',
    desc: 'A conversion-focused site built around your full service offering, portfolio, and client journey.',
    features: [
      'Up to 10 pages',
      'Advanced booking or enquiry flow',
      'Gallery or portfolio section',
      'Testimonials and social proof',
      'Google Analytics and Search Console',
      'AI agent integration ready',
    ],
    note: '£110/mo ongoing: hosting, maintenance, security & updates',
  },
  {
    name: 'Site + AI Bundle',
    price: '£499',
    period: '+ from',
    build: 'Build fee — site and agents included',
    desc: 'Your website and AI agents built together and wired up from day one. The most cost-effective way to get both.',
    features: [
      'Business site (up to 10 pages)',
      '2 custom AI agents included',
      'Receptionist, chat, or lead follow-up',
      'Fully integrated from launch',
      'Each additional agent from £150 build + £65/mo',
      'Priority build and support',
    ],
    note: '£225/mo ongoing: site + both agents maintained',
  },
]

const faqs = [
  {
    q: 'What does the build fee cover?',
    a: 'Design, development, testing, and launch. You see and approve the design before we write a line of code. The scope and cost are agreed before we start. No surprises.',
  },
  {
    q: 'Is there a monthly fee?',
    a: 'Yes. The ongoing plan starts from £65/month for a Starter Site and £110/month for a Business Site. It covers hosting, domain management, security updates, performance monitoring, SSL renewal, monthly backups, and small content changes. It is optional; you can host elsewhere if you prefer.',
  },
  {
    q: 'How long does it take?',
    a: 'Starter sites are typically live within two weeks. Business and custom sites take two to four weeks depending on complexity. We give you a clear timeline before we start.',
  },
  {
    q: 'Can you connect it to my AI agents?',
    a: 'Yes. Every Telos Website can be wired directly into your Telos AI system: receptionist, chat assistant, lead follow-up, and more. This is included in Business and Custom sites and can be added to a Starter site too.',
  },
  {
    q: 'Do I own the site?',
    a: 'Yes, completely. You own the code, the content, and the domain. If you ever want to move elsewhere, you take everything with you.',
  },
]

export default function WebsitesPricingPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label">Pricing</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              A fixed price.<br />
              <span className={styles.accent}>Agreed before we start.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              A one-off build fee, scoped to your business. No hidden costs,
              no scope creep, no surprises. You know the full number before
              you agree to anything.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.tiersSection}>
        <div className="container">
          <div className={styles.tiersGrid}>
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div className={styles.tier}>
                  <div className={styles.tierName}>{tier.name}</div>
                  <div className={styles.tierPriceWrap}>
                    {tier.period && <span className={styles.tierFrom}>{tier.period}</span>}
                    <span className={styles.tierPrice}>{tier.price}</span>
                  </div>
                  <div className={styles.tierBuild}>{tier.build}</div>
                  <p className={styles.tierDesc}>{tier.desc}</p>
                  <ul className={styles.features}>
                    {tier.features.map(f => (
                      <li key={f} className={styles.feature}>
                        <span className={styles.featureTick}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className={styles.tierNote}>{tier.note}</p>
                  <Link href="/contact" className={styles.tierBtn}>
                    Book a call
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className={styles.monthlyBand}>
              <div className={styles.monthlyLeft}>
                <span className={styles.monthlyLabel}>Ongoing plan</span>
                <div className={styles.monthlyPrice}>from £65<span className={styles.monthlyPer}>/month</span></div>
                <p className={styles.monthlyDesc}>
                  Every site we build comes with an optional ongoing plan covering everything
                  it takes to keep your site fast, secure, and running.
                </p>
              </div>
              <ul className={styles.monthlyFeatures}>
                <li><span className={styles.monthlyTick}>✓</span> Hosting &amp; domain management</li>
                <li><span className={styles.monthlyTick}>✓</span> Security updates &amp; monitoring</li>
                <li><span className={styles.monthlyTick}>✓</span> Performance &amp; uptime monitoring</li>
                <li><span className={styles.monthlyTick}>✓</span> Small content updates on request</li>
                <li><span className={styles.monthlyTick}>✓</span> SSL certificate renewal</li>
                <li><span className={styles.monthlyTick}>✓</span> Monthly backup</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className={styles.aiCallout}>
              <div className={styles.aiCalloutText}>
                <span className={styles.aiCalloutLabel}>Bundle with Telos AI</span>
                <p className={styles.aiCalloutDesc}>
                  Build your website and AI agents together. When your site is wired
                  directly into your receptionist, chat assistant, and lead pipeline,
                  it works harder from day one. Ask us about combined pricing on your call.
                </p>
              </div>
              <Link href="/" className={styles.aiCalloutLink}>
                See Telos AI →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <Reveal>
            <h2 className={styles.faqH2}>FAQs</h2>
          </Reveal>
          <div className={styles.faqs}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className={styles.faqItem}>
                  <h3 className={styles.faqQ}>{faq.q}</h3>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
