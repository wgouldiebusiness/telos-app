'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

// ─────────────────────────────────────────────────────────────
// Master-only management actions.
//
// Every action re-verifies the caller against the live Supabase session
// before touching the service-role client — same defence-in-depth rule as
// the admin layout. Never trust that the proxy or the UI did the gating.
// Mutations are recorded in activity_log so there is an audit trail of
// what the master account changed and when.
// ─────────────────────────────────────────────────────────────

const PLANS = new Set(['starter', 'growth', 'bespoke'])
const STATUSES = new Set(['active', 'onboarding', 'paused'])
const REQUEST_STATUSES = new Set(['open', 'in_progress', 'done'])

export interface AdminActionResult {
  ok: boolean
  error?: string
}

async function requireMaster(): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const masters = (process.env.MASTER_EMAILS ?? '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)

  if (!user || !masters.includes(user.email?.toLowerCase() ?? '')) {
    return { ok: false, error: 'Not authorised.' }
  }
  return { ok: true }
}

async function logAdminAction(businessId: string, description: string): Promise<void> {
  try {
    const admin = createAdminClient()
    await admin.from('activity_log').insert({
      business_id: businessId,
      type: 'admin',
      description,
    })
  } catch (err) {
    // The audit entry is best-effort; never fail the action over it.
    console.error('[admin] activity log write failed:', err)
  }
}

/** Assign or unassign a module (agent) for a business. */
export async function setModuleAssignment(
  businessId: string,
  moduleId: string,
  assigned: boolean
): Promise<AdminActionResult> {
  const auth = await requireMaster()
  if (!auth.ok) return auth

  if (!businessId || !moduleId) return { ok: false, error: 'Missing ids.' }

  const admin = createAdminClient()
  try {
    if (assigned) {
      const { error } = await admin
        .from('business_modules')
        .upsert(
          { business_id: businessId, module_id: moduleId, active: true },
          { onConflict: 'business_id,module_id' }
        )
      if (error) throw error
    } else {
      const { error } = await admin
        .from('business_modules')
        .delete()
        .eq('business_id', businessId)
        .eq('module_id', moduleId)
      if (error) throw error
    }
  } catch (err) {
    console.error('[admin] module assignment failed:', err)
    return { ok: false, error: 'Could not update the module. Please try again.' }
  }

  const { data: mod } = await admin.from('modules').select('name').eq('id', moduleId).single()
  await logAdminAction(
    businessId,
    `${assigned ? 'Assigned' : 'Removed'} module: ${mod?.name ?? moduleId}`
  )

  revalidatePath(`/admin/clients/${businessId}`)
  revalidatePath('/admin/modules')
  return { ok: true }
}

/** Edit a client's account: business name, plan, status. */
export async function updateBusiness(
  businessId: string,
  fields: { name?: string; plan?: string; status?: string }
): Promise<AdminActionResult> {
  const auth = await requireMaster()
  if (!auth.ok) return auth

  const update: Record<string, string> = {}
  const changes: string[] = []

  const name = fields.name?.trim()
  if (name) {
    if (name.length > 120) return { ok: false, error: 'Name is too long.' }
    update.name = name
    changes.push(`name to "${name}"`)
  }
  if (fields.plan !== undefined) {
    if (!PLANS.has(fields.plan)) return { ok: false, error: 'Unknown plan.' }
    update.plan = fields.plan
    changes.push(`plan to ${fields.plan}`)
  }
  if (fields.status !== undefined) {
    if (!STATUSES.has(fields.status)) return { ok: false, error: 'Unknown status.' }
    update.status = fields.status
    changes.push(`status to ${fields.status}`)
  }
  if (Object.keys(update).length === 0) return { ok: false, error: 'Nothing to update.' }

  const admin = createAdminClient()
  const { error } = await admin.from('businesses').update(update).eq('id', businessId)
  if (error) {
    console.error('[admin] business update failed:', error)
    return { ok: false, error: 'Could not save the changes. Please try again.' }
  }

  await logAdminAction(businessId, `Account updated: ${changes.join(', ')}`)
  revalidatePath(`/admin/clients/${businessId}`)
  revalidatePath('/admin')
  return { ok: true }
}

/** Move a change request between open / in_progress / done. */
export async function updateRequestStatus(
  requestId: string,
  status: string
): Promise<AdminActionResult> {
  const auth = await requireMaster()
  if (!auth.ok) return auth

  if (!REQUEST_STATUSES.has(status)) return { ok: false, error: 'Unknown status.' }

  const admin = createAdminClient()
  const { data: req, error } = await admin
    .from('change_requests')
    .update({ status })
    .eq('id', requestId)
    .select('business_id, description')
    .single()

  if (error || !req) {
    console.error('[admin] request status update failed:', error)
    return { ok: false, error: 'Could not update the request. Please try again.' }
  }

  await logAdminAction(
    req.business_id,
    `Change request marked ${status.replace('_', ' ')}: ${String(req.description).slice(0, 80)}`
  )
  revalidatePath(`/admin/clients/${req.business_id}`)
  return { ok: true }
}

/** Enter or update a month's metrics for a business (upsert by month). */
export async function saveMetrics(
  businessId: string,
  month: string, // YYYY-MM
  values: {
    leads_captured?: number
    admin_hours_saved?: number
    sales_recovered?: number
    website_visits?: number
  }
): Promise<AdminActionResult> {
  const auth = await requireMaster()
  if (!auth.ok) return auth

  if (!/^\d{4}-\d{2}$/.test(month)) return { ok: false, error: 'Month must be YYYY-MM.' }
  const monthDate = `${month}-01`

  const nums: Record<string, number> = {}
  for (const key of ['leads_captured', 'admin_hours_saved', 'sales_recovered', 'website_visits'] as const) {
    const v = values[key]
    if (v === undefined || v === null || Number.isNaN(v)) continue
    if (v < 0 || v > 10_000_000) return { ok: false, error: 'Values must be sensible non-negative numbers.' }
    nums[key] = v
  }
  if (Object.keys(nums).length === 0) return { ok: false, error: 'Enter at least one value.' }

  const admin = createAdminClient()
  const { error } = await admin
    .from('metrics')
    .upsert(
      { business_id: businessId, month: monthDate, ...nums },
      { onConflict: 'business_id,month' }
    )
  if (error) {
    console.error('[admin] metrics save failed:', error)
    return { ok: false, error: 'Could not save the metrics. Please try again.' }
  }

  await logAdminAction(
    businessId,
    `Metrics updated for ${month}: ${Object.entries(nums).map(([k, v]) => `${k.replace(/_/g, ' ')}=${v}`).join(', ')}`
  )
  revalidatePath(`/admin/clients/${businessId}`)
  return { ok: true }
}
