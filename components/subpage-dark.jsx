// Dark subpage scaffolding: page hero, reusable section components, DivisionDetail

function Subpage({ title, eyebrow, intro, children, back }) {
  const backHref = back || HOME;
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
      <section className="d-page-hero">
        <div className="container">
          <a href={backHref} className="back-link">← Back</a>
          {eyebrow && <div className="eyebrow-inline"><span className="d"/>{eyebrow}</div>}
          <h1><span className="grad">{title}</span></h1>
          {intro && <p className="lead">{intro}</p>}
        </div>
      </section>
      {children}
      <Footer/>
    </>
  );
}

const DIVISIONS = [
  { key: "group", num: "01", short: "Group", name: "Transform Group", tag: "Communications & PR", desc: "The original blockchain PR firm — launched the first-ever token sale (Mastercoin, 2013) and powered 100+ prominent ICO-era launches including Ethereum, EOS, Augur, and Tether.", color: "var(--purple)", badge: "Parent Organization" },
  { key: "events", num: "02", short: "Events", name: "Transform Events", tag: "Tokenize / BitAngels / Tiger Mansion", desc: "Premier blockchain events connecting founders and investors worldwide through curated gatherings.", color: "var(--teal)", badge: "Events & Conferences" },
  { key: "capital", num: "03", short: "Capital", name: "Transform Capital", tag: "Family Office", desc: "Strategic investments across the digital asset landscape with a long-term investment horizon.", color: "#F7931A", badge: "Family Office" },
  { key: "strategies", num: "04", short: "Strategies", name: "Transform Strategies", tag: "Advisory & Consulting", desc: "Go-to-market strategy, tokenomics design, and ecosystem development for blockchain ventures.", color: "var(--purple)", badge: "Advisory" },
  { key: "fund", num: "05", short: "Supercycle", name: "Bitcoin Supercycle Fund", tag: "BTC Investment Fund", desc: "The first liquid bitcoin-only hedge fund using the 'Four Seasons of Bitcoin' cycle model and algorithmic trading.", color: "#F7931A", badge: "Investment Fund" },
];

const CTAStrip = () => (
  <section className="d-section">
    <div className="container">
      <div className="final-cta reveal-d">
        <h2>Ready to transform your blockchain venture?</h2>
        <p>Whether you're raising capital, launching a token, or need strategic guidance — let's connect.</p>
        <div className="ctas">
          <a className="btn-lime" href={`${P}contact.html`}>Start a conversation →</a>
          <a className="btn-outline" href={`${P}media.html`}>Latest news & media</a>
        </div>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="d-section stat-band">
    <div className="wavy-bg"/>
    <div className="container">
      <div className="sub-stats sub-stats-4up">
        <div className="reveal-d d1"><div className="n">100+</div><div className="l">ICO-Era Token Launches</div></div>
        <div className="reveal-d d2"><div className="n">$200M</div><div className="l">Marketwire Exit to NASDAQ</div></div>
        <div className="reveal-d d3"><div className="n">2013</div><div className="l">First Token Sale · First Angel Group</div></div>
        <div className="reveal-d d3"><div className="n">5</div><div className="l">Specialized Divisions</div></div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="d-section">
    <div className="container">
      <div className="contact-grid-d reveal-d">
        <div className="contact-intro-d">
          <div className="eyebrow-inline"><span className="d"/>Get in touch</div>
          <h2>Let's build the future together.</h2>
          <p>We'd love to hear about your project, partnership idea, or investment inquiry.</p>
          <div className="contact-info-d">
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
        <form className="form-d" onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch shortly."); }}>
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
          <button type="submit" className="btn-lime">Send message →</button>
        </form>
      </div>
    </div>
  </section>
);

const Leader = () => (
  <section className="d-section">
    <div className="container">
      <div className="leader-d reveal-d">
        <div className="photo"><img src={`${ASSET}michael-terpin.jpg`} alt="Michael Terpin" loading="lazy" decoding="async"/></div>
        <div className="info">
          <div className="role">Founder & CEO · CIO, Bitcoin Supercycle Fund</div>
          <div className="name">Michael Terpin</div>
          <p style={{marginTop: 20}}>Early bitcoin investor, thought leader, and serial entrepreneur — known as the "Godfather of Crypto" (CNBC). Chief Investment Officer of the Bitcoin Supercycle Fund and author of <i>Bitcoin Supercycle</i> (Skyhorse Publishing, 2024), which correctly predicted the November 2024 all-time high for bitcoin.</p>
          <p style={{marginTop: 14}}>Creator of CoinAgenda (now rebranded as <i>Tokenize</i>), the leading conference series connecting investors with crypto, and co-founder of BitAngels (2013), the first crypto angel group. Previously founded Marketwire, the first Internet-based newswire (backed by Sequoia Capital), sold to NASDAQ for $200M.</p>
          <div className="tags">
            <span>Godfather of Crypto</span>
            <span>Transform Ventures</span>
            <span>Transform Group</span>
            <span>BitAngels Co-Founder</span>
            <span>Tokenize Creator</span>
            <span>Marketwire Founder</span>
            <span>Author</span>
            <span>Puerto Rico</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Media = () => {
  const items = [
    {
      src: "Kitco News", icon: "play", type: "youtube", ytid: "oQkCrnJ8wxk",
      title: "The Debt Trap: Why Gold Pumps First and Bitcoin Follows",
      desc: "Michael Terpin discusses the macro relationship between gold and bitcoin, the debt cycle, and why bitcoin follows gold's trajectory with a lag.",
      cta: "Watch on YouTube",
      url: "https://youtu.be/oQkCrnJ8wxk",
    },
    {
      src: "Bonnie Blockchain", icon: "play", type: "youtube", ytid: "mUM4yvlpMW0",
      title: "Bitcoin Market Analysis with Michael Terpin",
      desc: "The \"Godfather of Crypto\" joins Bonnie Blockchain to discuss bitcoin market cycles, the Four Seasons model, and what's next for the crypto market.",
      cta: "Watch on YouTube",
      url: "https://youtu.be/mUM4yvlpMW0",
    },
    {
      src: "LinkedIn", icon: "linkedin", type: "social", grad: "linear-gradient(135deg, #0a9488 0%, #2dd4bf 55%, #5eecd5 100%)",
      title: "Tokenize! LATAM — Featuring the \"Godfather of Crypto\"",
      desc: "Michael Terpin kicks off Tokenize! LATAM, bringing blockchain and crypto thought leadership to the Latin American market.",
      cta: "View Post",
      url: "https://www.linkedin.com/posts/tokenizecon_whos-better-to-kick-off-tokenize-latam-activity-7442774200999821312-CshG",
    },
    {
      src: "Yahoo Finance / TheStreet", icon: "news", type: "article", grad: "linear-gradient(135deg, #120840 0%, #2a1570 50%, #6D4AFF 100%)",
      title: "Veteran Investor Predicts Shocking Bitcoin Rally by 2033",
      desc: "Michael Terpin outlines his prediction that bitcoin could reach $1 million by 2033 — driven by scarcity from the halving mechanism and growing institutional adoption through spot Bitcoin ETFs.",
      cta: "Read Article",
      url: "https://finance.yahoo.com/news/veteran-investor-predicts-shocking-bitcoin-145042798.html",
    },
    {
      src: "Benzinga", icon: "news", type: "article", grad: "linear-gradient(135deg, #0a1028 0%, #1a3060 50%, #3b82f6 100%)",
      title: "Bitcoin To Reach $190,000 This Cycle, Michael Terpin Says",
      desc: "Transform Ventures CEO Michael Terpin shares his bitcoin price target for the current cycle, explaining the Four Seasons model and why the blow-off top phase typically peaks in Q4 after the halving.",
      cta: "Read Article",
      url: "https://www.benzinga.com/markets/cryptocurrency/24/11/42096519/bitcoin-to-reach-190000-this-cycle-michael-terpin-of-transform-group-says",
    },
    {
      src: "CoinDesk", icon: "news", type: "article", grad: "linear-gradient(135deg, #3d2a15 0%, #6b4a2a 50%, #f7a72f 100%)",
      title: "Transform Ventures CEO Says Bitcoin Could See \"One More Point of Pain\"",
      desc: "Michael Terpin discusses bitcoin's near-term outlook, warning of potential downside before the next major rally, and explains how the Supercycle Fund navigates bear market phases.",
      cta: "Read Article",
      url: "https://www.coindesk.com/markets/2026/02/12/transform-ventures-ceo-michael-terpin-says-bitcoin-could-see-one-more-point-of-pain",
    },
    {
      src: "London Real", icon: "mic", type: "interview", grad: "linear-gradient(135deg, #1a0d40 0%, #3a1f9e 50%, #6D4AFF 100%)",
      title: "Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich",
      desc: "Michael Terpin joins Brian Rose on London Real to explain how to time the bitcoin supercycle using his Four Seasons framework — turning crypto's cyclical patterns into a wealth-building strategy.",
      cta: "Watch Interview",
      url: "https://londonreal.tv/michael-terpin-bitcoin-supercycle-how-the-crypto-calendar-can-make-you-rich/",
    },
    {
      src: "Supply Shock Podcast", icon: "mic", type: "podcast", grad: "linear-gradient(135deg, #2a0d60 0%, #5b2d99 50%, #9b6dcc 100%)",
      title: "Bitcoin's Blow-off Top is Coming",
      desc: "Michael Terpin explains why the four-year bitcoin cycle is still intact, how bitcoin operates in \"seasons\" with predictable post-halving behavior, and why macro forces and ETF inflows may distort short-term sentiment but not the cycle.",
      cta: "Listen on Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/bitcoins-blow-off-top-is-coming-michael-terpin/id1558223079?i=1000721015026",
    },
    {
      src: "Medium", icon: "pen", type: "article", grad: "linear-gradient(135deg, #0a9488 0%, #0FB5A5 50%, #5eecd5 100%)",
      title: "Bitcoin Summer's Sudden End?",
      desc: "Michael Terpin analyzes the unexpected shift in bitcoin's seasonal cycle, examining whether the \"summer\" phase ended early and what it means for investors positioning for the next move.",
      cta: "Read on Medium",
      url: "https://medium.com/@michaelterpin/bitcoin-summers-sudden-end-3b77cd526608",
    },
  ];
  return (
    <section id="news" className="d-section">
      <div className="container">
        <div className="sec-head reveal-d">
          <div className="eyebrow-inline"><span className="d"/>News & Press</div>
          <h2><span className="grad-txt">News & Media</span></h2>
          <p className="sub">Interviews, appearances, and press coverage featuring Michael Terpin and Transform Ventures.</p>
        </div>
        <div className="news-grid-d">
          {items.map((it, i) => (
            <a href={it.url} target="_blank" rel="noopener" key={it.title} className={`news-card-d reveal-d d${(i%3)+1}`}>
              <div className={`thumb ${it.type}`}>
                {it.type === 'youtube' ? (
                  <>
                    <img src={`https://img.youtube.com/vi/${it.ytid}/maxresdefault.jpg`} alt={it.title} loading="lazy" decoding="async"/>
                    <div className="play-ovr"><Icon name="play" size={22}/></div>
                  </>
                ) : (
                  <div className="grad" style={{background: it.grad}}/>
                )}
              </div>
              <div className="body">
                <div className="src"><Icon name={it.icon} size={13}/> {it.src.toUpperCase()}</div>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
                <div className="cta">{it.cta} ↗</div>
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
    { id: "four-seasons", tag: "Bitcoin Cycles", date: "April 2026", title: "Understanding the Four Seasons of Bitcoin", desc: "Michael Terpin's Four Seasons model maps bitcoin's price to a predictable four-year cycle driven by the halving. Spring follows steady accumulation; summer, the parabolic rally; fall, the correction; winter, the reset before the next cycle." },
    { id: "1m-by-2033", tag: "Market Analysis", date: "March 2026", title: "Why Bitcoin Could Reach $1 Million by 2033", desc: "With each halving reducing supply while institutional demand accelerates through spot ETFs, the math points to a dramatically higher bitcoin price over the next two cycles." },
    { id: "algo-trading", tag: "Fund Strategy", date: "February 2026", title: "How Algorithmic Trading Enhances Bitcoin Cycle Returns", desc: "Combining the Four Seasons cycle model with algorithmic execution creates season-specific strategies that can significantly outperform buy-and-hold." },
    { id: "bitcoin-only-fund", tag: "Industry", date: "January 2026", title: "The Case for a Bitcoin-Only Hedge Fund", desc: "Why concentration — not diversification across altcoins — is the right call for institutional capital that wants asymmetric upside with defined downside." },
  ];
  return (
    <section id="blog" className="d-section">
      <div className="container">
        <div className="sec-head reveal-d">
          <div className="eyebrow-inline"><span className="d"/>Blog & Insights</div>
          <h2>Analysis from the Godfather of Crypto.</h2>
          <p className="sub">Thought leadership and market commentary on bitcoin cycles, crypto investing, and blockchain technology.</p>
        </div>
        <div className="blog-grid-d">
          {posts.map((p, i) => (
            <a href={`${P}blog.html#${p.id}`} key={p.title} className={`blog-card-d reveal-d d${(i%3)+1}`}>
              <div className="meta">
                <span className="tag">{p.tag}</span>
                <span className="date">{p.date}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="more">Read more →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersBar = () => (
  <section className="partners-bar-d">
    <div className="label">Portfolio & Partners</div>
    <div className="logos">
      <img src={`${ASSET}transform-group.png`} alt="Transform Group" loading="lazy" decoding="async"/>
      <img src={`${ASSET}bitangels.png`} alt="BitAngels" loading="lazy" decoding="async"/>
      <span className="txt">Tokenize</span>
      <span className="txt">Ethereum</span>
      <span className="txt">Tether</span>
      <span className="txt">Neo</span>
    </div>
  </section>
);

const EventsList = () => {
  const events = [
    { name: "Tokenize", tag: "Global Conference", desc: "A premier blockchain conference bringing together industry leaders, investors, and innovators to explore the future of tokenization.", img: `${ASSET}tokenize-vegas.jpg`, url: "https://tokenizeconference.com/" },
    { name: "BitAngels", tag: "Since 2013 · Angel Network", desc: "Co-founded by Michael Terpin in 2013. The world's first angel investor network for digital currency startups.", img: `${ASSET}bitangels-group.webp`, url: "https://bitangels.network/" },
    { name: "Tiger Mansion", tag: "Invite Only", desc: "An exclusive, invite-only gathering for top-tier crypto investors and founders. Intimate, curated networking.", img: `${ASSET}tigermansion-event.jpg`, url: "https://www.tigermansionlv.com/" },
  ];
  return (
    <section className="d-section">
      <div className="container">
        <div className="sec-head reveal-d">
          <div className="eyebrow-inline"><span className="d"/>Event Brands</div>
          <h2>Where the industry connects.</h2>
        </div>
        <div className="events-grid-d">
          {events.map((e, i) => (
            <a href={e.url} target="_blank" rel="noopener" key={e.name} className={`event-card-d reveal-d d${i+1}`}>
              <div className="thumb"><img src={e.img} alt={e.name} loading="lazy" decoding="async"/></div>
              <div className="meta">
                <div className="t">{e.tag}</div>
                <h3>{e.name}</h3>
                <p>{e.desc}</p>
                <div className="visit">Visit website ↗</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Division Detail page
const DIVISION_DATA = {
  group: {
    num: "01", name: "Transform Group", tag: "Communications & PR",
    color: "var(--purple)",
    tagline: "The original blockchain PR firm.",
    lead: "Founded by Michael Terpin in 2013, Transform launched the first-ever token sale (Mastercoin) and powered the exposure of 100+ prominent tokens during the ICO era — including Augur, Bancor, EOS, Ethereum, Golem, Gnosis, Lisk, MaidSafe, Qtum, VideoCoin, and WAX. Additional campaigns include Aeternity, Atari Token, Bittrex, CoinBene, Dash, Factom, ICON Foundation, Kraken, NEM, OKEx, Polymath, Radix, ShapeShift, Telos, and Tether. The only mainstream business and consumer PR firm with deep roots in blockchain.",
    capabilities: [
      { t: "First-ever token sale", d: "Launched the first token sale in blockchain history — Mastercoin, 2013. Powering 100+ prominent tokens through the ICO era and beyond." },
      { t: "Crypto media leadership", d: "Regular placements in every leading crypto publication — CoinDesk, Cointelegraph, Decrypt — plus top industry podcasts and YouTube channels." },
      { t: "Tier-1 mainstream coverage", d: "Client stories placed in AP, BBC, Bloomberg, Business Insider, CNBC, Forbes, Fox, The New York Times, Reuters, TechCrunch, USA Today, VentureBeat, Wall Street Journal, and WIRED." },
      { t: "Global office network", d: "San Juan HQ with additional offices in New York, Los Angeles, San Francisco, Las Vegas, and Toronto — the most extensive footprint in crypto PR." },
    ],
    stats: [["100+","ICO-era Token Launches"],["300+","Clients Since 2013"],["57%","Alt-Coin Market Cap"],["2013","Agency Founded"]],
  },
  events: {
    num: "02", name: "Transform Events", tag: "Tokenize · BitAngels · Tiger Mansion",
    color: "var(--teal)",
    tagline: "Where the industry connects.",
    lead: "Premier blockchain events — Tokenize, BitAngels, Tiger Mansion — connecting founders and investors worldwide through curated conferences and intimate gatherings.",
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
    color: "var(--purple)",
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
    lead: "Combining the 'Four Seasons of Bitcoin' cycle model with algorithmic trading and season-specific strategies. Institutional-grade: Coinbase Prime custody, NAV Fund Services administration.",
    capabilities: [
      { t: "Four Seasons of Bitcoin", d: "Cycle model mapping BTC to predictable halving-driven phases: spring, summer, fall, winter." },
      { t: "Algorithmic trading", d: "Season-specific strategies executed algorithmically — sell near cycle peaks, buy near bottoms." },
      { t: "Bitcoin-only mandate", d: "100% concentrated in bitcoin — no altcoins, no distractions." },
      { t: "Institutional rails", d: "Coinbase Prime custody. NAV Fund Services administration. Regulated structure." },
    ],
    stats: [["100%","Bitcoin-Only"],["Algo","Trading Engine"],["4 Seasons","Cycle Model"],["2024","Fund Launch"]],
    book: {
      img: `${ASSET}bitcoin-supercycle-book.jpg`,
      title: "Bitcoin Supercycle",
      tag: "Amazon Best Seller · 2024",
      desc: "How the crypto calendar can make you rich — by Michael Terpin. The foundational thesis behind the fund's seasonal signal and cycle-driven strategy.",
      amazon: "https://www.amazon.com/Bitcoin-Supercycle-Crypto-Calendar-Make/dp/151078215X",
    },
  },
};

function DivisionDetail({ slug }) {
  const d = DIVISION_DATA[slug];
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal-d').forEach(el => io.observe(el));
  }, []);
  if (!d) return null;
  return (
    <>
      <Nav/>
      <section className="d-page-hero division-hero">
        <div className="hero-glow" aria-hidden="true"/>
        <div className="container">
          <a href={`${P}divisions.html`} className="back-link">← All divisions</a>
          <div className="eyebrow-inline" style={{color: d.color}}><span className="d" style={{background: d.color}}/>/ {d.num} — {d.tag}</div>
          <h1><span className="grad">{d.tagline}</span></h1>
          <p className="lead">{d.lead}</p>
          <div className="ctas">
            <a className="btn-lime" href={`${P}contact.html`}>Get in touch →</a>
            <a className="btn-outline" href={`${P}divisions.html`}>Explore all divisions</a>
          </div>
        </div>
      </section>

      <section className="d-section stat-band">
        <div className="wavy-bg"/>
        <div className="container">
          <div className="sub-stats sub-stats-4up">
            {d.stats.map(([n,l],i) => (
              <div key={i} className={`reveal-d d${(i%3)+1}`}><div className="n">{n}</div><div className="l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section">
        <div className="container">
          <div className="sec-head reveal-d">
            <div className="eyebrow-inline"><span className="d"/>Capabilities</div>
            <h2>What we do.</h2>
          </div>
          <div className="cap-grid-d">
            {d.capabilities.map((c, i) => (
              <div key={c.t} className={`dark-card reveal-d d${(i%3)+1}`}>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {d.book && (
        <section className="d-section">
          <div className="container">
            <div className="fund-banner reveal-d">
              <div className="book"><img src={d.book.img} alt={d.book.title} loading="lazy" decoding="async"/></div>
              <div className="copy">
                <span className="tag-orange">{d.book.tag}</span>
                <h3>{d.book.title}</h3>
                <p>{d.book.desc}</p>
                <div className="actions" style={{marginTop: 24}}>
                  <a className="btn-lime" href={`${P}contact.html`}>Learn more →</a>
                  <a className="btn-outline" href={d.book.amazon} target="_blank" rel="noopener">Buy on Amazon ↗</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTAStrip/>
      <Footer/>
    </>
  );
}

Object.assign(window, {
  Subpage, DIVISIONS, CTAStrip, Stats, Contact, Leader,
  Media, Blog, EventsList, PartnersBar, DivisionDetail, DIVISION_DATA
});
