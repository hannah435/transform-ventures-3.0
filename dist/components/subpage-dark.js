// Dark subpage scaffolding: page hero, reusable section components, DivisionDetail

function Subpage({
  title,
  eyebrow,
  intro,
  children,
  back
}) {
  const backHref = back || HOME;
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    document.querySelectorAll('.reveal-d').forEach(el => io.observe(el));
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("section", {
    className: "d-page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("a", {
    href: backHref,
    className: "back-link"
  }, "\u2190 Back"), eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), eyebrow), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "grad"
  }, title)), intro && /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, intro))), children, /*#__PURE__*/React.createElement(Footer, null));
}
const DIVISIONS = [{
  key: "group",
  num: "01",
  short: "Group",
  name: "Transform Group",
  tag: "Communications & PR",
  desc: "The original blockchain PR firm — launched the first-ever token sale (Mastercoin, 2013) and powered 100+ prominent ICO-era launches including Ethereum, EOS, Augur, and Tether.",
  color: "var(--purple)",
  badge: "Parent Organization"
}, {
  key: "events",
  num: "02",
  short: "Events",
  name: "Transform Events",
  tag: "Tokenize / BitAngels / Tiger Mansion",
  desc: "Premier blockchain events connecting founders and investors worldwide through curated gatherings.",
  color: "var(--teal)",
  badge: "Events & Conferences"
}, {
  key: "capital",
  num: "03",
  short: "Capital",
  name: "Transform Capital",
  tag: "Family Office",
  desc: "Strategic investments across the digital asset landscape with a long-term investment horizon.",
  color: "#F7931A",
  badge: "Family Office"
}, {
  key: "strategies",
  num: "04",
  short: "Strategies",
  name: "Transform Strategies",
  tag: "Advisory & Consulting",
  desc: "Go-to-market strategy, tokenomics design, and ecosystem development for blockchain ventures.",
  color: "var(--purple)",
  badge: "Advisory"
}, {
  key: "fund",
  num: "05",
  short: "Supercycle",
  name: "Bitcoin Supercycle Fund",
  tag: "BTC Investment Fund",
  desc: "The first liquid bitcoin-only hedge fund using the 'Four Seasons of Bitcoin' cycle model and algorithmic trading.",
  color: "#F7931A",
  badge: "Investment Fund"
}];
const CTAStrip = () => /*#__PURE__*/React.createElement("section", {
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "final-cta reveal-d"
}, /*#__PURE__*/React.createElement("h2", null, "Ready to transform your blockchain venture?"), /*#__PURE__*/React.createElement("p", null, "Whether you're raising capital, launching a token, or need strategic guidance \u2014 let's connect."), /*#__PURE__*/React.createElement("div", {
  className: "ctas"
}, /*#__PURE__*/React.createElement("a", {
  className: "btn-lime",
  href: `${P}contact.html`
}, "Start a conversation \u2192"), /*#__PURE__*/React.createElement("a", {
  className: "btn-outline",
  href: `${P}media.html`
}, "Latest news & media")))));
const Stats = () => /*#__PURE__*/React.createElement("section", {
  className: "d-section stat-band"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "sub-stats sub-stats-4up"
}, /*#__PURE__*/React.createElement("div", {
  className: "reveal-d d1"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "100+"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "ICO-Era Token Launches")), /*#__PURE__*/React.createElement("div", {
  className: "reveal-d d2"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "$200M"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Marketwire Exit to NASDAQ")), /*#__PURE__*/React.createElement("div", {
  className: "reveal-d d3"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "2013"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "First Token Sale \xB7 First Angel Group")), /*#__PURE__*/React.createElement("div", {
  className: "reveal-d d3"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "5"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Specialized Divisions")))));
const Contact = () => /*#__PURE__*/React.createElement("section", {
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "contact-grid-d reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "contact-intro-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow-inline"
}, /*#__PURE__*/React.createElement("span", {
  className: "d"
}), "Get in touch"), /*#__PURE__*/React.createElement("h2", null, "Let's build the future together."), /*#__PURE__*/React.createElement("p", null, "We'd love to hear about your project, partnership idea, or investment inquiry."), /*#__PURE__*/React.createElement("div", {
  className: "contact-info-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "row"
}, /*#__PURE__*/React.createElement("div", {
  className: "ic"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "pin",
  size: 16
})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Location"), /*#__PURE__*/React.createElement("div", {
  className: "v"
}, "San Juan, Puerto Rico"))), /*#__PURE__*/React.createElement("div", {
  className: "row"
}, /*#__PURE__*/React.createElement("div", {
  className: "ic"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "mail",
  size: 16
})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Email"), /*#__PURE__*/React.createElement("div", {
  className: "v"
}, "info@transformventures.io"))), /*#__PURE__*/React.createElement("div", {
  className: "row"
}, /*#__PURE__*/React.createElement("div", {
  className: "ic"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "spark",
  size: 16
})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Interests"), /*#__PURE__*/React.createElement("div", {
  className: "v"
}, "Investments \xB7 Advisory \xB7 Events \xB7 Partnerships"))))), /*#__PURE__*/React.createElement("form", {
  className: "form-d",
  onSubmit: e => {
    // TODO: wire up to a real backend — Formspree, Web3Forms, or a Cloudflare Worker.
    // Static hosting (Cloudflare Pages / GitHub Pages) cannot accept POSTs, so we currently
    // open the user's mail client as a graceful fallback.
    e.preventDefault();
    const form = e.currentTarget;
    const [name, email, topic, message] = Array.from(form.elements).filter(el => el.name !== '' || el.tagName !== 'BUTTON');
    const subject = encodeURIComponent(`Transform Ventures inquiry${topic && topic.value ? ` — ${topic.value}` : ''}`);
    const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\nInterested in: ${topic.value || '(unspecified)'}\n\n${message.value}`);
    window.location.href = `mailto:info@transformventures.io?subject=${subject}&body=${body}`;
  }
}, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
  className: "lab"
}, "Name"), /*#__PURE__*/React.createElement("input", {
  required: true,
  placeholder: "Your name"
})), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
  className: "lab"
}, "Email"), /*#__PURE__*/React.createElement("input", {
  type: "email",
  required: true,
  placeholder: "you@company.com"
})), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
  className: "lab"
}, "I'm interested in"), /*#__PURE__*/React.createElement("select", {
  defaultValue: ""
}, /*#__PURE__*/React.createElement("option", {
  value: "",
  disabled: true
}, "Select a topic\u2026"), /*#__PURE__*/React.createElement("option", null, "Investment inquiry"), /*#__PURE__*/React.createElement("option", null, "Advisory / consulting"), /*#__PURE__*/React.createElement("option", null, "Event partnership"), /*#__PURE__*/React.createElement("option", null, "Press / media"), /*#__PURE__*/React.createElement("option", null, "Other"))), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("span", {
  className: "lab"
}, "Message"), /*#__PURE__*/React.createElement("textarea", {
  required: true,
  placeholder: "Tell us about your project\u2026"
})), /*#__PURE__*/React.createElement("button", {
  type: "submit",
  className: "btn-lime"
}, "Send message \u2192")))));
const Leader = () => /*#__PURE__*/React.createElement("section", {
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "leader-d reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "photo"
}, /*#__PURE__*/React.createElement("img", {
  src: `${ASSET}michael-terpin.jpg`,
  alt: "Michael Terpin",
  loading: "lazy",
  decoding: "async"
})), /*#__PURE__*/React.createElement("div", {
  className: "info"
}, /*#__PURE__*/React.createElement("div", {
  className: "role"
}, "Founder & CEO \xB7 CIO, Bitcoin Supercycle Fund"), /*#__PURE__*/React.createElement("div", {
  className: "name"
}, "Michael Terpin"), /*#__PURE__*/React.createElement("p", {
  style: {
    marginTop: 20
  }
}, "Early bitcoin investor, thought leader, and serial entrepreneur \u2014 known as the \"Godfather of Crypto\" (CNBC). Chief Investment Officer of the Bitcoin Supercycle Fund and author of ", /*#__PURE__*/React.createElement("i", null, "Bitcoin Supercycle"), " (Skyhorse Publishing, 2024), which correctly predicted the November 2024 all-time high for bitcoin."), /*#__PURE__*/React.createElement("p", {
  style: {
    marginTop: 14
  }
}, "Creator of CoinAgenda (now rebranded as ", /*#__PURE__*/React.createElement("i", null, "Tokenize"), "), the leading conference series connecting investors with crypto, and co-founder of BitAngels (2013), the first crypto angel group. Previously founded Marketwire, the first Internet-based newswire (backed by Sequoia Capital), sold to NASDAQ for $200M."), /*#__PURE__*/React.createElement("div", {
  className: "tags"
}, /*#__PURE__*/React.createElement("span", null, "Godfather of Crypto"), /*#__PURE__*/React.createElement("span", null, "Transform Ventures"), /*#__PURE__*/React.createElement("span", null, "Transform Group"), /*#__PURE__*/React.createElement("span", null, "BitAngels Co-Founder"), /*#__PURE__*/React.createElement("span", null, "Tokenize Creator"), /*#__PURE__*/React.createElement("span", null, "Marketwire Founder"), /*#__PURE__*/React.createElement("span", null, "Author"), /*#__PURE__*/React.createElement("span", null, "Puerto Rico"))))));
const Media = () => {
  const items = [{
    src: "Kitco News",
    icon: "play",
    type: "youtube",
    ytid: "oQkCrnJ8wxk",
    title: "The Debt Trap: Why Gold Pumps First and Bitcoin Follows",
    desc: "Michael Terpin discusses the macro relationship between gold and bitcoin, the debt cycle, and why bitcoin follows gold's trajectory with a lag.",
    cta: "Watch on YouTube",
    url: "https://youtu.be/oQkCrnJ8wxk"
  }, {
    src: "Bonnie Blockchain",
    icon: "play",
    type: "youtube",
    ytid: "mUM4yvlpMW0",
    title: "Bitcoin Market Analysis with Michael Terpin",
    desc: "The \"Godfather of Crypto\" joins Bonnie Blockchain to discuss bitcoin market cycles, the Four Seasons model, and what's next for the crypto market.",
    cta: "Watch on YouTube",
    url: "https://youtu.be/mUM4yvlpMW0"
  }, {
    src: "LinkedIn",
    icon: "linkedin",
    type: "social",
    grad: "linear-gradient(135deg, #0a9488 0%, #2dd4bf 55%, #5eecd5 100%)",
    title: "Tokenize! LATAM — Featuring the \"Godfather of Crypto\"",
    desc: "Michael Terpin kicks off Tokenize! LATAM, bringing blockchain and crypto thought leadership to the Latin American market.",
    cta: "View Post",
    url: "https://www.linkedin.com/posts/tokenizecon_whos-better-to-kick-off-tokenize-latam-activity-7442774200999821312-CshG"
  }, {
    src: "Yahoo Finance / TheStreet",
    icon: "news",
    type: "article",
    grad: "linear-gradient(135deg, #120840 0%, #2a1570 50%, #6D4AFF 100%)",
    title: "Veteran Investor Predicts Shocking Bitcoin Rally by 2033",
    desc: "Michael Terpin outlines his prediction that bitcoin could reach $1 million by 2033 — driven by scarcity from the halving mechanism and growing institutional adoption through spot Bitcoin ETFs.",
    cta: "Read Article",
    url: "https://finance.yahoo.com/news/veteran-investor-predicts-shocking-bitcoin-145042798.html"
  }, {
    src: "Benzinga",
    icon: "news",
    type: "article",
    grad: "linear-gradient(135deg, #0a1028 0%, #1a3060 50%, #3b82f6 100%)",
    title: "Bitcoin To Reach $190,000 This Cycle, Michael Terpin Says",
    desc: "Transform Ventures CEO Michael Terpin shares his bitcoin price target for the current cycle, explaining the Four Seasons model and why the blow-off top phase typically peaks in Q4 after the halving.",
    cta: "Read Article",
    url: "https://www.benzinga.com/markets/cryptocurrency/24/11/42096519/bitcoin-to-reach-190000-this-cycle-michael-terpin-of-transform-group-says"
  }, {
    src: "CoinDesk",
    icon: "news",
    type: "article",
    grad: "linear-gradient(135deg, #3d2a15 0%, #6b4a2a 50%, #f7a72f 100%)",
    title: "Transform Ventures CEO Says Bitcoin Could See \"One More Point of Pain\"",
    desc: "Michael Terpin discusses bitcoin's near-term outlook, warning of potential downside before the next major rally, and explains how the Supercycle Fund navigates bear market phases.",
    cta: "Read Article",
    url: "https://www.coindesk.com/markets/2026/02/12/transform-ventures-ceo-michael-terpin-says-bitcoin-could-see-one-more-point-of-pain"
  }, {
    src: "London Real",
    icon: "mic",
    type: "interview",
    grad: "linear-gradient(135deg, #1a0d40 0%, #3a1f9e 50%, #6D4AFF 100%)",
    title: "Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich",
    desc: "Michael Terpin joins Brian Rose on London Real to explain how to time the bitcoin supercycle using his Four Seasons framework — turning crypto's cyclical patterns into a wealth-building strategy.",
    cta: "Watch Interview",
    url: "https://londonreal.tv/michael-terpin-bitcoin-supercycle-how-the-crypto-calendar-can-make-you-rich/"
  }, {
    src: "Supply Shock Podcast",
    icon: "mic",
    type: "podcast",
    grad: "linear-gradient(135deg, #2a0d60 0%, #5b2d99 50%, #9b6dcc 100%)",
    title: "Bitcoin's Blow-off Top is Coming",
    desc: "Michael Terpin explains why the four-year bitcoin cycle is still intact, how bitcoin operates in \"seasons\" with predictable post-halving behavior, and why macro forces and ETF inflows may distort short-term sentiment but not the cycle.",
    cta: "Listen on Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/bitcoins-blow-off-top-is-coming-michael-terpin/id1558223079?i=1000721015026"
  }, {
    src: "Medium",
    icon: "pen",
    type: "article",
    grad: "linear-gradient(135deg, #0a9488 0%, #0FB5A5 50%, #5eecd5 100%)",
    title: "Bitcoin Summer's Sudden End?",
    desc: "Michael Terpin analyzes the unexpected shift in bitcoin's seasonal cycle, examining whether the \"summer\" phase ended early and what it means for investors positioning for the next move.",
    cta: "Read on Medium",
    url: "https://medium.com/@michaelterpin/bitcoin-summers-sudden-end-3b77cd526608"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "news",
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head reveal-d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), "News & Press"), /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("span", {
    className: "grad-txt"
  }, "News & Media")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Interviews, appearances, and press coverage featuring Michael Terpin and Transform Ventures.")), /*#__PURE__*/React.createElement("div", {
    className: "news-grid-d"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("a", {
    href: it.url,
    target: "_blank",
    rel: "noopener",
    key: it.title,
    className: `news-card-d reveal-d d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `thumb ${it.type}`
  }, it.type === 'youtube' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: `https://img.youtube.com/vi/${it.ytid}/maxresdefault.jpg`,
    alt: it.title,
    loading: "lazy",
    decoding: "async"
  }), /*#__PURE__*/React.createElement("div", {
    className: "play-ovr"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 22
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "grad",
    style: {
      background: it.grad
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "src"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 13
  }), " ", it.src.toUpperCase()), /*#__PURE__*/React.createElement("h3", null, it.title), /*#__PURE__*/React.createElement("p", null, it.desc), /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, it.cta, " \u2197")))))));
};
const Blog = () => {
  const posts = [{
    id: "four-seasons",
    tag: "Bitcoin Cycles",
    date: "April 2026",
    title: "Understanding the Four Seasons of Bitcoin",
    desc: "Michael Terpin's Four Seasons model maps bitcoin's price to a predictable four-year cycle driven by the halving. Spring follows steady accumulation; summer, the parabolic rally; fall, the correction; winter, the reset before the next cycle."
  }, {
    id: "1m-by-2033",
    tag: "Market Analysis",
    date: "March 2026",
    title: "Why Bitcoin Could Reach $1 Million by 2033",
    desc: "With each halving reducing supply while institutional demand accelerates through spot ETFs, the math points to a dramatically higher bitcoin price over the next two cycles."
  }, {
    id: "algo-trading",
    tag: "Fund Strategy",
    date: "February 2026",
    title: "How Algorithmic Trading Enhances Bitcoin Cycle Returns",
    desc: "Combining the Four Seasons cycle model with algorithmic execution creates season-specific strategies that can significantly outperform buy-and-hold."
  }, {
    id: "bitcoin-only-fund",
    tag: "Industry",
    date: "January 2026",
    title: "The Case for a Bitcoin-Only Hedge Fund",
    desc: "Why concentration — not diversification across altcoins — is the right call for institutional capital that wants asymmetric upside with defined downside."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "blog",
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head reveal-d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), "Blog & Insights"), /*#__PURE__*/React.createElement("h2", null, "Analysis from the Godfather of Crypto."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Thought leadership and market commentary on bitcoin cycles, crypto investing, and blockchain technology.")), /*#__PURE__*/React.createElement("div", {
    className: "blog-grid-d"
  }, posts.map((p, i) => /*#__PURE__*/React.createElement("a", {
    href: `${P}blog.html#${p.id}`,
    key: p.title,
    className: `blog-card-d reveal-d d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, p.tag), /*#__PURE__*/React.createElement("span", {
    className: "date"
  }, p.date)), /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "more"
  }, "Read more \u2192"))))));
};
const PartnersBar = () => /*#__PURE__*/React.createElement("section", {
  className: "partners-bar-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "label"
}, "Portfolio & Partners"), /*#__PURE__*/React.createElement("div", {
  className: "logos"
}, /*#__PURE__*/React.createElement("img", {
  src: `${ASSET}transform-group.png`,
  alt: "Transform Group",
  loading: "lazy",
  decoding: "async"
}), /*#__PURE__*/React.createElement("img", {
  src: `${ASSET}bitangels.png`,
  alt: "BitAngels",
  loading: "lazy",
  decoding: "async"
}), /*#__PURE__*/React.createElement("span", {
  className: "txt"
}, "Tokenize"), /*#__PURE__*/React.createElement("span", {
  className: "txt"
}, "Ethereum"), /*#__PURE__*/React.createElement("span", {
  className: "txt"
}, "Tether"), /*#__PURE__*/React.createElement("span", {
  className: "txt"
}, "Neo")));
const EventsList = () => {
  const events = [{
    name: "Tokenize",
    tag: "Global Conference",
    desc: "A premier blockchain conference bringing together industry leaders, investors, and innovators to explore the future of tokenization.",
    img: `${ASSET}tokenize-vegas.jpg`,
    url: "https://tokenizeconference.com/"
  }, {
    name: "BitAngels",
    tag: "Since 2013 · Angel Network",
    desc: "Co-founded by Michael Terpin in 2013. The world's first angel investor network for digital currency startups.",
    img: `${ASSET}bitangels-group.webp`,
    url: "https://bitangels.network/"
  }, {
    name: "Tiger Mansion",
    tag: "Invite Only",
    desc: "An exclusive, invite-only gathering for top-tier crypto investors and founders. Intimate, curated networking.",
    img: `${ASSET}tigermansion-event.jpg`,
    url: "https://www.tigermansionlv.com/"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head reveal-d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), "Event Brands"), /*#__PURE__*/React.createElement("h2", null, "Where the industry connects.")), /*#__PURE__*/React.createElement("div", {
    className: "events-grid-d"
  }, events.map((e, i) => /*#__PURE__*/React.createElement("a", {
    href: e.url,
    target: "_blank",
    rel: "noopener",
    key: e.name,
    className: `event-card-d reveal-d d${i + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "thumb"
  }, /*#__PURE__*/React.createElement("img", {
    src: e.img,
    alt: e.name,
    loading: "lazy",
    decoding: "async"
  })), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, e.tag), /*#__PURE__*/React.createElement("h3", null, e.name), /*#__PURE__*/React.createElement("p", null, e.desc), /*#__PURE__*/React.createElement("div", {
    className: "visit"
  }, "Visit website \u2197")))))));
};

// Division Detail page
const DIVISION_DATA = {
  group: {
    num: "01",
    name: "Transform Group",
    tag: "Communications & PR",
    color: "var(--purple)",
    tagline: "The original blockchain PR firm.",
    lead: "Founded by Michael Terpin in 2013, Transform launched the first-ever token sale (Mastercoin) and powered the exposure of 100+ prominent tokens during the ICO era — including Augur, Bancor, EOS, Ethereum, Golem, Gnosis, Lisk, MaidSafe, Qtum, VideoCoin, and WAX. Additional campaigns include Aeternity, Atari Token, Bittrex, CoinBene, Dash, Factom, ICON Foundation, Kraken, NEM, OKEx, Polymath, Radix, ShapeShift, Telos, and Tether. The only mainstream business and consumer PR firm with deep roots in blockchain.",
    capabilities: [{
      t: "First-ever token sale",
      d: "Launched the first token sale in blockchain history — Mastercoin, 2013. Powering 100+ prominent tokens through the ICO era and beyond."
    }, {
      t: "Crypto media leadership",
      d: "Regular placements in every leading crypto publication — CoinDesk, Cointelegraph, Decrypt — plus top industry podcasts and YouTube channels."
    }, {
      t: "Tier-1 mainstream coverage",
      d: "Client stories placed in AP, BBC, Bloomberg, Business Insider, CNBC, Forbes, Fox, The New York Times, Reuters, TechCrunch, USA Today, VentureBeat, Wall Street Journal, and WIRED."
    }, {
      t: "Global office network",
      d: "San Juan HQ with additional offices in New York, Los Angeles, San Francisco, Las Vegas, and Toronto — the most extensive footprint in crypto PR."
    }],
    stats: [["100+", "ICO-era Token Launches"], ["300+", "Clients Since 2013"], ["57%", "Alt-Coin Market Cap"], ["2013", "Agency Founded"]]
  },
  events: {
    num: "02",
    name: "Transform Events",
    tag: "Tokenize · BitAngels · Tiger Mansion",
    color: "var(--teal)",
    tagline: "Where the industry connects.",
    lead: "Premier blockchain events — Tokenize, BitAngels, Tiger Mansion — connecting founders and investors worldwide through curated conferences and intimate gatherings.",
    capabilities: [{
      t: "Tokenize conference",
      d: "A premier blockchain conference exploring the future of tokenization. Global edition."
    }, {
      t: "BitAngels network",
      d: "World's first crypto angel investor network. Active since 2013."
    }, {
      t: "Tiger Mansion",
      d: "Invite-only executive gathering for top-tier crypto investors and founders."
    }, {
      t: "CoinAgenda legacy",
      d: "Predecessor conference series connecting mainstream investors with blockchain deals."
    }],
    stats: [["2013", "BitAngels Founded"], ["Global", "Tokenize Reach"], ["Invite Only", "Tiger Mansion"], ["10+", "Years of Events"]]
  },
  capital: {
    num: "03",
    name: "Transform Capital",
    tag: "Family Office",
    color: "#F7931A",
    tagline: "Michael Terpin's family office.",
    lead: "Deploying strategic capital into blockchain protocols, DeFi infrastructure, and crypto projects. A Puerto Rico-based crypto family office with deep conviction and a long-term investment horizon.",
    capabilities: [{
      t: "Strategic investments",
      d: "Direct investments into high-potential blockchain protocols, infrastructure, and applications."
    }, {
      t: "Long-term conviction",
      d: "Patient capital with deep understanding of market cycles and adoption curves."
    }, {
      t: "Ecosystem access",
      d: "Portfolio companies gain access to the full Transform Ventures ecosystem."
    }, {
      t: "Hands-on support",
      d: "Active guidance on go-to-market, partnerships, and scaling."
    }],
    stats: [["10+", "Years in Crypto"], ["Multi", "Strategy Approach"], ["Direct", "Portfolio Access"], ["Global", "Network Reach"]]
  },
  strategies: {
    num: "04",
    name: "Transform Strategies",
    tag: "Advisory & Consulting",
    color: "var(--purple)",
    tagline: "Expert advisory for blockchain projects.",
    lead: "Decades of combined experience in token launch strategy, crypto go-to-market planning, tokenomics design, and investor relations — helping blockchain ventures succeed from seed to scale.",
    capabilities: [{
      t: "Token launch strategy",
      d: "End-to-end advisory on token design, distribution, and launch execution for maximum market impact."
    }, {
      t: "Go-to-market planning",
      d: "Strategic positioning, messaging, and market entry plans tailored to the blockchain landscape."
    }, {
      t: "Ecosystem development",
      d: "Building partnerships, community, and network effects for sustainable project growth."
    }, {
      t: "Investor relations",
      d: "Connecting projects with the right capital partners and managing ongoing investor communications."
    }],
    stats: [["Seed", "→ Scale"], ["Tokenomics", "Design"], ["GTM", "Planning"], ["IR", "Advisory"]]
  },
  fund: {
    num: "05",
    name: "Bitcoin Supercycle Fund",
    tag: "BTC Investment Fund",
    color: "#F7931A",
    tagline: "The first liquid bitcoin-only hedge fund.",
    lead: "Combining the 'Four Seasons of Bitcoin' cycle model with algorithmic trading and season-specific strategies. Institutional-grade: Coinbase Prime custody, NAV Fund Services administration.",
    capabilities: [{
      t: "Four Seasons of Bitcoin",
      d: "Cycle model mapping BTC to predictable halving-driven phases: spring, summer, fall, winter."
    }, {
      t: "Algorithmic trading",
      d: "Season-specific strategies executed algorithmically — sell near cycle peaks, buy near bottoms."
    }, {
      t: "Bitcoin-only mandate",
      d: "100% concentrated in bitcoin — no altcoins, no distractions."
    }, {
      t: "Institutional rails",
      d: "Coinbase Prime custody. NAV Fund Services administration. Regulated structure."
    }],
    stats: [["100%", "Bitcoin-Only"], ["Algo", "Trading Engine"], ["4 Seasons", "Cycle Model"], ["2024", "Fund Launch"]],
    book: {
      img: `${ASSET}bitcoin-supercycle-book.jpg`,
      title: "Bitcoin Supercycle",
      tag: "Amazon Best Seller · 2024",
      desc: "How the crypto calendar can make you rich — by Michael Terpin. The foundational thesis behind the fund's seasonal signal and cycle-driven strategy.",
      amazon: "https://www.amazon.com/Bitcoin-Supercycle-Crypto-Calendar-Make/dp/151078215X"
    }
  }
};
function DivisionDetail({
  slug
}) {
  const d = DIVISION_DATA[slug];
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    document.querySelectorAll('.reveal-d').forEach(el => io.observe(el));
  }, []);
  if (!d) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("section", {
    className: "d-page-hero division-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-glow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${P}divisions.html`,
    className: "back-link"
  }, "\u2190 All divisions"), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline",
    style: {
      color: d.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "d",
    style: {
      background: d.color
    }
  }), "/ ", d.num, " \u2014 ", d.tag), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "grad"
  }, d.tagline)), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, d.lead), /*#__PURE__*/React.createElement("div", {
    className: "ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn-lime",
    href: `${P}contact.html`
  }, "Get in touch \u2192"), /*#__PURE__*/React.createElement("a", {
    className: "btn-outline",
    href: `${P}divisions.html`
  }, "Explore all divisions")))), /*#__PURE__*/React.createElement("section", {
    className: "d-section stat-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wavy-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sub-stats sub-stats-4up"
  }, d.stats.map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `reveal-d d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, l)))))), /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head reveal-d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), "Capabilities"), /*#__PURE__*/React.createElement("h2", null, "What we do.")), /*#__PURE__*/React.createElement("div", {
    className: "cap-grid-d"
  }, d.capabilities.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.t,
    className: `dark-card reveal-d d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("h3", null, c.t), /*#__PURE__*/React.createElement("p", null, c.d)))))), d.book && /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fund-banner reveal-d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "book"
  }, /*#__PURE__*/React.createElement("img", {
    src: d.book.img,
    alt: d.book.title,
    loading: "lazy",
    decoding: "async"
  })), /*#__PURE__*/React.createElement("div", {
    className: "copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag-orange"
  }, d.book.tag), /*#__PURE__*/React.createElement("h3", null, d.book.title), /*#__PURE__*/React.createElement("p", null, d.book.desc), /*#__PURE__*/React.createElement("div", {
    className: "actions",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn-lime",
    href: `${P}contact.html`
  }, "Learn more \u2192"), /*#__PURE__*/React.createElement("a", {
    className: "btn-outline",
    href: d.book.amazon,
    target: "_blank",
    rel: "noopener"
  }, "Buy on Amazon \u2197")))))), /*#__PURE__*/React.createElement(CTAStrip, null), /*#__PURE__*/React.createElement(Footer, null));
}
Object.assign(window, {
  Subpage,
  DIVISIONS,
  CTAStrip,
  Stats,
  Contact,
  Leader,
  Media,
  Blog,
  EventsList,
  PartnersBar,
  DivisionDetail,
  DIVISION_DATA
});