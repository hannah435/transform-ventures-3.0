const UPCOMING = [{
  date: "Sep 2026",
  city: "Las Vegas",
  name: "Tokenize Las Vegas",
  tag: "Flagship Conference",
  bg: "linear-gradient(135deg, #6D4AFF, #3A1F9E)"
}, {
  date: "Jun 2026",
  city: "San Juan, PR",
  name: "BitAngels Summer Summit",
  tag: "Angel Network",
  bg: "linear-gradient(135deg, #F7931A, #B25E00)"
}, {
  date: "Ongoing",
  city: "By invitation",
  name: "Tiger Mansion Dinners",
  tag: "Invite Only",
  bg: "linear-gradient(135deg, #0FB5A5, #0A6B63)"
}];
function EventsPage() {
  return /*#__PURE__*/React.createElement(Subpage, {
    eyebrow: "Transform Events",
    title: "Where the industry connects.",
    intro: "Flagship blockchain conferences and crypto networking events bringing together industry leaders, angel investors, and founders for deal-making and knowledge sharing."
  }, /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head reveal-d",
    style: {
      textAlign: 'left',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), "Upcoming"), /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'left'
    }
  }, "On the calendar.")), /*#__PURE__*/React.createElement("div", {
    className: "events-list-d"
  }, UPCOMING.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: e.name,
    className: `event-row-d reveal-d d${i % 3 + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "swatch",
    style: {
      background: e.bg
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "date"
  }, e.date), /*#__PURE__*/React.createElement("div", {
    className: "city"
  }, e.city)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, e.name), /*#__PURE__*/React.createElement("div", {
    className: "tag-line"
  }, e.tag)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn-outline"
  }, "Details \u2192")))))), /*#__PURE__*/React.createElement(EventsList, null), /*#__PURE__*/React.createElement(CTAStrip, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(EventsPage, null));