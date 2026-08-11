"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./PlayerContext";

type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  previousVideo(): void;
  destroy(): void;
  getVideoData(): { title?: string; author?: string };
};

type YTEvent = { target: YTPlayer; data: number };

type YTNamespace = {
  Player: new (
    host: HTMLElement,
    opts: {
      width: string;
      height: string;
      host?: string;
      playerVars: Record<string, string | number>;
      events: { onReady(e: YTEvent): void; onStateChange(e: YTEvent): void };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiReady: Promise<void> | null = null;

function loadPlayerApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (!apiReady) {
    apiReady = new Promise<void>((resolve) => {
      window.onYouTubeIframeAPIReady = () => resolve();
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return apiReady;
}

/** Length of the CRT power-on animation. Must match crt-open in globals.css. */
const WARMUP_MS = 820;

export default function VintageTV() {
  const { on, playing, now, playlistId, setOn, setPlaying, setNow } = usePlayer();
  const [warm, setWarm] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);

  const warming = on && !warm;
  const live = on && warm && playlistId !== "";

  // The tube warming up. Replays on a playlist change too, so switching moods
  // reads as changing channels instead of a black frame while the player rebuilds.
  useEffect(() => {
    if (!on) {
      setWarm(false);
      return;
    }
    setWarm(false);
    // Kick off the API download now so the animation hides real latency
    // rather than being added to it.
    loadPlayerApi();

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setWarm(true);
      return;
    }
    const timer = setTimeout(() => setWarm(true), WARMUP_MS);
    return () => clearTimeout(timer);
  }, [on, playlistId]);

  useEffect(() => {
    if (!live) return;
    let cancelled = false;

    loadPlayerApi().then(() => {
      const YT = window.YT;
      if (cancelled || !YT || !stage.current) return;

      const host = stage.current.appendChild(document.createElement("div"));
      player.current = new YT.Player(host, {
        width: "100%",
        height: "100%",
        host: "https://www.youtube-nocookie.com",
        // controls:0 hides YouTube's control bar (and the logo button it carries);
        // the now-playing bar below the TV drives playback instead. Note it also
        // removes seeking — there is no scrubber in our own controls.
        playerVars: { listType: "playlist", list: playlistId, autoplay: 1, rel: 0, playsinline: 1, controls: 0 },
        events: {
          onReady: (e) => e.target.playVideo(),
          onStateChange: (e) => {
            setPlaying(e.data === YT.PlayerState.PLAYING);
            setNow(e.target.getVideoData().title ?? null);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      player.current?.destroy();
      player.current = null;
      if (stage.current) stage.current.innerHTML = "";
      setPlaying(false);
      setNow(null);
    };
    // playlistId is a dependency: switching moods tears the player down and
    // rebuilds it on the new list, rather than mutating a live player.
  }, [live, playlistId, setPlaying, setNow]);

  return (
    <div className={`tv-unit ${live ? "is-live" : ""}`}>
      <div className={`tv-shell ${on ? "tv-on" : ""}`}>
        <div className="tv-screen">
          {warming ? (
            // Renders instead of the player, never over it — YouTube's terms
            // forbid drawing anything in front of the embed.
            <div className="tv-warmup"><span /></div>
          ) : live ? (
            <div className="tv-video" ref={stage} />
          ) : (
            <>
              <div className="screen-glow" />
              <div className="tv-copy">
                <span className="tv-flower">✺</span>
                <strong>रविवार</strong>
                <span>सुबह 8:00 बजे</span>
                <button onClick={() => setOn((v) => !v)}>{on ? "बंद करें" : "शुरू करें"}</button>
                {on && <small className="tv-hint">data/playlist.ts में playlist ID डालिए</small>}
              </div>
            </>
          )}
        </div>
        <div className="tv-controls"><span /><span /></div>
        <div className="tv-brand">YAADEIN</div>
      </div>

      {live && (
        <div className="tv-nowplaying">
          <div className="np-track">
            <span className="np-label">♪ अभी बज रहा है</span>
            <strong>{now ?? "…"}</strong>
          </div>
          <div className="np-buttons">
            <button onClick={() => player.current?.previousVideo()} aria-label="पिछला गीत">⏮</button>
            <button
              onClick={() => (playing ? player.current?.pauseVideo() : player.current?.playVideo())}
              aria-label={playing ? "रोकें" : "बजाएँ"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button onClick={() => player.current?.nextVideo()} aria-label="अगला गीत">⏭</button>
            <button className="np-off" onClick={() => setOn(false)}>बंद करें</button>
          </div>
        </div>
      )}
    </div>
  );
}
