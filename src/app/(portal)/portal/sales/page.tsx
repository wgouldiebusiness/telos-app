import type { Metadata } from 'next'
import styles from '../portal.module.css'

export const metadata: Metadata = { title: 'Sales — Telos AI Portal' }

export default function SalesPage() {
  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Sales</span>
        <h1 className={styles.pageTitle}>Revenue overview.</h1>
      </div>
      <div className={styles.emptyCard}>
        <h2 className={styles.emptyTitle}>No sales data yet.</h2>
        <p className={styles.emptyText}>
          Your revenue data will populate here as leads are captured and converted through
          your Telos automations.
        </p>
      </div>
    </div>
  )
}
