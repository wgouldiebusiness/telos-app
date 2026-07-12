'use client'
import { useState, useTransition } from 'react'
import {
  setModuleAssignment,
  updateBusiness,
  updateRequestStatus,
  saveMetrics,
} from '@/app/actions/admin'
import styles from './ClientControls.module.css'

/* ─────────────────────────────────────────────
   Interactive controls for the admin client-detail page.
   Server actions re-verify the master session on every call —
   these components are UI only.
───────────────────────────────────────────── */

/* ── Module (agent) assignment toggles ── */
export function ModuleToggles({
  businessId,
  modules,
  assignedIds,
}: {
  businessId: string
  modules: { id: string; name: string }[]
  assignedIds: string[]
}) {
  const [assigned, setAssigned] = useState(new Set(assignedIds))
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  function toggle(moduleId: string) {
    const next = !assigned.has(moduleId)
    setError('')
    startTransition(async () => {
      const res = await setModuleAssignment(businessId, moduleId, next)
      if (res.ok) {
        setAssigned(prev => {
          const s = new Set(prev)
          if (next) s.add(moduleId)
          else s.delete(moduleId)
          return s
        })
      } else {
        setError(res.error ?? 'Could not update the module.')
      }
    })
  }

  return (
    <div>
      <div className={styles.modulesGrid}>
        {modules.map(m => {
          const isOn = assigned.has(m.id)
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => toggle(m.id)}
              disabled={pending}
              className={`${styles.moduleBtn} ${isOn ? styles.moduleOn : ''}`}
              aria-pressed={isOn}
            >
              <span>{m.name}</span>
              <span className={styles.moduleState}>{isOn ? 'Assigned' : 'Assign'}</span>
            </button>
          )
        })}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  )
}

/* ── Account editor: name, plan, status ── */
export function BusinessEditForm({
  businessId,
  name,
  plan,
  status,
}: {
  businessId: string
  name: string
  plan: string
  status: string
}) {
  const [form, setForm] = useState({ name, plan, status })
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    startTransition(async () => {
      const res = await updateBusiness(businessId, form)
      setMsg(res.ok
        ? { ok: true, text: 'Saved.' }
        : { ok: false, text: res.error ?? 'Could not save.' })
    })
  }

  return (
    <form className={styles.editForm} onSubmit={submit}>
      <div className={styles.editRow}>
        <label className={styles.editLabel} htmlFor="biz-name">Business name</label>
        <input
          id="biz-name"
          className={styles.editInput}
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          maxLength={120}
        />
      </div>
      <div className={styles.editSplit}>
        <div className={styles.editRow}>
          <label className={styles.editLabel} htmlFor="biz-plan">Plan</label>
          <select
            id="biz-plan"
            className={styles.editInput}
            value={form.plan}
            onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}
          >
            <option value="starter">Starter</option>
            <option value="growth">Growth</option>
            <option value="bespoke">Bespoke</option>
          </select>
        </div>
        <div className={styles.editRow}>
          <label className={styles.editLabel} htmlFor="biz-status">Status</label>
          <select
            id="biz-status"
            className={styles.editInput}
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
          >
            <option value="active">Active</option>
            <option value="onboarding">Onboarding</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>
      <div className={styles.editFoot}>
        <button type="submit" className={styles.saveBtn} disabled={pending}>
          {pending ? 'Saving…' : 'Save changes'}
        </button>
        {msg && (
          <span className={msg.ok ? styles.okMsg : styles.error} role="status">
            {msg.text}
          </span>
        )}
      </div>
    </form>
  )
}

/* ── Change request status control ── */
const REQ_LABELS: Record<string, string> = {
  open: 'Open',
  in_progress: 'In progress',
  done: 'Done',
}

export function RequestStatusControl({
  requestId,
  status,
}: {
  requestId: string
  status: string
}) {
  const [current, setCurrent] = useState(status)
  const [pending, startTransition] = useTransition()

  function set(next: string) {
    if (next === current) return
    startTransition(async () => {
      const res = await updateRequestStatus(requestId, next)
      if (res.ok) setCurrent(next)
    })
  }

  return (
    <span className={styles.reqControl}>
      {Object.entries(REQ_LABELS).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => set(value)}
          disabled={pending}
          className={`${styles.reqBtn} ${current === value ? styles.reqBtnOn : ''}`}
          aria-pressed={current === value}
        >
          {label}
        </button>
      ))}
    </span>
  )
}

/* ── Monthly metrics entry ── */
export function MetricsForm({ businessId }: { businessId: string }) {
  const now = new Date()
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const [month, setMonth] = useState(defaultMonth)
  const [vals, setVals] = useState({ leads: '', hours: '', revenue: '', visits: '' })
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    const num = (s: string) => (s.trim() === '' ? undefined : Number(s))
    startTransition(async () => {
      const res = await saveMetrics(businessId, month, {
        leads_captured: num(vals.leads),
        admin_hours_saved: num(vals.hours),
        sales_recovered: num(vals.revenue),
        website_visits: num(vals.visits),
      })
      setMsg(res.ok
        ? { ok: true, text: 'Metrics saved. Refresh to see them above.' }
        : { ok: false, text: res.error ?? 'Could not save.' })
    })
  }

  const fields: { key: keyof typeof vals; label: string }[] = [
    { key: 'leads', label: 'Leads captured' },
    { key: 'hours', label: 'Admin hours saved' },
    { key: 'revenue', label: 'Sales recovered (£)' },
    { key: 'visits', label: 'Website visits' },
  ]

  return (
    <form className={styles.metricsForm} onSubmit={submit}>
      <div className={styles.editRow}>
        <label className={styles.editLabel} htmlFor="metrics-month">Month</label>
        <input
          id="metrics-month"
          type="month"
          className={styles.editInput}
          value={month}
          onChange={e => setMonth(e.target.value)}
          required
        />
      </div>
      <div className={styles.metricsGrid}>
        {fields.map(f => (
          <div key={f.key} className={styles.editRow}>
            <label className={styles.editLabel} htmlFor={`metric-${f.key}`}>{f.label}</label>
            <input
              id={`metric-${f.key}`}
              type="number"
              min={0}
              step="any"
              inputMode="numeric"
              placeholder="0"
              className={styles.editInput}
              value={vals[f.key]}
              onChange={e => setVals(v => ({ ...v, [f.key]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <div className={styles.editFoot}>
        <button type="submit" className={styles.saveBtn} disabled={pending}>
          {pending ? 'Saving…' : 'Save metrics'}
        </button>
        {msg && (
          <span className={msg.ok ? styles.okMsg : styles.error} role="status">
            {msg.text}
          </span>
        )}
      </div>
    </form>
  )
}
