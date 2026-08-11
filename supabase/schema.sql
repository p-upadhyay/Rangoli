-- Yaadon Ki Rangoli — farmaish requests
--
-- Run this once in your Supabase project: SQL Editor → New query → paste → Run.
--
-- Security model: the anon key shipped to the browser is public by design.
-- What keeps submissions private is row level security below. The table gets
-- an INSERT policy and nothing else, so a visitor can send a farmaish but
-- cannot read anyone's — including their own — with that key. Read them in the
-- Supabase dashboard, which uses your privileged credentials.

create table if not exists public.requests (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null check (char_length(name) between 1 and 80),
  city               text not null check (char_length(city) between 1 and 80),
  song               text not null check (char_length(song) between 1 and 160),
  memory             text check (char_length(memory) <= 2000),
  consent_to_publish boolean not null default false,
  created_at         timestamptz not null default now()
);

alter table public.requests enable row level security;

-- Anonymous visitors may submit.
drop policy if exists "anon can submit a farmaish" on public.requests;
create policy "anon can submit a farmaish"
  on public.requests
  for insert
  to anon
  with check (true);

-- Deliberately no select, update or delete policy. With RLS enabled and no
-- policy for an action, that action is denied. Do not add a public select
-- policy unless you also add a moderation flag — otherwise every submission
-- becomes world-readable the moment it is written.

create index if not exists requests_created_at_idx
  on public.requests (created_at desc);
