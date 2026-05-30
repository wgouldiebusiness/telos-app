import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Dashboard — Telos AI Portal',
}

export default function PortalDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.greeting}>
        <h1 className={styles.greetTitle}>Welcome back.</h1>
        <p className={styles.greetSub}>
          Your Telos AI portal. Everything your automation stack is doing, in one place.
        </p>
      </div>

      {/* Empty state — shown when no modules are assigned yet */}
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>◈</div>
        <h2 className={styles.emptyTitle}>Your systems are being set up.</h2>
        <p className={styles.emptyDesc}>
          Your dashboard will fill in as we switch each automation on. Once your
          first module is live, you will see real-time data here: leads captured,
          admin hours saved, website visits, and more.
        </p>
        <p className={styles.emptyNote}>
          Questions while you wait? Use WhatsApp Support in the sidebar.
        </p>
      </div>

      {/* Module tiles — hidden until modules are assigned.
          When Supabase is wired, check business_modules for this user
          and render only the tiles relevant to their assigned modules. */}
      {/* Example tile structure — replace with dynamic data:
      <div className={styles.statGrid}>
        <div className={styles.statTile}>
          <span className={styles.statLabel}>Admin hours saved</span>
          <CountUp end={0} suffix="h" className={styles.statValue} />
        </div>
      </div>
      */}
    </div>
  )
}
