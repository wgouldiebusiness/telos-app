import type { Metadata } from 'next'
import styles from '../portal.module.css'

export const metadata: Metadata = { title: 'Performance Report — Telos AI Portal' }

export default function PerformancePage() {
  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Performance Report</span>
        <h1 className={styles.pageTitle}>Monthly and annual overview.</h1>
      </div>
      <div className={styles.emptyCard}>
        <h2 className={styles.emptyTitle}>No data yet.</h2>
        <p className={styles.emptyText}>
          Your performance reports will appear here once your automations are live and capturing data.
          Reports are generated monthly with a plain-English written insight alongside the charts.
        </p>
      </div>
    </div>
  )
}
