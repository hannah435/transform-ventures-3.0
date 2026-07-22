const TIMELINE_DEFAULT = [
      { year: "1994", title: "Marketwire Founded", desc: "First Internet-based newswire. Backed by Sequoia Capital & Hummer Winblad. Sold to NASDAQ for $200M." },
      { year: "2013", title: "BitAngels & Transform Group", desc: "Co-founded the first digital asset angel group and launched the original blockchain PR firm. Powered the first-ever token sale (Mastercoin) and 100+ prominent ICO-era tokens including Ethereum, EOS, Augur, Bancor, Golem, Qtum, WAX, and Tether." },
      { year: "2015", title: "Four Seasons of Bitcoin", desc: "Michael Terpin developed the Four Seasons model, mapping bitcoin to predictable four-year cycles driven by the halving." },
      { year: "2018", title: "CoinAgenda → Tokenize", desc: "Created the leading conference series connecting mainstream investors with blockchain and digital asset investments." },
      { year: "2021", title: "Transform Ventures", desc: "Consolidated into a full blockchain and AI advisory and venture studio. Five divisions spanning events, capital, strategy, and fund management." },
      { year: "2024", title: "Bitcoin Supercycle Fund", desc: "Launched the first liquid bitcoin-only hedge fund using the Four Seasons model and algorithmic trading." },
    ];
    function About(){
      const timeline = tvList('timeline', TIMELINE_DEFAULT);
      const story = tvSec('story');
      const team = tvList('team', []);
      const teamHead = tvSec('teamHead');
      const initials = (n) => (n || '?').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
      return (
        <Subpage
          eyebrow="About Transform Ventures"
          title="Three decades of building at the edges of media and money."
          intro="Transform Ventures is the venture platform of Michael Terpin — founder of Marketwire, BitAngels, and Tokenize — operating across five specialized divisions from San Juan, Puerto Rico."
        >
          <section className="d-section">
            <div className="container">
              <div className="about-split reveal-d">
                <div className="intro-col">
                  <div className="eyebrow-inline"><span className="d"/>{story.eyebrow || "Our Story"}</div>
                  <h2>{story.heading || "The communications powerhouse behind digital asset."}</h2>
                </div>
                <div className="timeline-d">
                  {timeline.map((t, i) => (
                    <div key={i} className="item">
                      <div className="year">{t.year}</div>
                      <div>
                        <div className="title">{t.title}</div>
                        <div className="desc">{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {team.length > 0 && (
            <section className="d-section">
              <div className="container">
                <div className="sec-head reveal-d">
                  <div className="eyebrow-inline"><span className="d"/>{teamHead.eyebrow || "Our Team"}</div>
                  <h2>{teamHead.title || "The people behind Transform."}</h2>
                </div>
                <div className="team-grid-d">
                  {team.map((m, i) => (
                    <div key={i} className={`team-card-d reveal-d d${(i%3)+1}`}>
                      <div className="team-photo">
                        {m.photoImg
                          ? <img src={tvImg(m.photoImg)} alt={m.name} loading="lazy" decoding="async"/>
                          : <span className="team-initials">{initials(m.name)}</span>}
                      </div>
                      <h3>{m.name}</h3>
                      <div className="role">{m.role}</div>
                      {m.bio && <p>{m.bio}</p>}
                      {((m.linkedin && m.linkedin !== '#') || (m.x && m.x !== '#')) && (
                        <div className="team-socials">
                          {m.linkedin && m.linkedin !== '#' && <a href={m.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Icon name="linkedin" size={16}/></a>}
                          {m.x && m.x !== '#' && <a href={m.x} target="_blank" rel="noopener" aria-label="X / Twitter"><Icon name="x" size={16}/></a>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          <Stats/>
          <PartnersBar/>
          <CTAStrip/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<About/>);
