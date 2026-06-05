import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos Media | Content, AI Video & Advertising Campaigns',
  description:
    'AI-powered social media content, video production, and advertising campaigns built for modern brands. Part of the TelosAI Group.',
}

/* ── Services data — edit here ── */
const services = [
  {
    icon: '📱',
    title: 'Social Media Content',
    desc: 'Strategy, copywriting, on-brand graphics, and automated scheduling. We run your channels so your team can focus on what they do best.',
    tags: ['Strategy', 'Copywriting', 'Design', 'Scheduling'],
  },
  {
    icon: '🎬',
    title: 'AI Video Production',
    desc: 'AI-generated brand videos, ads, reels, and promos at a fraction of traditional production cost — without sacrificing quality or creativity.',
    tags: ['Brand Video', 'Reels', 'Ads', 'Promos'],
  },
  {
    icon: '📣',
    title: 'Advertising Campaigns',
    desc: 'Paid media that performs. We plan, create, and manage campaigns across Meta, Google, TikTok, and LinkedIn — optimised for your goals.',
    tags: ['Meta', 'Google', 'TikTok', 'LinkedIn'],
  },
  {
    icon: '🧭',
    title: 'Brand Content Strategy',
    desc: 'Clarity on what to say, how to say it, and where. Content planning, tone of voice, messaging frameworks, and creative direction built around your audience.',
    tags: ['Content Plan', 'Tone of Voice', 'Creative Direction'],
  },
]

/* ── Example placeholder cards — swap in real thumbnails/videos later ── */
const examples = [
  {
    label:   'AI Brand Video',
    caption: 'Premium brand film produced entirely with AI. Fast, high-quality, fraction of the cost.',
    /* TODO: replace with real thumbnail image once assets are ready */
    gradient: 'linear-gradient(135deg, rgba(0,180,150,.25) 0%, rgba(0,100,90,.12) 100%)',
    accent: '#00D4B4',
  },
  {
    label:   'Social Campaign',
    caption: '30-day content calendar with graphics and copy for a lifestyle brand.',
    gradient: 'linear-gradient(135deg, rgba(120,104,230,.25) 0%, rgba(60,50,140,.12) 100%)',
    accent: '#7868E6',
  },
  {
    label:   'Paid Ad Creative',
    caption: 'Meta ad set — 6 variants tested across audiences. Split-tested copy and visual.',
    gradient: 'linear-gradient(135deg, rgba(220,100,80,.2) 0%, rgba(140,40,30,.1) 100%)',
    accent: '#E06848',
  },
  {
    label:   'Reels & Short-Form',
    caption: 'Weekly reel package — scripted, edited, and captioned in your brand voice.',
    gradient: 'linear-gradient(135deg, rgba(230,160,60,.2) 0%, rgba(140,90,20,.1) 100%)',
    accent: '#E6A23C',
  },
]

/* ── Pricing tiers ── */
const tiers = [
  {
    name: 'Starter',
    price: '£150',
    period: '/mo',
    popular: false,
    features: [
      '8 social posts per month',
      'Copywriting & graphics included',
      '1 platform managed',
    ],
  },
  {
    name: 'Growth',
    price: '£275',
    period: '/mo',
    popular: true,
    features: [
      '15 social posts per month',
      '2 AI-generated videos',
      '2 platforms managed',
    ],
  },
  {
    name: 'Pro',
    price: '£450',
    period: '/mo',
    popular: false,
    features: [
      '25 social posts per month',
      '4 AI-generated videos',
      'Paid ads managed',
      'Content strategy included',
    ],
  },
]

export default function MediaPage() {
  return (
    <>
      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section className={styles.hero}>
        {/* Teal orb */}
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />

        <div className="container">
          <Reveal>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot} />
              <span>Part of the TelosAI Group</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Content That Converts.<br />
              <span className={styles.heroAccent}>Campaigns That Captivate.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              AI-powered social media, video production, and advertising campaigns
              built for modern brands that want to grow without guesswork.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className={styles.heroCtas}>
              <a href="#services" className={styles.ctaPrimary}>What We Do</a>
              <a href="#booking" className={styles.ctaSecondary}>Book a Call</a>
            </div>
          </Reveal>
        </div>

        <div className={styles.heroFade} />
      </section>

      {/* ════════════════════════════════════
          SERVICES
      ════════════════════════════════════ */}
      <section id="services" className={styles.services}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>What We Do</span>
            <h2 className={styles.sectionH2}>Everything your brand needs to grow.</h2>
            <p className={styles.sectionSub}>
              Four disciplines. One team. Built to work together so nothing falls through the cracks.
            </p>
          </Reveal>

          <div className={styles.serviceGrid}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{s.icon}</div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                  <div className={styles.tagRow}>
                    {s.tags.map(t => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          EXAMPLES / SHOWREEL
      ════════════════════════════════════ */}
      <section id="examples" className={styles.examples}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>Examples</span>
            <h2 className={styles.sectionH2}>Work that speaks for itself.</h2>
            <p className={styles.sectionSub}>
              A sample of what we produce. Every project is bespoke.
            </p>
          </Reveal>

          {/* Request note */}
          <Reveal>
            <div className={styles.examplesNote}>
              Examples available on request —{' '}
              <a href="#booking" className={styles.examplesNoteLink}>book a call</a>{' '}
              to see work relevant to your industry.
            </div>
          </Reveal>

          <div className={styles.examplesGrid}>
            {examples.map((ex, i) => (
              <Reveal key={ex.label} delay={i * 0.07}>
                <div className={styles.exampleCard}>
                  {/*
                    TODO: Replace .exampleThumb gradient with a real asset:
                    <img src="/media/thumbs/brand-video.jpg" className={styles.exampleThumb} />
                    or wrap in a <video> tag for autoplay reel previews
                  */}
                  <div
                    className={styles.exampleThumb}
                    style={{ background: ex.gradient }}
                  >
                    {/* Play icon */}
                    <div className={styles.playBtn}>
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" aria-hidden="true">
                        <path d="M2 2l14 8L2 18V2z"/>
                      </svg>
                    </div>
                    <span
                      className={styles.exampleBadge}
                      style={{ color: ex.accent, borderColor: `${ex.accent}50`, background: `${ex.accent}18` }}
                    >
                      {ex.label}
                    </span>
                  </div>
                  <div className={styles.exampleCaption}>{ex.caption}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PRICING
      ════════════════════════════════════ */}
      <section id="pricing" className={styles.pricing}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>Pricing</span>
            <h2 className={styles.sectionH2}>Every brand is different — so is our pricing.</h2>
            <p className={styles.sectionSub}>
              We tailor every package to your goals, audience, and content volume.
              Whether you are a growing startup or an established brand, we will build a
              proposal that fits. All prices shown are starting points.
            </p>
          </Reveal>

          <div className={styles.tierGrid}>
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1}>
                <div className={`${styles.tierCard} ${tier.popular ? styles.tierPopular : ''}`}>
                  {tier.popular && (
                    <div className={styles.popularBadge}>Most Popular</div>
                  )}
                  <div className={styles.tierName}>{tier.name}</div>
                  <div className={styles.tierPriceRow}>
                    <span className={styles.tierPrice}>From {tier.price}</span>
                    <span className={styles.tierPer}>{tier.period}</span>
                  </div>
                  <ul className={styles.tierFeatures}>
                    {tier.features.map(f => (
                      <li key={f} className={styles.tierFeature}>
                        <span className={styles.tierTick}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#booking" className={tier.popular ? styles.tierBtnPrimary : styles.tierBtnGhost}>
                    Get Started
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* One-off video note */}
          <Reveal>
            <p className={styles.videoNote}>One-off AI video production from <strong>£99</strong></p>
          </Reveal>

          {/* Disclaimer */}
          <Reveal>
            <p className={styles.disclaimer}>
              All prices are indicative. Final pricing varies depending on your requirements.
              Minimum 3-month commitment on retainer packages. Ad spend is always separate and client-owned.
            </p>
          </Reveal>

          <Reveal>
            <div className={styles.pricingCta}>
              <a href="#booking" className={styles.ctaPrimary}>Get a Quote</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════
          BOOKING
      ════════════════════════════════════ */}
      <section id="booking" className={styles.booking}>
        <div className="container">
          <Reveal>
            <span className={styles.label}>Get Started</span>
            <h2 className={styles.sectionH2}>Let's Create Something.</h2>
            <p className={styles.sectionSub}>
              Pick a time or send us a message. We will come back to you within one working day.
            </p>
          </Reveal>

          <Reveal>
            <div className={styles.bookingGrid}>
              {/* Google Calendar booking card */}
              <div className={styles.calCard}>
                <div className={styles.calIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4B4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18M8 14h2M11 14h2M14 14h2M8 17h2M11 17h2M14 17h2"/>
                  </svg>
                </div>
                <h3 className={styles.calTitle}>Discovery call</h3>
                <p className={styles.calDesc}>
                  Pick a time that suits you. The call is 30 minutes over Google Meet
                  and you will receive a confirmation and calendar invite straight away.
                </p>
                <ul className={styles.calAgenda}>
                  {[
                    'Your brand, goals, and content needs',
                    'Which services fit best',
                    'Pricing and next steps',
                  ].map(item => (
                    <li key={item} className={styles.calAgendaItem}>
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
                <p className={styles.calNote}>Free, no commitment.</p>
              </div>

              {/* Contact form — handled client-side */}
              <MediaContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

/* ── Client component for the form ── */
import MediaContactForm from './MediaContactForm'
