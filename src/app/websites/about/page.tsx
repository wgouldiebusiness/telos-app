import type { Metadata } from 'next'
import AboutView from '@/app/(marketing)/about/AboutView'

export const metadata: Metadata = {
  title: 'About | Telos Websites',
  description:
    'Telos Websites is the web design and build arm of the Telos group. Built by people who automated their own business first.',
}

export default function WebsitesAboutPage() {
  return <AboutView ctaHref="/contact" />
}
