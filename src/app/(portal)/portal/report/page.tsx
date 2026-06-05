import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'Performance Report | Telos AI Portal' }

export default async function ReportPage() {
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

  const { data: allMetrics } = business
    ? await supabase
        .from('metrics')
        .select('month, leads_captured, admin_hours_saved, sales_recovered, website_visits')
        .eq('business_id', business.id)
        .order('month', { ascending: false })
        .limit(12)
    : { data: null }

  const hasData = allMetrics && allMetrics.length > 0

  // Totals for the most recent month shown as summary
  const latest = allMetrics?.[0]

  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Performance Report</span>
        <h1 className={styles.pageTitle}>Monthly overview.</h1>
      </div>

      {hasData && latest && (
        <div className={styles.summaryCard}>
          <p className={styles.summaryText}>
            Your systems handled <strong>{latest.leads_captured} lead{latest.leads_captured !== 1 ? 's' : ''}</strong> this
            month, saved an estimated <strong>{latest.admin_hours_saved} hours</strong> of admin, and recovered
            approximately <strong>£{Number(latest.sales_recovered).toLocaleString('en-GB')}</strong> in revenue from
            missed calls and follow-ups. Website visits:{' '}
            <strong>{latest.website_visits.toLocaleString('en-GB')}</strong>.
          </p>
        </div>
      )}

      {hasData ? (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Leads captured</th>
                  <th>Admin hours saved</th>
                  <th>Sales recovered</th>
                  <th>Website visits</th>
                </tr>
              </thead>
              <tbody>
                {allMetrics.map(m => (
                  <tr key={m.month}>
                    <td>
                      {new Date(m.month).toLocaleDateString('en-GB', {
                        month: 'long', year: 'numeric',
                      })}
                    </td>
                    <td>{m.leads_captured}</td>
                    <td>{m.admin_hours_saved}h</td>
                    <td>£{Number(m.sales_recovered).toLocaleString('en-GB')}</td>
                    <td>{m.website_visits.toLocaleString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pdfNote}>
            <span>Need a PDF copy?</span>
            <a href="mailto:william.gouldsmith@telosai.co.uk" className={styles.pdfLink}>
              Email us and we will send one over.
            </a>
          </div>
        </>
      ) : (
        <div className={styles.emptyCard}>
          <h2 className={styles.emptyTitle}>No data yet.</h2>
          <p className={styles.emptyText}>
            Your performance reports will appear here once your automations are live and
            capturing data. Reports are generated monthly with a plain-English summary
            alongside the numbers.
          </p>
        </div>
      )}
    </div>
  )
}
