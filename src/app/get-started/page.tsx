import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import GetStartedWizard from '@/components/Onboarding/GetStartedWizard'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Get started',
  description:
    'Tell us about your business and what you want built. A short scoping form so we can come back with a plan.',
  robots: { index: false, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0c0a12',
}

export default function GetStartedPage() {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Telos AI home">
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.brandName}>Telos AI</span>
        </Link>
        <span className={styles.kicker}>Client onboarding</span>
      </header>

      <main className={styles.main}>
        <GetStartedWizard />
      </main>
    </div>
  )
}
