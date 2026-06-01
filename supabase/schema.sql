-- ============================================================
-- TELOS AI — DATABASE SCHEMA
-- Run in Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- This script drops and recreates all tables cleanly.
-- Safe to run on a fresh project with no client data yet.
-- ============================================================

-- Drop tables in reverse dependency order
drop table if exists change_requests  cascade;
drop table if exists activity_log     cascade;
drop table if exists metrics          cascade;
drop table if exists business_modules cascade;
drop table if exists businesses       cascade;
drop table if exists modules          cascade;
drop table if exists profiles         cascade;

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles: one row per auth user, created automatically by trigger
create table profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade unique not null,
  email       text not null,
  full_name   text,
  role        text not null default 'client',
  created_at  timestamptz default now()
);

-- Businesses: one per client, created during onboarding
create table businesses (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid references profiles(id) on delete cascade,
  name          text not null,
  plan          text default 'starter',
  status        text default 'onboarding',
  industry      text,
  contact_name  text,
  pain_point    text,
  heard_about   text,
  created_at    timestamptz default now()
);

-- Module catalogue (seeded below)
create table modules (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  sort_order  integer default 0
);

-- Modules assigned to each business
create table business_modules (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  module_id   uuid references modules(id),
  active      boolean default true,
  created_at  timestamptz default now(),
  unique(business_id, module_id)
);

-- Monthly metrics per business
create table metrics (
  id                  uuid primary key default gen_random_uuid(),
  business_id         uuid references businesses(id) on delete cascade,
  month               date not null,
  leads_captured      integer default 0,
  admin_hours_saved   integer default 0,
  sales_recovered     numeric(10,2) default 0,
  website_visits      integer default 0,
  unique(business_id, month)
);

-- Activity log
create table activity_log (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  type        text,
  description text,
  created_at  timestamptz default now()
);

-- Change requests from clients
create table change_requests (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  description text not null,
  status      text default 'open',
  created_at  timestamptz default now()
);

-- ============================================================
-- TRIGGER: auto-create profile row when a new user signs up
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'client'
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles         enable row level security;
alter table businesses       enable row level security;
alter table metrics          enable row level security;
alter table activity_log     enable row level security;
alter table change_requests  enable row level security;
alter table business_modules enable row level security;
alter table modules          enable row level security;

-- Profiles: users can read and update their own row
create policy "clients see own profile"
  on profiles for all
  using (auth.uid() = user_id);

-- Businesses: clients can only see their own business
create policy "clients see own business"
  on businesses for all
  using (owner_id = (select id from profiles where user_id = auth.uid()));

-- Metrics: clients can only read their own business metrics
create policy "clients see own metrics"
  on metrics for select
  using (business_id in (
    select id from businesses
    where owner_id = (select id from profiles where user_id = auth.uid())
  ));

-- Activity log: read-only for the owning client
create policy "clients see own activity"
  on activity_log for select
  using (business_id in (
    select id from businesses
    where owner_id = (select id from profiles where user_id = auth.uid())
  ));

-- Change requests: clients can read and create for their own business
create policy "clients manage own requests"
  on change_requests for all
  using (business_id in (
    select id from businesses
    where owner_id = (select id from profiles where user_id = auth.uid())
  ));

-- Business modules: clients can see which modules are assigned
create policy "clients see own modules"
  on business_modules for select
  using (business_id in (
    select id from businesses
    where owner_id = (select id from profiles where user_id = auth.uid())
  ));

-- Modules catalogue: anyone authenticated can read
create policy "anyone reads modules"
  on modules for select
  using (true);

-- ============================================================
-- MODULE SEED DATA
-- ============================================================

insert into modules (name, description, sort_order) values
  ('AI Receptionist',        'Answers calls, takes messages, books appointments, and handles common queries 24/7.',                         1),
  ('Chat Assistant',         'A smart chat widget for your website. Answers questions and captures leads automatically.',                   2),
  ('Pipeline and Follow-Up', 'Keeps your sales pipeline moving. Sends reminders, follow-up messages, and re-engagement sequences.',        3),
  ('Missed-Call Recovery',   'Every missed call triggers an automated SMS or WhatsApp reply to capture the lead.',                         4),
  ('Lead Generation',        'Automated outreach and lead capture across channels. Feeds new enquiries straight into your pipeline.',      5),
  ('Data and Insights',      'Monthly performance reports, KPI tracking, and plain-English summaries of what your automations are doing.', 6),
  ('Conversion Website',     'A fast, conversion-focused website built and maintained for you. Includes SEO and analytics.',                7),
  ('Content and Social',     'Regular social posts and content generated from your business voice and published on your behalf.',           8);
