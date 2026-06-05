import type { Metadata } from 'next'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'Client Detail | Admin' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params
  const admin  = createAdminClient()

  const { data: business } = await admin
    .from('businesses')
    .select(`
      id, name, plan, status, industry, contact_name, pain_point, heard_about, created_at,
      profiles!owner_id ( full_name, email )
    `)
    .eq('id', id)
    .single()

  if (!business) notFound()

  const profile = Array.isArray(business.profiles)
    ? business.profiles[0]
    : business.profiles as { full_name?: string; email?: string } | null

  // Assigned modules
  const { data: assignedModules } = await admin
    .from('business_modules')
    .select('id, active, modules ( id, name )')
    .eq('business_id', id)

  // All modules (for assign UI)
  const { data: allModules } = await admin
    .from('modules')
    .select('id, name')
    .order('sort_order')

  // Recent activity
  const { data: activity } = await admin
    .from('activity_log')
    .select('id, type, description, created_at')
    .eq('business_id', id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Open change requests
  const { data: requests } = await admin
    .from('change_requests')
    .select('id, description, status, created_at')
    .eq('business_id', id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Latest metrics
  const { data: metrics } = await admin
    .from('metrics')
    .select('month, leads_captured, admin_hours_saved, sales_recovered, website_visits')
    .eq('business_id', id)
    .order('month', { ascending: false })
    .limit(3)

  const assignedIds = new Set(
    assignedModules?.map(am => {
      const mod = Array.isArray(am.modules) ? am.modules[0] : am.modules
      return (mod as { id?: string } | null)?.id
    }).filter(Boolean)
  )

  const PLAN_LABELS: Record<string, string> = { starter: 'Starter', growth: 'Growth', bespoke: 'Bespoke' }
  const STATUS_LABELS: Record<string, string> = { active: 'Active', onboarding: 'Onboarding', paused: 'Paused' }
  const REQUEST_LABELS: Record<string, string> = { open: 'Open', in_progress: 'In Progress', done: 'Done' }

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <Link href="/admin" className={styles.backLink}>Back to all clients</Link>
        <div className={styles.headRow}>
          <h1 className={styles.pageTitle}>{business.name}</h1>
          <span className={`${styles.statusBadge} ${styles['status_' + business.status]}`}>
            {STATUS_LABELS[business.status] ?? business.status}
          </span>
        </div>
        <p className={styles.pageSub}>
          {profile?.full_name ?? ''}{profile?.email ? ` (${profile.email})` : ''}
        </p>
      </div>

      {/* Business details */}
      <div className={styles.detailGrid}>
        <div className={styles.detailCard}>
          <h2 className={styles.cardTitle}>Business details</h2>
          <dl className={styles.dl}>
            <dt>Plan</dt>       <dd>{PLAN_LABELS[business.plan] ?? business.plan}</dd>
            <dt>Industry</dt>   <dd>{business.industry ?? 'Not set'}</dd>
            <dt>Contact</dt>    <dd>{business.contact_name ?? profile?.full_name ?? 'Not set'}</dd>
            <dt>Pain point</dt> <dd>{business.pain_point ?? 'Not provided'}</dd>
            <dt>Found us via</dt><dd>{business.heard_about ?? 'Not provided'}</dd>
            <dt>Joined</dt>     <dd>{new Date(business.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</dd>
          </dl>
        </div>

        {/* Metrics at a glance */}
        {metrics && metrics.length > 0 && (
          <div className={styles.detailCard}>
            <h2 className={styles.cardTitle}>Recent metrics</h2>
            <div className={styles.metricsTable}>
              <div className={styles.metricsHead}>
                <span>Month</span>
                <span>Leads</span>
                <span>Hours</span>
                <span>Revenue</span>
              </div>
              {metrics.map(m => (
                <div key={m.month} className={styles.metricsRow}>
                  <span>{new Date(m.month).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                  <span>{m.leads_captured}</span>
                  <span>{m.admin_hours_saved}h</span>
                  <span>£{Number(m.sales_recovered).toLocaleString('en-GB')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Module assignment */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Assigned modules</h2>
        <p className={styles.sectionSub}>
          Modules marked as assigned appear in this client&rsquo;s portal.
          Toggle assignments in the Supabase table directly until the full UI is built.
        </p>
        <div className={styles.modulesGrid}>
          {allModules?.map(m => {
            const isAssigned = assignedIds.has(m.id)
            return (
              <div key={m.id} className={`${styles.moduleChip} ${isAssigned ? styles.moduleAssigned : ''}`}>
                <span className={styles.moduleChipName}>{m.name}</span>
                {isAssigned && <span className={styles.moduleChipBadge}>Active</span>}
              </div>
            )
          })}
        </div>
      </section>

      {/* Open change requests */}
      {requests && requests.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Change requests</h2>
          <div className={styles.requestList}>
            {requests.map(r => (
              <div key={r.id} className={styles.requestRow}>
                <span className={`${styles.reqStatus} ${styles['req_' + r.status]}`}>
                  {REQUEST_LABELS[r.status] ?? r.status}
                </span>
                <p className={styles.reqDesc}>{r.description}</p>
                <span className={styles.reqDate}>
                  {new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Activity log */}
      {activity && activity.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent activity</h2>
          <div className={styles.activityList}>
            {activity.map(a => (
              <div key={a.id} className={styles.activityRow}>
                <span className={styles.activityType}>{a.type ?? 'Update'}</span>
                <span className={styles.activityDesc}>{a.description}</span>
                <span className={styles.activityDate}>
                  {new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
