"use client";

import { RAIN_PLAYLIST_ID } from "@/data/playlist";
import { usePlayer } from "./PlayerContext";

/**
 * Rain while the baarish playlist is on.
 *
 * Sits at z-index 19 — under the paper grain at 20 and under the live TV at 21,
 * which .tv-unit.is-live already lifts. So it never draws across the YouTube
 * player, which the embed terms forbid. It falls everywhere else on the page.
 */
export default function RainOverlay() {
  const { on, playlistId } = usePlayer();

  if (!on || playlistId !== RAIN_PLAYLIST_ID) return null;

  return (
    <div className="rain" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}
