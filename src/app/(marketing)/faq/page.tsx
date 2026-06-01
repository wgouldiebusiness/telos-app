import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import PricingFAQ from '@/components/PricingFAQ/PricingFAQ'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Honest answers to the questions we get asked most. No jargon, no sales spin.',
}

const faqs = [
  {
    q: 'How long does it take to get set up?',
    a: 'Most builds are live within two weeks of the scoping call. Some simpler builds are faster. We give you a clear timeline before we start.',
  },
  {
    q: 'Do I need to be technical to work with you?',
    a: 'No. You tell us how your business works and what problems you want solved. We handle everything technical. You approve it before anything goes live.',
  },
  {
    q: 'Is there a contract or minimum term?',
    a: 'No minimum contract. Plans run monthly. You can change plan or cancel with reasonable notice. We earn your continued business by delivering results.',
  },
  {
    q: 'How is this different from using ChatGPT or other AI tools?',
    a: 'Off-the-shelf tools are generic. They require you to adapt how you work to fit the software. We build custom systems trained on your business, your voice, and your clients. The result feels like you hired someone who never sleeps.',
  },
  {
    q: 'What tools and software does it integrate with?',
    a: 'We integrate with whatever you already use: CRMs, booking systems, email, WhatsApp, Google Workspace, and more. We map your existing tools during the scoping call and build around them.',
  },
  {
    q: 'What does the one-off build fee cover?',
    a: 'The build fee covers everything needed to design, build, test, and install your system. It is scoped and agreed before you commit, so you know the full cost upfront. No surprises.',
  },
  {
    q: 'What happens if something stops working?',
    a: 'We monitor your system and catch most issues before you notice them. If something needs fixing, we fix it. That is what the monthly fee covers.',
  },
  {
    q: 'Can I see a demo before committing?',
    a: 'Yes. The discovery call is specifically designed to show you what a system for your business would look like. You leave with a clear picture of what is possible and what it would cost.',
  },
  {
    q: 'Do you work with businesses outside the UK?',
    a: 'We are UK-based and primarily work with UK businesses. If you are outside the UK and think we could be a good fit, get in touch and we will let you know honestly.',
  },
  {
    q: 'What kind of results can I expect?',
    a: 'We are in our early client phase and will publish real, verified results as our clients give permission to share them. We will not invent numbers. What we can say: the system recovers leads, saves admin hours, and keeps your pipeline moving. The value shows quickly.',
  },
]

const categories = [
  { label: 'Getting started',   qs: [0, 1] },
  { label: 'Pricing and terms', qs: [2, 5] },
  { label: 'How it works',      qs: [3, 4, 6, 7] },
  { label: 'About us',          qs: [8, 9] },
]

export default function FAQPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>FAQ</span></Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.heroH1}>Questions we get asked.</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.heroSub}>
              Honest answers, no jargon. If your question is not here,{' '}
              <Link href="/contact" className={styles.heroLink}>ask us directly</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.body}>
        <div className="container">
          <div className={styles.grid}>
            {categories.map((cat, ci) => (
              <Reveal key={cat.label} delay={ci * 0.06}>
                <div className={styles.category}>
                  <h2 className={styles.catLabel}>{cat.label}</h2>
                  <PricingFAQ faqs={cat.qs.map(i => faqs[i])} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>Still unsure?</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>Ask us directly on the call.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>
              Book a meeting. No pressure, no pitch.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.ctaBtn}>Book a meeting</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
