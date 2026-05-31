import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/motion/SmoothScroll'
import PageIntro from '@/components/motion/PageIntro'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['500', '600', '700'],
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s — Telos AI',
    default: 'Telos AI — Less admin. More of what you do best.',
  },
  description:
    'Custom AI agents and integrations for UK service businesses. We build the automations that quietly run the busywork so you stay focused on your clients.',
  metadataBase: new URL('https://telosai.co.uk'),
  openGraph: {
    siteName: 'Telos AI',
    locale: 'en_GB',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${hanken.variable}`}
    >
      <body>
        <PageIntro />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
