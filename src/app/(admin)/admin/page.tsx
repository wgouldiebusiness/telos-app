import type { Metadata } from 'next'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'Admin | Telos AI' }

export default async function AdminPage() {
  const admin = createAdminClient()

  // All businesses with their owner profile
  const { data: businesses } = await admin
    .from('businesses')
    .select(`
      id, name, plan, status, created_at,
      profiles!owner_id ( full_name, email )
    `)
    .order('created_at', { ascending: false })

  // Sum metrics for current month across all businesses
  const thisMonth = new Date()
  thisMonth.setDate(1)
  const monthStr = thisMonth.toISOString().slice(0, 10)

  const { data: allMetrics } = await admin
    .from('metrics')
    .select('leads_captured')
    .eq('month', monthStr)

  const totalLeads = allMetrics?.reduce((acc, m) => acc + (m.leads_captured ?? 0), 0) ?? 0

  const total      = businesses?.length ?? 0
  const active     = businesses?.filter(b => b.status === 'active').length ?? 0
  const onboarding = businesses?.filter(b => b.status === 'onboarding').length ?? 0

  const stats = [
    { label: 'Total clients',      value: total      },
    { label: 'Active retainers',   value: active     },
    { label: 'Onboarding now',     value: onboarding },
    { label: 'Leads this month',   value: totalLeads },
  ]

  const PLAN_LABELS: Record<string, string> = {
    starter: 'Starter',
    growth:  'Growth',
    bespoke: 'Bespoke',
  }

  const STATUS_LABELS: Record<string, string> = {
    active:      'Active',
    onboarding:  'Onboarding',
    paused:      'Paused',
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Client Accounts</h1>
        <p className={styles.pageSub}>
          All businesses on the Telos platform.
        </p>
      </div>

      {/* Stat tiles */}
      <div className={styles.statGrid}>
        {stats.map(s => (
          <div key={s.label} className={styles.statTile}>
            <span className={styles.statLabel}>{s.label}</span>
            <span className={styles.statValue}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Client table */}
      <section className={styles.section}>
        {businesses && businesses.length > 0 ? (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Contact</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {businesses.map(b => {
                  const profile = Array.isArray(b.profiles) ? b.profiles[0] : b.profiles
                  return (
                    <tr key={b.id}>
                      <td className={styles.tdBold}>{b.name}</td>
                      <td>{(profile as { full_name?: string; email?: string } | null)?.full_name ?? (profile as { full_name?: string; email?: string } | null)?.email ?? 'No profile'}</td>
                      <td>{PLAN_LABELS[b.plan] ?? b.plan}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles['status_' + b.status]}`}>
                          {STATUS_LABELS[b.status] ?? b.status}
                        </span>
                      </td>
                      <td className={styles.tdMuted}>
                        {new Date(b.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td>
                        <Link href={`/admin/clients/${b.id}`} className={styles.viewLink}>
                          Open
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyCard}>
            <p className={styles.emptyText}>
              No client accounts yet. When businesses sign up and complete onboarding,
              they will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
