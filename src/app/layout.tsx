import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'lenis/dist/lenis.css'
import LampIntro from '@/components/motion/LampIntro'
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import CustomCursor from '@/components/motion/CustomCursor'
import SmoothScroll from '@/components/motion/SmoothScroll'
import GlobalShaderBackground from '@/components/motion/GlobalShaderBackground'
import { MotionConfig } from 'framer-motion'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Telos AI',
    default: 'Telos AI: Custom software for ambitious service businesses.',
  },
  description:
    'We build and manage custom software, automation, and intelligent systems that handle your admin, capture leads, and keep your pipeline moving. Built for your business. Fully managed.',
  metadataBase: new URL('https://telosai.co.uk'),
  openGraph: {
    siteName:    'Telos AI',
    locale:      'en_GB',
    type:        'website',
    title:       'Telos AI: Custom software for ambitious service businesses.',
    description: 'We build custom software and automation that handles admin, captures leads, and keeps your pipeline moving.',
    url:         'https://telosai.co.uk',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Telos AI: Custom software for ambitious service businesses.',
    description: 'Custom software and automation that handles admin, captures leads, and keeps your pipeline moving.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Extend the page under the iPhone notch/home bar (the fixed shader fills
  // it) and make env(safe-area-inset-*) available to fixed bottom elements.
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        {/* html stays black so there is never a white flash; body must be transparent so the fixed shader shows through */}
        <style>{`html{background:#000!important}body{background:transparent!important}`}</style>
        <link rel="preconnect" href="https://eedptakfhrhxsmkfqxlc.supabase.co" />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <GlobalShaderBackground />
          <SmoothScroll />
          <LampIntro />
          <CustomCursor />
          {children}
          <CookieBanner />
        </MotionConfig>
      </body>
    </html>
  )
}
