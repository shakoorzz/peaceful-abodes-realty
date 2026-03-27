-- Supabase schema for Hybrid Command Center
-- Run in Supabase SQL Editor

-- Enable required extensions
create extension if not exists "pgcrypto";

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'investor',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'investor')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Agent Leads (Lite CRM)
create table if not exists public.agent_leads (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references auth.users(id) on delete cascade,
  lead_name text not null,
  budget text,
  target_area text,
  timeline text,
  stage text not null default 'New',
  next_action text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.agent_leads enable row level security;

create policy "Agent leads readable by owner"
  on public.agent_leads for select
  using (auth.uid() = agent_id);

create policy "Agent leads insertable by owner"
  on public.agent_leads for insert
  with check (auth.uid() = agent_id);

create policy "Agent leads updatable by owner"
  on public.agent_leads for update
  using (auth.uid() = agent_id);

create policy "Agent leads deletable by owner"
  on public.agent_leads for delete
  using (auth.uid() = agent_id);

-- Properties
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  region text not null,
  address text,
  price numeric(12,2),
  unit_count integer,
  projected_roi numeric(5,2),
  investment_heat text,
  status text default 'active',
  image_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.properties enable row level security;

create policy "Properties are readable by authenticated"
  on public.properties for select
  using (auth.role() = 'authenticated');

create policy "Properties are insertable by authenticated"
  on public.properties for insert
  with check (auth.role() = 'authenticated');

create policy "Properties are updatable by owner"
  on public.properties for update
  using (auth.uid() = created_by);

create policy "Properties are deletable by owner"
  on public.properties for delete
  using (auth.uid() = created_by);

-- Property Images
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.property_images enable row level security;

create policy "Property images readable by authenticated"
  on public.property_images for select
  using (auth.role() = 'authenticated');

create policy "Property images insertable by authenticated"
  on public.property_images for insert
  with check (auth.role() = 'authenticated');

create policy "Property images deletable by authenticated"
  on public.property_images for delete
  using (auth.role() = 'authenticated');

-- Transactions
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  status text not null default 'open',
  assigned_to uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Transactions readable by authenticated"
  on public.transactions for select
  using (auth.role() = 'authenticated');

create policy "Transactions insertable by authenticated"
  on public.transactions for insert
  with check (auth.role() = 'authenticated');

create policy "Transactions updatable by authenticated"
  on public.transactions for update
  using (auth.role() = 'authenticated');

-- Transaction Milestones
create table if not exists public.transaction_milestones (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  name text not null,
  status text not null default 'pending',
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.transaction_milestones enable row level security;

create policy "Milestones readable by authenticated"
  on public.transaction_milestones for select
  using (auth.role() = 'authenticated');

create policy "Milestones insertable by authenticated"
  on public.transaction_milestones for insert
  with check (auth.role() = 'authenticated');

create policy "Milestones updatable by authenticated"
  on public.transaction_milestones for update
  using (auth.role() = 'authenticated');

-- Communications Log (Audit Trail)
create table if not exists public.communications_log (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  title text,
  details text,
  created_at timestamptz not null default now()
);

alter table public.communications_log enable row level security;

create policy "Communications log readable by authenticated"
  on public.communications_log for select
  using (auth.role() = 'authenticated');

create policy "Communications log insertable by authenticated"
  on public.communications_log for insert
  with check (auth.role() = 'authenticated');

-- Deep Intel Dossiers
create table if not exists public.dossiers (
  id uuid primary key default gen_random_uuid(),
  zip_code text not null,
  query text,
  summary text,
  raw_json jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.dossiers enable row level security;

create policy "Dossiers readable by authenticated"
  on public.dossiers for select
  using (auth.role() = 'authenticated');

create policy "Dossiers insertable by authenticated"
  on public.dossiers for insert
  with check (auth.role() = 'authenticated');

-- Dossier Exports
create table if not exists public.dossier_exports (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.dossiers(id) on delete cascade,
  pdf_url text,
  emailed_to text,
  created_at timestamptz not null default now()
);

alter table public.dossier_exports enable row level security;

create policy "Dossier exports readable by authenticated"
  on public.dossier_exports for select
  using (auth.role() = 'authenticated');

create policy "Dossier exports insertable by authenticated"
  on public.dossier_exports for insert
  with check (auth.role() = 'authenticated');

-- Storage buckets
insert into storage.buckets (id, name, public)
values ('command-center', 'command-center', false)
on conflict (id) do nothing;

-- Storage policies (authenticated read/write)
create policy "Storage read for authenticated"
  on storage.objects for select
  using (
    auth.role() = 'authenticated'
    and bucket_id = 'command-center'
  );

create policy "Storage write for authenticated"
  on storage.objects for insert
  with check (
    auth.role() = 'authenticated'
    and bucket_id = 'command-center'
  );

create policy "Storage delete for authenticated"
  on storage.objects for delete
  using (
    auth.role() = 'authenticated'
    and bucket_id = 'command-center'
  );
