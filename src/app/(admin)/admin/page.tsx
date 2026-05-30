import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'Admin — Telos AI' }

const modules = [
  { key: 'receptionist', name: 'AI Receptionist' },
  { key: 'chat',         name: 'Website and Chat Assistant' },
  { key: 'pipeline',     name: 'Pipeline and Follow-Up' },
  { key: 'recovery',     name: 'Missed-Client Recovery' },
  { key: 'data',         name: 'Data and Insights' },
  { key: 'inbox',        name: 'Inbox Campaigns' },
  { key: 'website',      name: 'Conversion Websites' },
  { key: 'social',       name: 'Social Media and Content' },
]

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Master Admin</h1>
        <p className={styles.pageSub}>
          All client accounts and the service module library.
          Authenticated via: {process.env.MASTER_EMAILS?.split(',').join(', ')}
        </p>
      </div>

      {/* Clients table */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Client Accounts</h2>
        <div className={styles.emptyCard}>
          <p className={styles.emptyText}>
            Client accounts will appear here once Supabase is connected and clients
            have signed up. Each row links to the client detail view where you can
            assign modules and view their data.
          </p>
        </div>
        {/*
          Once Supabase is wired:
          1. Query `businesses` table with service role key
          2. Render a table row per client with: name, plan, status, last active, [View] link
          3. Each row links to /admin/clients/[id]
        */}
      </section>

      {/* Module library */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Service Module Library</h2>
        <p className={styles.sectionSub}>
          Assign these modules to individual clients. When a module is assigned,
          it appears in that client&rsquo;s portal immediately.
        </p>
        <div className={styles.modulesGrid}>
          {modules.map(m => (
            <div key={m.key} className={styles.moduleCard}>
              <span className={styles.moduleKey}>{m.key}</span>
              <span className={styles.moduleName}>{m.name}</span>
              {/*
                When Supabase is wired:
                - Show assigned clients count
                - Button to assign to a client
              */}
              <span className={styles.moduleNote}>No clients assigned</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
