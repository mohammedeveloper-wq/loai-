-- Optional SQL schema for Saudi Heart Association portal tables
-- Run in your Supabase SQL Editor to back the forms and certificate lookup.

create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  tier_id text not null,
  full_name text not null,
  scfhs_id text not null,
  institution text default '',
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.congress_registrations (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  delegate_pass text not null,
  full_name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ncpr_course_reservations (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  course_code text not null,
  center_code text not null,
  center_name text not null,
  session_date text not null,
  trainee_name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.ncpr_certificates (
  id text primary key,
  holder_name_en text not null,
  holder_name_ar text not null,
  course text not null,
  center_en text not null,
  center_ar text not null,
  issued_date date not null,
  expiry_date date not null,
  status text not null check (status in ('Valid', 'Renewal Due'))
);

-- Enable Row Level Security (RLS)
alter table public.membership_applications enable row level security;
alter table public.congress_registrations enable row level security;
alter table public.ncpr_course_reservations enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.ncpr_certificates enable row level security;

-- Public anon policies (insert-only for public submissions, read-only for certificate verification)
create policy "Allow public membership application inserts"
  on public.membership_applications for insert to anon, authenticated with check (true);

create policy "Allow public congress registration inserts"
  on public.congress_registrations for insert to anon, authenticated with check (true);

create policy "Allow public course reservation inserts"
  on public.ncpr_course_reservations for insert to anon, authenticated with check (true);

create policy "Allow public newsletter subscription inserts"
  on public.newsletter_subscribers for insert to anon, authenticated with check (true);

create policy "Allow public certificate verification lookup"
  on public.ncpr_certificates for select to anon, authenticated using (true);
