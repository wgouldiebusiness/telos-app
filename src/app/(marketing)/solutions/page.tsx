import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'We are not a software product. We are the technical partner who learns your business, builds your AI system, and manages it for you. Every build is bespoke.',
}

const examples = [
  {
    n: '01',
    title: 'AI receptionists',
    desc: 'Your phones answered, appointments booked, and common queries handled around the clock. No missed calls. No cold leads from a busy afternoon.',
  },
  {
    n: '02',
    title: 'Website chat and lead qualification',
    desc: 'An intelligent assistant on your site that converses in your voice, answers questions, and converts visitors to booked appointments before they click away.',
  },
  {
    n: '03',
    title: 'CRM and pipeline automation',
    desc: 'Every lead captured, categorised, and followed up automatically, at the right time, with the right message. Nothing slips. Nothing is late.',
  },
  {
    n: '04',
    title: 'Missed-call recovery',
    desc: 'The moment a call goes unanswered, an intelligent message goes out. Most clients recover significant revenue from jobs they would previously have lost.',
  },
  {
    n: '05',
    title: 'Outbound lead generation',
    desc: 'Systematic, targeted outreach built around your ideal client profile. More conversations with the right people, running consistently in the background.',
  },
  {
    n: '06',
    title: 'Reporting and business intelligence',
    desc: 'Plain-English monthly reporting that tells you what your system is doing, what it is earning back, and where the next lever to pull is.',
  },
  {
    n: '07',
    title: 'Conversion websites',
    desc: 'A fast, conversion-led website built around your offer and wired into your agents from day one. Built to work, not to look impressive in a screenshot.',
  },
  {
    n: '08',
    title: 'Content and social presence',
    desc: 'Consistent, on-brand content produced in your voice and published on your behalf. Your presence stays active whether you have time to think about it or not.',
  },
]

export default function SolutionsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label">What we do</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Not off the shelf.{' '}
              <span className={styles.accent}>Built for how your business works.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              We are not a SaaS product with a fixed feature set. We are the technical
              partner who learns your operation, identifies where AI will make a real
              difference, and builds the system that delivers it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.belief}>
        <div className="container">
          <Reveal><span className="label">The honest truth</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.beliefH2}>
              Generic automation is built for the average business.{' '}
              <span className={styles.accent}>Yours is not average.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.beliefSub}>
              Off-the-shelf tools require you to change how you work to fit the software.
              We work the other way. Your business stays exactly as it is. The system
              wraps around it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.examples}>
        <div className="container">
          <div className={styles.exHead}>
            <Reveal><span className="label">What we build</span></Reveal>
            <Reveal delay={0.08}><h2 className={styles.exH2}>Examples, not a menu.</h2></Reveal>
            <Reveal delay={0.14}>
              <p className={styles.exSub}>
                The builds below cover what we do most often. If your situation falls
                outside them, it almost certainly does not matter. We start from your
                problem and design from there.
              </p>
            </Reveal>
          </div>
          <div className={styles.grid}>
            {examples.map((ex, i) => (
              <Reveal key={ex.n} delay={(i % 2) * 0.08}>
                <div className={styles.card}>
                  <div className={styles.cardNum}>{ex.n}</div>
                  <h3 className={styles.cardTitle}>{ex.title}</h3>
                  <p className={styles.cardDesc}>{ex.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.tailorBand}>
        <div className="container">
          <Reveal><span className="label">Next step</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.tailorH2}>
              Describe the problem.{' '}
              <span className={styles.accent}>We will design the solution.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.tailorSub}>
              A short call to understand your business and identify exactly where AI
              can make a real difference. You will leave with a clear picture of what
              is possible and what it would cost, before you commit to anything.
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
