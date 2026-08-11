"use client";

import { usePlayer } from "./PlayerContext";
import type { Song } from "@/data/episodes";

/** Shows the live track once the TV is playing, otherwise the curated fallback. */
export default function FeaturedSong({ fallback }: { fallback: Song }) {
  const { now, playing } = usePlayer();

  return (
    <div className="featured-song">
      <div className={`vinyl ${playing ? "is-spinning" : ""}`} aria-hidden="true"><span /></div>
      <div aria-live="polite">
        <div className="section-kicker">{now ? "♪ अभी बज रहा है" : "♪ आज का पहला गीत"}</div>
        {now ? (
          <>
            <h2>{now.title}</h2>
            {now.author && <p>{now.author}</p>}
          </>
        ) : (
          <>
            <h2>{fallback.title}</h2>
            <p>{fallback.film} · {fallback.year}</p>
            <small>{fallback.artists}</small>
          </>
        )}
      </div>
    </div>
  );
}
