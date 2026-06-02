import WebsitesHeader from '@/components/WebsitesHeader/WebsitesHeader'
import Footer from '@/components/Footer/Footer'
import ShaderBackground from '@/components/motion/ShaderBackground'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderBackground />
      <WebsitesHeader />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  )
}
