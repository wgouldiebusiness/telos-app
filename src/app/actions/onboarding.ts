'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function completeOnboarding(formData: {
  businessName: string
  industry: string
  size: string
  goals: string[]
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const admin = createAdminClient()

  // Create the business record
  const { data: business, error: bizError } = await admin
    .from('businesses')
    .insert({
      name: formData.businessName,
      industry: formData.industry,
      size: formData.size,
      goals: formData.goals.join(', '),
    })
    .select('id')
    .single()

  if (bizError || !business) {
    return { error: 'Could not create your business profile. Please try again.' }
  }

  // Update the profile with business_id and mark onboarding complete
  const { error: profileError } = await admin
    .from('profiles')
    .update({
      business_id: business.id,
      onboarding_complete: true,
    })
    .eq('id', user.id)

  if (profileError) {
    return { error: 'Could not update your profile. Please try again.' }
  }

  redirect('/portal')
}
