import type { Viewport } from 'next'
import Link from 'next/link'
import styles from './legal.module.css'

// Dark document pages — match the browser chrome to the near-black
// background so the legal docs sit in the site's brand.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0c0a12',
}

const docs = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
]

/**
 * Standalone, document-style layout for the legal pages.
 * Deliberately plain: no marketing header, no purple shader, no chat widget —
 * just a clean light page that reads like a proper legal document.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link href="/" className={styles.brand}>Telos&nbsp;AI</Link>
          <nav className={styles.topnav}>
            {docs.map(d => (
              <Link key={d.href} href={d.href} className={styles.topnavLink}>
                {d.label}
              </Link>
            ))}
            <Link href="/" className={styles.backLink}>Back to site</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerCopy}>
            © {year} Telos AI · Bristol, United Kingdom
          </span>
          <span className={styles.footerLinks}>
            {docs.map(d => (
              <Link key={d.href} href={d.href} className={styles.footerLink}>
                {d.label}
              </Link>
            ))}
          </span>
        </div>
      </footer>
    </div>
  )
}
