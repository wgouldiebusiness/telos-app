import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalShell from '@/components/Portal/PortalShell'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Profile row is created by DB trigger on signup
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('user_id', user.id)
    .single()

  // Business linked via owner_id = profile.id
  const { data: business } = profile
    ? await supabase
        .from('businesses')
        .select('id, name, plan, status')
        .eq('owner_id', profile.id)
        .single()
    : { data: null }

  // First login: no business yet means onboarding is incomplete
  if (!business) {
    redirect('/onboarding')
  }

  const businessName = business.name ?? 'Your Portal'
  const userName     = profile?.full_name ?? ''
  const plan         = business.plan ?? 'starter'

  return (
    <PortalShell businessName={businessName} userName={userName} plan={plan}>
      {children}
    </PortalShell>
  )
}
