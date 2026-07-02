-- Migration: waitlist signups table
--
-- Stores homepage waitlist / demo-request signups. All writes happen
-- server-side with the service-role key (see src/app/actions/waitlist.ts),
-- which bypasses RLS. RLS is enabled with NO public policies, so the anon /
-- public key can neither read nor write this table directly.
--
-- Safe to run against the live database; it is idempotent and changes no data.
-- Run in the Supabase SQL editor (or `supabase db execute`) once.

create table if not exists waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  name       text,
  business   text,
  source     text not null default 'homepage',
  created_at timestamptz not null default now()
);

-- One row per email (case-insensitive). A repeat signup is treated as a
-- success in the app layer rather than creating a duplicate row.
create unique index if not exists waitlist_email_unique
  on waitlist (lower(email));

alter table waitlist enable row level security;
-- Intentionally no policies: only the service role (server-side) may
-- read or write. The public/anon key is denied by default.
