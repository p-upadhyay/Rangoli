import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "उपयोग की शर्तें — Yaadon Ki Rangoli",
  description: "An unofficial fan project. What it is, and whose the music is.",
};

export default function Terms() {
  return (
    <main className="content-wrap legal">
      <Link className="legal-back" href="/">← Yaadon Ki Rangoli</Link>
      <h1>उपयोग की शर्तें</h1>
      <p className="legal-updated">Last updated 11 August 2026</p>

      <p>
        Yaadon Ki Rangoli is an unofficial, fan-made project celebrating the ritual of
        Sunday-morning Hindi film songs. It is not affiliated with, endorsed by, or connected to
        Doordarshan, Prasar Bharati, YouTube, or Google.
      </p>

      <h2>Music and rights</h2>
      <p>
        We host no audio or video. Every song plays through YouTube&apos;s official embedded
        player, and all rights in the recordings, compositions, and artwork stay with their
        owners. The playlists are personal selections, shared for listening only.
      </p>
      <p>
        If you hold rights to something reachable from here and would like it removed, write to
        us and it will be taken down.
      </p>

      <h2>Availability</h2>
      <p>
        The site is offered as-is, with no guarantee that it stays available or that any
        particular song keeps playing — uploaders can remove or restrict videos at any time, and
        a playlist may simply skip past them.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:chaiaurkahaniyan.official@gmail.com">chaiaurkahaniyan.official@gmail.com</a>
      </p>

      <p className="legal-updated">
        See also <Link href="/privacy">गोपनीयता</Link>.
      </p>
    </main>
  );
}
