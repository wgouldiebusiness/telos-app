import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isMasterEmail } from '@/lib/security'
import { getExpertAgent } from '@/agents/experts/registry'
import ExpertChat from '@/components/ExpertChat/ExpertChat'
import styles from '../agents.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AgentChatPage({ params }: Props) {
  const { slug } = await params
  const agent = getExpertAgent(slug)
  if (!agent) notFound()

  // Server-side access check mirrors the API route, so a locked agent's
  // page (and its starter content) is never rendered to the wrong user.
  let allowed = false
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (isMasterEmail(user?.email)) {
      allowed = true
    } else {
      const { data: rows } = await supabase
        .from('business_modules')
        .select('active, modules ( name )')
        .eq('active', true)
      allowed = (rows ?? []).some(r => {
        const mod = Array.isArray(r.modules) ? r.modules[0] : r.modules
        return (mod as { name?: string } | null)?.name === agent.moduleName
      })
    }
  } catch (err) {
    // Fail closed: an unverifiable caller gets no agent page.
    console.error('[agents] access check failed:', err)
  }
  if (!allowed) redirect('/agents')

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatHead}>
        <Link href="/agents" className={styles.backLink}>All agents</Link>
        <div className={styles.chatHeadRow}>
          <span className={styles.chatIcon} aria-hidden="true">{agent.icon}</span>
          <div>
            <h1 className={styles.chatName}>{agent.name}</h1>
            <p className={styles.chatTag}>{agent.tagline}</p>
          </div>
        </div>
      </div>
      <ExpertChat
        slug={agent.slug}
        agentName={agent.name}
        starters={agent.starters}
      />
    </div>
  )
}
