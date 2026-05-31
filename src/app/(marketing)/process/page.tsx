import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Four clear steps from first call to a running AI system. Built around your business, approved by you at every stage.',
}

const steps = [
  {
    n: '01',
    title: 'A quick call',
    body: 'A short, no-pressure conversation to understand your business and where the time really goes.',
  },
  {
    n: '02',
    title: 'We map it out',
    body: 'We look at how you work and pinpoint exactly where AI will make the biggest difference.',
  },
  {
    n: '03',
    title: 'We build and connect it',
    body: 'We build your custom agents and wire them into the tools you already use. You approve everything before it goes live.',
  },
  {
    n: '04',
    title: 'We keep improving it',
    body: 'We monitor, refine, and adjust as your business grows. You get the results, we handle the upkeep.',
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
              Four steps. <span className={styles.accent}>Dead simple.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              From first conversation to a running system. Clear, and entirely in your
              control at every stage.
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
          <Reveal><span className="label">Get started</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              Start with <span className={styles.accent}>a quick call.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              Fifteen minutes is all it takes to find out whether AI can help your business,
              and where it would make the most difference.
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
