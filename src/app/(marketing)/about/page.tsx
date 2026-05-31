import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Telos AI was built by a Chartered Physiotherapist who automated his own practice and then helped others do the same.',
}

const values = [
  {
    n: '01',
    title: 'Honest always',
    desc: 'We tell you what AI can and cannot do. We do not oversell, and we never promise outcomes we cannot deliver.',
  },
  {
    n: '02',
    title: 'Built for your business',
    desc: 'Every build starts from your specific business and your specific problems. No copy-paste solutions.',
  },
  {
    n: '03',
    title: 'In it for the long term',
    desc: 'We are not after a quick setup fee. We earn your business every month by making sure the work keeps paying off.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label">About Telos</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>
              Built to back <span className={styles.accent}>small businesses.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              We help service businesses automate the busywork, protect their time, and grow
              with confidence, without ever losing the human touch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionTwo}>
            <Reveal><span className="label">Our mission</span></Reveal>
            <div>
              <Reveal delay={0.06}>
                <p className={styles.missionLead}>
                  Owners should spend their time doing what they built their business to do.
                  Not chasing invoices, managing bookings, or remembering to follow up.
                </p>
              </Reveal>
              <div className={styles.vals}>
                {values.map((v, i) => (
                  <Reveal key={v.n} delay={i * 0.08}>
                    <div className={styles.val}>
                      <div className={styles.valN}>{v.n}</div>
                      <h3 className={styles.valTitle}>{v.title}</h3>
                      <p className={styles.valDesc}>{v.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyInner}>
            <div>
              <Reveal><span className="label">The story</span></Reveal>
            </div>
            <div className={styles.storyContent}>
              <Reveal delay={0.06}>
                <h2 className={styles.storyH2}>
                  Will Gouldsmith. <span className={styles.accent}>Chartered Physiotherapist.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className={styles.storyP}>
                  Will ran his own clinic and spent years buried in the admin that comes with
                  it. Booking systems, follow-ups, reminders, reports. Work that had nothing
                  to do with treating patients but took real time away from it.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className={styles.storyP}>
                  He started learning AI and automation to fix his own practice first. When
                  it worked, colleagues and other business owners started asking how. Telos AI
                  is the result.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={styles.storyP}>
                  A small, specialist team built around one idea: that running a service
                  business should not mean drowning in the work around it.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <Reveal><span className="label">Get started</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              Let us give you <span className={styles.accent}>your time back.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              Fifteen minutes to understand your business and whether we can help. No pitch,
              no pressure, no commitment.
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
