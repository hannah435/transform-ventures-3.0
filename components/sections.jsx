// Page sections

const DIVISIONS = [
  { key: "group", short: "Group", name: "Transform Group", tag: "Communications & PR", desc: "Pioneering blockchain and Web3 PR agency. 400+ clients since 2013, including launches of Ethereum and Tether.", color: "var(--purple)", badge: "Parent Organization" },
  { key: "events", short: "Events", name: "Transform Events", tag: "Tokenize · BitAngels · Tiger Mansion", desc: "Premier blockchain events connecting founders and investors worldwide through curated gatherings.", color: "var(--teal)", badge: "Events & Conferences" },
  { key: "capital", short: "Capital", name: "Transform Capital", tag: "Family Office", desc: "Strategic investments across the digital asset landscape with a long-term investment horizon.", color: "var(--orange)", badge: "Family Office" },
  { key: "strategies", short: "Strategies", name: "Transform Strategies", tag: "Advisory & Consulting", desc: "Go-to-market strategy, tokenomics design, and ecosystem development for blockchain ventures.", color: "#6D4AFF", badge: "Advisory" },
  { key: "fund", short: "Supercycle", name: "Bitcoin Supercycle Fund", tag: "BTC Investment Fund", desc: "The first liquid bitcoin-only hedge fund using the \"Four Seasons of Bitcoin\" cycle model and algorithmic trading.", color: "#F7931A", badge: "Investment Fund" },
];

const AnimatedBg = () => {
  const particles = Array.from({length: 32}, (_, i) => ({
    id: i,
    left: (i * 89) % 100,
    delay: (i * 1.3) % 20,
    duration: 12 + (i % 7) * 2.5,
    size: 2 + (i % 4),
    purple: i % 3 === 0,
  }));
  return (
    <div className="hero-anim-bg" aria-hidden="true">
      <div className="grid-lines"/>
      <div className="orb o1"/>
      <div className="orb o2"/>
      <div className="orb o3"/>
      <div className="orb o4"/>
      <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path className="stream" d="M0,120 C300,60 600,220 1200,140"/>
        <path className="stream" d="M0,300 C400,240 800,400 1200,320" style={{animationDelay:'-10s'}}/>
        <path className="stream" d="M0,520 C350,460 700,620 1200,540" style={{animationDelay:'-20s', stroke:'var(--purple)'}}/>
        <path className="stream" d="M0,700 C300,640 900,780 1200,720" style={{animationDelay:'-5s'}}/>
        <path className="stream" d="M0,400 C500,360 800,480 1200,420" style={{animationDelay:'-15s', stroke:'var(--purple)', opacity: 0.4}}/>
      </svg>
      <div className="particles">
        {particles.map(p => (
          <span key={p.id} className={`particle ${p.purple ? 'purple' : ''}`} style={{
            left: `${p.left}%`,
            width: p.size, height: p.size,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}/>
        ))}
      </div>
      <div className="glyph-float g1">
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
          <path d="M4 8 L16 4 L28 8 L28 10 L18 10 L18 28 L14 28 L14 10 L4 10 Z" stroke="var(--teal)" strokeWidth="1.4" fill="none"/>
        </svg>
      </div>
      <div className="glyph-float g2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="var(--purple)" strokeWidth="1.2" fill="none"/>
          <circle cx="12" cy="12" r="4" stroke="var(--purple)" strokeWidth="1.2" fill="none"/>
        </svg>
      </div>
      <div className="glyph-float g3">
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          <path d="M16 2 L30 16 L16 30 L2 16 Z" stroke="var(--teal)" strokeWidth="1.2" fill="none"/>
        </svg>
      </div>
      <div className="glyph-float g4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 16 L16 6 L26 16 L16 26 Z M16 2 L16 30 M2 16 L30 16" stroke="var(--purple)" strokeWidth="1" fill="none"/>
        </svg>
      </div>
      <div className="glyph-float g5">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M8 20 L20 8 L32 20 L20 32 Z" stroke="var(--teal)" strokeWidth="1" fill="none"/>
          <circle cx="20" cy="20" r="4" stroke="var(--teal)" strokeWidth="1" fill="none"/>
        </svg>
      </div>
      <div className="glyph-float g6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z" stroke="var(--purple)" strokeWidth="1.2" fill="none"/>
        </svg>
      </div>
    </div>
  );
};

const Hero = ({ variant = "editorial" }) => {
  if (variant === "editorial") {
    return (
      <section className="hero minimal">
        <AnimatedBg/>
        <div className="container" style={{textAlign: 'center'}}>
          <span className="chip" style={{marginBottom: 40}}><span className="dot"/>Blockchain & Crypto Ventures · Est. 2013</span>
          <h1 style={{fontSize: 'clamp(44px, 7.5vw, 98px)', fontWeight: 500, maxWidth: 1000, margin: '0 auto', letterSpacing: '-0.04em', lineHeight: 1.02}}>
            Where crypto builds <em>with conviction</em>.
          </h1>
          <p className="hero-sub" style={{margin: '28px auto 0', fontSize: 19, maxWidth: 620}}>
            Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential. Led by Michael Terpin — the "Godfather of Crypto."
          </p>
          <div className="hero-ctas" style={{justifyContent: 'center'}}>
            <a href="pages/divisions.html" className="btn btn-primary">Explore divisions <Icon name="arrow" size={14}/></a>
            <a href="pages/contact.html" className="btn btn-ghost">Get in touch</a>
          </div>
          <div className="hero-meta" style={{justifyContent: 'center', border: 'none', marginTop: 80}}>
            <div className="item"><div className="num">400+</div><div className="label">PR Clients</div></div>
            <div className="item"><div className="num">$200M</div><div className="label">Marketwire Exit</div></div>
            <div className="item"><div className="num">5</div><div className="label">Divisions</div></div>
            <div className="item"><div className="num">2013</div><div className="label">BitAngels Founded</div></div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "bold") {
    return (
      <section className="hero" style={{paddingTop: 40}}>
        <div className="container">
          <div className="mono" style={{marginBottom: 24}}>/ 001 — Transform Ventures · San Juan, PR</div>
          <h1 style={{fontSize: 'clamp(56px, 10vw, 150px)', fontWeight: 600, lineHeight: 0.92, letterSpacing: '-0.05em'}}>
            Crypto's most<br/>
            <span style={{color: 'var(--accent)'}}>storied</span> venture<br/>
            platform.
          </h1>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 56, alignItems: 'end'}} className="bold-meta">
            <p style={{fontSize: 18, maxWidth: 520}}>
              Five specialized divisions — from pioneering crypto PR to a bitcoin-only hedge fund. Led by Michael Terpin, the "Godfather of Crypto."
            </p>
            <div style={{display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap'}}>
              <a href="pages/divisions.html" className="btn btn-accent">Explore divisions <Icon name="arrow" size={14}/></a>
              <a href="pages/contact.html" className="btn btn-ghost">Contact</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // default: split
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="chip" style={{marginBottom: 24}}><span className="dot"/>Blockchain & Crypto Ventures</span>
            <h1>Where crypto builds <em>with conviction.</em></h1>
            <p className="hero-sub">
              Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential. Led by Michael Terpin, the "Godfather of Crypto," and based in San Juan, Puerto Rico.
            </p>
            <div className="hero-ctas">
              <a href="pages/divisions.html" className="btn btn-primary">Explore divisions <Icon name="arrow" size={14}/></a>
              <a href="pages/contact.html" className="btn btn-ghost">Get in touch</a>
            </div>
            <div className="hero-meta">
              <div className="item"><div className="num">400+</div><div className="label">PR Clients Since 2013</div></div>
              <div className="item"><div className="num">$200M</div><div className="label">Marketwire Exit</div></div>
              <div className="item"><div className="num">5</div><div className="label">Specialized Divisions</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="grid-bg"/>
            <div className="hv-card a">
              <div className="s">Division · 01</div>
              <div className="t">Transform Group</div>
              <div className="pill">PR · 400+ clients</div>
            </div>
            <div className="hv-card b">
              <div className="s">Fund · NAV</div>
              <div className="mono-val">+34.2%</div>
              <div className="s" style={{color: 'var(--accent)'}}>Bitcoin Supercycle · YTD</div>
            </div>
            <div className="hv-card c">
              <div className="s">Live · BTC/USD</div>
              <div className="mono-val">$118,420.00</div>
              <div className="s">4 Seasons · Spring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PressTicker = () => {
  const items = [
    ["CNBC", "Terpin: Bitcoin Supercycle Could See \"One More Point of Pain\""],
    ["YAHOO FINANCE", "Veteran Investor Predicts Shocking Bitcoin Rally by 2033"],
    ["BENZINGA", "Bitcoin To Reach $190,000 This Cycle"],
    ["KITCO NEWS", "Why Gold Pumps First and Bitcoin Follows"],
    ["LONDON REAL", "Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich"],
    ["BONNIE BLOCKCHAIN", "Bitcoin Market Analysis with Michael Terpin"],
  ];
  const doubled = [...items, ...items];
  return (
    <div className="press">
      <div className="press-inner">
        {doubled.map((it, i) => (
          <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: 12}}>
            <b>{it[0]}</b>
            <span>{it[1]}</span>
            <span className="dot"/>
          </span>
        ))}
      </div>
    </div>
  );
};

const DivisionsGrid = () => (
  <div className="div-grid">
    {DIVISIONS.map((d, i) => (
      <a href="pages/divisions.html" key={d.key} className="div-card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
          <div className="swatch" style={{background: d.color}}>{String(i+1).padStart(2,'0')}</div>
          <div className="num">{d.tag}</div>
        </div>
        <div>
          <div className="title">{d.name}</div>
          <div className="desc" style={{marginTop: 8}}>{d.desc}</div>
        </div>
        <div className="link">{d.badge} <Icon name="arrow" size={12} className="arrow"/></div>
      </a>
    ))}
  </div>
);

const DivisionsIndex = () => (
  <div className="div-index">
    {DIVISIONS.map((d, i) => (
      <a href="pages/divisions.html" key={d.key} className="row">
        <div className="num">/ {String(i+1).padStart(2,'0')}</div>
        <div>
          <div className="title">{d.name}</div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: d.color, marginTop: 4}}>{d.tag}</div>
        </div>
        <div className="desc">{d.desc}</div>
        <div className="cta">Explore →</div>
      </a>
    ))}
  </div>
);

const DivisionsTabs = () => {
  const [active, setActive] = useState(0);
  const d = DIVISIONS[active];
  return (
    <div className="div-tabs">
      <div className="list">
        {DIVISIONS.map((x, i) => (
          <button key={x.key} className={i===active ? 'active' : ''} onClick={() => setActive(i)}>
            <span>{x.name}</span>
            <span className="mini">/ {String(i+1).padStart(2,'0')}</span>
          </button>
        ))}
      </div>
      <div className="panel">
        <div className="mono accent">{d.tag}</div>
        <h3>{d.name}</h3>
        <p style={{fontSize: 16}}>{d.desc}</p>
        <div className="feat">
          <div><b>Focus</b>{d.badge}</div>
          <div><b>Since</b>{d.key === 'group' ? '2013' : d.key === 'events' ? '2013' : d.key === 'fund' ? '2024' : '2018'}</div>
          <div><b>Reach</b>Global</div>
          <div><b>Stage</b>Seed → Scale</div>
        </div>
        <a href="pages/divisions.html" className="btn btn-ghost" style={{alignSelf: 'start', marginTop: 12}}>Learn more <Icon name="arrow" size={14}/></a>
      </div>
    </div>
  );
};

const Divisions = ({ variant = "grid" }) => (
  <section id="divisions">
    <div className="section-decor"><div className="dot-grid"/><div className="orb-sm"/></div>
    <div className="container">
      <div className="divisions-head reveal">
        <div className="intro">
          <div className="eyebrow">Our Ecosystem</div>
          <h2>Five divisions.<br/>One vision.</h2>
          <p>Transform Ventures operates across five specialized divisions — from crypto PR and blockchain events to venture capital, strategic advisory, and a bitcoin-only hedge fund.</p>
        </div>
        <a href="pages/divisions.html" className="btn btn-ghost">View all divisions <Icon name="arrow" size={14}/></a>
      </div>
      {variant === "index" && <DivisionsIndex/>}
      {variant === "tabs" && <DivisionsTabs/>}
      {variant === "grid" && <DivisionsGrid/>}
    </div>
  </section>
);

const Stats = () => (
  <div className="stats-bg">
    <div className="section-decor"><div className="orb-sm"/></div>
    <div className="container">
      <div className="stats">
        <div className="stat"><div className="num">400<span className="u">+</span></div><div className="label">PR Clients Since 2013</div></div>
        <div className="stat"><div className="num">$200<span className="u">M</span></div><div className="label">Marketwire Exit to NASDAQ</div></div>
        <div className="stat"><div className="num">2013</div><div className="label">First Crypto Angel Group</div></div>
        <div className="stat"><div className="num">5<span className="u">x</span></div><div className="label">Specialized Divisions</div></div>
      </div>
    </div>
  </div>
);

const Events = () => {
  const events = [
    { name: "Tokenize", tag: "Conference · Global", desc: "A premier blockchain conference bringing together industry leaders, investors, and innovators to explore the future of tokenization.", img: "assets/tokenize-vegas.jpg" },
    { name: "BitAngels", tag: "Since 2013 · Angel Network", desc: "Co-founded by Michael Terpin in 2013. The world's first angel investor network for digital currency startups.", img: "assets/bitangels-group.webp" },
    { name: "Tiger Mansion", tag: "Invite Only · Exclusive", desc: "An exclusive, invite-only gathering for top-tier crypto investors and founders. Intimate, curated networking.", img: "assets/tigermansion-event.jpg" },
  ];
  return (
    <section id="events">
      <div className="section-decor"><div className="orb-sm"/></div>
      <div className="container">
        <div className="divisions-head reveal">
          <div className="intro">
            <div className="eyebrow">Transform Events</div>
            <h2>Where the industry connects.</h2>
            <p>Flagship blockchain conferences and crypto networking events bringing together industry leaders, angel investors, and founders.</p>
          </div>
          <a href="pages/events.html" className="btn btn-ghost">All events <Icon name="arrow" size={14}/></a>
        </div>
        <div className="events-grid">
          {events.map(e => (
            <a href="pages/events.html" key={e.name} className="event-card">
              <div className="event-hero" style={{backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%), url(${e.img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <span className="eyebrow-top">{e.tag.split(' · ')[0]}</span>
                <div className="name" style={{position: 'absolute', bottom: 18, left: 20, right: 20, textAlign: 'left'}}>{e.name}</div>
              </div>
              <div className="event-body">
                <p className="desc">{e.desc}</p>
                <div className="event-meta">
                  {e.tag.split(' · ').map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Fund = () => (
  <section id="fund">
    <div className="section-decor"><div className="diag-lines"/><div className="orb-sm"/></div>
    <div className="container">
      <div className="fund reveal">
        <div className="fund-book" style={{padding: 0, overflow: 'hidden', background: '#fff'}}>
          <img src="assets/bitcoin-supercycle-book.jpg" alt="Bitcoin Supercycle book" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
        </div>
        <div className="fund-content">
          <div className="eyebrow" style={{color: '#F7931A'}}>Investment Fund</div>
          <h2>Bitcoin Supercycle Fund.</h2>
          <p>The first liquid bitcoin-only hedge fund combining the "Four Seasons of Bitcoin" cycle model with algorithmic trading and season-specific strategies to maximize returns.</p>
          <div className="fund-stats">
            <div className="s"><div className="n">100%</div><div className="l">Bitcoin-Only</div></div>
            <div className="s"><div className="n">Algo</div><div className="l">Algorithmic Trading</div></div>
            <div className="s"><div className="n">4 Seasons</div><div className="l">Cycle-Driven Model</div></div>
          </div>
          <div className="fund-bullets">
            <div>Seasonal trading signals — sell near cycle peaks, buy near bottoms.</div>
            <div>Backtested returns significantly outperforming BTC-USD.</div>
            <div>Coinbase Prime custody · NAV Fund Services administration.</div>
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap'}}>
            <a href="pages/divisions.html" className="btn" style={{background: '#F7931A', color: '#fff'}}>Learn more <Icon name="arrow" size={14}/></a>
            <a href="#" className="btn btn-ghost" style={{color: '#fff', borderColor: 'rgba(255,255,255,0.2)'}}>Buy on Amazon <Icon name="arrowUpRight" size={14}/></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Leadership = () => (
  <section id="leadership">
    <div className="section-decor"><div className="orb-sm"/></div>
    <div className="container">
      <div className="eyebrow reveal">Leadership</div>
      <h2 style={{marginBottom: 48, maxWidth: 700}}>Meet the founder.</h2>
      <div className="leader">
        <div className="leader-photo" style={{background: 'transparent', padding: 0}}>
          <img src="assets/michael-terpin.jpg" alt="Michael Terpin" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--r-lg)'}}/>
        </div>
        <div>
          <div className="title-line">Founder & CEO · Transform Ventures · CEO & CIO · Bitcoin Supercycle Fund</div>
          <h2>Michael Terpin</h2>
          <p className="bio" style={{marginTop: 16}}>
            Early bitcoin investor, thought leader, and serial entrepreneur — <em>known as the "Godfather of Crypto" (CNBC).</em> Chief Investment Officer of the Bitcoin Supercycle Fund and author of <em>Bitcoin Supercycle</em> (Skyhorse Publishing, 2024), which correctly predicted the early November 2024 all-time high for bitcoin.
          </p>
          <p className="bio">
            Minority General Partner of Alpha Transform Holdings, Tradecraft Capital, and Sigma Capital. Co-founder of BitAngels (2013) — the first crypto angel group. Creator of <em>Tokenize</em>, the leading conference series. Previously founded Marketwire, the first Internet-based newswire (backed by Sequoia Capital), sold to NASDAQ for $200M.
          </p>
          <div className="tags">
            {["Godfather of Crypto","CEO & CIO","Author","BitAngels Co-Founder","Tokenize Creator","Puerto Rico"].map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          <div className="leader-stats">
            <div className="s"><div className="n">2015</div><div className="l">Four Seasons Model</div></div>
            <div className="s"><div className="n">$200M</div><div className="l">Marketwire Exit</div></div>
            <div className="s"><div className="n">2013</div><div className="l">First Crypto Angel Group</div></div>
          </div>
          <div style={{marginTop: 32}}>
            <a href="pages/leadership.html" className="btn btn-ghost">Full bio <Icon name="arrow" size={14}/></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Media = () => {
  const items = [
    { src: "CNBC", title: "The Debt Trap: Why Gold Pumps First and Bitcoin Follows", desc: "Michael Terpin discusses the macro relationship between gold and bitcoin, the debt cycle, and why bitcoin follows gold's trajectory with a lag." },
    { src: "BONNIE BLOCKCHAIN", title: "Bitcoin Market Analysis with Michael Terpin", desc: "The \"Godfather of Crypto\" joins Bonnie Blockchain to discuss bitcoin market cycles, the Four Seasons model, and what's next for the crypto market." },
  ];
  return (
    <section id="media">
      <div className="section-decor"><div className="orb-sm"/></div>
      <div className="container">
        <div className="divisions-head reveal">
          <div className="intro">
            <div className="eyebrow">News & Media</div>
            <h2>In the press.</h2>
            <p>Interviews, appearances, and press coverage featuring Michael Terpin and Transform Ventures across leading crypto and financial media.</p>
          </div>
          <a href="pages/media.html" className="btn btn-ghost">All coverage <Icon name="arrow" size={14}/></a>
        </div>
        <div className="media-grid">
          {items.map(it => (
            <a href="pages/media.html" key={it.title} className="media-card">
              <div className="media-thumb" style={{background: `linear-gradient(135deg, var(--ink-100), var(--ink-200))`}}>
                <div className="play"><Icon name="play" size={18}/></div>
              </div>
              <div className="media-body">
                <div className="src">{it.src}</div>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    { tag: "Bitcoin Cycles", date: "April 2026", title: "Understanding the Four Seasons of Bitcoin", desc: "Michael Terpin's Four Seasons model maps bitcoin's price to a predictable four-year cycle driven by the halving. Spring follows steady accumulation; summer, the parabolic rally." },
    { tag: "Market Analysis", date: "March 2026", title: "Why Bitcoin Could Reach $1 Million by 2033", desc: "With each halving reducing supply while institutional demand accelerates through spot ETFs, the math points to a dramatically higher bitcoin price over the next two cycles." },
    { tag: "Fund Strategy", date: "February 2026", title: "How Algorithmic Trading Enhances Bitcoin Cycle Returns", desc: "Combining the Four Seasons cycle model with algorithmic execution creates season-specific strategies that can significantly outperform buy-and-hold." },
    { tag: "Industry", date: "January 2026", title: "The Case for a Bitcoin-Only Hedge Fund", desc: "Why concentration — not diversification across altcoins — is the right call for institutional capital that wants asymmetric upside with defined downside." },
  ];
  return (
    <section id="blog" style={{background: 'var(--ink-050)'}} className="">
      <div className="container">
        <div className="divisions-head">
          <div className="intro">
            <div className="eyebrow">Blog & Insights</div>
            <h2>Analysis from the<br/>Godfather of Crypto.</h2>
            <p>Thought leadership and market commentary on bitcoin cycles, crypto investing, and blockchain technology.</p>
          </div>
          <a href="pages/media.html" className="btn btn-ghost">All posts <Icon name="arrow" size={14}/></a>
        </div>
        <div className="blog-grid">
          {posts.map(p => (
            <a href="pages/media.html" key={p.title} className="blog-card">
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className="tag">{p.tag}</span>
                <span className="mono" style={{fontSize: 10}}>{p.date}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="more">Read more <Icon name="arrow" size={12}/></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const logos = [
    { src: "assets/transform-ventures.png", alt: "Transform Ventures" },
    { src: "assets/transform-group.png", alt: "Transform Group", dark: true },
    { src: "assets/bitangels.png", alt: "BitAngels" },
  ];
  const textOnly = ["Tokenize", "Ethereum", "Tether", "Neo"];
  return (
    <section id="partners" style={{padding: 0}}>
      <div className="container" style={{paddingTop: 80, paddingBottom: 40}}>
        <div className="eyebrow" style={{textAlign: 'center', display: 'block', justifyContent: 'center'}}>Portfolio & Partners</div>
        <p style={{textAlign: 'center', maxWidth: 500, margin: '0 auto 48px'}}>Trusted by the founders, protocols, and platforms shaping the next decade of crypto.</p>
      </div>
      <div className="partners">
        {logos.map(l => (
          <div key={l.alt} className="p">
            <img src={l.src} alt={l.alt} style={{maxHeight: 36, maxWidth: '80%', objectFit: 'contain', filter: l.dark ? 'invert(1) brightness(0.4)' : 'grayscale(1) opacity(0.7)'}}/>
          </div>
        ))}
        {textOnly.map(p => <div key={p} className="p">{p}</div>)}
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact">
    <div className="container">
      <div className="contact-grid">
        <div className="contact-intro">
          <div className="eyebrow">Get in touch</div>
          <h2>Let's build the future together.</h2>
          <p>We'd love to hear about your project, partnership idea, or investment inquiry.</p>
          <div className="contact-info">
            <div className="row">
              <div className="ic"><Icon name="pin" size={16}/></div>
              <div><div className="l">Location</div><div className="v">San Juan, Puerto Rico</div></div>
            </div>
            <div className="row">
              <div className="ic"><Icon name="mail" size={16}/></div>
              <div><div className="l">Email</div><div className="v">info@transformventures.io</div></div>
            </div>
            <div className="row">
              <div className="ic"><Icon name="spark" size={16}/></div>
              <div><div className="l">Interests</div><div className="v">Investments · Advisory · Events · Partnerships</div></div>
            </div>
          </div>
        </div>
        <form className="form" onSubmit={(e) => { e.preventDefault(); alert('Thanks — we\'ll be in touch shortly.'); }}>
          <label><span className="lab">Name</span><input required placeholder="Your name"/></label>
          <label><span className="lab">Email</span><input type="email" required placeholder="you@company.com"/></label>
          <label><span className="lab">I'm interested in</span>
            <select defaultValue="">
              <option value="" disabled>Select a topic…</option>
              <option>Investment inquiry</option>
              <option>Advisory / consulting</option>
              <option>Event partnership</option>
              <option>Press / media</option>
              <option>Other</option>
            </select>
          </label>
          <label><span className="lab">Message</span><textarea required placeholder="Tell us about your project…"/></label>
          <button type="submit" className="btn btn-accent">Send message <Icon name="arrow" size={14}/></button>
        </form>
      </div>
    </div>
  </section>
);

const CTAStrip = () => (
  <section>
    <div className="container">
      <div className="cta-strip">
        <div>
          <div className="mono" style={{color: 'var(--accent)', marginBottom: 16}}>/ Ready when you are</div>
          <h2>Ready to transform your blockchain venture?</h2>
          <p>Whether you're raising capital, launching a token, or need strategic guidance — let's connect.</p>
        </div>
        <div className="btns">
          <a href="pages/contact.html" className="btn btn-accent">Start a conversation <Icon name="arrow" size={14}/></a>
          <a href="pages/media.html" className="btn btn-ghost">Latest news</a>
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, {
  DIVISIONS, Hero, PressTicker, Divisions, Stats, Events, Fund,
  Leadership, Media, Blog, Partners, Contact, CTAStrip
});
