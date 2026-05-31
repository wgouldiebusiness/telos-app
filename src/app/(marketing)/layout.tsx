import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import AnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
