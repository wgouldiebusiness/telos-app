import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'Module Library | Admin' }

export default async function ModulesPage() {
  const admin = createAdminClient()

  const { data: modules } = await admin
    .from('modules')
    .select('id, name, description, sort_order')
    .order('sort_order')

  // Count assignments per module
  const { data: assignments } = await admin
    .from('business_modules')
    .select('module_id, active')

  const counts: Record<string, number> = {}
  assignments?.forEach(a => {
    if (a.active) counts[a.module_id] = (counts[a.module_id] ?? 0) + 1
  })

  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Module Library</span>
        <h1 className={styles.pageTitle}>All eight service modules.</h1>
        <p className={styles.pageSub}>
          Assign modules to individual clients from the client detail view.
          Active assignments appear in that client&rsquo;s portal immediately.
        </p>
      </div>

      <div className={styles.modulesGrid}>
        {modules?.map(m => (
          <div key={m.id} className={styles.moduleCard}>
            <span className={styles.moduleNum}>0{m.sort_order}</span>
            <h2 className={styles.moduleName}>{m.name}</h2>
            <p className={styles.moduleDesc}>{m.description}</p>
            <span className={styles.moduleCount}>
              {counts[m.id] ?? 0} client{(counts[m.id] ?? 0) !== 1 ? 's' : ''} active
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
