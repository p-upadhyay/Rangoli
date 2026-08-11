"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type NowPlaying = { title: string; author: string };

type PlayerValue = {
  on: boolean;
  playing: boolean;
  now: NowPlaying | null;
  count: number;
  setOn: (v: boolean | ((prev: boolean) => boolean)) => void;
  setPlaying: (v: boolean) => void;
  setNow: (v: NowPlaying | null) => void;
  setCount: (v: number) => void;
};

const PlayerContext = createContext<PlayerValue | null>(null);

/** Shares one player's state between the TV and the hero copy beside it. */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState<NowPlaying | null>(null);
  const [count, setCount] = useState(0);

  const value = useMemo(
    () => ({ on, playing, now, count, setOn, setPlaying, setNow, setCount }),
    [on, playing, now, count]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const value = useContext(PlayerContext);
  if (!value) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return value;
}
