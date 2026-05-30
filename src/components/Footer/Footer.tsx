import Link from 'next/link'
import Logo from '@/components/Logo/Logo'
import styles from './Footer.module.css'

const solutionsLinks = [
  { label: 'All Solutions', href: '/solutions' },
  { label: 'Pricing',       href: '/pricing' },
]

const companyLinks = [
  { label: 'Process',      href: '/process' },
  { label: 'Results',      href: '/results' },
  { label: 'About',        href: '/about' },
  { label: 'Book a Call',  href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy',  href: '/cookies' },
  { label: 'Terms of Service', href: '/terms' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size="sm" dark />
            <span className={styles.wordmark}>TELOS</span>
            <p className={styles.tagline}>
              Intelligence, applied with intent.
            </p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <span className={styles.colHead}>Solutions</span>
              {solutionsLinks.map(l => (
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
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} Telos AI. All rights reserved.
          </span>
          <nav className={styles.legal} aria-label="Legal links">
            {legalLinks.map(l => (
              <Link key={l.href} href={l.href} className={styles.legalLink}>{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
