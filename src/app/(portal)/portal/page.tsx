import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Dashboard | Telos AI Portal',
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}

function firstName(name: string) {
  return name.split(' ')[0] ?? name
}

export default async function PortalDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('user_id', user.id)
    .single()

  const { data: business } = profile
    ? await supabase
        .from('businesses')
        .select('id, name')
        .eq('owner_id', profile.id)
        .single()
    : { data: null }

  // Current month metrics
  const thisMonth = new Date()
  thisMonth.setDate(1)
  const monthStr = thisMonth.toISOString().slice(0, 10)

  const { data: metrics } = business
    ? await supabase
        .from('metrics')
        .select('leads_captured, admin_hours_saved, sales_recovered, website_visits')
        .eq('business_id', business.id)
        .eq('month', monthStr)
        .single()
    : { data: null }

  // Last 5 activity log entries
  const { data: activity } = business
    ? await supabase
        .from('activity_log')
        .select('id, type, description, created_at')
        .eq('business_id', business.id)
        .order('created_at', { ascending: false })
        .limit(5)
    : { data: null }

  const name = profile?.full_name ?? ''
  const hasData = !!metrics

  const stats = [
    { label: 'Admin hours saved',  value: metrics?.admin_hours_saved ?? 0, suffix: 'h' },
    { label: 'Leads captured',     value: metrics?.leads_captured    ?? 0, suffix: ''  },
    { label: 'Website visits',     value: metrics?.website_visits    ?? 0, suffix: ''  },
    { label: 'Sales recovered',    value: metrics?.sales_recovered   ?? 0, suffix: '',  prefix: '£' },
  ]

  return (
    <div className={styles.dashboard}>
      <div className={styles.greeting}>
        <h1 className={styles.greetTitle}>
          Good {greeting()}{name ? `, ${firstName(name)}` : ''}.
        </h1>
        <p className={styles.greetSub}>
          Your Telos AI portal. Everything your automation stack is doing, in one place.
        </p>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          All systems operational
        </div>
      </div>

      {/* Stat tiles */}
      <div className={styles.statGrid}>
        {stats.map(s => (
          <div key={s.label} className={styles.statTile}>
            <span className={styles.statLabel}>{s.label}</span>
            <span className={styles.statValue}>
              {s.prefix}{typeof s.value === 'number' && s.prefix === '£'
                ? Number(s.value).toLocaleString('en-GB', { minimumFractionDigits: 0 })
                : s.value}{s.suffix}
            </span>
            {!hasData && <span className={styles.statNote}>Data populates after first full month</span>}
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent activity</h2>
        {activity && activity.length > 0 ? (
          <div className={styles.activityList}>
            {activity.map(a => (
              <div key={a.id} className={styles.activityRow}>
                <span className={styles.activityType}>{a.type ?? 'Update'}</span>
                <span className={styles.activityDesc}>{a.description}</span>
                <span className={styles.activityTime}>
                  {new Date(a.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short'
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyCard}>
            <span className={styles.emptyIcon}>◈</span>
            <p className={styles.emptyTitle}>Your systems are being set up.</p>
            <p className={styles.emptyDesc}>
              Once your first automation is live, recent activity will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className={styles.quickActions}>
        <Link href="/portal/request" className={styles.qaCard}>
          <span className={styles.qaIcon}>◇</span>
          <span className={styles.qaLabel}>Request a Change</span>
          <span className={styles.qaArrow}>→</span>
        </Link>
        <Link href="/portal/meetings" className={styles.qaCard}>
          <span className={styles.qaIcon}>◎</span>
          <span className={styles.qaLabel}>Book a Meeting</span>
          <span className={styles.qaArrow}>→</span>
        </Link>
        <Link href="/portal/billing" className={styles.qaCard}>
          <span className={styles.qaIcon}>◻</span>
          <span className={styles.qaLabel}>Billing</span>
          <span className={styles.qaArrow}>→</span>
        </Link>
      </div>
    </div>
  )
}
