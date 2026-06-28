// Portal pages are authenticated and per-user. They must render dynamically
// rather than being statically prerendered at build time (which fails without
// env vars and would leak/stale per-user data into static HTML).
export const dynamic = 'force-dynamic'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
