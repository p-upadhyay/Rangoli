"use client";

import { useEffect, useRef } from "react";
import { PLAYLIST_ID } from "@/data/playlist";
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

export default function VintageTV() {
  const { on, playing, now, setOn, setPlaying, setNow } = usePlayer();
  const stage = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);

  const live = on && PLAYLIST_ID !== "";

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
        playerVars: { listType: "playlist", list: PLAYLIST_ID, autoplay: 1, rel: 0, playsinline: 1, controls: 0 },
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
  }, [live, setPlaying, setNow]);

  return (
    <div className={`tv-unit ${live ? "is-live" : ""}`}>
      <div className={`tv-shell ${on ? "tv-on" : ""}`}>
        <div className="tv-screen">
          {live ? (
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
        <div className="tv-brand">YAADON</div>
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
