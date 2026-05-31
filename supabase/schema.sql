-- Telos AI — Supabase Schema
-- Run this entire file in the Supabase SQL editor (Database > SQL Editor > New query)

-- ============================================================
-- TABLES
-- ============================================================

-- Businesses (one per client account)
CREATE TABLE IF NOT EXISTS public.businesses (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT NOT NULL,
  industry        TEXT,
  size            TEXT,
  goals           TEXT,
  plan            TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'growth', 'pro')),
  status          TEXT NOT NULL DEFAULT 'active'  CHECK (status IN ('active', 'paused', 'cancelled')),
  stripe_customer_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles (extends auth.users — one row per user)
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email               TEXT NOT NULL,
  full_name           TEXT,
  phone               TEXT,
  role                TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  business_id         UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Modules (master list of automation modules)
CREATE TABLE IF NOT EXISTS public.modules (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  category    TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Business modules (which modules are assigned to which business)
CREATE TABLE IF NOT EXISTS public.business_modules (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  module_id   UUID NOT NULL REFERENCES public.modules(id)   ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused')),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id, module_id)
);

-- Metrics (performance data per business)
CREATE TABLE IF NOT EXISTS public.metrics (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id  UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  metric_name  TEXT NOT NULL,
  metric_value NUMERIC,
  metric_label TEXT,
  recorded_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Leads (sales pipeline entries per business)
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name        TEXT,
  source      TEXT,
  status      TEXT,
  value       NUMERIC,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Requests (client change requests / support tickets)
CREATE TABLE IF NOT EXISTS public.requests (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT NOT NULL DEFAULT 'open'   CHECK (status IN ('open', 'in_progress', 'resolved')),
  priority    TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Invoices
CREATE TABLE IF NOT EXISTS public.invoices (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id       UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  amount            NUMERIC NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'GBP',
  status            TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date          DATE,
  stripe_invoice_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ============================================================
-- TRIGGER: auto-create profile row when a new user signs up
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices        ENABLE ROW LEVEL SECURITY;

-- Profiles: each user manages their own row only
CREATE POLICY "own profile select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Businesses: user can select/update if their profile points to this business
CREATE POLICY "own business select" ON public.businesses FOR SELECT USING (
  id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);
CREATE POLICY "own business insert" ON public.businesses FOR INSERT WITH CHECK (true);
CREATE POLICY "own business update" ON public.businesses FOR UPDATE USING (
  id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);

-- Modules: readable by all authenticated users
CREATE POLICY "modules readable" ON public.modules FOR SELECT USING (auth.uid() IS NOT NULL);

-- Business modules, metrics, leads, requests, invoices: own business only
CREATE POLICY "own business_modules" ON public.business_modules FOR SELECT USING (
  business_id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "own metrics" ON public.metrics FOR SELECT USING (
  business_id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "own leads" ON public.leads FOR SELECT USING (
  business_id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "own requests select" ON public.requests FOR SELECT USING (
  business_id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);
CREATE POLICY "own requests insert" ON public.requests FOR INSERT WITH CHECK (
  business_id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "own invoices" ON public.invoices FOR SELECT USING (
  business_id IN (SELECT business_id FROM public.profiles WHERE id = auth.uid())
);


-- ============================================================
-- SEED: module library
-- ============================================================

INSERT INTO public.modules (name, description, category) VALUES
  ('Lead Capture Automation',     'Automatically capture and qualify inbound leads from your website and social channels.', 'Sales'),
  ('Appointment Scheduling',      'Automated booking system that syncs with your calendar and sends confirmations.', 'Admin'),
  ('Client Onboarding Flow',      'Step-by-step onboarding sequences delivered automatically after sign-up or purchase.', 'Admin'),
  ('Invoice and Payment Chasing', 'Automated reminders for outstanding invoices, reducing time chasing payments.', 'Finance'),
  ('Review Request Sequence',     'Post-service sequences that request Google or Trustpilot reviews at the right moment.', 'Marketing'),
  ('AI Receptionist',             'Handles inbound enquiries by phone or web chat, qualifies leads, and routes them.', 'Sales'),
  ('Reporting Dashboard',         'Weekly automated performance reports delivered to your inbox.', 'Analytics'),
  ('Email Follow-Up Sequences',   'Multi-step nurture sequences for leads who have not yet converted.', 'Sales')
ON CONFLICT DO NOTHING;
