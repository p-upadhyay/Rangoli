-- SECURITY FIX. Run this in the SQL Editor.
--
-- 002 added a `published` flag as a moderation gate, but the insert policy
-- from schema.sql used `with check (true)` — which accepts whatever column
-- values the client sends, `published` included. An anonymous submitter could
-- POST published = true and consent_to_publish = true and have their text
-- render on the homepage without anyone approving it. Verified against the
-- live project, not theoretical.
--
-- The fix pins published to false on insert. The column defaults to false and
-- the form never sends it, so ordinary submissions are unaffected; an insert
-- that tries to claim published = true is now rejected outright.

drop policy if exists "anon can submit a farmaish" on public.requests;
create policy "anon can submit a farmaish"
  on public.requests
  for insert
  to anon
  with check (published = false);

-- Publishing stays a privileged action: there is no update policy for anon, so
-- the flag can only be set from the dashboard.
