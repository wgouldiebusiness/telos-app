import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LampIntro from '@/components/motion/LampIntro'
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import CustomCursor from '@/components/motion/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
        {/* html stays black so there is never a white flash; body must be transparent so the fixed shader shows through */}
        <style>{`html{background:#000!important}body{background:transparent!important}`}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://eedptakfhrhxsmkfqxlc.supabase.co" />
      </head>
      <body>
        <LampIntro />
        <CustomCursor />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
