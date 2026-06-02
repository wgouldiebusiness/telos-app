// The onboarding question sequence. Each maps to a field in the saved brief.
// Edit the wording here in one place.

export interface OnboardingQuestion {
  field: string
  question: string
}

export const onboardingQuestions: OnboardingQuestion[] = [
  { field: 'businessName',    question: 'What is the name of your business?' },
  { field: 'businessType',    question: 'What type of business is it? For example, a clinic, a salon, a trade business.' },
  { field: 'services',        question: 'What services do you offer? List them and I will note them all down.' },
  { field: 'openingHours',    question: 'What are your opening hours?' },
  { field: 'commonQuestions', question: 'What questions do customers ask you most often?' },
  { field: 'tone',            question: 'How would you describe your business tone? Professional and formal, friendly and warm, or relaxed and casual?' },
  { field: 'mainProblem',     question: 'What is the main thing you want your AI agent to handle for you?' },
  { field: 'anythingElse',    question: 'Is there anything else your agent should know about your business?' },
]
