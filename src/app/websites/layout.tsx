import WebsitesHeader from '@/components/WebsitesHeader/WebsitesHeader'
import Footer from '@/components/Footer/Footer'
import WebsitesShaderBackground from '@/components/WebsitesShaderBackground/WebsitesShaderBackground'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebsitesShaderBackground />
      <WebsitesHeader />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  )
}
