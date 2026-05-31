'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import styles from './AdminShell.module.css'

const navItems = [
  { label: 'Client Accounts', href: '/admin',         icon: '◈' },
  { label: 'Module Library',  href: '/admin/modules', icon: '▦' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <Link href="/" className={styles.brand}>
            <Logo size="sm" dark />
            <span className={styles.wordmark}>Telos</span>
          </Link>
          <span className={styles.adminBadge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
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
