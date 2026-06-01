import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar'
import ShaderBackground from '@/components/motion/ShaderBackground'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderBackground />
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
