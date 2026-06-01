import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ShaderBackground from '@/components/motion/ShaderBackground'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShaderBackground />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
