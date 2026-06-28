// Admin pages are authenticated and query the database per request via the
// service-role client. They must never be statically prerendered at build
// time (that both fails when env vars are absent and would bake admin data
// into static HTML). Force every route in this group to render dynamically.
export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
