// Division detail page — shared template

const DIVISION_DATA = {
  group: {
    num: "01", name: "Transform Group", tag: "Communications & PR",
    color: "#6D4AFF",
    tagline: "The communications powerhouse behind crypto.",
    lead: "Founded by Michael Terpin — known as the 'Godfather of Crypto' (CNBC) — Transform Group is the pioneering blockchain and Web3 PR agency with 400+ clients since 2013, including the launches of Ethereum and Tether.",
    capabilities: [
      { t: "Token launch PR", d: "Strategic positioning and media rollout for token launches, with 400+ client launches since 2013." },
      { t: "Crypto media relations", d: "Deep relationships across CoinDesk, The Block, Decrypt, and mainstream financial media." },
      { t: "Thought leadership", d: "Building founder voice through op-eds, podcasts, and keynote placements." },
      { t: "Crisis communications", d: "Crypto-native response playbooks for exchange incidents, depegs, and regulatory inquiries." },
    ],
    stats: [["400+","Clients Since 2013"],["2013","Agency Founded"],["Ethereum","Launch Client"],["Tether","Launch Client"]],
  },
  events: {
    num: "02", name: "Transform Events", tag: "Tokenize · BitAngels · Tiger Mansion",
    color: "#0FB5A5",
    tagline: "Where the industry connects.",
    lead: "Premier blockchain events including Tokenize, BitAngels, and Tiger Mansion — connecting founders and investors worldwide through curated conferences and intimate gatherings.",
    capabilities: [
      { t: "Tokenize conference", d: "A premier blockchain conference exploring the future of tokenization. Global edition." },
      { t: "BitAngels network", d: "World's first crypto angel investor network. Active since 2013." },
      { t: "Tiger Mansion", d: "Invite-only executive gathering for top-tier crypto investors and founders." },
      { t: "CoinAgenda legacy", d: "Predecessor conference series connecting mainstream investors with blockchain deals." },
    ],
    stats: [["2013","BitAngels Founded"],["Global","Tokenize Reach"],["Invite Only","Tiger Mansion"],["10+","Years of Events"]],
  },
  capital: {
    num: "03", name: "Transform Capital", tag: "Family Office",
    color: "#F7931A",
    tagline: "Michael Terpin's family office.",
    lead: "Deploying strategic capital into blockchain protocols, DeFi infrastructure, and crypto projects. A Puerto Rico-based crypto family office with deep conviction and a long-term investment horizon.",
    capabilities: [
      { t: "Strategic investments", d: "Direct investments into high-potential blockchain protocols, infrastructure, and applications." },
      { t: "Long-term conviction", d: "Patient capital with deep understanding of market cycles and adoption curves." },
      { t: "Ecosystem access", d: "Portfolio companies gain access to the full Transform Ventures ecosystem." },
      { t: "Hands-on support", d: "Active guidance on go-to-market, partnerships, and scaling." },
    ],
    stats: [["10+","Years in Crypto"],["Multi","Strategy Approach"],["Direct","Portfolio Access"],["Global","Network Reach"]],
  },
  strategies: {
    num: "04", name: "Transform Strategies", tag: "Advisory & Consulting",
    color: "#5B37E8",
    tagline: "Expert advisory for blockchain projects.",
    lead: "Decades of combined experience in token launch strategy, crypto go-to-market planning, tokenomics design, and investor relations — helping blockchain ventures succeed from seed to scale.",
    capabilities: [
      { t: "Token launch strategy", d: "End-to-end advisory on token design, distribution, and launch execution for maximum market impact." },
      { t: "Go-to-market planning", d: "Strategic positioning, messaging, and market entry plans tailored to the blockchain landscape." },
      { t: "Ecosystem development", d: "Building partnerships, community, and network effects for sustainable project growth." },
      { t: "Investor relations", d: "Connecting projects with the right capital partners and managing ongoing investor communications." },
    ],
    stats: [["Seed","→ Scale"],["Tokenomics","Design"],["GTM","Planning"],["IR","Advisory"]],
  },
  fund: {
    num: "05", name: "Bitcoin Supercycle Fund", tag: "BTC Investment Fund",
    color: "#F7931A",
    tagline: "The first liquid bitcoin-only hedge fund.",
    lead: "Combining the 'Four Seasons of Bitcoin' cycle model with algorithmic trading and season-specific strategies to maximize returns. Institutional-grade structure with Coinbase Prime custody and NAV Fund Services administration.",
    capabilities: [
      { t: "Four Seasons of Bitcoin", d: "Cycle model mapping BTC to predictable halving-driven phases: spring, summer, fall, winter." },
      { t: "Algorithmic trading", d: "Season-specific strategies executed algorithmically — sell near cycle peaks, buy near bottoms." },
      { t: "Bitcoin-only mandate", d: "100% concentrated in bitcoin — no altcoins, no distractions." },
      { t: "Institutional rails", d: "Coinbase Prime custody. NAV Fund Services administration. Regulated structure." },
    ],
    stats: [["100%","Bitcoin-Only"],["Algo","Trading Engine"],["4 Seasons","Cycle Model"],["2024","Fund Launch"]],
  },
};

function DivisionDetail({ slug }) {
  const d = DIVISION_DATA[slug];
  if (!d) return null;
  return (
    <>
      <Nav/>
      <section style={{paddingTop: 80, paddingBottom: 40}}>
        <div className="container">
          <a href="divisions.html" className="mono" style={{display:'inline-flex',gap:8,alignItems:'center',color:'var(--ink-500)',marginBottom:32}}>
            ← All divisions
          </a>
          <div className="mono" style={{color: d.color, marginBottom: 16}}>/ {d.num} — {d.tag}</div>
          <h1 style={{maxWidth: 880, fontWeight: 500}}>{d.tagline}</h1>
          <p style={{fontSize: 18, maxWidth: 720, marginTop: 24}}>{d.lead}</p>
          <div style={{display:'flex', gap: 12, marginTop: 32, flexWrap: 'wrap'}}>
            <a href="contact.html" className="btn btn-primary">Get in touch <Icon name="arrow" size={14}/></a>
            <a href="divisions.html" className="btn btn-ghost">Explore all divisions</a>
          </div>
        </div>
      </section>

      <section className="stats-bg" style={{padding: 0}}>
        <div className="container">
          <div className="stats">
            {d.stats.map(([n,l],i) => (
              <div key={i} className="stat"><div className="num">{n}</div><div className="label">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow">Capabilities</div>
          <h2 style={{marginBottom: 48, maxWidth: 700, fontWeight: 500}}>What we do.</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16}} className="cap-grid">
            {d.capabilities.map(c => (
              <div key={c.t} style={{padding: 32, border: '1px solid var(--ink-200)', borderRadius: 16, background: 'var(--white)'}}>
                <div style={{fontSize: 20, fontWeight: 500, color: 'var(--ink-900)', marginBottom: 10, letterSpacing: '-0.015em'}}>{c.t}</div>
                <div style={{fontSize: 14.5, color: 'var(--ink-500)'}}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip/>
      <Footer/>
      <style>{`@media(max-width:760px){.cap-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  );
}

Object.assign(window, { DivisionDetail, DIVISION_DATA });
