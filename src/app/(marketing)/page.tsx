import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos AI — Less admin. More of what you do best.',
  description:
    'Custom AI agents and integrations for UK service businesses. We build automations that quietly run the busywork so you stay focused on your clients.',
}

const problems = [
  {
    word: 'Missed',
    body: 'Every unanswered call is a client who rang the next business on the list.',
  },
  {
    word: 'Lost',
    body: 'Hours disappear each week into follow-up and admin nobody needs to do by hand.',
  },
  {
    word: 'Slipped',
    body: 'The follow-up that wins the job is the first thing to fall through when you are busy.',
  },
]

const tags = [
  'AI receptionists',
  'Chatbots',
  'CRM automation',
  'Missed-call recovery',
  'Lead generation',
  'Data and insights',
  'Conversion websites',
  'Content and social',
]

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <span className="label">AI built for service businesses</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Less admin. More of <span className={styles.accent}>what you do best.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              We build custom AI agents and integrations that quietly run the busywork
              behind your business, so you stay focused on your clients.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className={styles.heroBtns}>
              <Link href="/contact" className={styles.btnPri}>Book a Call</Link>
              <Link href="/process" className={styles.btnSec}>See How It Works</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem band */}
      <section className={styles.problem}>
        <div className="container">
          <Reveal>
            <span className="label">The cost of doing it all yourself</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.problemH2}>
              The work running your business is quietly <span className={styles.accent}>draining it.</span>
            </h2>
          </Reveal>
          <div className={styles.problemGrid}>
            {problems.map((p, i) => (
              <Reveal key={p.word} delay={i * 0.08}>
                <div className={styles.problemItem}>
                  <div className={styles.problemWord}>{p.word}</div>
                  <p className={styles.problemBody}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className={styles.what}>
        <div className="container">
          <div className={styles.whatTop}>
            <Reveal>
              <span className="label">What we do</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className={styles.whatH2}>
                We are AI experts. You stay the <span className={styles.accent}>expert in your business.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className={styles.whatSub}>
                We do not sell a fixed product. We learn how your business works and build
                agents and integrations that fit it. Things like:
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <div className={styles.tags}>
              {tags.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className={styles.whatCloser}>
              <strong>Tell us what slows you down.</strong> We will tailor the rest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.how} id="how">
        <div className="container">
          <div className={styles.howHead}>
            <Reveal>
              <span className="label">How it works</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className={styles.howH2}>Four steps. Dead simple.</h2>
            </Reveal>
          </div>
          <div className={styles.steps}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className={styles.step}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <Reveal>
            <span className="label">Get started</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              Ready to win back <span className={styles.accent}>your time?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              A free 15-minute call to find out honestly whether AI can help your
              business, and how.
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
