import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isMasterEmail } from '@/lib/security'
import AdminShell from '@/components/Admin/AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: admin pages instantiate the service-role client, which
  // bypasses RLS and exposes every client's data. The proxy already redirects
  // non-masters away from /admin, but we must never render this subtree without
  // independently re-verifying the caller against the verified session — auth
  // decisions should not live in the proxy alone.
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isMasterEmail(user.email)) {
    redirect('/portal')
  }

  return <AdminShell>{children}</AdminShell>
}
