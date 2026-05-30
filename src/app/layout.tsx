import type { Metadata } from 'next'
import { Fraunces, EB_Garamond, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/motion/SmoothScroll'
import PageIntro from '@/components/motion/PageIntro'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
})

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    template: '%s — Telos AI',
    default: 'Telos AI — Intelligence, applied with intent.',
  },
  description:
    'AI automation built for UK service businesses. Streamline admin, recover missed clients, and grow your pipeline with custom automations.',
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
      className={`${fraunces.variable} ${garamond.variable} ${hanken.variable}`}
    >
      <body>
        <PageIntro />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
