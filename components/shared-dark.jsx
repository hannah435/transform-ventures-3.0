// Shared dark components: Icons, Nav, Footer (path-aware for subpages)
const { useState, useEffect, useRef, useMemo } = React;

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
    megaphone: <svg {...common}><path d="M3 11v2a1 1 0 001 1h2l6 4V6L6 10H4a1 1 0 00-1 1z"/><path d="M15 8a4 4 0 010 8"/></svg>,
    calendar: <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
    bank: <svg {...common}><path d="M3 10l9-6 9 6v2H3zM5 12v6M9 12v6M15 12v6M19 12v6M3 20h18"/></svg>,
    compass: <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></svg>,
    bitcoin: <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9 8h5a2 2 0 010 4H9m0 0h6a2 2 0 010 4H9m0-8v8m3-10v2m0 8v2"/></svg>,
    news: <svg {...common}><path d="M4 5h13v14H4zM17 9h3v10H4"/><path d="M7 9h6M7 13h6M7 17h4"/></svg>,
    pen: <svg {...common}><path d="M4 20h4l10-10-4-4L4 16z"/><path d="M13 6l4 4"/></svg>,
    mic: <svg {...common}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3M8 21h8"/></svg>,
    x: <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.938l-5.43-7.08L4.5 22H1.244l8.04-9.192L1 2h7.063l4.92 6.518L18.244 2zm-1.22 18h1.833L7.104 4H5.16l11.864 16z"/></svg>,
    linkedin: <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.666H9.353V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.063 2.063 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    send: <svg {...common}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  };
  return map[name] || null;
};

const inPages = typeof window !== 'undefined' && window.location.pathname.includes('/pages/');
const P = inPages ? '' : 'pages/';
const HOME = inPages ? '../index-dark.html' : 'index-dark.html';
const ASSET = inPages ? '../assets/' : 'assets/';

const DIVISION_MENU = [
  { name: "Transform Group", sub: "Communications & PR", icon: "megaphone", href: `${P}division-group.html` },
  { name: "Transform Events", sub: "Tokenize / BitAngels / Tiger Mansion", icon: "calendar", href: `${P}division-events.html` },
  { name: "Transform Capital", sub: "Family office", icon: "bank", href: `${P}division-capital.html` },
  { name: "Transform Strategies", sub: "Advisory & consulting", icon: "compass", href: `${P}division-strategies.html` },
  { name: "Bitcoin Supercycle Fund", sub: "BTC investment fund", icon: "bitcoin", href: `${P}division-fund.html` },
];

const MEDIA_MENU = [
  { name: "News & Press", sub: "Interviews & media coverage", icon: "news", href: `${P}media.html#news` },
  { name: "Blog", sub: "Insights & analysis", icon: "pen", href: `${P}blog.html` },
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
        <a href={HOME} className="brand">
          <img src={`${ASSET}transform-ventures-white.png`} alt="Transform Ventures"/>
        </a>
        <ul>
          <li><a href={`${P}about.html`}>About</a></li>
          <NavDropdown label="Divisions" items={DIVISION_MENU}
            open={openMenu === 'div'}
            onOpen={() => setOpenMenu('div')}
            onClose={() => setOpenMenu(null)}/>
          <li><a href={`${P}events.html`}>Events</a></li>
          <NavDropdown label="Media" items={MEDIA_MENU}
            open={openMenu === 'media'}
            onOpen={() => setOpenMenu('media')}
            onClose={() => setOpenMenu(null)}/>
          <li><a href={`${P}leadership.html`}>Leadership</a></li>
        </ul>
        <a href={`${P}contact.html`} className="cta">Contact</a>
        <button className={`d-nav-toggle ${mobile ? 'open' : ''}`} onClick={() => setMobile(!mobile)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mobile-menu-d ${mobile ? 'open' : ''}`}>
        <button className="mm-close" onClick={closeMobile} aria-label="Close menu">×</button>
        <div className="mm-inner">
          <a href={`${P}about.html`} className="mm-link">About</a>
          <button type="button" className={`mm-link mm-expand ${mobileSub==='div'?'open':''}`} onClick={() => setMobileSub(mobileSub==='div'?null:'div')}>
            <span>Divisions</span> <Chev/>
          </button>
          {mobileSub==='div' && (
            <div className="mm-sub-wrap">
              {DIVISION_MENU.map(it => <a key={it.name} href={it.href} className="mm-sub">{it.name}</a>)}
            </div>
          )}
          <a href={`${P}events.html`} className="mm-link">Events</a>
          <button type="button" className={`mm-link mm-expand ${mobileSub==='media'?'open':''}`} onClick={() => setMobileSub(mobileSub==='media'?null:'media')}>
            <span>Media</span> <Chev/>
          </button>
          {mobileSub==='media' && (
            <div className="mm-sub-wrap">
              {MEDIA_MENU.map(it => <a key={it.name} href={it.href} className="mm-sub">{it.name}</a>)}
            </div>
          )}
          <a href={`${P}leadership.html`} className="mm-link">Leadership</a>
          <a href={`${P}contact.html`} className="mm-cta">Contact →</a>
        </div>
      </div>
    </>
  );
};

const Footer = () => (
  <footer className="d-footer">
    <div className="container">
      <div className="cols">
        <div className="brand-col">
          <img src={`${ASSET}transform-ventures-white.png`} alt="Transform Ventures"/>
          <p>Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential.</p>
        </div>
        <div className="col">
          <h4>Divisions</h4>
          <ul>
            <li><a href={`${P}division-group.html`}>Transform Group</a></li>
            <li><a href={`${P}division-events.html`}>Transform Events</a></li>
            <li><a href={`${P}division-capital.html`}>Transform Capital</a></li>
            <li><a href={`${P}division-strategies.html`}>Transform Strategies</a></li>
            <li><a href={`${P}division-fund.html`}>Supercycle Fund</a></li>
          </ul>
        </div>
        <div className="col">
          <h4>Company</h4>
          <ul>
            <li><a href={`${P}about.html`}>About</a></li>
            <li><a href={`${P}leadership.html`}>Leadership</a></li>
            <li><a href={`${P}media.html`}>News & Media</a></li>
            <li><a href={`${P}contact.html`}>Contact</a></li>
          </ul>
        </div>
        <div className="col">
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Twitter / X</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">YouTube</a></li>
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

Object.assign(window, { Icon, Nav, Footer, inPages, P, HOME, ASSET });
