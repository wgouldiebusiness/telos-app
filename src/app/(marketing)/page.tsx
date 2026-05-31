import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos AI — AI systems for ambitious service businesses.',
  description:
    'We engineer custom AI infrastructure that handles admin, captures leads, and keeps your pipeline moving. Built for your business. Managed by us. Improving every month.',
}

const trustBadges = [
  'No lock-in',
  'Scope agreed upfront',
  'UK-based team',
  'Cancel anytime',
]

const before = [
  'Missed calls with no follow-up',
  'Follow-ups sent late, or not at all',
  'Evenings spent catching up on admin',
  'Leads lost to whoever answered faster',
  'Scaling means hiring more people',
]

const after = [
  'Every call handled, day and night',
  'Every lead followed up within minutes',
  'Zero admin time. Everything runs itself',
  'The fastest reply in your market',
  'Scale without adding headcount',
]

const problems = [
  {
    word: 'Missed',
    body: 'A missed call or slow reply does not just cost one job. It costs every referral that client would have sent.',
  },
  {
    word: 'Wasted',
    body: 'Skilled hours spent on scheduling, chasing, and reminders are money paid to do work a system could do for pennies.',
  },
  {
    word: 'Leaked',
    body: 'Every lead without an immediate, intelligent response is a lead your competitors are closing instead.',
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
    title: 'A focused conversation',
    body: 'Thirty minutes to understand your business, where the bottlenecks are, and what the right system would actually look like.',
  },
  {
    n: '02',
    title: 'We design the system',
    body: 'A precise map of what we will build, what it connects to, and exactly what it will do. You see the full picture before anything is agreed.',
  },
  {
    n: '03',
    title: 'We build and install it',
    body: 'We build your agents, wire them into your existing tools, and test everything thoroughly. Nothing goes live until you have approved it.',
  },
  {
    n: '04',
    title: 'We manage and improve it',
    body: 'We monitor performance, refine what needs adjusting, and develop the system as your business grows. You own the results. We handle the work.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <span className="label">AI systems for ambitious service businesses</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              The gap between busy and building{' '}
              <span className={styles.accent}>is not effort. It is systems.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              We engineer the AI infrastructure that handles your admin, captures your
              leads, and keeps your pipeline moving. Custom-built for your business.
              Fully managed by us. Compounding in value every month.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className={styles.heroBtns}>
              <Link href="/contact" className={styles.btnPri}>Start the Conversation</Link>
              <Link href="/process" className={styles.btnSec}>How It Works</Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className={styles.trustRow}>
              {trustBadges.map(b => (
                <span key={b} className={styles.trustBadge}>{b}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem band */}
      <section className={styles.problem}>
        <div className="container">
          <Reveal>
            <span className="label">What it is costing you right now</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.problemH2}>
              Running everything manually is not just exhausting.{' '}
              <span className={styles.accent}>It is expensive.</span>
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

      {/* Before / After */}
      <section className={styles.compare}>
        <div className="container">
          <Reveal>
            <span className="label">The difference</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.compareH2}>
              Same business. <span className={styles.accent}>Different infrastructure.</span>
            </h2>
          </Reveal>
          <div className={styles.compareGrid}>
            <Reveal delay={0.1}>
              <div className={styles.compareCol}>
                <div className={styles.colLabel}>
                  <span className={styles.colLabelText}>Without Telos</span>
                </div>
                <ul className={styles.compareList}>
                  {before.map(item => (
                    <li key={item} className={styles.compareBefore}>
                      <span className={styles.beforeMark}>×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className={`${styles.compareCol} ${styles.compareColAfter}`}>
                <div className={`${styles.colLabel} ${styles.colLabelAfter}`}>
                  <span className={styles.colLabelText}>With Telos</span>
                </div>
                <ul className={styles.compareList}>
                  {after.map(item => (
                    <li key={item} className={styles.compareAfter}>
                      <span className={styles.afterMark}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
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
                Not a subscription. A{' '}
                <span className={styles.accent}>technical partnership.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className={styles.whatSub}>
                We do not hand you a tool and wish you luck. We build your system,
                connect it to everything you already use, and manage it for you. Things
                we build include:
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
              <strong>If you can describe the problem, we can build the solution.</strong>
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
              <h2 className={styles.howH2}>Four steps. No surprises.</h2>
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
            <span className="label">Limited availability</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              We take on a small number of new clients{' '}
              <span className={styles.accent}>at any one time.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              Every build gets our full attention. If you are ready to stop running
              your business manually, the first step is a short conversation.
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
