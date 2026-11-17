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

-- Live Website Content Management (CMS)
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.site_content enable row level security;

create policy "Allow public read of site content"
  on public.site_content for select to anon, authenticated using (true);

create policy "Allow authenticated editors to insert site content"
  on public.site_content for insert to authenticated with check (true);

create policy "Allow authenticated editors to update site content"
  on public.site_content for update to authenticated using (true) with check (true);

-- Storage bucket for website images (Hero, Training, Congress, Journal)
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "Public read access for site media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-media');

create policy "Authenticated upload access for site media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media');

create policy "Authenticated update access for site media"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-media')
  with check (bucket_id = 'site-media');

-- Course, Symposium & Membership Payment Portal Transactions
create table if not exists public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  invoice_id text not null unique,
  registration_type text not null,
  item_code text not null,
  item_title text not null,
  full_name text not null,
  email text not null,
  phone text default '',
  scfhs_id text default '',
  payment_method text not null,
  subtotal_sar numeric(10, 2) not null,
  discount_sar numeric(10, 2) not null default 0,
  vat_sar numeric(10, 2) not null,
  total_sar numeric(10, 2) not null,
  status text not null check (status in ('Paid', 'Pending SADAD')),
  created_at timestamptz not null default now()
);

alter table public.payment_transactions enable row level security;

create policy "Allow public payment transaction inserts"
  on public.payment_transactions for insert to anon, authenticated with check (true);

create policy "Allow invoice lookup by invoice_id"
  on public.payment_transactions for select to anon, authenticated using (true);
