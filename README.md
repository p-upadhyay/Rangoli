# Yaadon Ki Rangoli

An unofficial, fan-made nostalgia project: a vintage television that plays
hand-picked playlists of old Hindi film songs. Not affiliated with Doordarshan.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the two Supabase values
npm run dev
```

Open http://localhost:3000. Without `.env.local` the site still runs — the
farmaish form says it is offline and the listener count stays hidden.

## Environment

| Variable | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → Data API. Origin only, no `/rest/v1`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → API Keys. The publishable/anon key. |

Both are `NEXT_PUBLIC_`, so they are compiled into the browser bundle. That is
expected: the anon key is designed to be public and row level security is what
protects the data. Never put the `service_role` / secret key in this project.

## Database

Run the files in `supabase/` in order, in the SQL Editor:

1. `schema.sql` — the table and its policies (this is the full current state)
2. `002_add_published.sql`, `003_lock_published.sql` — only needed for a project
   created before those existed

Anonymous visitors can insert a farmaish and nothing else. They cannot read,
update, or delete, and cannot set `published` on their own row.

## Publishing a farmaish

A submission never appears on the site by itself. To feature one as the
postcard, open Table Editor → `requests` and set `published` to true. It shows
only if the sender also ticked consent — both conditions are required by the
read policy, so publishing a row without consent still displays nothing.

## Changing the music

- `data/playlist.ts` — the default playlist, and the one used for evening and
  night arrivals. Read the comments first: several kinds of YouTube Music
  playlist (Liked Music, auto-generated mixes, radios, Supermix) cannot be
  embedded at all.
- `data/episodes.ts` — the mood buttons. Add `playlistId` to an entry to
  activate it; entries without one render disabled.
- `lib/daypart.ts` — which greeting and which playlist each part of the day gets.

Playlists must be Public or Unlisted, and owned by you.

## Working with the YouTube player

Constraints that shaped the code, worth knowing before changing it:

- **Nothing may be drawn over the player** — no overlays, frames, or scanlines.
  This is why the CRT power-on animation renders *instead of* the player and
  clears before it mounts, and why the paper-grain overlay lifts off the TV
  during playback.
- **The player viewport must be at least 200x200px**, which the mobile
  breakpoint is written to preserve.
- `modestbranding` has had no effect since August 2023. `controls=0` is what
  hides the control bar and the logo it carries.
- `.insert()` is called without a chained `.select()` on purpose. Adding one
  makes the request need read permission, which the insert-only policy denies.

## Share card

`app/opengraph-image.tsx` draws the link preview in code. To use real artwork
instead, delete that file and drop a 1200x630 `opengraph-image.jpg` beside it.
Point `metadataBase` in `app/layout.tsx` at your own domain when you have one.

## Still to do

- Spam hardening. The form inserts straight from the browser, so a direct POST
  bypasses the honeypot. The intended fix is a route handler at `/api/farmaish`
  that validates and rate-limits, then revoking the anon insert policy. Worth
  doing before promoting the site anywhere.
