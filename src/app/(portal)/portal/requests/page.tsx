import type { Metadata } from 'next'
import styles from '../portal.module.css'

export const metadata: Metadata = { title: 'Request Changes — Telos AI Portal' }

export default function RequestsPage() {
  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Request Changes</span>
        <h1 className={styles.pageTitle}>Ask us to adjust your automations.</h1>
      </div>
      <div className={styles.requestForm}>
        <p className={styles.requestIntro}>
          Use this form to request changes to your existing automations. We will review and
          respond within one business day.
        </p>
        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="reqType">Type of request</label>
            <select id="reqType" className={styles.select}>
              <option value="">Select a type</option>
              <option>Minor adjustment</option>
              <option>New automation</option>
              <option>Technical issue</option>
              <option>General question</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="reqMsg">Your request</label>
            <textarea
              id="reqMsg"
              className={styles.textarea}
              rows={6}
              placeholder="Describe what you would like changed or added..."
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            <span>Submit request</span>
          </button>
        </form>
      </div>
    </div>
  )
}
