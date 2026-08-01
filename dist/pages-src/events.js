function EventsPage() {
  const head = tvSec('upcomingHead');
  return /*#__PURE__*/React.createElement(Subpage, {
    eyebrow: "Transform Events",
    title: "Where the industry connects.",
    intro: "Flagship blockchain conferences and digital asset networking events bringing together industry leaders, angel investors, and founders for deal-making and knowledge sharing."
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
  }), head.eyebrow || "Upcoming"), /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'left'
    }
  }, head.title || "On the calendar.")), /*#__PURE__*/React.createElement("div", {
    className: "luma-embed reveal-d"
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "https://luma.com/embed/calendar/cal-8JeX51iUBkNpJmP/events",
    title: "Transform Ventures events calendar",
    frameBorder: "0",
    allowFullScreen: true,
    "aria-hidden": "false",
    tabIndex: "0"
  })))), /*#__PURE__*/React.createElement(CTAStrip, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(EventsPage, null));