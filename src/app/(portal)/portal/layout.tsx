import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalShell from '@/components/Portal/PortalShell'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_id, businesses(name)')
    .eq('id', user.id)
    .single()

  const businessName =
    (profile?.businesses as { name?: string } | null)?.name ?? 'Your Portal'
  const userName = profile?.full_name ?? ''

  return (
    <PortalShell businessName={businessName} userName={userName}>
      {children}
    </PortalShell>
  )
}
