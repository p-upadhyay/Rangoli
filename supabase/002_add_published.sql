-- Migration for a project that already ran schema.sql.
-- SQL Editor → New query → paste → Run.
--
-- Adds a moderation flag so one farmaish can be shown on the site, without
-- making every submission world-readable. Nothing appears publicly until you
-- flip published to true yourself in the Table Editor.

alter table public.requests
  add column if not exists published boolean not null default false;

-- Anonymous visitors may read a farmaish only when BOTH gates are open: the
-- sender ticked the consent box, and you marked it published. Two conditions
-- rather than one, so publishing a row whose sender never consented still
-- shows nothing.
drop policy if exists "anon can read published farmaish" on public.requests;
create policy "anon can read published farmaish"
  on public.requests
  for select
  to anon
  using (published = true and consent_to_publish = true);

create index if not exists requests_published_idx
  on public.requests (published, created_at desc);
