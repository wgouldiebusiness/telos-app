import type { Metadata } from 'next'
import LoginForm from '@/app/(marketing)/login/LoginForm'

export const metadata: Metadata = {
  title: 'Log In | Telos Media',
  description: 'Sign in to your Telos members room to view your dashboard, reports, and requests.',
}

export default function MediaLoginPage() {
  return <LoginForm logoAccent="#00D4B4" />
}
