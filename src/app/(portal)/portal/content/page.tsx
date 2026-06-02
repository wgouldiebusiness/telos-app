import type { Metadata } from 'next'
import SocialContentPage from '@/agents/social-content/SocialContentPage'

export const metadata: Metadata = { title: 'Content Studio — Telos AI Portal' }

export default function ContentRoute() {
  return <SocialContentPage />
}
