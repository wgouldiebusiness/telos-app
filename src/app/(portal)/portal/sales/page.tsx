import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import styles from '../portal.module.css'
import salesStyles from './page.module.css'

export const metadata: Metadata = { title: 'Sales — Telos AI Portal' }

const trackedMetrics = [
  {
    label: 'Leads captured',
    desc: 'Every enquiry handled by your agents, from missed-call recovery to chat and inbound calls.',
  },
  {
    label: 'Conversion rate',
    desc: 'What percentage of captured leads turned into booked appointments or confirmed clients.',
  },
  {
    label: 'Revenue recovered',
    desc: 'Estimated income from leads that would previously have gone unanswered or lapsed.',
  },
  {
    label: 'Pipeline velocity',
    desc: 'How quickly leads are moving from first contact to booked, and where they are stalling.',
  },
]

export default async function SalesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const { data: business } = profile
    ? await supabase
        .from('businesses')
        .select('id')
        .eq('owner_id', profile.id)
        .single()
    : { data: null }

  // Check if any metrics exist
  const { data: metrics } = business
    ? await supabase
        .from('metrics')
        .select('leads_captured, sales_recovered, month')
        .eq('business_id', business.id)
        .order('month', { ascending: false })
        .limit(6)
    : { data: null }

  const hasData = metrics && metrics.length > 0 && metrics.some(m => m.leads_captured > 0)

  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Sales</span>
        <h1 className={styles.pageTitle}>Revenue overview.</h1>
      </div>

      {hasData ? (
        <div className={salesStyles.metricsGrid}>
          {metrics!.slice(0, 3).map(m => (
            <div key={m.month} className={salesStyles.metricTile}>
              <span className={salesStyles.tileMonth}>
                {new Date(m.month).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
              </span>
              <div className={salesStyles.tileRow}>
                <div className={salesStyles.tileStat}>
                  <span className={salesStyles.tileLabel}>Leads</span>
                  <span className={salesStyles.tileValue}>{m.leads_captured}</span>
                </div>
                <div className={salesStyles.tileStat}>
                  <span className={salesStyles.tileLabel}>Recovered</span>
                  <span className={salesStyles.tileValue}>
                    £{Number(m.sales_recovered).toLocaleString('en-GB')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyCard}>
          <h2 className={styles.emptyTitle}>Your sales data will appear here.</h2>
          <p className={styles.emptyText}>
            Once your lead capture and follow-up automations are live, this section
            will show leads coming in, revenue recovered, and how your pipeline is
            moving month by month.
          </p>
        </div>
      )}

      <div className={salesStyles.whatWeTrack}>
        <span className="label">What this section tracks</span>
        <div className={salesStyles.trackGrid}>
          {trackedMetrics.map(m => (
            <div key={m.label} className={salesStyles.trackCard}>
              <h3 className={salesStyles.trackLabel}>{m.label}</h3>
              <p className={salesStyles.trackDesc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
