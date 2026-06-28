import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Live AI chatbot — marketing pages only (not portal/admin) */}
      <ChatWidget />
    </>
  )
}
