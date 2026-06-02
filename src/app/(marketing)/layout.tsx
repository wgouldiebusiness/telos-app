import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ShaderBackground from '@/components/motion/ShaderBackground'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderBackground />
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Live AI chatbot — marketing pages only (not portal/admin) */}
      <ChatWidget />
    </>
  )
}
