import type { Metadata } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/motion/SmoothScroll'
import PageIntro from '@/components/motion/PageIntro'
import CookieBanner from '@/components/CookieBanner/CookieBanner'

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
    default: 'Telos AI — AI systems for ambitious service businesses.',
  },
  description:
    'We engineer custom AI infrastructure that handles admin, captures leads, and keeps your pipeline moving. Built for your business. Fully managed. Improving every month.',
  metadataBase: new URL('https://telosai.co.uk'),
  openGraph: {
    siteName:    'Telos AI',
    locale:      'en_GB',
    type:        'website',
    title:       'Telos AI — AI systems for ambitious service businesses.',
    description: 'We engineer custom AI infrastructure that handles admin, captures leads, and keeps your pipeline moving. Built for your business. Fully managed. Improving every month.',
    url:         'https://telosai.co.uk',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Telos AI — AI systems for ambitious service businesses.',
    description: 'Custom AI systems that handle admin, capture leads, and keep your pipeline moving. Built for UK service businesses.',
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
        <CookieBanner />
      </body>
    </html>
  )
}
