import MediaHeader from '@/components/MediaHeader/MediaHeader'
import Footer from '@/components/Footer/Footer'
import ShaderBackground from '@/components/motion/ShaderBackground'
import ChatWidget from '@/agents/website-chatbot/ChatWidget'

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderBackground />
      <MediaHeader />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  )
}
