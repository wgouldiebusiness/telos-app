'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import styles from './AdminShell.module.css'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <Link href="/" className={styles.brand}>
            <Logo size="sm" dark />
            <span className={styles.wordmark}>TELOS</span>
          </Link>
          <span className={styles.adminBadge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/admin"
            className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}
          >
            <span className={styles.navIcon}>◈</span>
            All Clients
          </Link>
          <Link
            href="/admin"
            className={styles.navItem}
          >
            <span className={styles.navIcon}>▦</span>
            Module Library
          </Link>
        </nav>

        <div className={styles.sidebarFoot}>
          <Link href="/" className={styles.backLink}>Back to website</Link>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topBar}>
          <span className={styles.topBarLabel}>Master Admin</span>
          <div className={styles.topBarRight}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>All operational</span>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
