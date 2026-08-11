"use client";

import { usePlayer } from "./PlayerContext";

/** Falls back to the curated count until the player reports the real one. */
export default function EpisodeMeta({ fallbackCount }: { fallbackCount: number }) {
  const { count } = usePlayer();

  return (
    <div className="episode-meta">
      <span>रविवार</span>
      <span>8:00 AM IST</span>
      <span>{count || fallbackCount} चुने हुए गीत</span>
    </div>
  );
}
