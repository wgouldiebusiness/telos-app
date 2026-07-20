import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import styles from './agents.module.css'

export const metadata: Metadata = {
  title: 'Expert Agents | Telos AI',
  robots: { index: false, follow: false },
}

// Authenticated, per-user pages — never prerender at build time.
export const dynamic = 'force-dynamic'

export default async function AgentsLayout({ children }: { children: React.ReactNode }) {
  // Defence in depth: the proxy already bounces signed-out visitors, but
  // this subtree must never render without an independently verified session.
  let user = null
  try {
    const supabase = await createClient()
    ;({ data: { user } } = await supabase.auth.getUser())
  } catch (err) {
    console.error('[agents] auth check failed:', err)
  }
  if (!user) redirect('/login')

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link href="/agents" className={styles.brand}>
            Telos <span className={styles.brandAccent}>Agents</span>
          </Link>
          <nav className={styles.topnav}>
            <Link href="/portal" className={styles.topnavLink}>Portal</Link>
            <Link href="/" className={styles.topnavLink}>Main site</Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
