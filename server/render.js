// Server-side rendering for the public site (home + all subpages).
// Runs the already-compiled React bundles inside a sandboxed VM with the DB content
// injected, captures whatever the page renders via ReactDOM.createRoot().render(),
// and returns real HTML — so crawlers and answer engines (which often don't run JS)
// receive the full page content.
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const DIST = path.join(__dirname, "..", "dist");

// Bundle sets per page key. Concatenated and run as ONE script so the bundles share
// top-level scope exactly like classic <script> tags do in the browser.
function bundlesFor(page) {
  if (page === "home") return [path.join(DIST, "components", "home-dark.js")];
  return [
    path.join(DIST, "components", "shared-dark.js"),
    path.join(DIST, "components", "subpage-dark.js"),
    path.join(DIST, "pages-src", page + ".js"),
  ];
}

// Render a page to an HTML string. `pathname` drives the bundles' "/pages/" detection.
// Returns "" on any failure so the caller can fall back to the plain shell.
function renderPage(page, content, pathname) {
  try {
    const code = bundlesFor(page)
      .map((f) => fs.readFileSync(f, "utf8"))
      .join("\n;\n");

    const noop = () => {};
    const sandbox = {
      React,
      __captured: null,
      requestAnimationFrame: () => 0,
      cancelAnimationFrame: noop,
      setTimeout,
      clearTimeout,
      console,
    };
    // ReactDOM stub: capture the element passed to render() instead of mounting.
    sandbox.ReactDOM = {
      createRoot: () => ({ render: (el) => { sandbox.__captured = el; }, unmount: noop }),
    };
    sandbox.document = {
      getElementById: () => null,
      querySelectorAll: () => [],
      documentElement: { setAttribute: noop },
      body: { style: {} },
    };
    sandbox.window = {
      __TV_CONTENT__: content ? { [page]: content } : undefined,
      __TV_PAGE__: page,
      location: { pathname: pathname || "/" },
      addEventListener: noop,
      removeEventListener: noop,
      matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
    };
    sandbox.globalThis = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: page + ".bundle.js" });

    if (!sandbox.__captured) return "";
    return ReactDOMServer.renderToString(sandbox.__captured);
  } catch (err) {
    console.error("[ssr] renderPage(" + page + ") failed:", err.message);
    return "";
  }
}

// Back-compat helper for the home page.
const renderHome = (content) => renderPage("home", content, "/");

module.exports = { renderPage, renderHome };
