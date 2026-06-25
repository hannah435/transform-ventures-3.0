const TIMELINE_DEFAULT = [{
  year: "1994",
  title: "Marketwire Founded",
  desc: "First Internet-based newswire. Backed by Sequoia Capital & Hummer Winblad. Sold to NASDAQ for $200M."
}, {
  year: "2013",
  title: "BitAngels & Transform Group",
  desc: "Co-founded the first crypto angel group and launched the original blockchain PR firm. Powered the first-ever token sale (Mastercoin) and 100+ prominent ICO-era tokens including Ethereum, EOS, Augur, Bancor, Golem, Qtum, WAX, and Tether."
}, {
  year: "2015",
  title: "Four Seasons of Bitcoin",
  desc: "Michael Terpin developed the Four Seasons model, mapping bitcoin to predictable four-year cycles driven by the halving."
}, {
  year: "2018",
  title: "CoinAgenda → Tokenize",
  desc: "Created the leading conference series connecting mainstream investors with blockchain and crypto investments."
}, {
  year: "2021",
  title: "Transform Ventures",
  desc: "Consolidated into a full blockchain and AI advisory and venture studio. Five divisions spanning events, capital, strategy, and fund management."
}, {
  year: "2024",
  title: "Bitcoin Supercycle Fund",
  desc: "Launched the first liquid bitcoin-only hedge fund using the Four Seasons model and algorithmic trading."
}];
function About() {
  const timeline = tvList('timeline', TIMELINE_DEFAULT);
  const story = tvSec('story');
  const team = tvList('team', []);
  const teamHead = tvSec('teamHead');
  const initials = n => (n || '?').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return /*#__PURE__*/React.createElement(Subpage, {
    eyebrow: "About Transform Ventures",
    title: "Three decades of building at the edges of media and money.",
    intro: "Transform Ventures is the venture platform of Michael Terpin \u2014 founder of Marketwire, BitAngels, and Tokenize \u2014 operating across five specialized divisions from San Juan, Puerto Rico."
  }, /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-split reveal-d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "intro-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), story.eyebrow || "Our Story"), /*#__PURE__*/React.createElement("h2", null, story.heading || "The communications powerhouse behind crypto.")), /*#__PURE__*/React.createElement("div", {
    className: "timeline-d"
  }, timeline.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "year"
  }, t.year), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "desc"
  }, t.desc)))))))), team.length > 0 && /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head reveal-d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), teamHead.eyebrow || "Our Team"), /*#__PURE__*/React.createElement("h2", null, teamHead.title || "The people behind Transform.")), /*#__PURE__*/React.createElement("div", {
    className: "team-grid-d"
  }, team.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `team-card-d reveal-d d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-photo"
  }, m.photoImg ? /*#__PURE__*/React.createElement("img", {
    src: tvImg(m.photoImg),
    alt: m.name,
    loading: "lazy",
    decoding: "async"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "team-initials"
  }, initials(m.name))), /*#__PURE__*/React.createElement("h3", null, m.name), /*#__PURE__*/React.createElement("div", {
    className: "role"
  }, m.role), m.bio && /*#__PURE__*/React.createElement("p", null, m.bio), (m.linkedin && m.linkedin !== '#' || m.x && m.x !== '#') && /*#__PURE__*/React.createElement("div", {
    className: "team-socials"
  }, m.linkedin && m.linkedin !== '#' && /*#__PURE__*/React.createElement("a", {
    href: m.linkedin,
    target: "_blank",
    rel: "noopener",
    "aria-label": "LinkedIn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin",
    size: 16
  })), m.x && m.x !== '#' && /*#__PURE__*/React.createElement("a", {
    href: m.x,
    target: "_blank",
    rel: "noopener",
    "aria-label": "X / Twitter"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  })))))))), /*#__PURE__*/React.createElement(Stats, null), /*#__PURE__*/React.createElement(PartnersBar, null), /*#__PURE__*/React.createElement(CTAStrip, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(About, null));