import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import TextScanner from '@/components/motion/TextScanner'
import PhoneShowcase from '@/components/demos/PhoneShowcase'
import type { PhoneDemo } from '@/components/demos/PhoneShowcase'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos Websites — Built to Win Clients',
  description:
    'We design and build websites for service businesses. Fast, focused, and wired into your AI agents from day one.',
}

const BASE = '/demos'

const phoneShowcaseDemos: PhoneDemo[] = [
  {
    name:     'Artisanal Coffee Co.',
    category: 'Coffee Shop',
    path:     `${BASE}/stitch-coffee/stitch_coffee_co_website_design/home_coffee_co._1/code.html`,
  },
  {
    name:     'Heritage Hearth Pizza',
    category: 'Restaurant',
    path:     `${BASE}/stitch-pizza/stitch_modern_authentic_pizza_co/pizza_co._home_1/code.html`,
  },
  {
    name:     'Aura Kin Salon',
    category: 'Luxury Salon',
    path:     `${BASE}/stitch-salon/stitch_aura_kin_logo/aura_kin_home/code.html`,
  },
  {
    name:     'Lavisha Professional Services',
    category: 'Service Business',
    path:     `${BASE}/stitch-services/stitch_transparent_service_hub/home_lavisha_1/code.html`,
  },
]

const steps = [
  { n: '01', title: 'We learn your business', desc: 'A short call. We look at what you do, who you serve, and what the site needs to achieve.' },
  { n: '02', title: 'We design and build it', desc: 'You see the design before a line of code is written. We build it once it is approved.' },
  { n: '03', title: 'We launch and manage it', desc: 'We handle hosting, updates, and performance. You focus on the work.' },
]

export default function WebsitesHomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <span className="label">Telos Websites</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              Websites built<br />
              <span className={styles.accent}>to win clients.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.heroSub}>
              Fast, focused, and built around exactly how your business works.
              Every site is designed to convert visitors and can be wired
              directly into your Telos AI agents from day one.
            </p>
          </Reveal>
          <Reveal delay={0.3} className={styles.heroBtns}>
            <Link href="/contact" className={styles.btnPri}>Book a free call</Link>
            <Link href="/websites/what-we-build" className={styles.btnSec}>What we build</Link>
          </Reveal>
        </div>
        <div className={styles.heroFade} />
      </section>

      {/* ── STATEMENT ── */}
      <section className={styles.statement}>
        <div className="container">
          <Reveal>
            <span className="label">What we do</span>
          </Reveal>
          <TextScanner dark className={styles.statementH2}>
            A website built around your business. Not a template adapted to it.
          </TextScanner>
          <Reveal delay={0.2}>
            <p className={styles.statementSub}>
              Most website builders give you a template and ask you to fit your
              business into it. We do the opposite. We learn how you work, what your
              clients need to see, and we build from the ground up around that.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── DEMO SHOWCASE ── iPhone portrait scroll showcase */}
      <PhoneShowcase demos={phoneShowcaseDemos} />

      {/* ── SHOWCASE BAND ── */}
      <section className={styles.showcaseBandSection}>
        <div className="container">
          <Reveal>
            <div className={styles.showcaseBand}>
              <p className={styles.showcaseBandText}>
                These are real demos of what we build for service businesses.
                Every site is designed from scratch. Never a template.
              </p>
              <Link href="/contact" className={styles.btnPriLight}>
                Get your own website
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AI INTEGRATION BAND ── */}
      <section className={styles.aiBand}>
        <div className="container">
          <div className={styles.aiBandInner}>
            <div>
              <Reveal>
                <span className="label">Built in from day one</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className={styles.aiBandH2}>
                  Your website, wired into your AI agents.
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className={styles.aiBandSub}>
                  Every Telos Website can connect directly to your AI receptionist,
                  lead follow-up pipeline, chat assistant, and more. Your site does
                  not just look good. It works alongside your full AI system.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/" className={styles.btnOutline}>
                See Telos AI agents
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.how}>
        <div className="container">
          <Reveal>
            <span className="label">How it works</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.howH2}>Three steps. No surprises.</h2>
          </Reveal>
          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className={styles.stepCard}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <Reveal>
            <span className="label">Get started</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={styles.ctaH2}>
              Ready to see what we can build for you?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.ctaSub}>Book a free call. No pressure, no pitch.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="/contact" className={styles.btnPri}>Book a free call</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
