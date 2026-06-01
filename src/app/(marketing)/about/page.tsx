import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Telos AI was built by someone who automated his own service business first, then helped others do the same. No theory. No guesswork.',
}

const values = [
  {
    n: '01',
    title: 'Straight talking',
    desc: 'We tell you exactly what AI can do for your business and what it cannot. We will not oversell the technology or dress up a limitation as a feature.',
  },
  {
    n: '02',
    title: 'Built to your specification',
    desc: 'There are no templates here. Everything is designed around how your business actually works. If it does not fit, we do not use it.',
  },
  {
    n: '03',
    title: 'In it for the long term',
    desc: 'We keep our client base small on purpose. Every business we work with gets proper attention. We earn the monthly fee by continuing to deliver.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>About Telos</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              Built for people who are serious about their business.
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={styles.heroSub}>
              We work with owners who are not looking for a shortcut. They want a
              properly built system that runs correctly, improves over time, and
              frees them to focus on the work that actually grows their business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionTwo}>
            <Reveal><span className="label">What we believe</span></Reveal>
            <div>
              <Reveal delay={0.06}>
                <p className={styles.missionLead}>
                  The businesses that scale are not run by people who work harder.
                  They are run by people who have stopped doing by hand what a system
                  can do better.
                </p>
              </Reveal>
              <div className={styles.vals}>
                {values.map((v, i) => (
                  <Reveal key={v.n} delay={i * 0.08}>
                    <div>
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

      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyInner}>
            <div>
              <Reveal><span className="label">The founder</span></Reveal>
            </div>
            <div>
              <Reveal delay={0.06}>
                <h2 className={styles.storyH2}>
                  Will Gouldsmith. <span className={styles.accent}>Chartered Physiotherapist.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className={styles.storyP}>
                  Will is a Chartered Physiotherapist with experience across the NHS,
                  private practice, and sport. He has worked in high-performance environments
                  and run his own clinic. He knows exactly what it is like to be the
                  clinician, the receptionist, the scheduler, and the chaser of invoices,
                  all at once.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className={styles.storyP}>
                  Service businesses are still running on systems built thirty years ago.
                  Phone calls. Paper notes. Manual follow-up. Spreadsheets. Will has seen
                  this from the inside, and grew up using technology in ways most clinic
                  owners have not had the time or inclination to explore.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={styles.storyP}>
                  He fixed his own business first. Automated the reminders, the follow-ups,
                  the enquiry handling, the admin that used to eat his evenings. He built the
                  systems himself, tested them against a real business, and refined them until
                  they worked properly.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className={styles.storyP}>
                  When colleagues and other owners started asking how, Telos AI became the
                  answer. Built for people who have the same problem he had: a brilliant
                  service business that is being slowed down by old-school operations.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>Work with us</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>
              Ready to see what we can build for you?
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
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
