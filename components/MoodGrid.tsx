"use client";

import { memories } from "@/data/episodes";
import { usePlayer } from "./PlayerContext";

/** Each mood swaps the playlist loaded in the TV. Moods with no playlist yet are inert. */
export default function MoodGrid() {
  const { playlistId, setPlaylistId, setOn } = usePlayer();

  function pick(id: string) {
    setPlaylistId(id);
    setOn(true);
    // The TV lives up in the hero, so bring it back into view.
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="memory-grid">
      {memories.map((mood) => {
        const ready = Boolean(mood.playlistId);
        const active = ready && mood.playlistId === playlistId;

        return (
          <button
            key={mood.title}
            type="button"
            className={active ? "is-active" : ""}
            disabled={!ready}
            aria-pressed={active}
            title={ready ? undefined : "यह प्लेलिस्ट अभी तैयार नहीं है"}
            onClick={() => mood.playlistId && pick(mood.playlistId)}
          >
            <span>{mood.icon}</span>
            {mood.title}
          </button>
        );
      })}
    </div>
  );
}
