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
  published          boolean not null default false,
  created_at         timestamptz not null default now()
);

alter table public.requests enable row level security;

-- Anonymous visitors may submit, but may not publish. `with check (true)` would
-- accept whatever the client sends, letting a submitter set published = true
-- and put their own text on the homepage. Pinning it to false closes that:
-- the column defaults to false and the form never sends it, so ordinary
-- submissions pass and a self-publishing insert is rejected.
drop policy if exists "anon can submit a farmaish" on public.requests;
create policy "anon can submit a farmaish"
  on public.requests
  for insert
  to anon
  with check (published = false);

-- Read access is gated twice: the sender must have ticked the consent box, and
-- you must have marked the row published in the Table Editor. Nothing reaches
-- the site on its own, so a spam submission cannot render itself onto the page.
drop policy if exists "anon can read published farmaish" on public.requests;
create policy "anon can read published farmaish"
  on public.requests
  for select
  to anon
  using (published = true and consent_to_publish = true);

-- Still no update or delete policy: with RLS enabled and no policy for an
-- action, that action is denied.

create index if not exists requests_created_at_idx
  on public.requests (created_at desc);

create index if not exists requests_published_idx
  on public.requests (published, created_at desc);
