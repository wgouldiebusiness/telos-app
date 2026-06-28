import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

const values = [
  {
    n: '01',
    title: 'Businesses that scale are efficient',
    desc: 'They are run by people who believe in what they do and have removed the noise around it. We help you get there without building a management layer on top of your work.',
  },
  {
    n: '02',
    title: 'In it for the long term',
    desc: 'We keep our client base small on purpose. Every business we work with gets proper attention. We earn the monthly fee by continuing to deliver.',
  },
  {
    n: '03',
    title: 'Straight talking',
    desc: 'We tell you exactly what the software can do for your business and what it cannot. We will not oversell the technology or dress up a limitation as a feature.',
  },
]

/**
 * Shared About content. Colours come entirely from CSS custom properties
 * (var(--purple) etc.), which the Media and Websites layouts override to
 * teal / red — so the same markup themes itself per sub-brand.
 */
export default function AboutView({ ctaHref = '/contact' }: { ctaHref?: string }) {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>About Telos</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              Built for People Who Want to Focus on Their Business
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={styles.heroSub}>
              We work with owners and businesses to give them back their time.
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
              <Reveal delay={0.32}>
                <p className={styles.missionLead} style={{ marginTop: '2rem' }}>
                  We want to take away the noise, so you can get back to doing the work that matters.
                </p>
              </Reveal>
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
                  private practice, and elite sport. He has worked in high-performance
                  environments and runs his own clinic. He knows exactly what it is like
                  to be the clinician, the receptionist, the scheduler, and the person
                  chasing invoices, all at the same time.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className={styles.storyP}>
                  Most service businesses are still running on systems that have not
                  changed in thirty years: phone calls, paper notes, manual follow-ups,
                  and spreadsheets. Will experienced this first-hand, and recognised
                  that most owners simply have not had the time or inclination to
                  explore what technology could change.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className={styles.storyP}>
                  He solved his own business first. He automated the reminders,
                  the follow-ups, the enquiry handling, and the admin that had
                  previously eaten his evenings. He built the support systems himself,
                  creating back end systems, writing custom code, and tailoring
                  each part to the real demands of a clinical practice, and refined
                  them until they worked properly.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className={styles.storyP}>
                  When colleagues and other owners started asking how he did it,
                  Telos AI became the answer. Built for people who have the same
                  problem he had: a great service business being held back by
                  outdated operations.
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
            <Link href={ctaHref} className={styles.btnPri}>Book a meeting</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
