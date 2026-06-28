import type { Metadata } from 'next'
import AboutView from './AboutView'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Telos AI was built by someone who automated his own service business first, then helped others do the same. No theory. No guesswork.',
}

export default function AboutPage() {
  return <AboutView />
}
