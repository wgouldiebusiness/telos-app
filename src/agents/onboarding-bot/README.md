# Client Onboarding Bot

Walks a new client through a friendly chat that captures everything needed to
build their first agent: business name, services, tone, hours, common
questions, and what they want the agent to handle. Saves a structured brief to
Supabase and marks the business active.

## Where it lives

- Full-screen chat: `/onboarding/chat` (renders `OnboardingChat`).
- Save endpoint: `POST /api/onboarding-bot`.
- Questions: `questions.ts` (edit wording in one place).

Point new clients to `/onboarding/chat` after their first portal login. On
completion they are told William will begin within one working day, then sent to
the dashboard.

## Setup

Run the updated `supabase/schema.sql` (adds `client_briefs`). The save endpoint
is authenticated: it only writes a brief for the logged-in user's own business.
Claude tidies the answers into a short summary but never invents facts.
