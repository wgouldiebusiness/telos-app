import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Pricing — Telos Websites',
  description:
    'A fixed build fee, scoped to your business. Ongoing management available. No hidden costs.',
}

const tiers = [
  {
    name: 'Starter Site',
    price: '£500',
    period: '+ from',
    build: 'One-off build',
    desc: 'A clean, fast, professional website for businesses that need to establish a proper online presence.',
    features: [
      'Up to 5 pages',
      'Custom design (no templates)',
      'Mobile and desktop optimised',
      'Contact form or booking link',
      'SEO foundations built in',
      'Delivered in two weeks',
    ],
    note: 'From £50/mo for hosting and maintenance',
  },
  {
    name: 'Business Site',
    price: '£900',
    period: '+ from',
    build: 'One-off build',
    desc: 'A conversion-focused site built around your full service offering, portfolio, and client journey.',
    features: [
      'Up to 10 pages',
      'Advanced booking or enquiry flow',
      'Gallery or portfolio section',
      'Testimonials and social proof',
      'Google Analytics and Search Console',
      'AI agent integration ready',
    ],
    note: 'From £100/mo for hosting, updates, and support',
  },
  {
    name: 'Custom',
    price: 'Bespoke',
    period: '',
    build: 'Scoped to your requirements',
    desc: 'Full custom build for businesses with complex needs — multiple service areas, booking systems, or AI integration.',
    features: [
      'Unlimited pages and features',
      'Full Telos AI agent integration',
      'Custom booking or CRM connection',
      'E-commerce or membership (if required)',
      'Content and SEO strategy',
      'Dedicated account management',
    ],
    note: 'Priced on your call. Agreed before we start.',
  },
]

const faqs = [
  {
    q: 'What does the build fee cover?',
    a: 'Design, development, testing, and launch. You see and approve the design before we write a line of code. The scope and cost are agreed before we start — no surprises.',
  },
  {
    q: 'Is there a monthly fee?',
    a: 'Hosting and maintenance is a separate monthly fee, starting from £50. This covers your domain and hosting, security updates, and any small content changes. It is optional — you can host elsewhere if you prefer.',
  },
  {
    q: 'How long does it take?',
    a: 'Starter sites are typically live within two weeks. Business and custom sites take two to four weeks depending on complexity. We give you a clear timeline before we start.',
  },
  {
    q: 'Can you connect it to my AI agents?',
    a: 'Yes. Every Telos Website can be wired directly into your Telos AI system — receptionist, chat assistant, lead follow-up, and more. This is included in Business and Custom sites; we can add it to a Starter site too.',
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
