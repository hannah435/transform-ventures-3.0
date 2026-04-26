const CAPABILITIES = {
      group: [
        { t: "First-ever token sale", d: "Launched the first token sale in blockchain history — Mastercoin, 2013. Powered 100+ prominent tokens through the ICO era including Ethereum, EOS, Augur, Bancor, Golem, and WAX." },
        { t: "Crypto media leadership", d: "Regular placements in every leading crypto publication — CoinDesk, Cointelegraph, Decrypt — plus top industry podcasts and YouTube channels." },
        { t: "Tier-1 mainstream coverage", d: "Client stories placed in AP, BBC, Bloomberg, CNBC, Forbes, The New York Times, Reuters, TechCrunch, Wall Street Journal, and WIRED." },
        { t: "Global office network", d: "San Juan HQ with offices in New York, Los Angeles, San Francisco, Las Vegas, and Toronto — the most extensive footprint in crypto PR." },
      ],
      events: [
        { t: "Tokenize conference", d: "A premier blockchain conference exploring the future of tokenization. Global edition." },
        { t: "BitAngels network", d: "World's first crypto angel investor network. Active since 2013." },
        { t: "Tiger Mansion", d: "Invite-only executive gathering for top-tier crypto investors and founders." },
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
      return (
        <Subpage
          eyebrow="Our Ecosystem"
          title="Five divisions. One vision."
          intro="Transform Ventures operates across five specialized divisions — from pioneering crypto PR and blockchain events to venture capital, strategic advisory, and a bitcoin-only hedge fund."
        >
          <section className="d-section">
            <div className="container">
              {DIVISIONS.map((d, i) => (
                <div key={d.key} id={d.key} className="div-block-d reveal-d">
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
                    {CAPABILITIES[d.key].map(c => (
                      <div key={c.t} className="cap">
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
