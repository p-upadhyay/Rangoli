import FarmaishForm from "@/components/FarmaishForm";
import VintageTV from "@/components/VintageTV";
import { memories, songs } from "@/data/episodes";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Yaadon Ki Rangoli home">
          <span className="brand-mark">✺</span>
          <span><small>Yaadon Ki</small><strong>Rangoli</strong><em>पुराने गीत, नई यादें</em></span>
        </a>
        <nav>
          <a href="#archive">पिछले रविवार</a>
          <a href="#farmaish">फरमाइश</a>
          <a href="#yaadein">यादों के रंग</a>
        </nav>
        <div className="morning-time"><span>☀</span><strong>8:00 AM</strong><small>Sunday ritual</small></div>
      </header>

      <section className="hero" id="top">
        <div className="tv-stage"><VintageTV /></div>
        <div className="hero-copy">
          <div className="sunline">रविवार की सुबह ☀</div>
          <h1>सुप्रभात</h1>
          <p className="lede">Aaj ki subah, kuch purani<br />yaadon ke naam…</p>
          <div className="episode-meta"><span>रविवार</span><span>8:00 AM IST</span><span>8 चुने हुए गीत</span></div>
          <div className="featured-song">
            <div className="vinyl" aria-hidden="true"><span /></div>
            <div>
              <div className="section-kicker">♪ आज का पहला गीत</div>
              <h2>{songs[0].title}</h2>
              <p>{songs[0].film} · {songs[0].year}</p>
              <small>{songs[0].artists}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap two-column" id="farmaish">
        <FarmaishForm />
        <aside className="letter-card">
          <span className="postmark">इस हफ्ते की फरमाइश</span>
          <blockquote>“Kahin Door Jab Din Dhal Jaye… Papa used to play this on Sunday mornings.”</blockquote>
          <p>— Pankaj, Seattle</p>
          <div className="stamp">यादें<br />₹ 1</div>
        </aside>
      </section>

      <section className="content-wrap memory-section" id="yaadein">
        <div className="section-heading"><div><span className="eyebrow">सुनिए अपने मूड से</span><h2>यादों के रंग</h2></div></div>
        <div className="memory-grid">
          {memories.map(([icon, title]) => <button key={title}><span>{icon}</span>{title}</button>)}
        </div>
      </section>

      <section className="content-wrap archive" id="archive">
        <div>
          <span className="eyebrow">पिछले रविवार</span>
          <h2>हर रविवार, एक नई याद</h2>
          <p>Weekly episodes can live here as simple data files at first, then move to a small CMS when the archive grows.</p>
        </div>
        <div className="archive-cards">
          <article><b>03 AUG</b><span>Monsoon Special</span><small>बारिश, चाय और 8 सदाबहार गीत</small></article>
          <article><b>27 JUL</b><span>Rafi Sahab</span><small>एक सुबह मोहम्मद रफ़ी के नाम</small></article>
          <article><b>20 JUL</b><span>Gulzar Morning</span><small>अल्फ़ाज़ जो रविवार को धीमा कर दें</small></article>
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
