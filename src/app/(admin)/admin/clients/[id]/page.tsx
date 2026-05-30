import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../../page.module.css'

export const metadata: Metadata = { title: 'Client Detail — Admin' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <Link href="/admin" style={{ fontSize: 'var(--text-xs)', color: 'var(--brown)' }}>
          &larr; All clients
        </Link>
        <h1 className={styles.pageTitle}>Client: {id}</h1>
        <p className={styles.pageSub}>
          Onboarding answers, assigned modules, live metrics, and open change requests.
        </p>
      </div>

      {/*
        When Supabase is wired:
        1. Query `businesses` where id = params.id (using service role key)
        2. Query `business_modules` to get assigned modules
        3. Query `metrics`, `leads`, `requests` for this business
        4. Render the full client detail view

        Module assignment mechanic:
        - List all modules from the static catalogue
        - Show which are assigned (check business_modules table)
        - Button to assign/unassign: write to business_modules, which immediately
          changes what this client sees in their portal
      */}

      <div className={styles.emptyCard}>
        <p className={styles.emptyText}>
          Client detail view. Connect Supabase and this page will show the client&rsquo;s
          onboarding data, assigned modules, metrics, and change requests.
          Use the module assignment controls to toggle what appears in their portal.
        </p>
      </div>
    </div>
  )
}
