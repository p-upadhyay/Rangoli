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
        simple: there are no accounts, no sign-ups, and no analytics or tracking scripts.
      </p>

      <h2>What this site collects</h2>
      <p>
        Nothing. The site sets no cookies of its own and stores nothing about you.
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
        The song-request form is switched off at the moment. If it comes back, this page will
        say what is stored and for how long before the form collects anything.
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
