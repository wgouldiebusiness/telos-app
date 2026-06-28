import type { Metadata } from 'next'
import AboutView from '@/app/(marketing)/about/AboutView'

export const metadata: Metadata = {
  title: 'About | Telos Media',
  description:
    'Telos Media is the content, video, and advertising arm of the Telos group. Built by people who automated their own business first.',
}

export default function MediaAboutPage() {
  return <AboutView ctaHref="/media#booking" />
}
