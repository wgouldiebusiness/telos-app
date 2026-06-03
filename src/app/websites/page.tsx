import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import TextScanner from '@/components/motion/TextScanner'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos Websites — Built to Win Clients',
  description:
    'We design and build websites for service businesses. Fast, focused, and wired into your AI agents from day one.',
}

interface ShowcaseItem {
  title: string
  category: string
  desc: string
  gradient: string
  accent: string
  imageSrc: string
  demoHref?: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: 'Rustic Pizza Co.',
    category: 'Restaurant',
    desc: 'Warm, inviting sites built around your menu, story, and table bookings.',
    gradient: 'linear-gradient(145deg, #1a0a04 0%, #4a1a06 45%, #8b3a10 100%)',
    accent: '#c45a1a',
    imageSrc: '',
    demoHref: '/demos/pizza/index.html',
  },
  {
    title: 'The Barber Collective',
    category: 'Grooming',
    desc: 'Sharp, minimal design focused on your portfolio and booking flow.',
    gradient: 'linear-gradient(145deg, #06060e 0%, #12122a 50%, #1e1e3e 100%)',
    accent: '#b8965a',
    imageSrc: '',
  },
  {
    title: 'Masters Plumbing',
    category: 'Trades',
    desc: 'Professional sites that get you found locally and turn visits into enquiries.',
    gradient: 'linear-gradient(145deg, #020e1a 0%, #062840 50%, #0a3d60 100%)',
    accent: '#2a8dd9',
    imageSrc: '',
  },
  {
    title: 'Bloom Hair Studio',
    category: 'Salon',
    desc: 'Portfolio-led sites that showcase your work and keep your diary full.',
    gradient: 'linear-gradient(145deg, #140a0e 0%, #3a1020 50%, #602840 100%)',
    accent: '#d4789a',
    imageSrc: '',
  },
  {
    title: 'Peak Physio Clinic',
    category: 'Health & Clinic',
    desc: 'Clean, trusted sites that convert new patient enquiries around the clock.',
    gradient: 'linear-gradient(145deg, #031414 0%, #082828 50%, #0c3c3c 100%)',
    accent: '#2ab8a0',
    imageSrc: '',
  },
  {
    title: 'Force Fitness',
    category: 'Gym & Fitness',
    desc: 'High-energy sites built around memberships, classes, and sign-ups.',
    gradient: 'linear-gradient(145deg, #0e0404 0%, #2a0a0a 50%, #420e0e 100%)',
    accent: '#d43030',
    imageSrc: '',
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
              Every site is designed to convert visitors — and can be wired
              directly into your Telos AI agents from day one.
            </p>
          </Reveal>
          <Reveal delay={0.3} className={styles.heroBtns}>
            <Link href="/contact" className={styles.btnPri}>Book a free call</Link>
            <Link href="/websites/what-we-build" className={styles.btnSec}>See our work</Link>
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

      {/* ── SHOWCASE GRID ── */}
      <section className={styles.showcase}>
        <div className="container">
          <Reveal>
            <span className="label">Examples</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.showcaseH2}>
              Built for every kind of service business.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.showcaseSub}>
              Below are examples of the styles and sectors we work in.
              Real screenshots coming soon — for now, the tone of each build.
            </p>
          </Reveal>

          <div className={styles.grid}>
            {showcaseItems.map((item, i) => (
              <Reveal key={item.title} delay={Math.floor(i / 2) * 0.08}>
                <div className={styles.card}>
                  <div
                    className={styles.cardPreview}
                    style={{ background: item.gradient }}
                  >
                    {item.imageSrc ? (
                      <img src={item.imageSrc} alt={item.title} className={styles.cardImg} />
                    ) : (
                      <div className={styles.cardMock}>
                        <div className={styles.mockBar}>
                          <span className={styles.mockDot} />
                          <span className={styles.mockDot} />
                          <span className={styles.mockDot} />
                        </div>
                        <div className={styles.mockHero} style={{ background: `${item.accent}22` }}>
                          <div className={styles.mockTitle} style={{ background: item.accent }} />
                          <div className={styles.mockSub} />
                          <div className={styles.mockBtn} style={{ background: item.accent }} />
                        </div>
                        <div className={styles.mockBody}>
                          <div className={styles.mockBlock} />
                          <div className={styles.mockBlock} style={{ width: '70%' }} />
                          <div className={styles.mockBlock} style={{ width: '85%' }} />
                        </div>
                      </div>
                    )}
                    <span className={styles.cardCategory} style={{ color: item.accent }}>
                      {item.category}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.desc}</p>
                    {item.demoHref && (
                      <a
                        href={item.demoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardDemo}
                      >
                        View demo →
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className={styles.showcaseCta}>
              <p className={styles.showcaseCtaText}>
                Every site is custom. These are the sectors we work in most.
              </p>
              <Link href="/websites/what-we-build" className={styles.btnPri}>
                See what is included
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
                  not just look good — it works alongside your full AI system.
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
