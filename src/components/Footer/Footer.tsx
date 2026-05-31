import Link from 'next/link'
import styles from './Footer.module.css'

const exploreLinks = [
  { label: 'What We Do',   href: '/solutions' },
  { label: 'How It Works', href: '/process' },
  { label: 'Pricing',      href: '/pricing' },
]

const companyLinks = [
  { label: 'About',        href: '/about' },
  { label: 'Book a Call',  href: '/contact' },
  { label: 'Client Login', href: '/login' },
]

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Terms',   href: '/terms' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.wordmark}>Telos&nbsp;AI</span>
            <p className={styles.tagline}>
              Custom AI agents and integrations for small service businesses.
            </p>
          </div>

          <div className={styles.col}>
            <span className={styles.colHead}>Explore</span>
            {exploreLinks.map(l => (
              <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>

          <div className={styles.col}>
            <span className={styles.colHead}>Company</span>
            {companyLinks.map(l => (
              <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            &copy; 2026 Telos AI. All rights reserved.
          </span>
          <nav aria-label="Legal links">
            {legalLinks.map(l => (
              <Link key={l.href} href={l.href} className={styles.legalLink}>{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
