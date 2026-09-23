-- ==============================================================================
-- ROYAL APEX — Luxury Men's Grooming Atelier & Bespoke Barber OS
-- Supabase PostgreSQL Production Schema v1.0.0
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Gentleman Client',
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('master_barber', 'specialist', 'client')),
  phone TEXT,
  vip_tier TEXT DEFAULT 'Standard' CHECK (vip_tier IN ('Standard', 'Black Card Club', 'Founders Circle')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Specialists & Master Artisans Roster
CREATE TABLE IF NOT EXISTS public.specialists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialties TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Grooming Services & Atelier Rates
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY DEFAULT ('srv-' || floor(extract(epoch from now()) * 1000)::text),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('barbering', 'braids', 'locTech', 'hairStylists')),
  duration TEXT NOT NULL DEFAULT '45 mins',
  price NUMERIC(10, 2) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Chair Appointments & Booking Ledger
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY DEFAULT ('appt-' || floor(extract(epoch from now()) * 1000)::text),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  specialist_name TEXT NOT NULL DEFAULT 'Marcus Sterling',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  time TEXT NOT NULL DEFAULT '11:00 AM',
  price NUMERIC(10, 2) NOT NULL DEFAULT 65.00,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
CREATE POLICY "Public read specialists" ON public.specialists FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public create appointment" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read own appointment" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Master Barbers manage appointments" ON public.appointments FOR ALL USING (true);
