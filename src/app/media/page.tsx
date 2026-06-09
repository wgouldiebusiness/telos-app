import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import MediaAccordion from './MediaAccordion'
import MediaDemos from './MediaDemos'
import MediaContactForm from './MediaContactForm'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos Media | Content, Video & Advertising',
  description:
    'Social media content, AI video production, and advertising campaigns. Built for modern brands that want to grow without guesswork.',
}

const services = [
  {
    n: '01',
    title: 'Social Media Content',
    desc: 'Strategy, copywriting, on-brand graphics, and automated scheduling. We run your channels so your team can focus on the work that actually moves the business.',
    tags: ['Strategy', 'Copywriting', 'Design', 'Scheduling'],
  },
  {
    n: '02',
    title: 'AI Video Production',
    desc: 'AI-generated brand videos, ads, reels, and promos. A fraction of traditional production cost, with none of the compromise on quality or creative direction.',
    tags: ['Brand Video', 'Reels', 'Ads', 'Promos'],
  },
  {
    n: '03',
    title: 'Advertising Campaigns',
    desc: 'Paid media that performs. We plan, create, and manage campaigns across Meta, Google, TikTok, and LinkedIn. Optimised for your goals, tracked against what matters.',
    tags: ['Meta', 'Google', 'TikTok', 'LinkedIn'],
  },
  {
    n: '04',
    title: 'Brand Content Strategy',
    desc: 'Clarity on what to say, how to say it, and where. Content planning, tone of voice, messaging frameworks, and creative direction built around your audience.',
    tags: ['Content Plan', 'Tone of Voice', 'Creative Direction'],
  },
]


const tiers = [
  { name: 'Starter', price: '£150', period: '/mo', popular: false, features: ['8 social posts/month', 'Copywriting & graphics', '1 platform managed'] },
  { name: 'Growth',  price: '£275', period: '/mo', popular: true,  features: ['15 social posts/month', '2 AI-generated videos', '2 platforms managed'] },
  { name: 'Pro',     price: '£450', period: '/mo', popular: false, features: ['25 social posts/month', '4 AI-generated videos', 'Paid ads managed', 'Strategy included'] },
]

export default function MediaPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroGrain} />
        <div className="container">
          <Reveal>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot} />
              Part of the TelosAI Group
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className={styles.heroH1}>
              <span className={styles.heroLine1}>Content That</span>
              <span className={styles.heroLine2}>Converts.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              Social media. AI video. Advertising campaigns.<br />
              Built for modern brands that mean business.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className={styles.heroCtas}>
              <a href="#services" className={styles.ctaPrimary}>What We Do</a>
              <a href="#booking"  className={styles.ctaGhost}>Book a Call</a>
            </div>
          </Reveal>
        </div>

        <div className={styles.heroFade} />
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[1, 2].map(n => (
            <span key={n} className={styles.marqueeInner}>
              {['SOCIAL MEDIA', 'AI VIDEO', 'PAID ADS', 'BRAND STRATEGY', 'CONTENT', 'REELS', 'CAMPAIGNS', 'COPYWRITING'].map(w => (
                <span key={w} className={styles.marqueeItem}>
                  <span className={styles.marqueeDot} />
                  {w}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className={styles.services}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>What We Do</span>
            <h2 className={styles.sectionH2}>
              Four disciplines.<br />One team.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <MediaAccordion services={services} />
          </Reveal>
        </div>
      </section>


      {/* ═══ EXAMPLES ═══ */}
      <section id="examples" className={styles.examples}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>What We Produce</span>
            <h2 className={styles.sectionH2}>See it in action.</h2>
            <p className={styles.sectionNote}>
              Interactive demos of the four things we build for brands every week.
              Real work examples available on request.{' '}
              <a href="#booking" className={styles.noteLink}>Book a call</a>.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <MediaDemos />
          </Reveal>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className={styles.pricing}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>Pricing</span>
            <h2 className={styles.sectionH2}>Every brand is different.<br />So is our pricing.</h2>
            <p className={styles.pricingSub}>
              All prices are starting points. Final packages are tailored to your goals, audience, and content volume.
            </p>
          </Reveal>

          <div className={styles.tierRow}>
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div className={`${styles.tier} ${tier.popular ? styles.tierPop : ''}`}>
                  {tier.popular && <span className={styles.tierBadge}>Most Popular</span>}
                  <div className={styles.tierName}>{tier.name}</div>
                  <div className={styles.tierPrice}>
                    From {tier.price}<span className={styles.tierPer}>{tier.period}</span>
                  </div>
                  <ul className={styles.tierList}>
                    {tier.features.map(f => (
                      <li key={f} className={styles.tierItem}>
                        <span className={styles.tierTick}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <a href="#booking" className={tier.popular ? styles.tierBtnPop : styles.tierBtnGhost}>
                    Get Started
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className={styles.pricingNote}>
              One-off AI video production from <strong>£99</strong>
            </p>
            <p className={styles.disclaimer}>
              Minimum 3-month commitment on retainer packages. Ad spend is always separate and client-owned.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <a href="#booking" className={styles.ctaPrimary}>Get a Quote</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ BOOKING ═══ */}
      <section id="booking" className={styles.booking}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>Get Started</span>
            <h2 className={styles.sectionH2}>Let's Create<br />Something.</h2>
            <p className={styles.bookingSub}>
              Pick a time or send a message. We will be back within one working day.
            </p>
          </Reveal>

          <Reveal>
            <div className={styles.bookingGrid}>
              {/* Google Calendar booking card */}
              <div className={styles.calCard}>
                <div className={styles.calIcon}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00D4B4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18M8 14h2M11 14h2M14 14h2M8 17h2M11 17h2M14 17h2"/>
                  </svg>
                </div>
                <h3 className={styles.calTitle}>Discovery call</h3>
                <p className={styles.calDesc}>
                  30 minutes over Google Meet. We learn your brand, your goals, and what kind of content you need. You walk away with a clear proposal.
                </p>
                <ul className={styles.calAgenda}>
                  {['Your brand, goals, and content needs', 'Which services fit best', 'Pricing and next steps'].map(item => (
                    <li key={item} className={styles.calItem}>
                      <span className={styles.calTick}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <a
                  href={process.env.NEXT_PUBLIC_BOOKING_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                >
                  Book a 30-minute call →
                </a>
                <p className={styles.calFree}>Free. No commitment.</p>
              </div>

              <MediaContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
