'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from './page.module.css'

type Request = {
  id:          string
  description: string
  status:      string
  created_at:  string
}

const STATUS_LABELS: Record<string, string> = {
  open:        'Open',
  in_progress: 'In Progress',
  done:        'Done',
}

const STATUS_CLASS: Record<string, string> = {
  open:        'statusOpen',
  in_progress: 'statusInProgress',
  done:        'statusDone',
}

export default function RequestPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [text, setText]         = useState('')
  const [sending, setSending]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')
  const [bizId, setBizId]       = useState<string | null>(null)

  const load = useCallback(async (businessId: string) => {
    const supabase = createClient()
    const { data } = await supabase
      .from('change_requests')
      .select('id, description, status, created_at')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
    setRequests(data ?? [])
  }, [])

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!profile) return

      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .eq('owner_id', profile.id)
        .single()

      if (!business) return
      setBizId(business.id)
      load(business.id)
    }
    init()
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!bizId || !text.trim()) return
    setError('')
    setSending(true)

    const supabase = createClient()
    const { error: err } = await supabase
      .from('change_requests')
      .insert({ business_id: bizId, description: text.trim() })

    if (err) {
      setError('Could not submit request. Please try again.')
      setSending(false)
      return
    }

    setText('')
    setSuccess(true)
    setSending(false)
    load(bizId)
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div>
      <div className={styles.pageHead}>
        <span className="label">Request a Change</span>
        <h1 className={styles.pageTitle}>Ask us to adjust your automations.</h1>
      </div>

      <div className={styles.requestForm}>
        <p className={styles.requestIntro}>
          Use this form to request changes to your existing automations or ask about
          adding something new. We review and respond within one business day.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="reqMsg">Your request</label>
            <textarea
              id="reqMsg"
              className={styles.textarea}
              rows={6}
              placeholder="Describe what you would like changed or added..."
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
          </div>
          {error   && <p className={styles.errorMsg}>{error}</p>}
          {success && <p className={styles.successMsg}>Request submitted. We will be in touch shortly.</p>}
          <button type="submit" className={styles.submitBtn} disabled={sending || !text.trim()}>
            {sending ? 'Submitting...' : 'Submit request'}
          </button>
        </form>
      </div>

      {requests.length > 0 && (
        <div className={styles.historySection}>
          <h2 className={styles.historyTitle}>Previous requests</h2>
          <div className={styles.historyList}>
            {requests.map(r => (
              <div key={r.id} className={styles.historyRow}>
                <div className={styles.historyMeta}>
                  <span className={`${styles.statusBadge} ${styles[STATUS_CLASS[r.status] ?? 'statusOpen']}`}>
                    {STATUS_LABELS[r.status] ?? r.status}
                  </span>
                  <span className={styles.historyDate}>
                    {new Date(r.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                </div>
                <p className={styles.historyDesc}>{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
