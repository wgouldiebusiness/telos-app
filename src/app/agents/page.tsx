import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { isMasterEmail } from '@/lib/security'
import { EXPERT_AGENTS } from '@/agents/experts/registry'
import styles from './agents.module.css'

/**
 * The agent dashboard: every expert at your disposal, filtered by access.
 * Masters see the full roster; a client sees the agents whose module is
 * assigned to their business (managed from the admin panel).
 */
export default async function AgentsDashboard() {
  let master = false
  const allowedModules = new Set<string>()
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    master = isMasterEmail(user?.email)
    if (!master) {
      const { data: rows } = await supabase
        .from('business_modules')
        .select('active, modules ( name )')
        .eq('active', true)
      for (const r of rows ?? []) {
        const mod = Array.isArray(r.modules) ? r.modules[0] : r.modules
        const name = (mod as { name?: string } | null)?.name
        if (name) allowedModules.add(name)
      }
    }
  } catch (err) {
    // Fail closed: no lookup means no access shown.
    console.error('[agents] access lookup failed:', err)
  }

  const agents = EXPERT_AGENTS.map(a => ({
    ...a,
    enabled: master || allowedModules.has(a.moduleName),
  }))
  const enabledCount = agents.filter(a => a.enabled).length

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Expert agents</span>
        <h1 className={styles.h1}>Specialists at your disposal.</h1>
        <p className={styles.sub}>
          {master
            ? `Full roster: ${agents.length} specialists, every one an industry expert in its lane.`
            : enabledCount > 0
              ? `${enabledCount} of ${agents.length} specialists are enabled for your account.`
              : 'No agents are enabled for your account yet. Ask Telos to switch them on.'}
        </p>
      </div>

      <div className={styles.grid}>
        {agents.map(a =>
          a.enabled ? (
            <Link key={a.slug} href={`/agents/${a.slug}`} className={styles.card}>
              <span className={styles.cardIcon} aria-hidden="true">{a.icon}</span>
              <span className={styles.cardName}>{a.name}</span>
              <span className={styles.cardTag}>{a.tagline}</span>
              <span className={styles.cardDesc}>{a.description}</span>
              <span className={styles.cardCta}>Open chat</span>
            </Link>
          ) : (
            <div key={a.slug} className={`${styles.card} ${styles.cardLocked}`}>
              <span className={styles.cardIcon} aria-hidden="true">{a.icon}</span>
              <span className={styles.cardName}>{a.name}</span>
              <span className={styles.cardTag}>{a.tagline}</span>
              <span className={styles.cardDesc}>{a.description}</span>
              <span className={styles.cardLockedNote}>Not enabled for your account</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}
