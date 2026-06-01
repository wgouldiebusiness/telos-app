import Link from 'next/link'
import styles from './Footer.module.css'

const exploreLinks = [
  { label: 'What We Do',   href: '/solutions' },
  { label: 'How It Works', href: '/process' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'Results',      href: '/results' },
]

const companyLinks = [
  { label: 'About',        href: '/about' },
  { label: 'FAQ',          href: '/faq' },
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
              AI systems built for service businesses that are serious about growth.
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
          <div className={styles.bottomRight}>
            <a
              href="https://www.linkedin.com/company/telos-ai"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Telos AI on LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <nav aria-label="Legal links" style={{ display: 'contents' }}>
              {legalLinks.map(l => (
                <Link key={l.href} href={l.href} className={styles.legalLink}>{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
