// ─────────────────────────────────────────────────────────────
// POST /api/onboarding-bot — save a new client's onboarding brief.
//
// The chat steps through the questions client-side; when complete it posts
// the collected answers here. We verify the logged-in user, have Claude
// turn the answers into a clean structured brief, save it to Supabase, and
// mark the business active.
//
// Security: the user must be authenticated; the brief is saved only for
// their own business (looked up from their session).
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { askClaude } from '@/agents/shared/claude'
import { onboardingQuestions } from '@/agents/onboarding-bot/questions'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 })
  }

  let body: { answers?: Record<string, string> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const rawAnswers = body.answers ?? {}
  if (Object.keys(rawAnswers).length === 0) {
    return NextResponse.json({ error: 'No answers provided.' }, { status: 400 })
  }

  // Only retain answers for known question fields — reject arbitrary keys.
  const allowedFields = new Set(onboardingQuestions.map(q => q.field))
  const MAX_ANSWER_LENGTH = 2000
  const answers: Record<string, string> = {}
  for (const field of allowedFields) {
    const val = rawAnswers[field]
    if (typeof val === 'string' && val.trim()) {
      answers[field] = val.slice(0, MAX_ANSWER_LENGTH)
    }
  }
  if (Object.keys(answers).length === 0) {
    return NextResponse.json({ error: 'No valid answers provided.' }, { status: 400 })
  }

  // Find this user's business.
  const { data: profile } = await supabase
    .from('profiles').select('id').eq('user_id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 })

  const { data: business } = await supabase
    .from('businesses').select('id').eq('owner_id', profile.id).single()
  if (!business) return NextResponse.json({ error: 'Business not found.' }, { status: 404 })

  // Have Claude tidy the raw answers into a clean brief (a short summary plus
  // the structured fields). Claude only formats; it never invents facts.
  const answerText = onboardingQuestions
    .map(q => `${q.question}\nAnswer: ${answers[q.field] ?? '(not provided)'}`)
    .join('\n\n')

  let summary = ''
  try {
    summary = await askClaude({
      system: 'You turn a business owner\'s onboarding answers into a tidy one-paragraph brief for the team that will build their AI agent. British English. No em dashes. Do not invent anything not in the answers. Keep it under 100 words.',
      messages: [{ role: 'user', content: answerText }],
      maxTokens: 300,
    })
  } catch {
    summary = 'Brief captured. Summary generation was unavailable; raw answers are saved.'
  }

  const brief = { summary, fields: answers }

  const { error: saveError } = await supabase
    .from('client_briefs')
    .insert({ business_id: business.id, brief })

  if (saveError) {
    console.error('[onboarding-bot] save error:', saveError.message)
    return NextResponse.json({ error: 'Could not save your brief.' }, { status: 500 })
  }

  // Mark onboarding complete.
  await supabase.from('businesses').update({ status: 'active' }).eq('id', business.id)

  return NextResponse.json({ ok: true, summary })
}
