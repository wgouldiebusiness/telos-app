import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/motion/RevealOnScroll'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'What We Build | Telos Websites',
  description:
    'Custom websites for service businesses. Restaurants, barbers, trades, clinics, salons, gyms, and more. Every site built from scratch around your business.',
}

const websiteTypes = [
  {
    title: 'Restaurants & Food',
    icon: '🍕',
    desc: 'Menu-led designs that tell your story, show off your food, and drive reservations or orders direct from the site.',
    includes: ['Menu showcase', 'Table booking integration', 'Google Maps embed', 'Opening hours', 'Story and team section'],
    gradient: 'linear-gradient(145deg, #1a0a04 0%, #4a1a06 45%, #8b3a10 100%)',
    accent: '#c45a1a',
  },
  {
    title: 'Barbers & Grooming',
    icon: '✂️',
    desc: 'Sharp, portfolio-first sites that put your work front and centre and route every visitor straight to your booking system.',
    includes: ['Work gallery', 'Online booking link', 'Pricing list', 'Team profiles', 'Location and contact'],
    gradient: 'linear-gradient(145deg, #06060e 0%, #12122a 50%, #1e1e3e 100%)',
    accent: '#b8965a',
  },
  {
    title: 'Plumbers & Trades',
    icon: '🔧',
    desc: 'Trusted, professional sites optimised to rank locally and turn search visits into booked jobs.',
    includes: ['Service area coverage', 'Emergency contact section', 'Testimonials', 'Accreditation display', 'Quote request form'],
    gradient: 'linear-gradient(145deg, #020e1a 0%, #062840 50%, #0a3d60 100%)',
    accent: '#2a8dd9',
  },
  {
    title: 'Salons & Beauty',
    icon: '💅',
    desc: 'Portfolio-led sites built to showcase treatments, build trust, and keep your diary consistently full.',
    includes: ['Treatment gallery', 'Booking integration', 'Before and after showcase', 'Price list', 'Gift voucher section'],
    gradient: 'linear-gradient(145deg, #140a0e 0%, #3a1020 50%, #602840 100%)',
    accent: '#d4789a',
  },
  {
    title: 'Clinics & Health',
    icon: '🏥',
    desc: 'Clean, clinical sites that build trust quickly and convert new patient enquiries day and night.',
    includes: ['Service listings', 'Practitioner profiles', 'Online booking', 'Patient testimonials', 'Insurance and accreditation'],
    gradient: 'linear-gradient(145deg, #031414 0%, #082828 50%, #0c3c3c 100%)',
    accent: '#2ab8a0',
  },
  {
    title: 'Gyms & Fitness Studios',
    icon: '🏋️',
    desc: 'High-energy sites that sell memberships, fill class timetables, and sign up new members without lifting a finger.',
    includes: ['Class timetable', 'Membership tiers', 'Free trial CTA', 'Trainer profiles', 'Transformation gallery'],
    gradient: 'linear-gradient(145deg, #0e0404 0%, #2a0a0a 50%, #420e0e 100%)',
    accent: '#d43030',
  },
  {
    title: 'Coaches & Consultants',
    icon: '🎯',
    desc: 'Authority-first sites that position you as the clear choice and route prospects straight into your call calendar.',
    includes: ['About and credentials', 'Programme or service pages', 'Testimonials and case studies', 'Booking or enquiry CTA', 'Content or blog (optional)'],
    gradient: 'linear-gradient(145deg, #0a0a0a 0%, #1a1218 50%, #2a1a28 100%)',
    accent: '#9b6dd4',
  },
  {
    title: 'Anything else',
    icon: '🌐',
    desc: 'If you run a service business and need a site that converts, not just one that looks the part, we can build it.',
    includes: ['Custom scope on your call', 'Any service business type', 'Any size or complexity', 'With or without AI integration', 'Ongoing management available'],
    gradient: 'linear-gradient(145deg, #060610 0%, #0e0e22 50%, #161630 100%)',
    accent: '#7868e6',
  },
]

const included = [
  { n: '01', title: 'Custom design',       desc: 'No templates. Every layout is designed from scratch around your business and brand.' },
  { n: '02', title: 'Mobile first',        desc: 'Built to look and perform perfectly on every screen, from phone to desktop.' },
  { n: '03', title: 'Fast loading',        desc: 'Optimised for speed from day one. Slow sites lose clients before the page loads.' },
  { n: '04', title: 'SEO foundations',     desc: 'Clean code, proper metadata, and local SEO structure built in from the start.' },
  { n: '05', title: 'AI ready',            desc: 'Designed to connect directly into Telos AI agents: receptionist, chat, and more.' },
  { n: '06', title: 'Managed and updated', desc: 'We handle hosting, security, and updates. You focus on running your business.' },
]

export default function WhatWeBuildPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal><span className="label" style={{ color: 'rgba(255,255,255,.4)' }}>What we build</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className={styles.heroH1}>
              Every kind of service business.<br />
              <span className={styles.accent}>One approach: build it properly.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={styles.heroSub}>
              Every site we build is designed from scratch for the specific
              business, industry, and client it is meant to serve.
              No templates, no shortcuts.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.typesSection}>
        <div className="container">
          <div className={styles.typesGrid}>
            {websiteTypes.map((type, i) => (
              <Reveal key={type.title} delay={(i % 2) * 0.08}>
                <div className={styles.typeCard}>
                  <div
                    className={styles.typePreview}
                    style={{ background: type.gradient }}
                  >
                    <span className={styles.typeIcon}>{type.icon}</span>
                  </div>
                  <div className={styles.typeBody}>
                    <h2 className={styles.typeTitle}>{type.title}</h2>
                    <p className={styles.typeDesc}>{type.desc}</p>
                    <ul className={styles.typeList}>
                      {type.includes.map(item => (
                        <li key={item} className={styles.typeItem}>
                          <span className={styles.typeDot} style={{ background: type.accent }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.includedSection}>
        <div className="container">
          <Reveal><span className="label">What is included</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.includedH2}>Every site comes with this as standard.</h2>
          </Reveal>
          <div className={styles.includedGrid}>
            {included.map((item, i) => (
              <Reveal key={item.n} delay={(i % 3) * 0.08}>
                <div className={styles.includedCard}>
                  <div className={styles.includedN}>{item.n}</div>
                  <h3 className={styles.includedTitle}>{item.title}</h3>
                  <p className={styles.includedDesc}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <Reveal><span className="label">Get started</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.ctaH2}>Ready to see what we can build for you?</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.ctaSub}>Book a free call. No pressure, no pitch.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className={styles.btnPri}>Book a free call</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
