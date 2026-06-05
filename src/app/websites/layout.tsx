import WebsitesHeader from '@/components/WebsitesHeader/WebsitesHeader'
import Footer from '@/components/Footer/Footer'
import WebsitesShaderBackground from '@/components/WebsitesShaderBackground/WebsitesShaderBackground'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  // Override --purple to the Websites red throughout this subtree so that
  // the global .label class, inherited button colours, and any remaining
  // var(--purple) references all render in the correct brand colour.
  const redVars = {
    '--purple':   '#E8352A',
    '--purple-2': '#C42E24',
    '--purple-3': 'rgba(232,53,42,.7)',
    '--purple-dim': 'rgba(232,53,42,.12)',
  } as React.CSSProperties

  return (
    <>
      <WebsitesShaderBackground />
      <WebsitesHeader />
      <div style={redVars}>
        <main>{children}</main>
        <Footer />
      </div>
      <ChatWidget />
    </>
  )
}
