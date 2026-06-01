import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PageIntro from '@/components/motion/PageIntro'
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import CustomCursor from '@/components/motion/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
    description: 'We engineer custom AI infrastructure that handles admin, captures leads, and keeps your pipeline moving.',
    url:         'https://telosai.co.uk',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Telos AI — AI systems for ambitious service businesses.',
    description: 'Custom AI systems that handle admin, capture leads, and keep your pipeline moving.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#000000" />
        {/* Inline critical CSS: prevent flash of unstyled background before JS loads */}
        <style>{`html,body{background:#000!important}`}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://eedptakfhrhxsmkfqxlc.supabase.co" />
      </head>
      <body>
        <PageIntro />
        <CustomCursor />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
