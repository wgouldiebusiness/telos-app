import type { Metadata } from 'next'
import styles from '../portal.module.css'

export const metadata: Metadata = { title: 'Support | Telos AI Portal' }

export default function SupportPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const message = encodeURIComponent(
    'Hi, I am reaching out from my Telos AI portal. I need some help with:'
  )
  const waUrl = waNumber
    ? `https://wa.me/${waNumber}?text=${message}`
    : '#'

  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Support</span>
        <h1 className={styles.pageTitle}>We are here to help.</h1>
      </div>
      <div className={styles.supportCard}>
        <div className={styles.supportIcon}>◆</div>
        <h2 className={styles.supportTitle}>Contact us via WhatsApp</h2>
        <p className={styles.supportDesc}>
          For the fastest response, reach us directly on WhatsApp. We aim to respond
          within a few hours during business hours (Monday to Friday, 9am to 6pm UK time).
        </p>
        <a
          href={waUrl}
          className={styles.waBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open WhatsApp
        </a>
        <p className={styles.supportAlt}>
          Prefer email? Write to{' '}
          <a href="mailto:william.gouldsmith@telosai.co.uk">
            william.gouldsmith@telosai.co.uk
          </a>
        </p>
      </div>
    </div>
  )
}
