'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function MediaContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // TODO: replace with real submission (Resend API route, Formspree, etc.)
    console.log('Telos Media enquiry:', form)
    setTimeout(() => { setLoading(false); setSent(true) }, 700)
  }

  if (sent) {
    return (
      <div className={styles.formCard}>
        <div className={styles.successState}>
          <span className={styles.successIcon}>✓</span>
          <h3 className={styles.successTitle}>Message sent.</h3>
          <p className={styles.successSub}>
            We will be in touch within one working day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>Or send a message</h3>
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="media-name" className={styles.formLabel}>Name *</label>
            <input
              id="media-name" name="name" type="text" required
              placeholder="Your name" value={form.name} onChange={change}
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="media-email" className={styles.formLabel}>Email *</label>
            <input
              id="media-email" name="email" type="email" required
              placeholder="you@company.com" value={form.email} onChange={change}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="media-company" className={styles.formLabel}>Company</label>
          <input
            id="media-company" name="company" type="text"
            placeholder="Your company name" value={form.company} onChange={change}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="media-message" className={styles.formLabel}>What are you looking for? *</label>
          <textarea
            id="media-message" name="message" required rows={4}
            placeholder="Tell us about your brand, your goals, and what kind of content you need..."
            value={form.message} onChange={change}
            className={styles.formTextarea}
          />
        </div>
        <button type="submit" disabled={loading} className={styles.formSubmit}>
          {loading ? 'Sending…' : 'Send Message'}
        </button>
        <p className={styles.formNote}>We will respond within one working day.</p>
      </form>
    </div>
  )
}
