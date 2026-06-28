import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/Admin/AdminShell'

function getMasterEmails(): string[] {
  return (process.env.MASTER_EMAILS ?? '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: admin pages instantiate the service-role client, which
  // bypasses RLS and exposes every client's data. The proxy already redirects
  // non-masters away from /admin, but we must never render this subtree without
  // independently re-verifying the caller against the verified session — auth
  // decisions should not live in the proxy alone.
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const masters = getMasterEmails()

  if (!user || !masters.includes(user.email?.toLowerCase() ?? '')) {
    redirect('/portal')
  }

  return <AdminShell>{children}</AdminShell>
}
