function PostPage() {
  const posts = tvList('posts', []);
  const search = typeof window !== 'undefined' && window.location && window.location.search || '';
  // Static per-post pages (post-<slug>.html) carry no ?id=, so the build injects
  // __TV_POST_ID__; the query string still wins for legacy ?id= links.
  const id = new URLSearchParams(search).get('id') || typeof window !== 'undefined' && window.__TV_POST_ID__ || null;
  const post = posts.find(p => p.id === id) || posts[0] || null;
  React.useEffect(() => {
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
  if (!post) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("section", {
      className: "d-page-hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("a", {
      href: `${P}blog`,
      className: "back-link"
    }, "\u2190 All posts"), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
      className: "grad"
    }, "Post not found.")), /*#__PURE__*/React.createElement("p", {
      className: "lead"
    }, "This article may have been moved or removed."))), /*#__PURE__*/React.createElement(Footer, null));
  }
  const body = Array.isArray(post.body) ? post.body : [];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("section", {
    className: "d-page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${P}blog`,
    className: "back-link"
  }, "\u2190 All posts"), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow-inline"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d"
  }), post.tag, post.date ? ` · ${post.date}` : ''), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "grad"
  }, post.title)), post.lede && /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, post.lede))), /*#__PURE__*/React.createElement("section", {
    className: "d-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("article", {
    className: "blog-article-d reveal-d",
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, body.map((para, j) => /*#__PURE__*/React.createElement("p", {
    key: j
  }, para))))), /*#__PURE__*/React.createElement(CTAStrip, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(PostPage, null));