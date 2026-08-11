import Link from "next/link";
import FeaturedSong from "@/components/FeaturedSong";
import LocalTime from "@/components/LocalTime";
import MoodGrid from "@/components/MoodGrid";
import { PlayerProvider } from "@/components/PlayerContext";
import VintageTV from "@/components/VintageTV";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Yaadon Ki Rangoli home">
          <span className="brand-mark">✺</span>
          <span><small>Yaadon Ki</small><strong>Rangoli</strong><em>पुराने गीत, नई यादें</em></span>
        </a>
        <nav>
          <a href="#yaadein">यादों के रंग</a>
        </nav>
        <LocalTime />
      </header>

      {/* Wraps both sections: the mood grid drives the TV up in the hero. */}
      <PlayerProvider>
        <section className="hero" id="top">
          <div className="tv-stage"><VintageTV /></div>
          <div className="hero-copy">
            <h1>सुप्रभात</h1>
            <p className="lede">Aaj ki subah, kuch purani<br />yaadon ke naam…</p>
            <FeaturedSong />
          </div>
        </section>

        <section className="content-wrap memory-section" id="yaadein">
          <div className="section-heading"><div><span className="eyebrow">सुनिए अपने मूड से</span><h2>यादों के रंग</h2></div></div>
          <MoodGrid />
        </section>
      </PlayerProvider>

      <footer>
        <div className="footer-logo">◉ <strong>Yaadon Ki Rangoli</strong></div>
        <p>दूरदर्शन की यादगार परंपराओं को नमन · An unofficial fan-made nostalgia project. Not affiliated with Doordarshan.</p>
        <div>
          <Link href="/privacy">गोपनीयता</Link>
          <Link href="/terms">उपयोग की शर्तें</Link>
          <a href="mailto:chaiaurkahaniyan.official@gmail.com">संपर्क</a>
        </div>
      </footer>
    </main>
  );
}
