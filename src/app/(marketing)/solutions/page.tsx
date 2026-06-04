import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'We are not a software product. We are the technical partner who learns your business, builds your AI system, and manages it for you. Every build is bespoke.',
}

interface Example { n: string; title: string; desc: string }

const aiAgents: Example[] = [
  { n: '01', title: 'AI Receptionist',         desc: 'Your calls answered, appointments booked, and leads qualified around the clock. No missed calls, no cold leads lost to a busy afternoon.' },
  { n: '02', title: 'Website Chat Assistant',  desc: 'An intelligent assistant on your site that talks in your voice, answers questions, and converts visitors into booked clients.' },
  { n: '03', title: 'Lead Follow-Up Pipeline', desc: 'Every enquiry captured and followed up at the right time with the right message. Nothing slips, nothing waits until Monday.' },
  { n: '04', title: 'Missed-Call Recovery',    desc: 'The moment a call goes unanswered, an intelligent message goes out immediately. Most leads are recovered within minutes.' },
  { n: '05', title: 'CRM Automation',          desc: 'Contacts organised, tasks triggered, and your pipeline kept moving without manual input. No leads fall through the gaps.' },
  { n: '06', title: 'Reporting & Intelligence', desc: 'Plain-English monthly reports that tell you exactly what the system is doing, what it is returning, and where to improve.' },
]

const backendSystems: Example[] = [
  { n: '01', title: 'Custom API Development',       desc: 'We build the APIs that connect your tools — booking platforms, payment processors, CRMs, and internal systems — into one coherent operation.' },
  { n: '02', title: 'Database Architecture',         desc: 'Structured, scalable data foundations. Whether you need a client database, a product catalogue, or a reporting store, we design and build it properly.' },
  { n: '03', title: 'Third-Party Integrations',      desc: 'Stripe, Calendly, GoCardless, Xero, HubSpot, Zapier — we wire your stack together so data flows where it needs to without manual intervention.' },
  { n: '04', title: 'Workflow Automation',           desc: 'The repetitive internal tasks that drain your team. Automated. Triggered by the right events, running reliably in the background every day.' },
  { n: '05', title: 'Client & Staff Portals',        desc: 'Secure, branded portals for clients to book, pay, view documents, or submit requests. And for staff to manage their work without spreadsheets.' },
  { n: '06', title: 'Data Pipelines & Reporting',    desc: 'Pull data from any source — CRM, website, bookings, ads — clean it, structure it, and serve it back as dashboards your team actually uses.' },
]

const marketing: Example[] = [
  { n: '01', title: 'Lead Generation Systems',      desc: 'Not ad spend guesswork — structured systems. Landing pages, lead magnets, qualification flows, and outreach sequences built to fill your pipeline.' },
  { n: '02', title: 'Email Marketing Automation',   desc: 'Sequences that run on their own. Welcome flows, nurture campaigns, re-engagement series, and post-purchase follow-up — all triggered by behaviour.' },
  { n: '03', title: 'Campaign Infrastructure',       desc: 'The backend of a proper marketing operation: tracking, attribution, audience segmentation, and A/B testing built to tell you what is actually working.' },
  { n: '04', title: 'Conversion Funnels',            desc: 'End-to-end journeys from first click to signed client. Built around your offer, tested against your audience, and iterated until conversion improves.' },
  { n: '05', title: 'Content & Social Automation',   desc: 'On-brand content produced in your voice and published on your behalf every week. Consistent presence without consistent effort.' },
  { n: '06', title: 'Conversion Website',            desc: 'A fast, focused website built around your offer, optimised for search, and wired into your lead generation and agent systems from day one.' },
]

export default function SolutionsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>What we do</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              Purpose-Built for You
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={styles.heroSub}>
              Everything we build is purposely built around your business, not repurposed
              from a generic tool.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className={styles.heroSub} style={{ color: '#ffffff', marginTop: '1.25rem' }}>
              Off-the-shelf products require you to change how you work to fit the software.
              We work the other way. We learn your operation, identify where AI makes a real
              difference, and build a system that wraps around exactly how you already operate.
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

          {/* ── AI AGENTS ── */}
          <div className={styles.categoryBlock}>
            <Reveal>
              <div className={styles.categoryHeader}>
                <span className="label">AI Agents</span>
                <h2 className={styles.exH2}>Intelligent agents that run your front line.</h2>
                <p className={styles.exSub}>
                  Purpose-built AI systems that handle the work that currently falls through the cracks — calls, leads, follow-up, and admin.
                </p>
              </div>
            </Reveal>
            <div className={styles.grid}>
              {aiAgents.map((ex, i) => (
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

          {/* ── BACKEND & SYSTEMS ── */}
          <div className={styles.categoryBlock}>
            <Reveal>
              <div className={styles.categoryHeader}>
                <span className="label">Backend & Systems</span>
                <h2 className={styles.exH2}>The infrastructure serious businesses run on.</h2>
                <p className={styles.exSub}>
                  Custom-built backends, APIs, and integrations. The technical layer that connects your tools, automates your operations, and scales with you.
                </p>
              </div>
            </Reveal>
            <div className={styles.grid}>
              {backendSystems.map((ex, i) => (
                <Reveal key={ex.n} delay={(i % 2) * 0.08}>
                  <div className={`${styles.card} ${styles.cardAlt}`}>
                    <div className={styles.cardNum}>{ex.n}</div>
                    <h3 className={styles.cardTitle}>{ex.title}</h3>
                    <p className={styles.cardDesc}>{ex.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── MARKETING & LEAD GENERATION ── */}
          <div className={styles.categoryBlock}>
            <Reveal>
              <div className={styles.categoryHeader}>
                <span className="label">Marketing & Lead Generation</span>
                <h2 className={styles.exH2}>Systems that fill your pipeline while you work.</h2>
                <p className={styles.exSub}>
                  Not generic campaigns — structured lead generation and marketing infrastructure built around your offer, your audience, and your conversion goals.
                </p>
              </div>
            </Reveal>
            <div className={styles.grid}>
              {marketing.map((ex, i) => (
                <Reveal key={ex.n} delay={(i % 2) * 0.08}>
                  <div className={`${styles.card} ${styles.cardGreen}`}>
                    <div className={styles.cardNum}>{ex.n}</div>
                    <h3 className={styles.cardTitle}>{ex.title}</h3>
                    <p className={styles.cardDesc}>{ex.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
