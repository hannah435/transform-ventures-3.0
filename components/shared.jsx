// Shared components: Logo, Nav, Footer, Icons
const { useState, useEffect, useRef } = React;

// T mark (based on transformventures logo — stylized winged T)
const TMark = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M4 8 L16 4 L28 8 L28 10 L18 10 L18 28 L14 28 L14 10 L4 10 Z"
      fill={color} />
    <path d="M6 12 L10 14 L10 17 L6 15 Z M26 12 L22 14 L22 17 L26 15 Z"
      fill={color} opacity="0.55"/>
  </svg>
);

const Icon = ({ name, size = 16 }) => {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" };
  const map = {
    arrow: <svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
    arrowDown: <svg {...common}><path d="M12 5v14M5 12l7 7 7-7"/></svg>,
    arrowUpRight: <svg {...common}><path d="M7 17L17 7M7 7h10v10"/></svg>,
    chevron: <svg {...common}><path d="M6 9l6 6 6-6"/></svg>,
    close: <svg {...common}><path d="M18 6L6 18M6 6l12 12"/></svg>,
    menu: <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
    play: <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
    mail: <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
    pin: <svg {...common}><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    spark: <svg {...common}><path d="M12 2v8M12 14v8M2 12h8M14 12h8"/></svg>,
    x: <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.938l-5.43-7.08L4.5 22H1.244l8.04-9.192L1 2h7.063l4.92 6.518L18.244 2zm-1.22 18h1.833L7.104 4H5.16l11.864 16z"/></svg>,
    linkedin: <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.666H9.353V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.063 2.063 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    send: <svg {...common}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  };
  return map[name] || null;
};

const Nav = () => {
  const [mobile, setMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(null);
  const inPages = typeof window !== 'undefined' && window.location.pathname.includes('/pages/');
  const P = inPages ? '' : 'pages/';
  const HOME = inPages ? '../index.html' : 'index.html';

  const divisionsMenu = [
    { href: `${P}division-group.html`, label: "Transform Group", desc: "Communications & PR" },
    { href: `${P}division-events.html`, label: "Transform Events", desc: "Tokenize · BitAngels · Tiger Mansion" },
    { href: `${P}division-capital.html`, label: "Transform Capital", desc: "Family Office" },
    { href: `${P}division-strategies.html`, label: "Transform Strategies", desc: "Advisory & Consulting" },
    { href: `${P}division-fund.html`, label: "Bitcoin Supercycle Fund", desc: "BTC Investment Fund" },
  ];
  const mediaMenu = [
    { href: `${P}media.html#news`, label: "News & Press", desc: "Interviews & media coverage" },
    { href: `${P}media.html#blog`, label: "Blog", desc: "Insights & analysis" },
  ];

  const openWith = (name) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href={HOME} className="brand">
            <img src={inPages ? "../assets/transform-ventures.png" : "assets/transform-ventures.png"} alt="Transform Ventures" style={{height: 34, width: 'auto'}}/>
          </a>
          <div className="nav-links">
            <a href={`${P}about.html`}>About</a>
            <div className="nav-item" onMouseEnter={() => openWith('divisions')} onMouseLeave={scheduleClose}>
              <a href={`${P}divisions.html`} className="nav-trigger">
                Divisions <Icon name="chevron" size={12}/>
              </a>
              {openMenu === 'divisions' && (
                <div className="nav-dropdown" onMouseEnter={() => openWith('divisions')} onMouseLeave={scheduleClose}>
                  {divisionsMenu.map(m => (
                    <a key={m.href} href={m.href} className="dd-item">
                      <div className="dd-title">{m.label}</div>
                      <div className="dd-desc">{m.desc}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href={`${P}events.html`}>Events</a>
            <div className="nav-item" onMouseEnter={() => openWith('media')} onMouseLeave={scheduleClose}>
              <a href={`${P}media.html`} className="nav-trigger">
                Media <Icon name="chevron" size={12}/>
              </a>
              {openMenu === 'media' && (
                <div className="nav-dropdown" onMouseEnter={() => openWith('media')} onMouseLeave={scheduleClose}>
                  {mediaMenu.map(m => (
                    <a key={m.href} href={m.href} className="dd-item">
                      <div className="dd-title">{m.label}</div>
                      <div className="dd-desc">{m.desc}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href={`${P}leadership.html`}>Leadership</a>
          </div>
          <div className="nav-right">
            <span className="nav-ticker">BTC <b>$118,420</b></span>
            <a href={`${P}contact.html`} className="btn btn-primary">
              Get in touch <Icon name="arrow" size={14}/>
            </a>
            <button className="mobile-nav-toggle" onClick={() => setMobile(!mobile)} aria-label="Menu">
              <Icon name={mobile ? "close" : "menu"} size={22}/>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${mobile ? 'open' : ''}`}>
        <a href={`${P}about.html`}>About</a>
        <div className="m-group">
          <div className="m-group-title">Divisions</div>
          {divisionsMenu.map(m => <a key={m.href} href={m.href} className="m-sub">{m.label}</a>)}
        </div>
        <a href={`${P}events.html`}>Events</a>
        <div className="m-group">
          <div className="m-group-title">Media</div>
          {mediaMenu.map(m => <a key={m.href} href={m.href} className="m-sub">{m.label}</a>)}
        </div>
        <a href={`${P}leadership.html`}>Leadership</a>
        <a href={`${P}contact.html`} style={{color:'var(--accent)', marginTop: 16}}>Get in touch →</a>
      </div>
    </>
  );
};

const Footer = () => {
  const inPages = typeof window !== 'undefined' && window.location.pathname.includes('/pages/');
  const P = inPages ? '' : 'pages/';
  const HOME = inPages ? '../index.html' : 'index.html';
  return (
  <footer className="site">
    <div className="container">
      <div className="foot-grid">
        <div className="foot-brand">
          <a href={HOME} className="brand" style={{gap: 10}}>
            <img src={inPages ? "../assets/transform-ventures.png" : "assets/transform-ventures.png"} alt="Transform Ventures" style={{height: 32, width: 'auto'}}/>
          </a>
          <p>Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential.</p>
        </div>
        <div className="foot-col">
          <h4>Divisions</h4>
          <a href={`${P}divisions.html`}>Transform Group</a>
          <a href={`${P}events.html`}>Transform Events</a>
          <a href={`${P}divisions.html`}>Transform Capital</a>
          <a href={`${P}divisions.html`}>Transform Strategies</a>
          <a href={`${P}divisions.html`}>Supercycle Fund</a>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <a href={`${P}about.html`}>About</a>
          <a href={`${P}leadership.html`}>Leadership</a>
          <a href={`${P}media.html`}>News & Media</a>
          <a href={`${P}media.html`}>Blog</a>
          <a href={`${P}contact.html`}>Contact</a>
        </div>
        <div className="foot-col">
          <h4>Connect</h4>
          <a href="#">Twitter / X</a>
          <a href="#">LinkedIn</a>
          <a href="#">Telegram</a>
          <a href="#">YouTube</a>
        </div>
      </div>
      <div className="foot-bottom">
        <div>© 2026 Transform Ventures · San Juan, Puerto Rico</div>
        <div className="socials">
          <a href="#"><Icon name="x" size={14}/></a>
          <a href="#"><Icon name="linkedin" size={14}/></a>
          <a href="#"><Icon name="send" size={14}/></a>
        </div>
      </div>
    </div>
  </footer>
  );
};

Object.assign(window, { TMark, Icon, Nav, Footer });
