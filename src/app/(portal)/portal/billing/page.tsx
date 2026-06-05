import type { Metadata } from 'next'
import styles from '../portal.module.css'

export const metadata: Metadata = { title: 'Billing | Telos AI Portal' }

export default function BillingPage() {
  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Billing</span>
        <h1 className={styles.pageTitle}>Your plan and invoices.</h1>
      </div>
      {/* Stripe Payment Link / future Stripe Customer Portal integration */}
      <div className={styles.emptyCard}>
        <h2 className={styles.emptyTitle}>Billing information</h2>
        <p className={styles.emptyText}>
          Your billing details and invoice history will appear here. To manage your
          subscription or payment method, use the button below.
        </p>
        {/* Future: replace href with Stripe Customer Portal link */}
        <a
          href={process.env.NEXT_PUBLIC_STRIPE_LINK_GROWTH || '#'}
          className={styles.stripeBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          Manage billing via Stripe
        </a>
      </div>
    </div>
  )
}
