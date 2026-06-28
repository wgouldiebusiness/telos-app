import WebsitesHeader from '@/components/WebsitesHeader/WebsitesHeader'
import Footer from '@/components/Footer/Footer'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  const redVars = {
    '--purple':   '#E8352A',
    '--purple-2': '#C42E24',
    '--purple-3': 'rgba(232,53,42,.7)',
    '--purple-dim': 'rgba(232,53,42,.12)',
  } as React.CSSProperties

  return (
    <>
      <WebsitesHeader />
      <div style={redVars}>
        <main>{children}</main>
        <Footer />
      </div>
      <ChatWidget />
    </>
  )
}
