# Yaadon Ki Rangoli

A responsive Next.js starter for an unofficial Sunday-morning Hindi film-song nostalgia project.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Create a new GitHub repository and push this folder.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the default Next.js build settings and deploy.
4. Add a custom domain when ready.

## Before public launch

- Replace the demo song cards with links/embeds from official or licensed sources.
- Connect `FarmaishForm.tsx` to Supabase or another backend.
- Replace the sample `hello@example.com` contact address.
- Add privacy/terms pages if you store submissions.
- Keep the site clearly marked as an unofficial fan-made nostalgia project.

## Suggested data model later

`episodes`: id, air_date, title, intro, status

`songs`: id, episode_id, title, film, year, artists, mood, official_url, order

`requests`: id, name, city, song, memory, consent_to_publish, created_at

## Design reference

`public/homepage-reference.png` contains the visual concept used while building this starter.
