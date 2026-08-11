import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "गोपनीयता — Yaadon Ki Rangoli",
  description: "What this site collects, and what YouTube collects when you press play.",
};

export default function Privacy() {
  return (
    <main className="content-wrap legal">
      <Link className="legal-back" href="/">← Yaadon Ki Rangoli</Link>
      <h1>गोपनीयता</h1>
      <p className="legal-updated">Last updated 11 August 2026</p>

      <p>
        Yaadon Ki Rangoli is an unofficial, fan-made nostalgia project. It is deliberately
        simple: there are no accounts and no sign-ups, and nothing here follows you around the
        web.
      </p>

      <h2>What this site collects</h2>
      <p>
        Visitor counts, through Vercel Analytics. It records which pages were opened, roughly
        where in the world from, and what kind of device — all in aggregate, so we can tell that
        a Sunday was busy without knowing who was listening.
      </p>
      <p>
        It is cookieless: no cookies are set for analytics, nothing is kept in your browser&apos;s
        storage, and you are not tracked across other sites. We build no profile of you and sell
        nothing to anyone.
      </p>

      <h2>Music playback</h2>
      <p>
        Songs play through YouTube&apos;s embedded player. We host no audio or video files.
        Nothing loads from YouTube until you press play.
      </p>
      <p>
        Once playback starts, YouTube receives your IP address and device information and may
        set cookies in your browser. That happens under Google&apos;s privacy policy rather than
        this one. The player is loaded from <code>youtube-nocookie.com</code>, YouTube&apos;s
        privacy-enhanced host, which holds off on cookies until you actually play something.
      </p>

      <h2>Hosting</h2>
      <p>
        The pages are static. Whoever hosts them may keep ordinary server logs — IP address,
        timestamp, page requested — for security and reliability.
      </p>

      <h2>Farmaish requests</h2>
      <p>
        If you send a farmaish, we store exactly what you typed into the form: your name, your
        city, the song you asked for, and the memory you chose to write. Nothing else — no IP
        address, no email, no account. It is kept in a Supabase database and read only by the
        person running this site.
      </p>
      <p>
        Your memory is not published anywhere unless you tick the box saying it may be. Leaving
        it unticked still sends us the farmaish; it just stays private.
      </p>
      <p>
        Want yours removed? Write to the address below with the name and city you used and it
        will be deleted.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:chaiaurkahaniyan.official@gmail.com">chaiaurkahaniyan.official@gmail.com</a>
      </p>

      <p className="legal-updated">
        See also <Link href="/terms">उपयोग की शर्तें</Link>.
      </p>
    </main>
  );
}
