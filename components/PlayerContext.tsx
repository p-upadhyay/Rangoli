"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type PlayerValue = {
  on: boolean;
  playing: boolean;
  /** Title of the current track, or null when nothing is playing. */
  now: string | null;
  setOn: (v: boolean | ((prev: boolean) => boolean)) => void;
  setPlaying: (v: boolean) => void;
  setNow: (v: string | null) => void;
};

const PlayerContext = createContext<PlayerValue | null>(null);

/** Shares one player's state between the TV and the hero copy beside it. */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState<string | null>(null);

  const value = useMemo(
    () => ({ on, playing, now, setOn, setPlaying, setNow }),
    [on, playing, now]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const value = useContext(PlayerContext);
  if (!value) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return value;
}
