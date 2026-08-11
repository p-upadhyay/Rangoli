"use client";

import { usePlayer } from "./PlayerContext";

/**
 * Three states: idle invites you to start, connecting covers the gap while the
 * YouTube API loads and buffers, playing shows the live title. The hero never
 * names a track it cannot guarantee will play.
 */
export default function FeaturedSong() {
  const { on, playing, now } = usePlayer();
  const connecting = on && !now;

  return (
    <div className="featured-song">
      <div
        className={`vinyl ${playing ? "is-spinning" : ""} ${connecting ? "is-waking" : ""}`}
        aria-hidden="true"
      >
        <span />
      </div>
      <div aria-live="polite">
        <div className="section-kicker">
          {now ? "♪ अभी बज रहा है" : connecting ? "♪ जुड़ रहे हैं…" : "♪ आज की रंगोली"}
        </div>
        {now ? (
          <h2>{now}</h2>
        ) : connecting ? (
          <h2 className="song-pending">एक पल…</h2>
        ) : (
          <>
            <h2>टीवी चालू कीजिए</h2>
            <p>रविवार सुबह की रंगोली</p>
          </>
        )}
      </div>
    </div>
  );
}
