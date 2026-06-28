-- Migration: allow clients to create their own onboarding briefs
--
-- The client_briefs table had RLS enabled with only a SELECT policy, so the
-- onboarding bot's insert (run with the user's RLS-bound client) was denied.
-- This adds a scoped INSERT policy. Safe to run against the live database; it
-- is idempotent and changes no data.
--
-- Run in the Supabase SQL editor (or `supabase db execute`) once.

alter table client_briefs enable row level security;

drop policy if exists "clients create own briefs" on client_briefs;

create policy "clients create own briefs"
  on client_briefs for insert
  with check (business_id in (
    select id from businesses
    where owner_id = (select id from profiles where user_id = auth.uid())
  ));
