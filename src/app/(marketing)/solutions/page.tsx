import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'We are not a software product with a fixed list of features. We are AI experts who learn your business, then build the agents and integrations that actually fit how you work.',
}

const examples = [
  { n: '01', title: 'AI receptionists',             desc: 'An agent that answers calls and enquiries day and night, books appointments, and never lets a lead go cold.' },
  { n: '02', title: 'Chatbots and assistants',       desc: 'Smart assistants on your website that answer questions, qualify leads, and guide people to book, in your voice.' },
  { n: '03', title: 'CRM and pipeline automation',   desc: 'Every lead captured, tracked, and followed up automatically, so nothing slips through the cracks.' },
  { n: '04', title: 'Missed-call and lead recovery', desc: 'The moment a call is missed, an automatic follow-up goes out, turning lost calls back into booked work.' },
  { n: '05', title: 'Lead generation',               desc: 'Systems that find and reach the right prospects for your business, consistently and on autopilot.' },
  { n: '06', title: 'Data and insights',             desc: 'Plain-English reporting that shows what is working, what is not, and where the next opportunity is.' },
  { n: '07', title: 'Conversion websites',           desc: 'A fast, refined site built for one job: turning visitors into booked clients, wired into your agents.' },
  { n: '08', title: 'Content and social',            desc: 'On-brand posts, graphics, and campaigns produced and scheduled for you, so your presence never goes quiet.' },
]

export default function SolutionsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label">What we do</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              We build custom AI, <span className={styles.accent}>tailored to you.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              We are not a software product with a fixed list of features. We are AI experts
              who learn your business, then build the agents and integrations that actually fit
              how you work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.belief}>
        <div className="container">
          <Reveal><span className="label">Our approach</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.beliefH2}>
              Most automation is sold in boxes.{' '}
              <span className={styles.accent}>Your business does not work in boxes.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      <section className={styles.examples}>
        <div className="container">
          <div className={styles.exHead}>
            <Reveal><span className="label">A few things we build</span></Reveal>
            <Reveal delay={0.08}><h2 className={styles.exH2}>Examples, not a menu.</h2></Reveal>
            <Reveal delay={0.14}>
              <p className={styles.exSub}>
                These are some of the most common builds. If what you need is not here,
                that is fine. We start from your problem, not from a product list.
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
          <Reveal><span className="label">The point</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.tailorH2}>
              Tell us what slows you down.{' '}
              <span className={styles.accent}>We will build the rest.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.tailorSub}>
              One short call is all it takes to find out what AI could do for your business.
              No pressure, and an honest answer either way.
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
