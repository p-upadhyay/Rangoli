import FeaturedSong from "@/components/FeaturedSong";
import { PlayerProvider } from "@/components/PlayerContext";
import VintageTV from "@/components/VintageTV";
import { memories } from "@/data/episodes";

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
        <div className="morning-time"><span>☀</span><strong>8:00 AM</strong><small>Sunday ritual</small></div>
      </header>

      <PlayerProvider>
        <section className="hero" id="top">
          <div className="tv-stage"><VintageTV /></div>
          <div className="hero-copy">
            <h1>सुप्रभात</h1>
            <p className="lede">Aaj ki subah, kuch purani<br />yaadon ke naam…</p>
            <FeaturedSong />
          </div>
        </section>
      </PlayerProvider>

      <section className="content-wrap memory-section" id="yaadein">
        <div className="section-heading"><div><span className="eyebrow">सुनिए अपने मूड से</span><h2>यादों के रंग</h2></div></div>
        <div className="memory-grid">
          {memories.map(([icon, title]) => <button key={title}><span>{icon}</span>{title}</button>)}
        </div>
      </section>

      <footer>
        <div className="footer-logo">◉ <strong>Yaadon Ki Rangoli</strong></div>
        <p>दूरदर्शन की यादगार परंपराओं को नमन · An unofficial fan-made nostalgia project. Not affiliated with Doordarshan.</p>
        <div><a href="#">गोपनीयता</a><a href="#">उपयोग की शर्तें</a><a href="mailto:hello@example.com">संपर्क</a></div>
      </footer>
    </main>
  );
}
