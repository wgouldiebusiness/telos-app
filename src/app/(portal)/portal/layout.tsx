import PortalShell from '@/components/Portal/PortalShell'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>
}
