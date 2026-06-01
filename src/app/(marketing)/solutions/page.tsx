import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import TextScanner from '@/components/motion/TextScanner'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'We are not a software product. We are the technical partner who learns your business, builds your AI system, and manages it for you. Every build is bespoke.',
}

const examples = [
  { n: '01', title: 'AI Receptionist',         desc: 'Your calls answered, appointments booked, and leads qualified around the clock. No missed calls, no cold leads from a busy afternoon.' },
  { n: '02', title: 'Website Chat Assistant',  desc: 'An intelligent assistant on your site that talks in your voice, answers questions, and converts visitors into booked clients.' },
  { n: '03', title: 'Lead Follow-Up Pipeline', desc: 'Every lead captured and followed up at the right time with the right message. Nothing slips, nothing is late.' },
  { n: '04', title: 'CRM Automation',          desc: 'Contacts organised, tasks triggered, and your pipeline kept moving. No manual input, no leads falling through the gaps.' },
  { n: '05', title: 'Missed-Call Recovery',    desc: 'The moment a call goes unanswered, an intelligent message goes out immediately to recover the lead.' },
  { n: '06', title: 'Reporting and Intelligence', desc: 'Plain-English monthly reports that tell you exactly what the system is doing and what it is returning.' },
  { n: '07', title: 'Conversion Websites',     desc: 'A fast, focused website built around your offer and wired into your agents from day one.' },
  { n: '08', title: 'Content and Social',      desc: 'Consistent, on-brand content produced in your voice and published on your behalf every week.' },
]

export default function SolutionsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>What we do</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              Not off the shelf. Built for how your business works.
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
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
          <Reveal><span className="label">How we work</span></Reveal>
          <TextScanner dark={false} className={styles.beliefH2}>
            We do not use off-the-shelf tools. Everything is custom coded for how your business actually works.
          </TextScanner>
          <Reveal delay={0.18}>
            <p className={styles.beliefSub}>
              Off-the-shelf products require you to change how you work to fit the software.
              We work the other way. Your business stays exactly as it is. The system wraps around it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.demoStrip}>
        <div className="container">
          <div className={styles.demoStripInner}>
            <div>
              <Reveal>
                <span className="label">See it working</span>
              </Reveal>
              <Reveal delay={0.1}>
                <p className={styles.demoStripText}>
                  Watch real examples of what these agents say and do.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className={styles.demoStripSub}>
                  Three live demo conversations on the home page, built in your voice.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/#showcase" className={styles.btnPri}>See the demos</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.examples}>
        <div className="container">
          <div className={styles.exHead}>
            <Reveal><span className="label">What we build</span></Reveal>
            <Reveal delay={0.08}><h2 className={styles.exH2}>We build custom AI agents.</h2></Reveal>
            <Reveal delay={0.14}>
              <p className={styles.exSub}>
                Every build is coded for your business specifically. Examples of what we have built:
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
              Ready to see what we can build for you?
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.tailorSub}>
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
