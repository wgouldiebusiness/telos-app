import OnboardingChat from '@/agents/onboarding-bot/OnboardingChat'

export const metadata = { title: 'Welcome to Telos AI' }

// Full-screen onboarding conversation. Point new clients here after their
// first portal login to capture everything needed to build their first agent.
export default function OnboardingChatPage() {
  return <OnboardingChat />
}
