'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function completeOnboarding(formData: {
  industry:   string
  painPoint:  string
  heard:      string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const admin = createAdminClient()

  // Get the profile created by the DB trigger
  const { data: profile, error: profileErr } = await admin
    .from('profiles')
    .select('id, full_name')
    .eq('user_id', user.id)
    .single()

  if (profileErr || !profile) {
    // Trigger may not have fired yet — create the profile manually
    const { data: newProfile, error: createErr } = await admin
      .from('profiles')
      .insert({
        user_id:   user.id,
        email:     user.email ?? '',
        full_name: user.user_metadata?.full_name ?? '',
        role:      'client',
      })
      .select('id, full_name')
      .single()

    if (createErr || !newProfile) {
      return { error: 'Could not create your profile. Please try again.' }
    }

    return finishOnboarding(admin, newProfile, user, formData)
  }

  return finishOnboarding(admin, profile, user, formData)
}

async function finishOnboarding(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  admin: any,
  profile: { id: string; full_name: string | null },
  user: { user_metadata?: Record<string, string> },
  formData: { industry: string; painPoint: string; heard: string }
) {
  const businessName = (user as { user_metadata?: { business_name?: string } })
    .user_metadata?.business_name ?? 'My Business'

  const { error: bizError } = await admin
    .from('businesses')
    .upsert(
      {
        owner_id:     profile.id,
        name:         businessName,
        contact_name: profile.full_name ?? '',
        industry:     formData.industry,
        pain_point:   formData.painPoint,
        heard_about:  formData.heard,
        status:       'active',
        plan:         'starter',
      },
      { onConflict: 'owner_id' }
    )

  if (bizError) {
    return { error: 'Could not complete setup. Please try again.' }
  }

  redirect('/portal')
}
