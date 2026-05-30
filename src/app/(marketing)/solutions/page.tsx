import type { Metadata } from 'next'
import Reveal from '@/components/motion/RevealOnScroll'
import AnimatedButton from '@/components/motion/AnimatedButton'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Eight AI automations for UK service businesses: AI receptionist, chat assistant, pipeline follow-up, missed-client recovery, data insights, inbox campaigns, conversion websites, and social media.',
}

const solutions = [
  {
    key: 'receptionist',
    title: 'AI Receptionist',
    desc: 'Your practice never stops answering. Our AI receptionist handles inbound calls and messages, books appointments, answers common questions, and captures every lead, even when you are busy with clients.',
    benefits: [
      'Never miss a call or a booking again',
      'Responds instantly, at any hour',
      'Captures and logs every lead automatically',
    ],
    outcome: 'Fewer missed appointments, more revenue captured with no extra effort from you.',
  },
  {
    key: 'chat',
    title: 'Website and Chat Assistant',
    desc: 'A trained AI assistant built into your website that answers questions, qualifies leads, and books consultations, all without you lifting a finger. It knows your services, your pricing, and your availability.',
    benefits: [
      'Converts website visitors into booked clients',
      'Answers questions accurately, 24 hours a day',
      'Hands off warm leads directly to your diary',
    ],
    outcome: 'Your website becomes your best salesperson, working every hour of every day.',
  },
  {
    key: 'pipeline',
    title: 'Pipeline and Follow-Up',
    desc: 'Most leads need more than one touch before they book. Our pipeline automation sends the right message at the right time: personalised, well-timed, and completely hands-off for you.',
    benefits: [
      'Consistent follow-up that does not feel like spam',
      'Automatically sequences across email, SMS, or both',
      'Stops when a lead books, escalates when they do not',
    ],
    outcome: 'More conversions from the leads you already have, without any manual chasing.',
  },
  {
    key: 'recovery',
    title: 'Missed-Client Recovery',
    desc: 'Clients lapse. Life gets busy. Our recovery system quietly and consistently re-engages people who have not returned, with messages that feel personal and timely rather than automated.',
    benefits: [
      'Reaches lapsed clients before they forget you',
      'Personalised outreach that feels genuinely human',
      'Requires no manual effort once it is set up',
    ],
    outcome: 'A steady stream of returning clients from people who would otherwise have drifted away.',
  },
  {
    key: 'data',
    title: 'Data and Insights',
    desc: 'Your practice already generates valuable data. We turn it into clear, useful reports that tell you which services are growing, where clients come from, which team members are performing, and where revenue is leaking.',
    benefits: [
      'Plain-English reports, not raw spreadsheets',
      'Weekly or monthly delivery, however you prefer',
      'Decisions become faster and more confident',
    ],
    outcome: 'You run your business on facts rather than gut feeling.',
  },
  {
    key: 'inbox',
    title: 'Inbox Campaigns',
    desc: 'Opted-in only. Genuine value only. We build email campaigns that keep your clients informed, engaged, and coming back: appointment reminders, seasonal offers, educational content, and service updates.',
    benefits: [
      'Strictly opted-in, UK GDPR compliant',
      'Content that clients actually want to receive',
      'Automated and scheduled to save your time',
    ],
    outcome: 'Stronger client relationships and repeat bookings without writing a single email yourself.',
  },
  {
    key: 'website',
    title: 'Conversion Websites',
    desc: 'A fast, beautiful website designed to do one thing: turn visitors into enquiries. Built around your service and your clients, optimised for search, and connected to your booking and lead systems from day one.',
    benefits: [
      'Designed to convert, not just to look good',
      'Mobile-first, fast-loading, SEO-ready',
      'Integrated with your automations from the start',
    ],
    outcome: 'A website that works as hard as you do.',
  },
  {
    key: 'social',
    title: 'Social Media and Content',
    desc: 'AI-assisted social media posts, captions, and content calendars. Branded marketing visuals for social media, flyers, brochures, and promotional graphics. Digital marketing campaign support. A consistent, professional presence without the time drain.',
    benefits: [
      'Regular, on-brand content without the hours',
      'Visuals that look professionally made',
      'Campaign support from planning to execution',
    ],
    outcome: 'A steady, professional online presence your clients will notice.',
  },
]

export default function SolutionsPage() {
  return (
    <>
      {/* Hero band */}
      <section className={`section section-green ${styles.hero}`}>
        <div className="container">
          <Reveal>
            <span className="label">Our Solutions</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroHeadline}>
              Eight automations.<br />One consistent system.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.heroSub}>
              Each solution is built and configured specifically for your business.
              Take one, combine several, or let us recommend a stack that fits
              your practice.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Solutions list */}
      <section className="section section-bone">
        <div className="container">
          <div className={styles.grid}>
            {solutions.map((s, i) => (
              <Reveal key={s.key} delay={(i % 2) * 0.08}>
                <article className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className="label">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className={styles.cardTitle}>{s.title}</h2>
                    <p className={styles.cardDesc}>{s.desc}</p>
                  </div>
                  <div className={styles.cardBody}>
                    <ul className={styles.benefits}>
                      {s.benefits.map(b => (
                        <li key={b} className={styles.benefit}>
                          <span className={styles.benefitDot} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.outcome}>
                      <span className="label" style={{ color: 'var(--gold)' }}>Outcome</span>
                      <p className={styles.outcomeText}>{s.outcome}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section section-brown ${styles.cta}`}>
        <div className="container">
          <Reveal>
            <h2 className={styles.ctaHeadline}>Not sure which solutions you need?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.ctaBody}>
              Book a free 15-minute call and we will map out exactly which automations
              would make the most difference to your practice.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <AnimatedButton href="/contact" variant="secondary">Book a Free Call</AnimatedButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
