// Transform Ventures — Dark variant landing page

const {
  useState,
  useEffect,
  useMemo
} = React;
const Stars = () => {
  const stars = useMemo(() => Array.from({
    length: 80
  }, (_, i) => ({
    id: i,
    top: i * 131 % 100,
    left: i * 71 % 100,
    size: 1 + i % 3 * 0.5,
    delay: i * 0.13 % 3
  })), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "d-hero-stars",
    "aria-hidden": "true"
  }, stars.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.id,
    className: "star",
    style: {
      top: `${s.top}%`,
      left: `${s.left}%`,
      width: s.size,
      height: s.size,
      animationDelay: `-${s.delay}s`
    }
  })));
};
const Icon = ({
  name
}) => {
  const paths = {
    megaphone: /*#__PURE__*/React.createElement("path", {
      d: "M3 9v3a1 1 0 0 0 1 1h1l2 4h2l-2-4h1l7 3V5l-7 3H4a1 1 0 0 0-1 1z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinejoin: "round",
      fill: "none"
    }),
    calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "14",
      height: "13",
      rx: "2",
      stroke: "currentColor",
      strokeWidth: "1.5",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 8h14M7 2v4M13 2v4",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round"
    })),
    bank: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M10 2L2 6h16L10 2z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinejoin: "round",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 9v6M8 9v6M12 9v6M16 9v6M2 17h16",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round"
    })),
    compass: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "10",
      cy: "10",
      r: "8",
      stroke: "currentColor",
      strokeWidth: "1.5",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13 7l-2 5-5 2 2-5 5-2z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinejoin: "round",
      fill: "none"
    })),
    bitcoin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "10",
      cy: "10",
      r: "8",
      stroke: "currentColor",
      strokeWidth: "1.5",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 6v8M8 10h3.5a2 2 0 0 0 0-4H8M8 10h4a2 2 0 0 1 0 4H8M9.5 5v1.5M11.5 5v1.5M9.5 13.5V15M11.5 13.5V15",
      stroke: "currentColor",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      fill: "none"
    })),
    news: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "14",
      height: "12",
      rx: "1.5",
      stroke: "currentColor",
      strokeWidth: "1.5",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 8h8M6 11h8M6 14h5",
      stroke: "currentColor",
      strokeWidth: "1.3",
      strokeLinecap: "round"
    })),
    pen: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 17l1-4 10-10 3 3-10 10-4 1z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinejoin: "round",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 5l3 3",
      stroke: "currentColor",
      strokeWidth: "1.5"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, paths[name]);
};
const DIVISION_MENU = [{
  name: "Transform Group",
  sub: "Communications & PR",
  icon: "megaphone",
  href: "pages/division-group.html"
}, {
  name: "Transform Events",
  sub: "Tokenize / BitAngels / Tiger Mansion",
  icon: "calendar",
  href: "pages/division-events.html"
}, {
  name: "Transform Capital",
  sub: "Family office",
  icon: "bank",
  href: "pages/division-capital.html"
}, {
  name: "Transform Strategies",
  sub: "Advisory & consulting",
  icon: "compass",
  href: "pages/division-strategies.html"
}, {
  name: "Bitcoin Supercycle Fund",
  sub: "BTC investment fund",
  icon: "bitcoin",
  href: "pages/division-fund.html"
}];
const MEDIA_MENU = [{
  name: "News & Press",
  sub: "Interviews & media coverage",
  icon: "news",
  href: "pages/media.html#news"
}, {
  name: "Blog",
  sub: "Insights & analysis",
  icon: "pen",
  href: "pages/blog.html"
}];
const NavDropdown = ({
  label,
  items,
  open,
  onOpen,
  onClose
}) => /*#__PURE__*/React.createElement("li", {
  className: `nav-drop ${open ? 'open' : ''}`,
  onMouseEnter: onOpen,
  onMouseLeave: onClose
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => {
    e.preventDefault();
    open ? onClose() : onOpen();
  }
}, label, /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 10 10",
  style: {
    transition: 'transform .2s',
    transform: open ? 'rotate(180deg)' : 'none'
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 4l3 3 3-3",
  stroke: "currentColor",
  strokeWidth: "1.5",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}))), /*#__PURE__*/React.createElement("div", {
  className: "dropdown-panel"
}, items.map(it => /*#__PURE__*/React.createElement("a", {
  key: it.name,
  href: it.href,
  className: "dropdown-item"
}, /*#__PURE__*/React.createElement("span", {
  className: "di-icon"
}, /*#__PURE__*/React.createElement(Icon, {
  name: it.icon
})), /*#__PURE__*/React.createElement("span", {
  className: "di-text"
}, /*#__PURE__*/React.createElement("span", {
  className: "di-name"
}, it.name), /*#__PURE__*/React.createElement("span", {
  className: "di-sub"
}, it.sub))))));
const Nav = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const closeMobile = () => {
    setMobile(false);
    setMobileSub(null);
  };
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobile]);
  const Chev = () => /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l3 3 3-3",
    stroke: "currentColor",
    strokeWidth: "1.5",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "d-nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/transform-ventures-white.png",
    alt: "Transform Ventures"
  })), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "pages/about.html"
  }, "About")), /*#__PURE__*/React.createElement(NavDropdown, {
    label: "Divisions",
    items: DIVISION_MENU,
    open: openMenu === 'div',
    onOpen: () => setOpenMenu('div'),
    onClose: () => setOpenMenu(null)
  }), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "pages/events.html"
  }, "Events")), /*#__PURE__*/React.createElement(NavDropdown, {
    label: "Media",
    items: MEDIA_MENU,
    open: openMenu === 'media',
    onOpen: () => setOpenMenu('media'),
    onClose: () => setOpenMenu(null)
  }), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "pages/leadership.html"
  }, "Leadership"))), /*#__PURE__*/React.createElement("a", {
    href: "pages/contact.html",
    className: "cta"
  }, "Contact"), /*#__PURE__*/React.createElement("button", {
    className: `d-nav-toggle ${mobile ? 'open' : ''}`,
    onClick: () => setMobile(!mobile),
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null))), /*#__PURE__*/React.createElement("div", {
    className: `mobile-menu-d ${mobile ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("button", {
    className: "mm-close",
    onClick: closeMobile,
    "aria-label": "Close menu"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "mm-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "pages/about.html",
    className: "mm-link"
  }, "About"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `mm-link mm-expand ${mobileSub === 'div' ? 'open' : ''}`,
    onClick: () => setMobileSub(mobileSub === 'div' ? null : 'div')
  }, /*#__PURE__*/React.createElement("span", null, "Divisions"), " ", /*#__PURE__*/React.createElement(Chev, null)), mobileSub === 'div' && /*#__PURE__*/React.createElement("div", {
    className: "mm-sub-wrap"
  }, DIVISION_MENU.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.name,
    href: it.href,
    className: "mm-sub"
  }, it.name))), /*#__PURE__*/React.createElement("a", {
    href: "pages/events.html",
    className: "mm-link"
  }, "Events"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `mm-link mm-expand ${mobileSub === 'media' ? 'open' : ''}`,
    onClick: () => setMobileSub(mobileSub === 'media' ? null : 'media')
  }, /*#__PURE__*/React.createElement("span", null, "Media"), " ", /*#__PURE__*/React.createElement(Chev, null)), mobileSub === 'media' && /*#__PURE__*/React.createElement("div", {
    className: "mm-sub-wrap"
  }, MEDIA_MENU.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.name,
    href: it.href,
    className: "mm-sub"
  }, it.name))), /*#__PURE__*/React.createElement("a", {
    href: "pages/leadership.html",
    className: "mm-link"
  }, "Leadership"), /*#__PURE__*/React.createElement("a", {
    href: "pages/contact.html",
    className: "mm-cta"
  }, "Contact \u2192"))));
};
const Hero = () => /*#__PURE__*/React.createElement("section", {
  className: "d-hero"
}, /*#__PURE__*/React.createElement(Stars, null), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
  className: "grad"
}, "Where crypto builds", /*#__PURE__*/React.createElement("br", null), "with conviction.")), /*#__PURE__*/React.createElement("p", {
  className: "lead"
}, "Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential. Led by Michael Terpin \u2014 the \"Godfather of Crypto.\""), /*#__PURE__*/React.createElement("div", {
  className: "ctas"
}, /*#__PURE__*/React.createElement("a", {
  className: "btn-lime",
  href: "pages/divisions.html"
}, "Explore divisions \u2192"), /*#__PURE__*/React.createElement("a", {
  className: "btn-outline",
  href: "pages/contact.html"
}, "Get in touch")), /*#__PURE__*/React.createElement("div", {
  className: "hero-socials",
  "aria-label": "Social links"
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  "aria-label": "Twitter / X",
  target: "_blank",
  rel: "noopener"
}, /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18.244 2H21.5l-7.5 8.57L23 22h-6.938l-5.43-7.08L4.5 22H1.244l8.04-9.192L1 2h7.063l4.92 6.518L18.244 2zm-1.22 18h1.833L7.104 4H5.16l11.864 16z"
}))), /*#__PURE__*/React.createElement("a", {
  href: "#",
  "aria-label": "LinkedIn",
  target: "_blank",
  rel: "noopener"
}, /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.85-3.037-1.852 0-2.136 1.445-2.136 2.94v5.666H9.353V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.063 2.063 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
}))), /*#__PURE__*/React.createElement("a", {
  href: "#",
  "aria-label": "YouTube",
  target: "_blank",
  rel: "noopener"
}, /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
})))), /*#__PURE__*/React.createElement("div", {
  className: "d-hero-globe"
}, /*#__PURE__*/React.createElement(Globe, null)));
const Globe = () => {
  const canvasRef = React.useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0,
      R = 0,
      CX = 0,
      CY = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // Centered globe filling the canvas
      R = Math.min(W, H) * 0.48;
      CX = W / 2;
      CY = H / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate static dot-grid on sphere (lat/lon)
    const dots = [];
    const LAT_STEPS = 56; // rows
    for (let i = 0; i <= LAT_STEPS; i++) {
      const lat = -Math.PI / 2 + i / LAT_STEPS * Math.PI;
      // longitudinal spacing proportional to cos(lat) so dots are evenly distributed on sphere
      const circumference = Math.cos(lat);
      const count = Math.max(6, Math.round(72 * circumference));
      for (let j = 0; j < count; j++) {
        const lon = j / count * Math.PI * 2;
        dots.push({
          lat,
          lon
        });
      }
    }
    let rot = 0;
    let raf;
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // draw dots
      const cosR = Math.cos(rot),
        sinR = Math.sin(rot);
      for (const d of dots) {
        const cosLat = Math.cos(d.lat),
          sinLat = Math.sin(d.lat);
        // start position on unit sphere
        let x = cosLat * Math.cos(d.lon);
        let y = sinLat;
        let z = cosLat * Math.sin(d.lon);
        // rotate around Y axis
        const nx = x * cosR + z * sinR;
        const nz = -x * sinR + z * cosR;
        x = nx;
        z = nz;
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
        const isAccent = lit > 0.85 && Math.abs(d.lat) < 0.3;
        const color = isAccent ? `rgba(232,222,255,${alpha})` : `rgba(190,170,255,${alpha})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      rot += 0.0015;
      raf = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: "globe-canvas"
  });
};
const DIVISIONS = [{
  name: "Transform Group",
  tag: "Communications & PR",
  desc: "The original blockchain PR firm — launched the first-ever token sale (Mastercoin, 2013) and powered 100+ prominent ICO-era launches including Ethereum, EOS, Augur, and Tether.",
  kpi: "100+ ICO launches · Since 2013"
}, {
  name: "Transform Events",
  tag: "Tokenize · BitAngels · Tiger Mansion",
  desc: "Premier blockchain events connecting founders and investors worldwide through curated gatherings.",
  kpi: "3 flagship events"
}, {
  name: "Transform Capital",
  tag: "Family Office",
  desc: "Strategic investments across the digital asset landscape with a long-term investment horizon.",
  kpi: "Multi-strategy"
}, {
  name: "Transform Strategies",
  tag: "Advisory & Consulting",
  desc: "Go-to-market strategy, tokenomics design, and ecosystem development for blockchain ventures.",
  kpi: "Seed → Scale"
}, {
  name: "Bitcoin Supercycle Fund",
  tag: "BTC Investment Fund",
  desc: "The first liquid bitcoin-only hedge fund using the \"Four Seasons of Bitcoin\" cycle model and algorithmic trading.",
  kpi: "100% BTC · Algo"
}];
const Divisions = () => /*#__PURE__*/React.createElement("section", {
  id: "divisions",
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "sec-head reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow-inline"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'var(--lime)'
  }
}), "Our ecosystem"), /*#__PURE__*/React.createElement("h2", null, "Five divisions. One vision."), /*#__PURE__*/React.createElement("p", {
  className: "sub"
}, "Transform Ventures operates across five specialized divisions \u2014 from crypto PR and blockchain events to venture capital, strategic advisory, and a bitcoin-only hedge fund.")), /*#__PURE__*/React.createElement("div", {
  className: "divisions-row"
}, DIVISIONS.slice(0, 3).map((d, i) => /*#__PURE__*/React.createElement("div", {
  key: d.name,
  className: `dark-card reveal-d d${i + 1}`,
  onMouseMove: e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${(e.clientX - r.left) / r.width * 100}%`);
    e.currentTarget.style.setProperty('--my', `${(e.clientY - r.top) / r.height * 100}%`);
  }
}, /*#__PURE__*/React.createElement("h3", null, d.name), /*#__PURE__*/React.createElement("div", {
  className: "tag"
}, d.tag), /*#__PURE__*/React.createElement("p", null, d.desc), /*#__PURE__*/React.createElement("div", {
  className: "kpi"
}, d.kpi)))), /*#__PURE__*/React.createElement("div", {
  className: "divisions-row divisions-row-2up"
}, DIVISIONS.slice(3).map((d, i) => /*#__PURE__*/React.createElement("div", {
  key: d.name,
  className: `dark-card reveal-d d${i + 1}`,
  onMouseMove: e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${(e.clientX - r.left) / r.width * 100}%`);
    e.currentTarget.style.setProperty('--my', `${(e.clientY - r.top) / r.height * 100}%`);
  }
}, /*#__PURE__*/React.createElement("h3", null, d.name), /*#__PURE__*/React.createElement("div", {
  className: "tag"
}, d.tag), /*#__PURE__*/React.createElement("p", null, d.desc), /*#__PURE__*/React.createElement("div", {
  className: "kpi"
}, d.kpi))))));
const Feature = () => /*#__PURE__*/React.createElement("section", {
  id: "feature",
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "feature-split reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "visual"
}, /*#__PURE__*/React.createElement("div", {
  className: "morph"
})), /*#__PURE__*/React.createElement("div", {
  className: "copy"
}, /*#__PURE__*/React.createElement("div", {
  className: "tag-row"
}, /*#__PURE__*/React.createElement("span", null, "Advisory"), /*#__PURE__*/React.createElement("span", null, "Strategy")), /*#__PURE__*/React.createElement("h3", null, "Every crypto venture finds its path."), /*#__PURE__*/React.createElement("p", null, "Decades of combined experience in token launch strategy, crypto go-to-market, tokenomics design, and investor relations \u2014 helping blockchain ventures succeed from seed to scale."), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "End-to-end advisory on token design, distribution, and launch"), /*#__PURE__*/React.createElement("li", null, "Strategic positioning and market-entry plans"), /*#__PURE__*/React.createElement("li", null, "Access to the full Transform Ventures network")), /*#__PURE__*/React.createElement("div", {
  className: "actions"
}, /*#__PURE__*/React.createElement("a", {
  className: "btn-lime",
  href: "pages/contact.html"
}, "Start a conversation \u2192"), /*#__PURE__*/React.createElement("a", {
  className: "btn-outline",
  href: "pages/divisions.html"
}, "Learn more"))))));
const StatBand = () => /*#__PURE__*/React.createElement("section", {
  className: "stat-band d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "cap"
}, "Portfolio & track record"), /*#__PURE__*/React.createElement("div", {
  className: "bignum"
}, "$200M"), /*#__PURE__*/React.createElement("p", {
  className: "cap-desc"
}, "Marketwire exit to NASDAQ \u2014 the foundation that seeded 12+ years of crypto ventures, clients, and capital.")), /*#__PURE__*/React.createElement("div", {
  className: "sub-stats"
}, /*#__PURE__*/React.createElement("div", {
  className: "reveal-d d1"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "100+"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "ICO-era token launches")), /*#__PURE__*/React.createElement("div", {
  className: "reveal-d d2"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "2013"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Launched first-ever token sale")))));
const EVENTS = [{
  name: "Tokenize",
  tag: "Global Conference",
  desc: "Industry leaders, investors, and innovators exploring the future of tokenization.",
  img: "assets/tokenize-vegas.jpg",
  url: "https://tokenizeconference.com/"
}, {
  name: "BitAngels",
  tag: "Since 2013 · Angel Network",
  desc: "The world's first angel investor network for digital currency startups.",
  img: "assets/bitangels-group.webp",
  url: "https://bitangels.network/"
}, {
  name: "Tiger Mansion",
  tag: "Invite Only",
  desc: "An exclusive, invite-only gathering for top-tier crypto investors and founders.",
  img: "assets/tigermansion-event.jpg",
  url: "https://www.tigermansionlv.com/"
}];
const Events = () => /*#__PURE__*/React.createElement("section", {
  id: "events",
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "sec-head reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow-inline"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'var(--lime)'
  }
}), "Transform Events"), /*#__PURE__*/React.createElement("h2", null, "Where the industry connects."), /*#__PURE__*/React.createElement("p", {
  className: "sub"
}, "Flagship blockchain conferences and crypto networking events bringing together industry leaders, angel investors, and founders.")), /*#__PURE__*/React.createElement("div", {
  className: "events-grid-d"
}, EVENTS.map((e, i) => /*#__PURE__*/React.createElement("a", {
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
}, e.tag), /*#__PURE__*/React.createElement("h3", null, e.name), /*#__PURE__*/React.createElement("p", null, e.desc))))), /*#__PURE__*/React.createElement("div", {
  className: "reveal-d",
  style: {
    textAlign: 'center',
    marginTop: 32
  }
}, /*#__PURE__*/React.createElement("a", {
  href: "pages/events.html",
  className: "btn-outline"
}, "All events \u2192"))));
const Fund = () => /*#__PURE__*/React.createElement("section", {
  id: "fund",
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "sec-head reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow-inline"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'var(--lime)'
  }
}), "Investment Fund"), /*#__PURE__*/React.createElement("h2", null, "Bitcoin Supercycle Fund."), /*#__PURE__*/React.createElement("p", {
  className: "sub"
}, "The first liquid bitcoin-only hedge fund combining the \"Four Seasons of Bitcoin\" cycle model with algorithmic trading.")), /*#__PURE__*/React.createElement("div", {
  className: "fund-banner reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "book"
}, /*#__PURE__*/React.createElement("img", {
  src: "assets/bitcoin-supercycle-book.jpg",
  alt: "Bitcoin Supercycle book",
  loading: "lazy",
  decoding: "async"
})), /*#__PURE__*/React.createElement("div", {
  className: "copy"
}, /*#__PURE__*/React.createElement("span", {
  className: "tag-orange"
}, "Amazon Best Seller \xB7 2024"), /*#__PURE__*/React.createElement("h3", null, "Bitcoin Supercycle"), /*#__PURE__*/React.createElement("p", null, "How the crypto calendar can make you rich \u2014 by Michael Terpin. The foundational thesis behind the fund's seasonal signal and cycle-driven strategy."), /*#__PURE__*/React.createElement("div", {
  className: "kpis"
}, /*#__PURE__*/React.createElement("div", {
  className: "k"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "100%"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Bitcoin-Only")), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "Algo"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Algorithmic Trading")), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "4 Seasons"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Cycle-driven"))), /*#__PURE__*/React.createElement("div", {
  className: "actions"
}, /*#__PURE__*/React.createElement("a", {
  className: "btn-lime",
  href: "pages/division-fund.html"
}, "Learn more \u2192"), /*#__PURE__*/React.createElement("a", {
  className: "btn-outline",
  href: "https://www.amazon.com/Bitcoin-Supercycle-Crypto-Calendar-Make/dp/151078215X",
  target: "_blank",
  rel: "noopener"
}, "Buy on Amazon \u2197"))))));
const Leader = () => /*#__PURE__*/React.createElement("section", {
  id: "leadership",
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "sec-head reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow-inline"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'var(--lime)'
  }
}), "Leadership"), /*#__PURE__*/React.createElement("h2", null, "Meet the founder."), /*#__PURE__*/React.createElement("p", {
  className: "sub"
}, "Three decades of building at the intersection of media, technology, and capital \u2014 from Marketwire to the Bitcoin Supercycle Fund.")), /*#__PURE__*/React.createElement("div", {
  className: "leader-d reveal-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "photo"
}, /*#__PURE__*/React.createElement("img", {
  src: "assets/michael-terpin.jpg",
  alt: "Michael Terpin",
  loading: "lazy",
  decoding: "async"
}), /*#__PURE__*/React.createElement("div", {
  className: "photo-caption"
}, /*#__PURE__*/React.createElement("span", {
  className: "quote"
}, "\"Godfather of Crypto\""), /*#__PURE__*/React.createElement("span", {
  className: "source"
}, "\u2014 CNBC"))), /*#__PURE__*/React.createElement("div", {
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
}, "Co-founder of BitAngels (2013), the first crypto angel group, and creator of Tokenize, the leading conference series connecting investors with blockchain. Previously founded Marketwire, the first internet-based newswire \u2014 sold to NASDAQ for $200M."), /*#__PURE__*/React.createElement("div", {
  className: "leader-stats-d"
}, /*#__PURE__*/React.createElement("div", {
  className: "stat"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "100+"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "ICO-era launches")), /*#__PURE__*/React.createElement("div", {
  className: "stat"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "$200M"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "Marketwire exit")), /*#__PURE__*/React.createElement("div", {
  className: "stat"
}, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "2013"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "First crypto angel group"))), /*#__PURE__*/React.createElement("div", {
  className: "tags"
}, /*#__PURE__*/React.createElement("span", null, "Godfather of Crypto"), /*#__PURE__*/React.createElement("span", null, "BitAngels Co-Founder"), /*#__PURE__*/React.createElement("span", null, "Tokenize Creator"), /*#__PURE__*/React.createElement("span", null, "Author"), /*#__PURE__*/React.createElement("span", null, "Puerto Rico")), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 28
  }
}, /*#__PURE__*/React.createElement("a", {
  href: "pages/leadership.html",
  className: "btn-outline"
}, "Full bio \u2192"))))));
const FinalCTA = () => /*#__PURE__*/React.createElement("section", {
  id: "contact",
  className: "d-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "wavy-bg"
}), /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "final-cta reveal-d"
}, /*#__PURE__*/React.createElement("h2", null, "Ready to transform your blockchain venture?"), /*#__PURE__*/React.createElement("p", null, "Whether you're raising capital, launching a token, or need strategic guidance \u2014 let's connect."), /*#__PURE__*/React.createElement("div", {
  className: "ctas"
}, /*#__PURE__*/React.createElement("a", {
  className: "btn-lime",
  href: "pages/contact.html"
}, "Start a conversation \u2192"), /*#__PURE__*/React.createElement("a", {
  className: "btn-outline",
  href: "pages/media.html"
}, "Latest news & media")))));
const Footer = () => /*#__PURE__*/React.createElement("footer", {
  className: "d-footer"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "cols"
}, /*#__PURE__*/React.createElement("div", {
  className: "brand-col"
}, /*#__PURE__*/React.createElement("img", {
  src: "assets/transform-ventures-white.png",
  alt: "Transform Ventures",
  loading: "lazy",
  decoding: "async"
}), /*#__PURE__*/React.createElement("p", null, "Capital, resources, and strategic guidance for blockchain and cryptocurrency projects with high-growth potential.")), /*#__PURE__*/React.createElement("div", {
  className: "col"
}, /*#__PURE__*/React.createElement("h4", null, "Divisions"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "pages/division-group.html"
}, "Transform Group")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "pages/division-events.html"
}, "Transform Events")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "pages/division-capital.html"
}, "Transform Capital")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "pages/division-strategies.html"
}, "Transform Strategies")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "pages/division-fund.html"
}, "Supercycle Fund")))), /*#__PURE__*/React.createElement("div", {
  className: "col"
}, /*#__PURE__*/React.createElement("h4", null, "Events & News"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "https://tokenizeconference.com/",
  target: "_blank",
  rel: "noopener"
}, "Tokenize")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "https://bitangels.network/",
  target: "_blank",
  rel: "noopener"
}, "BitAngels")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "https://www.tigermansionlv.com/",
  target: "_blank",
  rel: "noopener"
}, "Tiger Mansion")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "pages/media.html"
}, "News & Media")))), /*#__PURE__*/React.createElement("div", {
  className: "col"
}, /*#__PURE__*/React.createElement("h4", null, "Connect"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "pages/contact.html"
}, "Contact")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "#"
}, "Twitter / X")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "#"
}, "LinkedIn")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
  href: "#"
}, "Telegram"))))), /*#__PURE__*/React.createElement("div", {
  className: "btm"
}, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Transform Ventures. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "San Juan, Puerto Rico"))));
function App() {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Divisions, null), /*#__PURE__*/React.createElement(Feature, null), /*#__PURE__*/React.createElement(StatBand, null), /*#__PURE__*/React.createElement(Events, null), /*#__PURE__*/React.createElement(Fund, null), /*#__PURE__*/React.createElement(Leader, null), /*#__PURE__*/React.createElement(FinalCTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));