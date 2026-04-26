const timeline = [{
  y: "1994",
  e: "Marketwire Founded",
  d: "First Internet-based newswire. Backed by Sequoia Capital & Hummer Winblad. Sold to NASDAQ for $200M."
}, {
  y: "2013",
  e: "BitAngels & Transform Group",
  d: "Co-founded the first crypto angel group and launched the original blockchain PR firm. Powered the first-ever token sale (Mastercoin) and 100+ prominent ICO-era tokens including Ethereum, EOS, Augur, Bancor, Golem, Qtum, WAX, and Tether."
}, {
  y: "2015",
  e: "Four Seasons of Bitcoin",
  d: "Michael Terpin developed the Four Seasons model, mapping bitcoin to predictable four-year cycles driven by the halving."
}, {
  y: "2018",
  e: "CoinAgenda → Tokenize",
  d: "Created the leading conference series connecting mainstream investors with blockchain and crypto investments."
}, {
  y: "2021",
  e: "Transform Ventures",
  d: "Consolidated into a full blockchain and AI advisory and venture studio. Five divisions spanning events, capital, strategy, and fund management."
}, {
  y: "2024",
  e: "Bitcoin Supercycle Fund",
  d: "Launched the first liquid bitcoin-only hedge fund using the Four Seasons model and algorithmic trading."
}];
function About() {
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
  }), "Our Story"), /*#__PURE__*/React.createElement("h2", null, "The communications powerhouse behind crypto.")), /*#__PURE__*/React.createElement("div", {
    className: "timeline-d"
  }, timeline.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "year"
  }, t.y), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t.e), /*#__PURE__*/React.createElement("div", {
    className: "desc"
  }, t.d)))))))), /*#__PURE__*/React.createElement(Stats, null), /*#__PURE__*/React.createElement(PartnersBar, null), /*#__PURE__*/React.createElement(CTAStrip, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(About, null));