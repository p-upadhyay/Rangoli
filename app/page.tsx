import Link from "next/link";
import FarmaishForm from "@/components/FarmaishForm";
import FeaturedSong from "@/components/FeaturedSong";
import Greeting from "@/components/Greeting";
import ListenersTicker from "@/components/ListenersTicker";
import LocalTime from "@/components/LocalTime";
import PostcardFarmaish from "@/components/PostcardFarmaish";
import ShareLinks from "@/components/ShareLinks";
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
          <a href="#farmaish">फरमाइश</a>
        </nav>
        <LocalTime />
      </header>

      {/* Wraps both sections: the mood grid drives the TV up in the hero. */}
      <PlayerProvider>
        <section className="hero" id="top">
          <div className="tv-stage"><VintageTV /></div>
          <div className="hero-copy">
            <Greeting />
            <FeaturedSong />
          </div>
        </section>

        <section className="content-wrap memory-section" id="yaadein">
          <div className="section-heading"><div><span className="eyebrow">सुनिए अपने मूड से</span><h2>यादों के रंग</h2></div></div>
          <MoodGrid />
        </section>
      </PlayerProvider>

      <section className="content-wrap farmaish-section" id="farmaish">
        <div className="section-heading"><div><span className="eyebrow">आपकी बारी</span><h2>फरमाइश</h2></div></div>
        <div className="farmaish-grid">
          <FarmaishForm />
          <PostcardFarmaish />
        </div>
      </section>

      <ShareLinks />

      <footer>
        <div className="footer-logo">◉ <strong>Yaadon Ki Rangoli</strong></div>
        <p>दूरदर्शन की यादगार परंपराओं को नमन · An unofficial fan-made nostalgia project. Not affiliated with Doordarshan.</p>
        <ListenersTicker />
        <div>
          <Link href="/privacy">गोपनीयता</Link>
          <Link href="/terms">उपयोग की शर्तें</Link>
          <a href="mailto:chaiaurkahaniyan.official@gmail.com">संपर्क</a>
        </div>
      </footer>
    </main>
  );
}
