'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo/Logo'
import { createClient } from '@/lib/supabase/client'
import styles from './PortalShell.module.css'

const navItems = [
  { label: 'Dashboard',          href: '/portal',              icon: '◈' },
  { label: 'Performance Report', href: '/portal/report',       icon: '▲' },
  { label: 'Sales',              href: '/portal/sales',        icon: '◉' },
  { label: 'Content Studio',     href: '/portal/content',      icon: '✎' },
  { label: 'Request a Change',   href: '/portal/request',      icon: '◇' },
  { label: 'Book a Meeting',     href: '/portal/meetings',     icon: '◎' },
  { label: 'Billing',            href: '/portal/billing',      icon: '◻' },
]

const PLAN_LABELS: Record<string, string> = {
  starter: 'Starter',
  growth:  'Growth',
  bespoke: 'Bespoke',
}

interface PortalShellProps {
  children:      React.ReactNode
  businessName?: string
  userName?:     string
  plan?:         string
}

export default function PortalShell({
  children,
  businessName = 'Your Portal',
  userName     = '',
  plan         = 'starter',
}: PortalShellProps) {
  const pathname = usePathname()
  const router   = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHead}>
          <Link href="/" className={styles.brand}>
            <Logo size="sm" dark />
            <span className={styles.wordmark}>Telos</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFoot}>
          <Link
            href="/portal/support"
            className={`${styles.navItem} ${styles.whatsapp} ${pathname === '/portal/support' ? styles.active : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <span className={styles.navIcon}>◆</span>
            <span className={styles.navLabel}>WhatsApp Support</span>
          </Link>

          <div className={styles.bizInfo}>
            <span className={styles.bizName}>{businessName}</span>
            <span className={styles.bizPlan}>{PLAN_LABELS[plan] ?? plan}</span>
          </div>

          <Link href="/" className={styles.backLink}>Back to website</Link>
          <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      <div className={styles.main}>
        <header className={styles.topBar}>
          <button
            className={styles.menuBtn}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Open portal menu"
          >
            <span />
            <span />
            <span />
          </button>
          <div className={styles.topBarRight}>
            {userName && <span className={styles.userName}>{userName}</span>}
            <span className={styles.statusDot} aria-label="All systems operational" />
            <span className={styles.statusText}>All operational</span>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
