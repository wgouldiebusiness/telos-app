import type { Metadata } from 'next'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How Telos AI works: from a free discovery call through to ongoing optimisation. Five clear steps, no jargon.',
}

const steps = [
  {
    n: '01',
    title: 'Discovery Call',
    label: 'Free, 15 minutes',
    desc: 'We begin with a focused conversation about how your practice currently operates: where you spend your time, where revenue leaks, and what you wish ran itself. No sales pitch. No commitment required. Just an honest look at whether we can help.',
    detail: 'By the end of this call, you will know exactly what we would build, roughly what it would cost, and what the realistic impact would be.',
  },
  {
    n: '02',
    title: 'Audit and Analysis',
    label: 'Week one',
    desc: 'We map your current workflows in detail: every touchpoint, every manual task, every handoff. We identify where automation will deliver the greatest return and where it would add complexity without value.',
    detail: 'You receive a short written audit: what we found, what we recommend, and in what order. Nothing is assumed, nothing is oversold.',
  },
  {
    n: '03',
    title: 'Strategy and Plan',
    label: 'Week one to two',
    desc: 'We agree on the exact scope of work in a signed Statement of Work. You know precisely what will be built, when it will be delivered, and what it will cost. No vague proposals and no moving goalposts.',
    detail: 'The plan specifies every automation, every integration, every deliverable. We do not begin building until we have your written approval.',
  },
  {
    n: '04',
    title: 'Build and Integrate',
    label: 'Two to four weeks',
    desc: 'We build your automations, configure your systems, and integrate everything with the tools you already use. You review and test before anything goes live. Nothing is deployed without your explicit sign-off.',
    detail: 'We work quietly in the background and check in at agreed milestones. You are never left wondering what is happening or when it will be ready.',
  },
  {
    n: '05',
    title: 'Optimise and Grow',
    label: 'Ongoing',
    desc: 'Your automations are live. We monitor performance, respond to any issues, and refine the systems as your practice evolves. Monthly reports show you exactly what each automation is doing and what it is worth.',
    detail: 'As your business grows, your automations grow with it. We treat this as a long-term partnership, not a one-off project.',
  },
]

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className={`section section-green ${styles.hero}`}>
        <div className="container">
          <Reveal>
            <span className="label">How it works</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroHeadline}>
              Five steps.<br />One running system.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              From first conversation to ongoing automation. Clear, documented,
              and entirely in your control at every stage.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="section section-bone">
        <div className="container">
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={0.05}>
                <div className={styles.step}>
                  <div className={styles.stepLeft}>
                    <span className={styles.stepNum}>{step.n}</span>
                  </div>
                  <div className={styles.stepRight}>
                    <div className={styles.stepMeta}>
                      <span className="label">{step.label}</span>
                    </div>
                    <h2 className={styles.stepTitle}>{step.title}</h2>
                    <p className={styles.stepDesc}>{step.desc}</p>
                    <p className={styles.stepDetail}>{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section section-green ${styles.cta}`}>
        <div className="container">
          <Reveal>
            <h2 className={styles.ctaHeadline}>Start with a discovery call.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.ctaBody}>
              Fifteen minutes is all it takes to understand whether automation is right
              for your practice, and what it could realistically achieve.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <AnimatedButton href="/contact" variant="secondary">Book a Discovery Call</AnimatedButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
