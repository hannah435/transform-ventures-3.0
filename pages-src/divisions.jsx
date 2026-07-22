const CAPABILITIES = {
      group: [
        { t: "First-ever token sale", d: "Launched the first token sale in blockchain history — Mastercoin, 2013. Powered 100+ prominent tokens through the ICO era including Ethereum, EOS, Augur, Bancor, Golem, and WAX." },
        { t: "Digital Asset media leadership", d: "Regular placements in every leading digital asset publication — CoinDesk, Cointelegraph, Decrypt — plus top industry podcasts and YouTube channels." },
        { t: "Tier-1 mainstream coverage", d: "Client stories placed in AP, BBC, Bloomberg, CNBC, Forbes, The New York Times, Reuters, TechCrunch, Wall Street Journal, and WIRED." },
        { t: "Global office network", d: "San Juan HQ with offices in New York, Los Angeles, San Francisco, Las Vegas, and Toronto — the most extensive footprint in digital asset PR." },
      ],
      events: [
        { t: "Tokenize conference", d: "A premier blockchain conference exploring the future of tokenization. Global edition." },
        { t: "BitAngels network", d: "World's first digital asset angel investor network. Active since 2013." },
        { t: "Tiger Mansion", d: "Invite-only executive gathering for top-tier digital asset investors and founders." },
        { t: "CoinAgenda legacy", d: "Predecessor conference series connecting mainstream investors with blockchain deals." },
      ],
      capital: [
        { t: "Strategic investments", d: "Direct investments into high-potential blockchain protocols and applications." },
        { t: "Long-term conviction", d: "Patient capital with deep understanding of market cycles and adoption curves." },
        { t: "Ecosystem access", d: "Portfolio companies gain access to the full Transform Ventures ecosystem." },
        { t: "Hands-on support", d: "Active guidance on go-to-market, partnerships, and scaling." },
      ],
      strategies: [
        { t: "Token launch strategy", d: "End-to-end advisory on token design, distribution, and launch execution for maximum market impact." },
        { t: "Go-to-market planning", d: "Strategic positioning, messaging, and market entry plans tailored to the blockchain landscape." },
        { t: "Ecosystem development", d: "Building partnerships, community, and network effects for sustainable project growth." },
        { t: "Investor relations", d: "Connecting projects with the right capital partners and managing ongoing investor communications." },
      ],
      fund: [
        { t: "Four Seasons of Bitcoin", d: "Cycle model mapping BTC to predictable halving-driven phases: spring, summer, fall, winter." },
        { t: "Algorithmic trading", d: "Season-specific strategies executed algorithmically — sell near cycle peaks, buy near bottoms." },
        { t: "Bitcoin-only mandate", d: "100% concentrated in bitcoin — no altcoins, no distractions." },
        { t: "Institutional rails", d: "Coinbase Prime custody. NAV Fund Services administration. Regulated structure." },
      ],
    };

    const DIV_HREFS = {
      group: "division-group.html",
      events: "division-events.html",
      capital: "division-capital.html",
      strategies: "division-strategies.html",
      fund: "division-fund.html",
    };

    function DivisionsPage(){
      const BLOCKS_DEFAULT = DIVISIONS.map(d => {
        const c = CAPABILITIES[d.key] || [];
        return { key: d.key, num: d.num, badge: d.badge, name: d.name, color: d.color, desc: d.desc,
          cap1t: c[0]&&c[0].t, cap1d: c[0]&&c[0].d, cap2t: c[1]&&c[1].t, cap2d: c[1]&&c[1].d,
          cap3t: c[2]&&c[2].t, cap3d: c[2]&&c[2].d, cap4t: c[3]&&c[3].t, cap4d: c[3]&&c[3].d };
      });
      const blocks = tvList('blocks', BLOCKS_DEFAULT);
      const capsOf = (b) => [[b.cap1t,b.cap1d],[b.cap2t,b.cap2d],[b.cap3t,b.cap3d],[b.cap4t,b.cap4d]].filter(x => x[0]).map(x => ({ t: x[0], d: x[1] }));
      return (
        <Subpage
          eyebrow="Our Ecosystem"
          title="Five divisions. One vision."
          intro="Transform Ventures operates across five specialized divisions — from pioneering digital asset PR and blockchain events to venture capital, strategic advisory, and a bitcoin-only hedge fund."
        >
          <section className="d-section">
            <div className="container">
              {blocks.map((d, i) => (
                <div key={i} id={d.key} className="div-block-d reveal-d">
                  <div className="lead">
                    <div className="badge-d" style={{color: d.color}}>/ {d.num} — {d.badge}</div>
                    <h2>{d.name}</h2>
                    <p>{d.desc}</p>
                    <div className="n-swatch" style={{background: d.color}}>{d.num}</div>
                    <div style={{marginTop: 24}}>
                      <a href={DIV_HREFS[d.key]} className="btn-outline">Learn more →</a>
                    </div>
                  </div>
                  <div className="cap-grid">
                    {capsOf(d).map((c, j) => (
                      <div key={j} className="cap">
                        <div className="t">{c.t}</div>
                        <div className="d">{c.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <CTAStrip/>
        </Subpage>
      );
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<DivisionsPage/>);
