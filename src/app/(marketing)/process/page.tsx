import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Four clear steps from first conversation to a running AI system. You see the full picture before you commit to anything.',
}

const steps = [
  {
    n: '01',
    title: 'A focused conversation',
    body: 'A 15-minute call. We learn your business and identify where AI will make a real difference.',
  },
  {
    n: '02',
    title: 'We design the system',
    body: 'A precise plan: what we build, what it costs, and what it connects to. You approve everything before we write a line of code.',
  },
  {
    n: '03',
    title: 'We build and install it',
    body: 'Your agents are built, integrated with your tools, and tested. You sign off before anything goes live.',
  },
  {
    n: '04',
    title: 'We manage and improve it',
    body: 'We monitor, adjust, and develop the system as your business evolves. You own the results. We do the upkeep.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>How it works</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              Four steps. <span className={styles.accent}>No surprises.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={styles.heroSub}>
              From first conversation to a running system. You see the full picture,
              approve every stage, and know the exact cost before you commit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className="container">
          <div className={styles.steps}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className={styles.step}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <div>
                    <h2 className={styles.stepTitle}>{s.title}</h2>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>Start here</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              Step one costs you <span className={styles.accent}>nothing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              Book a meeting. No pressure, no pitch.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.btnPri}>Book a meeting</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
