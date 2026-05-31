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
    body: 'Thirty minutes. We learn your business, map where the time and money are leaking, and identify which problems AI can solve cleanly. You leave with a clear picture of what is possible, regardless of whether you proceed.',
  },
  {
    n: '02',
    title: 'We design the system',
    body: 'We translate what we heard into a precise technical plan: what we will build, what it connects to, how it behaves, and what it costs in full. Nothing is vague. You approve everything before we touch a line of code.',
  },
  {
    n: '03',
    title: 'We build and install it',
    body: 'We build your agents, integrate them with your existing tools, and test every edge case. The system goes through a proper review before it goes anywhere near your business. You sign off before it goes live.',
  },
  {
    n: '04',
    title: 'We manage and improve it',
    body: 'The system is not set and forgotten. We monitor it, catch anything that needs adjusting, and develop it as your business evolves. You own the results. We do the upkeep.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label">How it works</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Four steps. <span className={styles.accent}>No surprises.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
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
                  <div className={styles.stepContent}>
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
          <Reveal><span className="label">Start here</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              Step one costs you <span className={styles.accent}>nothing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              A short call to understand your business and what AI could do for it.
              You leave with a clear view of what is possible. No pitch, no
              obligation, no wasted time.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.btnPri}>Book a Call</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
