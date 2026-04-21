// Transform Ventures — Dark variant landing page

const { useState, useEffect, useMemo } = React;

const Stars = () => {
  const stars = useMemo(() => Array.from({length: 80}, (_, i) => ({
    id: i,
    top: (i * 131) % 100,
    left: (i * 71) % 100,
    size: 1 + (i % 3) * 0.5,
    delay: (i * 0.13) % 3,
  })), []);
  return (
    <div className="d-hero-stars" aria-hidden="true">
      {stars.map(s => (
        <span key={s.id} className="star" style={{
          top: `${s.top}%`, left: `${s.left}%`,
          width: s.size, height: s.size,
          animationDelay: `-${s.delay}s`,
        }}/>
      ))}
    </div>
  );
};

const Icon = ({name}) => {
  const paths = {
    megaphone: <path d="M3 9v3a1 1 0 0 0 1 1h1l2 4h2l-2-4h1l7 3V5l-7 3H4a1 1 0 0 0-1 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>,
    calendar: <><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
    bank: <><path d="M10 2L2 6h16L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/><path d="M4 9v6M8 9v6M12 9v6M16 9v6M2 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
    compass: <><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M13 7l-2 5-5 2 2-5 5-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/></>,
    bitcoin: <><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M8 6v8M8 10h3.5a2 2 0 0 0 0-4H8M8 10h4a2 2 0 0 1 0 4H8M9.5 5v1.5M11.5 5v1.5M9.5 13.5V15M11.5 13.5V15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/></>,
    news: <><rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M6 8h8M6 11h8M6 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></>,
    pen: <><path d="M3 17l1-4 10-10 3 3-10 10-4 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/><path d="M12 5l3 3" stroke="currentColor" strokeWidth="1.5"/></>,
  };
  return <svg width="20" height="20" viewBox="0 0 20 20">{paths[name]}</svg>;
};

const DIVISION_MENU = [
  { name: "Transform Group", sub: "Communications & PR", icon: "megaphone", href: "pages/division-group.html" },
  { name: "Transform Events", sub: "Tokenize / BitAngels / Tiger Mansion", icon: "calendar", href: "pages/division-events.html" },
  { name: "Transform Capital", sub: "Family office", icon: "bank", href: "pages/division-capital.html" },
  { name: "Transform Strategies", sub: "Advisory & consulting", icon: "compass", href: "pages/division-strategies.html" },
  { name: "Bitcoin Supercycle Fund", sub: "BTC investment fund", icon: "bitcoin", href: "pages/division-fund.html" },
];

const MEDIA_MENU = [
  { name: "News & Press", sub: "Interviews & media coverage", icon: "news", href: "pages/media.html#news" },
  { name: "Blog", sub: "Insights & analysis", icon: "pen", href: "pages/blog.html" },
];

const NavDropdown = ({label, items, open, onOpen, onClose}) => (
  <li
    className={`nav-drop ${open ? 'open' : ''}`}
    onMouseEnter={onOpen}
    onMouseLeave={onClose}
  >
    <a href="#" onClick={(e) => { e.preventDefault(); open ? onClose() : onOpen(); }}>
      {label}
      <svg width="10" height="10" viewBox="0 0 10 10" style={{transition:'transform .2s', transform: open ? 'rotate(180deg)' : 'none'}}>
        <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
    <div className="dropdown-panel">
      {items.map(it => (
        <a key={it.name} href={it.href} className="dropdown-item">
          <span className="di-icon"><Icon name={it.icon}/></span>
          <span className="di-text">
            <span className="di-name">{it.name}</span>
            <span className="di-sub">{it.sub}</span>
          </span>
        </a>
      ))}
    </div>
  </li>
);

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const closeMobile = () => { setMobile(false); setMobileSub(null); };
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobile]);
  const Chev = () => (
    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  return (
    <>
      <nav className="d-nav">
        <a href="index.html" className="brand">
          <img src="assets/transform-ventures-white.png" alt="Transform Ventures"/>
        </a>
        <ul>
          <li><a href="pages/about.html">About</a></li>
          <NavDropdown label="Divisions" items={DIVISION_MENU}
            open={openMenu === 'div'}
            onOpen={() => setOpenMenu('div')}
            onClose={() => setOpenMenu(null)}/>
          <li><a href="pages/events.html">Events</a></li>
          <NavDropdown label="Media" items={MEDIA_MENU}
            open={openMenu === 'media'}
            onOpen={() => setOpenMenu('media')}
            onClose={() => setOpenMenu(null)}/>
          <li><a href="pages/leadership.html">Leadership</a></li>
        </ul>
        <a href="pages/contact.html" className="cta">Contact</a>
        <button className={`d-nav-toggle ${mobile ? 'open' : ''}`} onClick={() => setMobile(!mobile)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mobile-menu-d ${mobile ? 'open' : ''}`}>
        <button className="mm-close" onClick={closeMobile} aria-label="Close menu">×</button>
        <div className="mm-inner">
          <a href="pages/about.html" className="mm-link">About</a>
          <button type="button" className={`mm-link mm-expand ${mobileSub==='div'?'open':''}`} onClick={() => setMobileSub(mobileSub==='div'?null:'div')}>
            <span>Divisions</span> <Chev/>
          </button>
          {mobileSub==='div' && (
            <div className="mm-sub-wrap">
              {DIVISION_MENU.map(it => <a key={it.name} href={it.href} className="mm-sub">{it.name}</a>)}
            </div>
          )}
          <a href="pages/events.html" className="mm-link">Events</a>
          <button type="button" className={`mm-link mm-expand ${mobileSub==='media'?'open':''}`} onClick={() => setMobileSub(mobileSub==='media'?null:'media')}>
            <span>Media</span> <Chev/>
          </button>
          {mobileSub==='media' && (
            <div className="mm-sub-wrap">
              {MEDIA_MENU.map(it => <a key={it.name} href={it.href} className="mm-sub">{it.name}</a>)}
            </div>
          )}
          <a href="pages/leadership.html" className="mm-link">Leadership</a>
          <a href="pages/contact.html" className="mm-cta">Contact →</a>
        </div>
      </div>
    </>
  );
};

const Hero = () => (
  <section className="d-hero">
    <Stars/>
    <h1><span className="grad">Where crypto builds<br/>with conviction.</span></h1>
    <p className="lead">
      Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential. Led by Michael Terpin — the "Godfather of Crypto."
    </p>
    <div className="ctas">
      <a className="btn-lime" href="pages/divisions.html">Explore divisions →</a>
      <a className="btn-outline" href="pages/contact.html">Get in touch</a>
    </div>
    <div className="hero-socials" aria-label="Social links">
      <a href="#" aria-label="Twitter / X" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.938l-5.43-7.08L4.5 22H1.244l8.04-9.192L1 2h7.063l4.92 6.518L18.244 2zm-1.22 18h1.833L7.104 4H5.16l11.864 16z"/></svg>
      </a>
      <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.666H9.353V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.063 2.063 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="#" aria-label="YouTube" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
    <div className="d-hero-globe">
      <Globe/>
    </div>
  </section>
);

const Globe = () => {
  const canvasRef = React.useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, R = 0, CX = 0, CY = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
      // Centered globe filling the canvas
      R = Math.min(W, H) * 0.48;
      CX = W / 2; CY = H / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate static dot-grid on sphere (lat/lon)
    const dots = [];
    const LAT_STEPS = 56; // rows
    for (let i = 0; i <= LAT_STEPS; i++) {
      const lat = -Math.PI/2 + (i / LAT_STEPS) * Math.PI;
      // longitudinal spacing proportional to cos(lat) so dots are evenly distributed on sphere
      const circumference = Math.cos(lat);
      const count = Math.max(6, Math.round(72 * circumference));
      for (let j = 0; j < count; j++) {
        const lon = (j / count) * Math.PI * 2;
        dots.push({ lat, lon });
      }
    }

    let rot = 0;
    let raf;
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // draw dots
      const cosR = Math.cos(rot), sinR = Math.sin(rot);
      for (const d of dots) {
        const cosLat = Math.cos(d.lat), sinLat = Math.sin(d.lat);
        // start position on unit sphere
        let x = cosLat * Math.cos(d.lon);
        let y = sinLat;
        let z = cosLat * Math.sin(d.lon);
        // rotate around Y axis
        const nx = x * cosR + z * sinR;
        const nz = -x * sinR + z * cosR;
        x = nx; z = nz;
        if (z < -0.05) continue; // cull back

        // tilt slightly (around X axis) for axial tilt
        const tilt = 0.22;
        const ty = y * Math.cos(tilt) - z * Math.sin(tilt);
        const tz = y * Math.sin(tilt) + z * Math.cos(tilt);

        const px = CX + x * R;
        const py = CY - ty * R;

        // depth-based brightness
        const depth = Math.max(0, tz + 0.3);
        // highlight on top-left lit side
        const lit = Math.max(0, -x * 0.5 + ty * 0.5 + 0.4);
        const alpha = Math.min(1, 0.3 + depth * 0.7 + lit * 0.9);
        const size = 1.2 + depth * 1.2;

        // purple dot grid — brighter accent on the lit equator band
        const isAccent = (lit > 0.85 && Math.abs(d.lat) < 0.3);
        const color = isAccent ? `rgba(232,222,255,${alpha})` : `rgba(190,170,255,${alpha})`;

        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2); ctx.fill();
      }

      rot += 0.0015;
      raf = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="globe-canvas"/>;
};

const DIVISIONS = [
  { name: "Transform Group", tag: "Communications & PR", desc: "The original blockchain PR firm — launched the first-ever token sale (Mastercoin, 2013) and powered 100+ prominent ICO-era launches including Ethereum, EOS, Augur, and Tether.", kpi: "100+ ICO launches · Since 2013" },
  { name: "Transform Events", tag: "Tokenize · BitAngels · Tiger Mansion", desc: "Premier blockchain events connecting founders and investors worldwide through curated gatherings.", kpi: "3 flagship events" },
  { name: "Transform Capital", tag: "Family Office", desc: "Strategic investments across the digital asset landscape with a long-term investment horizon.", kpi: "Multi-strategy" },
  { name: "Transform Strategies", tag: "Advisory & Consulting", desc: "Go-to-market strategy, tokenomics design, and ecosystem development for blockchain ventures.", kpi: "Seed → Scale" },
  { name: "Bitcoin Supercycle Fund", tag: "BTC Investment Fund", desc: "The first liquid bitcoin-only hedge fund using the \"Four Seasons of Bitcoin\" cycle model and algorithmic trading.", kpi: "100% BTC · Algo" },
];

const Divisions = () => (
  <section id="divisions" className="d-section">
    <div className="wavy-bg"/>
    <div className="container">
      <div className="sec-head reveal-d">
        <div className="eyebrow-inline"><span style={{width:5,height:5,borderRadius:'50%',background:'var(--lime)'}}/>Our ecosystem</div>
        <h2>Five divisions. One vision.</h2>
        <p className="sub">Transform Ventures operates across five specialized divisions — from crypto PR and blockchain events to venture capital, strategic advisory, and a bitcoin-only hedge fund.</p>
      </div>
      <div className="divisions-row">
        {DIVISIONS.slice(0, 3).map((d, i) => (
          <div key={d.name} className={`dark-card reveal-d d${i+1}`} onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
          }}>
            <h3>{d.name}</h3>
            <div className="tag">{d.tag}</div>
            <p>{d.desc}</p>
            <div className="kpi">{d.kpi}</div>
          </div>
        ))}
      </div>
      <div className="divisions-row divisions-row-2up">
        {DIVISIONS.slice(3).map((d, i) => (
          <div key={d.name} className={`dark-card reveal-d d${i+1}`} onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
            e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
          }}>
            <h3>{d.name}</h3>
            <div className="tag">{d.tag}</div>
            <p>{d.desc}</p>
            <div className="kpi">{d.kpi}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Feature = () => (
  <section id="feature" className="d-section">
    <div className="container">
      <div className="feature-split reveal-d">
        <div className="visual"><div className="morph"/></div>
        <div className="copy">
          <div className="tag-row"><span>Advisory</span><span>Strategy</span></div>
          <h3>Every crypto venture finds its path.</h3>
          <p>Decades of combined experience in token launch strategy, crypto go-to-market, tokenomics design, and investor relations — helping blockchain ventures succeed from seed to scale.</p>
          <ul>
            <li>End-to-end advisory on token design, distribution, and launch</li>
            <li>Strategic positioning and market-entry plans</li>
            <li>Access to the full Transform Ventures network</li>
          </ul>
          <div className="actions">
            <a className="btn-lime" href="pages/contact.html">Start a conversation →</a>
            <a className="btn-outline" href="pages/divisions.html">Learn more</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatBand = () => (
  <section className="stat-band d-section">
    <div className="wavy-bg"/>
    <div className="container">
      <div className="reveal-d">
        <div className="cap">Portfolio & track record</div>
        <div className="bignum">$200M</div>
        <p className="cap-desc">Marketwire exit to NASDAQ — the foundation that seeded 12+ years of crypto ventures, clients, and capital.</p>
      </div>
      <div className="sub-stats">
        <div className="reveal-d d1"><div className="n">100+</div><div className="l">ICO-era token launches</div></div>
        <div className="reveal-d d2"><div className="n">2013</div><div className="l">Launched first-ever token sale</div></div>
      </div>
    </div>
  </section>
);

const EVENTS = [
  { name: "Tokenize", tag: "Global Conference", desc: "Industry leaders, investors, and innovators exploring the future of tokenization.", img: "assets/tokenize-vegas.jpg", url: "https://tokenizeconference.com/" },
  { name: "BitAngels", tag: "Since 2013 · Angel Network", desc: "The world's first angel investor network for digital currency startups.", img: "assets/bitangels-group.webp", url: "https://bitangels.network/" },
  { name: "Tiger Mansion", tag: "Invite Only", desc: "An exclusive, invite-only gathering for top-tier crypto investors and founders.", img: "assets/tigermansion-event.jpg", url: "https://www.tigermansionlv.com/" },
];

const Events = () => (
  <section id="events" className="d-section">
    <div className="container">
      <div className="sec-head reveal-d">
        <div className="eyebrow-inline"><span style={{width:5,height:5,borderRadius:'50%',background:'var(--lime)'}}/>Transform Events</div>
        <h2>Where the industry connects.</h2>
        <p className="sub">Flagship blockchain conferences and crypto networking events bringing together industry leaders, angel investors, and founders.</p>
      </div>
      <div className="events-grid-d">
        {EVENTS.map((e, i) => (
          <a href={e.url} target="_blank" rel="noopener" key={e.name} className={`event-card-d reveal-d d${i+1}`}>
            <div className="thumb"><img src={e.img} alt={e.name}/></div>
            <div className="meta">
              <div className="t">{e.tag}</div>
              <h3>{e.name}</h3>
              <p>{e.desc}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="reveal-d" style={{textAlign:'center', marginTop: 32}}>
        <a href="pages/events.html" className="btn-outline">All events →</a>
      </div>
    </div>
  </section>
);

const Fund = () => (
  <section id="fund" className="d-section">
    <div className="wavy-bg"/>
    <div className="container">
      <div className="sec-head reveal-d">
        <div className="eyebrow-inline"><span style={{width:5,height:5,borderRadius:'50%',background:'var(--lime)'}}/>Investment Fund</div>
        <h2>Bitcoin Supercycle Fund.</h2>
        <p className="sub">The first liquid bitcoin-only hedge fund combining the "Four Seasons of Bitcoin" cycle model with algorithmic trading.</p>
      </div>
      <div className="fund-banner reveal-d">
        <div className="book"><img src="assets/bitcoin-supercycle-book.jpg" alt="Bitcoin Supercycle book"/></div>
        <div className="copy">
          <span className="tag-orange">Amazon Best Seller · 2024</span>
          <h3>Bitcoin Supercycle</h3>
          <p>How the crypto calendar can make you rich — by Michael Terpin. The foundational thesis behind the fund's seasonal signal and cycle-driven strategy.</p>
          <div className="kpis">
            <div className="k"><div className="n">100%</div><div className="l">Bitcoin-Only</div></div>
            <div className="k"><div className="n">Algo</div><div className="l">Algorithmic Trading</div></div>
            <div className="k"><div className="n">4 Seasons</div><div className="l">Cycle-driven</div></div>
          </div>
          <div className="actions">
            <a className="btn-lime" href="pages/division-fund.html">Learn more →</a>
            <a className="btn-outline" href="https://www.amazon.com/Bitcoin-Supercycle-Crypto-Calendar-Make/dp/151078215X" target="_blank" rel="noopener">Buy on Amazon ↗</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Leader = () => (
  <section id="leadership" className="d-section">
    <div className="wavy-bg"/>
    <div className="container">
      <div className="sec-head reveal-d">
        <div className="eyebrow-inline"><span style={{width:5,height:5,borderRadius:'50%',background:'var(--lime)'}}/>Leadership</div>
        <h2>Meet the founder.</h2>
        <p className="sub">Three decades of building at the intersection of media, technology, and capital — from Marketwire to the Bitcoin Supercycle Fund.</p>
      </div>
      <div className="leader-d reveal-d">
        <div className="photo">
          <img src="assets/michael-terpin.jpg" alt="Michael Terpin"/>
          <div className="photo-caption">
            <span className="quote">"Godfather of Crypto"</span>
            <span className="source">— CNBC</span>
          </div>
        </div>
        <div className="info">
          <div className="role">Founder & CEO · CIO, Bitcoin Supercycle Fund</div>
          <div className="name">Michael Terpin</div>
          <p style={{marginTop: 20}}>Early bitcoin investor, thought leader, and serial entrepreneur — known as the "Godfather of Crypto" (CNBC). Chief Investment Officer of the Bitcoin Supercycle Fund and author of <i>Bitcoin Supercycle</i> (Skyhorse Publishing, 2024), which correctly predicted the November 2024 all-time high for bitcoin.</p>
          <p style={{marginTop: 14}}>Co-founder of BitAngels (2013), the first crypto angel group, and creator of Tokenize, the leading conference series connecting investors with blockchain. Previously founded Marketwire, the first internet-based newswire — sold to NASDAQ for $200M.</p>
          <div className="leader-stats-d">
            <div className="stat"><div className="n">100+</div><div className="l">ICO-era launches</div></div>
            <div className="stat"><div className="n">$200M</div><div className="l">Marketwire exit</div></div>
            <div className="stat"><div className="n">2013</div><div className="l">First crypto angel group</div></div>
          </div>
          <div className="tags">
            <span>Godfather of Crypto</span>
            <span>BitAngels Co-Founder</span>
            <span>Tokenize Creator</span>
            <span>Author</span>
            <span>Puerto Rico</span>
          </div>
          <div style={{marginTop: 28}}>
            <a href="pages/leadership.html" className="btn-outline">Full bio →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="contact" className="d-section">
    <div className="container">
      <div className="final-cta reveal-d">
        <h2>Ready to transform your blockchain venture?</h2>
        <p>Whether you're raising capital, launching a token, or need strategic guidance — let's connect.</p>
        <div className="ctas">
          <a className="btn-lime" href="pages/contact.html">Start a conversation →</a>
          <a className="btn-outline" href="pages/media.html">Latest news & media</a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="d-footer">
    <div className="container">
      <div className="cols">
        <div className="brand-col">
          <img src="assets/transform-ventures-white.png" alt="Transform Ventures"/>
          <p>Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential.</p>
        </div>
        <div className="col">
          <h4>Divisions</h4>
          <ul>
            <li><a href="pages/division-group.html">Transform Group</a></li>
            <li><a href="pages/division-events.html">Transform Events</a></li>
            <li><a href="pages/division-capital.html">Transform Capital</a></li>
            <li><a href="pages/division-strategies.html">Transform Strategies</a></li>
            <li><a href="pages/division-fund.html">Supercycle Fund</a></li>
          </ul>
        </div>
        <div className="col">
          <h4>Events & News</h4>
          <ul>
            <li><a href="https://tokenizeconference.com/" target="_blank" rel="noopener">Tokenize</a></li>
            <li><a href="https://bitangels.network/" target="_blank" rel="noopener">BitAngels</a></li>
            <li><a href="https://www.tigermansionlv.com/" target="_blank" rel="noopener">Tiger Mansion</a></li>
            <li><a href="pages/media.html">News & Media</a></li>
          </ul>
        </div>
        <div className="col">
          <h4>Connect</h4>
          <ul>
            <li><a href="pages/contact.html">Contact</a></li>
            <li><a href="#">Twitter / X</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Telegram</a></li>
          </ul>
        </div>
      </div>
      <div className="btm">
        <span>© 2026 Transform Ventures. All rights reserved.</span>
        <span>San Juan, Puerto Rico</span>
      </div>
    </div>
  </footer>
);

function App() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal-d').forEach(el => io.observe(el));
  }, []);

  return (
    <>
      <Nav/>
      <Hero/>
      <Divisions/>
      <Feature/>
      <StatBand/>
      <Events/>
      <Fund/>
      <Leader/>
      <FinalCTA/>
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
