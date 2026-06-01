import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import WordReveal from '@/components/motion/WordReveal'
import TextScanner from '@/components/motion/TextScanner'
import ChatDemo from '@/components/demos/ChatDemo'
import PipelineDemo from '@/components/demos/PipelineDemo'
import Logo from '@/components/Logo/Logo'
import OrbitalServices from '@/components/OrbitalServices/OrbitalServices'
import type { ChatMessage } from '@/components/demos/ChatDemo'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Telos AI — AI systems for ambitious service businesses.',
  description:
    'We engineer custom AI infrastructure that handles admin, captures leads, and keeps your pipeline moving. Built for your business. Fully managed. Improving every month.',
}

const receptionistConversation: ChatMessage[] = [
  { from: 'user', text: 'Hi, I saw your website. Do you have availability this week?' },
  { from: 'ai',   text: 'Hi there. Yes, we have a few slots available. Can I take your name and what you are looking for?', typingDelay: 1200 },
  { from: 'user', text: "It's Sarah. I need a consultation, Tuesday if possible." },
  { from: 'ai',   text: 'Perfect, Sarah. I have Tuesday at 2pm and 4pm free. Which works best for you?', typingDelay: 900 },
  { from: 'user', text: '2pm please.' },
  { from: 'ai',   text: 'Brilliant. I have booked you in for Tuesday at 2pm. You will get a confirmation shortly.', typingDelay: 700 },
]

const chatConversation: ChatMessage[] = [
  { from: 'user', text: 'What kind of businesses do you work with?' },
  { from: 'ai',   text: 'We work with service businesses. Clinics, trades, fitness studios, salons. Any business that relies on bookings and client relationships.', typingDelay: 1000 },
  { from: 'user', text: 'How long does it take to set up?' },
  { from: 'ai',   text: 'Most builds are live within two weeks. We handle everything. You just approve it before it goes live.', typingDelay: 1000 },
  { from: 'user', text: 'What does it cost?' },
  { from: 'ai',   text: 'Plans start from £100 a month. The right fit depends on your business, which is why we start with a short call. Want me to book one now?', typingDelay: 800 },
]

const builds = [
  { n: '01', title: 'AI Receptionist',         desc: 'Your calls answered, appointments booked, and leads qualified. Around the clock, in your voice.' },
  { n: '02', title: 'Website Chat Assistant',  desc: 'An intelligent assistant on your site that answers questions and turns visitors into booked clients.' },
  { n: '03', title: 'Lead Follow-Up Pipeline', desc: 'Every lead captured and followed up at the right time with the right message. Nothing slips.' },
  { n: '04', title: 'CRM Automation',          desc: 'Contacts organised, tasks triggered, and your pipeline kept moving without manual input.' },
  { n: '05', title: 'Missed-Call Recovery',    desc: 'The moment a call goes unanswered, an intelligent message goes out to recover the lead.' },
]

const steps = [
  { n: '01', title: 'A focused conversation', desc: 'A 15-minute call. We learn your business.' },
  { n: '02', title: 'We design the system',   desc: 'A precise plan: what we build, what it costs, and what it connects to. You see it before we write a line of code.' },
  { n: '03', title: 'We build and install',   desc: 'Your agents are built, integrated, and tested. You approve before anything goes live.' },
  { n: '04', title: 'We manage and improve',  desc: 'We monitor and develop the system every month. You own the results. We do the work.' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── full screen, centred brand moment */}
      <section className={styles.hero}>
        {/* Blobs now live in the global ShaderBackground fixed layer */}
        <div className={`container ${styles.heroInner}`}>
          <Reveal className={styles.heroLogoMark}>
            <Logo size="lg" dark />
            <span className={styles.heroLogoWord}>Telos AI</span>
          </Reveal>
          <WordReveal delay={100} className={styles.heroName}>
            Telos AI
          </WordReveal>
          <Reveal delay={0.4} className={styles.heroSubWrap}>
            <p className={styles.heroSub}>
              Custom AI agents for your business.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <p className={styles.heroDetail}>
              We build and manage AI systems that handle your admin, capture your leads,
              and keep your pipeline moving. Custom coded. Fully managed.
            </p>
          </Reveal>
          <Reveal delay={0.7} className={styles.heroBtns}>
            <Link href="/contact" className={styles.btnPri}>Book a meeting</Link>
            <Link href="/process" className={styles.btnSec}>How it works</Link>
          </Reveal>
          <Reveal delay={0.85}>
            <div className={styles.trustRow}>
              {['No lock-in', 'Scope agreed upfront', 'UK-based', 'Cancel anytime'].map(b => (
                <span key={b} className={styles.trustBadge}>{b}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className={styles.heroFade} />
      </section>

      {/* ── STATEMENT ── dark, text scanner */}
      <section className={styles.statement}>
        <div className="container">
          <Reveal>
            <span className="label">Our purpose</span>
          </Reveal>
          <TextScanner dark className={styles.statementH2}>
            The AI platform built for the businesses that run on people, not software.
          </TextScanner>
          <Reveal delay={0.2}>
            <p className={styles.statementLead}>
              Most AI tools are built for enterprises with technical teams. We build
              custom systems for the owners who are too busy running their business to
              automate it themselves. We handle everything.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEM BAND ── black, large words */}
      <section className={styles.problem}>
        <div className="container">
          <Reveal>
            <span className={`label ${styles.problemLabel}`}>What it costs you right now</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={styles.problemH2}>
              Your business is losing time<br />it will never get back.
            </h2>
          </Reveal>
          <div className={styles.problemGrid}>
            {[
              { word: 'Missed',  body: 'A missed call or slow reply does not just cost one job. It costs every referral that client would have sent.' },
              { word: 'Lost',    body: 'Skilled hours spent on scheduling, chasing, and reminders are money paid to do work a system could do for pennies.' },
              { word: 'Slipped', body: 'Every lead without an immediate, intelligent response is a lead your competitors are closing instead.' },
            ].map((p, i) => (
              <Reveal key={p.word} delay={i * 0.1}>
                <div className={styles.problemItem}>
                  <div className={styles.problemWord}>{p.word}</div>
                  <p className={styles.problemBody}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SHOWCASE ── dark, demo cards */}
      <section className={styles.showcase}>
        <div className={styles.showcaseFadeTop} />
        <div className={styles.showcaseFadeBot} />
        <div className="container">
          <div className={styles.showcaseHead}>
            <Reveal>
              <span className={`label ${styles.showcaseLabel}`}>See it in action</span>
            </Reveal>
            <TextScanner dark className={styles.showcaseH2}>
              This is what we build for your business.
            </TextScanner>
            <Reveal delay={0.2}>
              <p className={styles.showcaseSub}>
                Every agent is custom. These are examples of what that looks like.
              </p>
            </Reveal>
          </div>

          <div className={styles.demoGrid}>
            <Reveal delay={0.05}>
              <ChatDemo
                agentName="Telos Receptionist"
                tagline="Answers every call. Qualifies every lead."
                messages={receptionistConversation}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <ChatDemo
                agentName="Telos Chat"
                tagline="Converts visitors. Around the clock."
                messages={chatConversation}
                loopPause={3500}
              />
            </Reveal>
            <Reveal delay={0.25}>
              <PipelineDemo />
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className={styles.showcaseBand}>
              <p className={styles.showcaseBandText}>
                These are real-world examples of what we build. Every agent is trained
                on your business, your voice, and your clients.
              </p>
              <Link href="/contact" className={styles.btnPriLight}>
                Get your own AI team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── orbital */}
      <section className={styles.builds}>
        <div className="container">
          <Reveal>
            <span className="label">What we build</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.buildsH2}>We build custom AI agents.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.buildsSub}>
              Every build is coded for your business. Click any agent to see what it does.
            </p>
          </Reveal>
        </div>
        <OrbitalServices />
        <div className="container">
          <Reveal delay={0.2}>
            <div className={styles.buildsCallout}>
              <p className={styles.buildsCalloutText}>
                Whatever else your business needs, we can build it. Custom code is at
                the core of everything we do.
              </p>
              <Link href="/solutions" className={styles.buildsCalloutLink}>
                See all examples
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── white */}
      <section className={styles.how}>
        <div className="container">
          <Reveal>
            <span className="label">How it works</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.howH2}>Four steps. No surprises.</h2>
          </Reveal>
          <div className={styles.stepsGrid}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className={styles.stepCard}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── black */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <Reveal>
            <span className={`label ${styles.ctaLabel}`}>Limited availability</span>
          </Reveal>
          <Reveal delay={0.1} className={styles.ctaHeadWrap}>
            <h2 className={styles.ctaH2}>
              Ready to see what we can build for you?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.ctaSub}>
              Book a meeting. No pressure, no pitch.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link href="/contact" className={styles.btnPriCta}>Book a meeting</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
