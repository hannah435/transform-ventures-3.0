const timeline = [
      { y: "1994", e: "Marketwire Founded", d: "First Internet-based newswire. Backed by Sequoia Capital & Hummer Winblad. Sold to NASDAQ for $200M." },
      { y: "2013", e: "BitAngels & Transform Group", d: "Co-founded the first crypto angel group and launched the original blockchain PR firm. Powered the first-ever token sale (Mastercoin) and 100+ prominent ICO-era tokens including Ethereum, EOS, Augur, Bancor, Golem, Qtum, WAX, and Tether." },
      { y: "2015", e: "Four Seasons of Bitcoin", d: "Michael Terpin developed the Four Seasons model, mapping bitcoin to predictable four-year cycles driven by the halving." },
      { y: "2018", e: "CoinAgenda → Tokenize", d: "Created the leading conference series connecting mainstream investors with blockchain and crypto investments." },
      { y: "2021", e: "Transform Ventures", d: "Consolidated into a full blockchain and AI advisory and venture studio. Five divisions spanning events, capital, strategy, and fund management." },
      { y: "2024", e: "Bitcoin Supercycle Fund", d: "Launched the first liquid bitcoin-only hedge fund using the Four Seasons model and algorithmic trading." },
    ];
    function About(){
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
                  <div className="eyebrow-inline"><span className="d"/>Our Story</div>
                  <h2>The communications powerhouse behind crypto.</h2>
                </div>
                <div className="timeline-d">
                  {timeline.map((t, i) => (
                    <div key={i} className="item">
                      <div className="year">{t.y}</div>
                      <div>
                        <div className="title">{t.e}</div>
                        <div className="desc">{t.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <Stats/>
          <PartnersBar/>
          <CTAStrip/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<About/>);
