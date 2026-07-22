const PRESS_DEFAULT = [{
  src: "CNBC",
  quote: "Called Michael Terpin the 'Godfather of Crypto' for his early advocacy and investment across the industry."
}, {
  src: "Yahoo Finance",
  quote: "'Veteran investor predicts shocking bitcoin rally by 2033.' — Coverage of Terpin's Four Seasons model."
}, {
  src: "Skyhorse Publishing",
  quote: "Author of 'Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich' — 2024 release."
}];
function LeadershipPage() {
  const press = tvList('press', PRESS_DEFAULT);
  const head = tvSec('pressHead');
  return /*#__PURE__*/React.createElement(Subpage, {
    eyebrow: "Leadership",
    title: "Meet the founder.",
    intro: "One of the most recognized figures in blockchain and digital asset \u2014 early bitcoin investor, author, and the entrepreneur CNBC called the 'Godfather of Crypto.'"
  }, /*#__PURE__*/React.createElement(Leader, null), /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head reveal-d",
    style: {
      textAlign: 'left',
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), head.eyebrow || "Press coverage"), /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'left'
    }
  }, head.title || "What the media says.")), /*#__PURE__*/React.createElement("div", {
    className: "press-grid-d"
  }, press.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `press-card reveal-d d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "src"
  }, p.src), /*#__PURE__*/React.createElement("p", null, p.quote)))))), /*#__PURE__*/React.createElement(CTAStrip, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(LeadershipPage, null));