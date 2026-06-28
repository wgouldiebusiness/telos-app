import MediaHeader from '@/components/MediaHeader/MediaHeader'
import Footer from '@/components/Footer/Footer'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  const tealVars = {
    '--purple':   '#00D4B4',
    '--purple-2': '#00B09A',
    '--purple-3': 'rgba(0,212,180,.7)',
    '--purple-dim': 'rgba(0,212,180,.12)',
  } as React.CSSProperties

  return (
    <>
      <MediaHeader />
      <div style={tealVars}>
        <main>{children}</main>
        <Footer />
      </div>
      <ChatWidget />
    </>
  )
}
