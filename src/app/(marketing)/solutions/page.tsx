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

const demos = [
  {
    key: 'receptionist',
    label: 'AI Receptionist',
    scenario: 'Inbound call, 9.47pm',
    note: 'Your phones answered after hours, on weekends, and when you are with a client.',
    messages: [
      { from: 'caller',  text: "Hi, I need to book an appointment. Is it too late to call?" },
      { from: 'agent',   text: "Not at all. Are you an existing client or is this your first visit with us?" },
      { from: 'caller',  text: "First time. I've got a knee injury I need looking at." },
      { from: 'agent',   text: "Happy to help. We have availability tomorrow at 11am or Thursday at 2pm. Which works better for you?" },
      { from: 'caller',  text: "Tomorrow at 11 would be great." },
      { from: 'agent',   text: "Perfect. Booked you in for tomorrow at 11am. You will receive a confirmation text shortly with the address and what to bring." },
    ],
  },
  {
    key: 'chat',
    label: 'Chat Assistant',
    scenario: 'Website visitor, Saturday morning',
    note: 'Qualifies leads and books appointments while you are away from the desk.',
    messages: [
      { from: 'caller',  text: "Do you treat sports injuries?" },
      { from: 'agent',   text: "Yes, we specialise in sports and running injuries. A first appointment includes a full assessment, diagnosis, and a personalised treatment plan. Would you like to book one?" },
      { from: 'caller',  text: "How long is the first session?" },
      { from: 'agent',   text: "60 minutes for the initial assessment. Follow-up sessions are typically 45 minutes. I can check availability for you right now if you like?" },
      { from: 'caller',  text: "Yes please." },
      { from: 'agent',   text: "We have Tuesday at 3pm or Friday at 10am available this week. Which would suit you?" },
    ],
  },
  {
    key: 'recovery',
    label: 'Missed-Call Recovery',
    scenario: 'Automated SMS, sent within 60 seconds of a missed call',
    note: 'Every unanswered call triggers an immediate, intelligent follow-up.',
    messages: [
      { from: 'agent',   text: "Hi, it is Oak Physiotherapy. We just missed your call. Can we help? Reply here, call us back on 0330 000 0000, or click the link to book online: [booking link]. We are available until 6pm today." },
      { from: 'caller',  text: "Hi, yes I was trying to book an appointment for my shoulder." },
      { from: 'agent',   text: "Of course. What days and times generally work best for you? I will check what we have available." },
      { from: 'caller',  text: "Mornings are best, before 10." },
      { from: 'agent',   text: "We have Wednesday at 8.30am or Friday at 9am this week. Either of those work for you?" },
    ],
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

      {/* Agent demos */}
      <section className={styles.demos}>
        <div className="container">
          <div className={styles.demosHead}>
            <Reveal><span className="label">See it working</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className={styles.demosH2}>
                This is what your agents actually sound like.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className={styles.demosSub}>
                Every conversation is written in your voice and tuned to your business.
                The examples below use a physiotherapy clinic as the scenario. Yours
                would be built around your clients, your services, and how you speak.
              </p>
            </Reveal>
          </div>

          <div className={styles.demosGrid}>
            {demos.map((demo, i) => (
              <Reveal key={demo.key} delay={i * 0.1}>
                <div className={styles.demoCard}>
                  <div className={styles.demoHeader}>
                    <div className={styles.demoMeta}>
                      <span className={styles.demoLabel}>{demo.label}</span>
                      <span className={styles.demoScenario}>{demo.scenario}</span>
                    </div>
                    <span className={styles.demoDot} />
                  </div>

                  <div className={styles.conversation}>
                    {demo.messages.map((msg, j) => (
                      <div
                        key={j}
                        className={`${styles.bubble} ${msg.from === 'agent' ? styles.bubbleAgent : styles.bubbleCaller}`}
                      >
                        {msg.from === 'caller' && (
                          <span className={styles.bubbleFrom}>Client</span>
                        )}
                        {msg.from === 'agent' && (
                          <span className={styles.bubbleFrom}>Agent</span>
                        )}
                        <p className={styles.bubbleText}>{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  <p className={styles.demoNote}>{demo.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
