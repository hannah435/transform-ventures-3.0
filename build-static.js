// Static site generator for Transform Ventures.
//
// Renders the whole public site to plain HTML in `site/` — no server, no database
// at runtime. Reuses the same SSR renderer the Express app used, so the output is
// byte-for-byte the HTML the server used to produce.
//
//   node build-static.js
//
// Content source of truth is `content.json` (committed). If it's missing, it is
// exported from the legacy `content.db` on first run.
const fs = require("fs");
const path = require("path");
const { renderPage } = require("./server/render");
const { DEFAULTS } = require("./server/content-schema");

const ROOT = __dirname;
const OUT = path.join(ROOT, "site");
const CONTENT_JSON = path.join(ROOT, "content.json");

// Canonical site origin — used for absolute URLs in meta tags, JSON-LD, sitemap.
// These stay on the real domain even while previewing, so the metadata that ships
// is already correct on cutover day.
const SITE = "https://www.transformventures.io";

// Custom domain for GitHub Pages, written to site/CNAME.
//
// Deliberately EMPTY while www.transformventures.io still points at Squarespace.
// Publishing a CNAME makes GitHub redirect the github.io preview URL to that domain
// — which would serve the old Squarespace site and leave nowhere to review this one.
//
// On cutover day: set this to "www.transformventures.io", point Cloudflare DNS at
// GitHub (see DEPLOY.md), and push.
const CNAME = "";

// Every server-rendered subpage (file name === content key).
const SUBPAGES = [
  "about", "divisions",
  "division-group", "division-events", "division-capital", "division-strategies", "division-fund",
  "events", "leadership", "media", "blog", "contact",
];

// Scroll-driven background brightness pulse — sets --bg-dim (0.1 bright -> ~0.54 faded)
// as a cosine of scroll position. Injected on every page, exactly as the server did.
const BG_PULSE = "<script>(function(){var o=document.documentElement;function u(){var y=window.pageYOffset||0;o.style.setProperty('--bg-dim',(0.42*(1-Math.cos(y/280))).toFixed(3));}var t=false;addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(function(){u();t=false;});}},{passive:true});u();})();</script>";

const escAttr = (s) =>
  String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const jsonForScript = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

function toISODate(d) {
  const t = Date.parse(d);
  return Number.isNaN(t) ? "" : new Date(t).toISOString().slice(0, 10);
}

// ---------- content ----------

// Merge saved content over the defaults so newly-added fields always have a value.
// Arrays are taken from `stored` as-is; objects merge key-by-key. (Ported from db.js.)
function mergeDefaults(def, stored) {
  if (stored === undefined) return def;
  if (def === undefined || def === null) return stored;
  if (Array.isArray(def) || Array.isArray(stored)) return stored;
  if (typeof def === "object" && typeof stored === "object") {
    const out = { ...def };
    for (const k of Object.keys(stored)) out[k] = mergeDefaults(def[k], stored[k]);
    return out;
  }
  return stored;
}

// One-time migration: pull every page's content out of the old SQLite file so the
// database is never needed again.
async function exportFromDb() {
  const { createClient } = require("@libsql/client");
  const client = createClient({ url: "file:" + path.join(ROOT, "content.db") });
  const out = {};
  for (const page of Object.keys(DEFAULTS)) {
    let stored;
    try {
      const res = await client.execute({ sql: "SELECT data FROM content WHERE page = ?", args: [page] });
      if (res.rows[0]) stored = JSON.parse(res.rows[0].data);
    } catch {
      // table missing / db absent — fall back to defaults
    }
    out[page] = stored === undefined ? DEFAULTS[page] : mergeDefaults(DEFAULTS[page], stored);
  }
  return out;
}

async function loadContent() {
  if (fs.existsSync(CONTENT_JSON)) {
    const raw = JSON.parse(fs.readFileSync(CONTENT_JSON, "utf8"));
    const out = {};
    for (const page of Object.keys(DEFAULTS)) out[page] = mergeDefaults(DEFAULTS[page], raw[page]);
    return out;
  }
  console.log("  content.json not found — exporting from content.db (one time)");
  const content = await exportFromDb();
  fs.writeFileSync(CONTENT_JSON, JSON.stringify(content, null, 2));
  console.log("  wrote content.json — this is now the content source of truth");
  return content;
}

// ---------- html transforms ----------

// Strip host-specific tags that are dead weight (or 404s) on GitHub Pages, and
// point social-preview images at the real domain instead of the old Vercel host.
function detachFromVercel(html) {
  return html
    .replace(/\s*<script defer src="\/_vercel\/insights\/script\.js"><\/script>/g, "")
    .replace(/https:\/\/transform-ventures\.vercel\.app/g, SITE);
}

// Inject the content payload + bg pulse right after <body>, as the server did.
function injectHead(html, extra) {
  return html.replace(/<body[^>]*>/, (m) => m + "\n  " + extra + "\n  " + BG_PULSE);
}

function injectSSR(html, ssr) {
  if (!ssr) return html;
  return html.replace(/<div id="root">\s*<\/div>/, () => '<div id="root">' + ssr + "</div>");
}

// ---------- page builders ----------

function buildPageHTML(page, file, pathname, content) {
  const data = content[page] || {};
  let html = detachFromVercel(fs.readFileSync(path.join(ROOT, file), "utf8"));

  const tag =
    "<script>window.__TV_PAGE__=" + JSON.stringify(page) +
    ";window.__TV_CONTENT__=" + jsonForScript({ [page]: data }) + ";</script>";
  html = injectHead(html, tag);

  // FAQPage structured data, built from the editable home FAQ (AEO).
  if (page === "home" && Array.isArray(data.faq) && data.faq.length) {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq.filter((f) => f && f.q).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a || "" },
      })),
    };
    html = html.replace("</head>", () => '<script type="application/ld+json">' + jsonForScript(faqLd) + "</script>\n</head>");
  }

  return injectSSR(html, renderPage(page, data, pathname));
}

// Blog posts become one static file each: pages/post-<slug>.html.
// They stay at the `pages/` level on purpose — the shared components resolve assets
// with a two-level scheme (`../styles/`, `P = inPages ? '' : 'pages/'`), so a deeper
// directory would break every relative path.
function buildPostHTML(post, blog) {
  let html = detachFromVercel(fs.readFileSync(path.join(ROOT, "pages", "post.html"), "utf8"));

  const title = post.title;
  const desc = post.lede || "";
  const url = SITE + "/pages/post-" + encodeURIComponent(post.id) + ".html";

  html = html
    .replace(/\{\{TITLE\}\}/g, () => escAttr(title))
    .replace(/\{\{DESC\}\}/g, () => escAttr(desc))
    .replace(/\{\{URL\}\}/g, () => escAttr(url));

  const ld = [
    {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: title, description: desc,
      datePublished: toISODate(post.date), articleSection: post.tag || "",
      author: { "@type": "Person", name: "Michael Terpin" },
      publisher: {
        "@type": "Organization", name: "Transform Ventures",
        logo: { "@type": "ImageObject", url: SITE + "/assets/transform-ventures.png" },
      },
      url, mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: SITE + "/pages/blog.html" },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
  ];
  const ldHtml = ld.map((o) => '<script type="application/ld+json">' + jsonForScript(o) + "</script>").join("\n  ");
  html = html.replace("<!--LD_JSON-->", () => ldHtml);

  // __TV_POST_ID__ tells the client which post this file is, since there's no ?id=
  // query string on a static per-post URL.
  const tag =
    "<script>window.__TV_PAGE__='post';window.__TV_POST_ID__=" + JSON.stringify(post.id) +
    ";window.__TV_CONTENT__=" + jsonForScript({ post: blog }) + ";</script>";
  html = injectHead(html, tag);

  return injectSSR(html, renderPage("post", blog, "/pages/post.html", "?id=" + post.id));
}

// Legacy `/pages/post.html?id=<slug>` links (already indexed and in the old sitemap)
// forward to the new per-post file so nothing 404s.
function buildPostRedirect(posts) {
  const first = posts[0] ? posts[0].id : "";
  return `<!DOCTYPE html>
<html lang="en" data-dark>
<head>
  <meta charset="UTF-8"/>
  <meta name="robots" content="noindex, follow"/>
  <title>Redirecting: Transform Ventures</title>
  <link rel="canonical" href="${SITE}/pages/blog.html"/>
  <script>
    (function () {
      var ids = ${JSON.stringify(posts.map((p) => p.id))};
      var id = new URLSearchParams(location.search).get('id');
      var to = ids.indexOf(id) !== -1 ? id : ${JSON.stringify(first)};
      location.replace(to ? 'post-' + encodeURIComponent(to) + '.html' : 'blog.html');
    })();
  </script>
</head>
<body>
  <p>Redirecting to the article. <a href="blog.html">All posts</a> if you are not forwarded.</p>
</body>
</html>
`;
}

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const url = (loc, priority, changefreq) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

  const entries = [
    url(SITE + "/", "1.0", "weekly"),
    ...SUBPAGES.map((p) =>
      url(SITE + "/pages/" + p + ".html", p === "divisions" ? "0.9" : "0.8", "monthly")
    ),
    ...posts.map((p) => url(SITE + "/pages/post-" + encodeURIComponent(p.id) + ".html", "0.6", "monthly")),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

// ---------- build ----------

async function main() {
  console.log("\n  Building static site\n  " + "─".repeat(37));

  if (!fs.existsSync(path.join(ROOT, "dist", "components", "home-dark.js"))) {
    console.error("  ✗ dist/ is missing — run `npm run build` first (compiles the JSX).");
    process.exit(1);
  }

  const content = await loadContent();

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, "pages"), { recursive: true });

  // Home
  fs.writeFileSync(path.join(OUT, "index.html"), buildPageHTML("home", "index.html", "/", content));
  console.log("  ✔ index.html");

  // Subpages
  for (const page of SUBPAGES) {
    const html = buildPageHTML(page, "pages/" + page + ".html", "/pages/" + page + ".html", content);
    fs.writeFileSync(path.join(OUT, "pages", page + ".html"), html);
  }
  console.log("  ✔ " + SUBPAGES.length + " subpages");

  // Blog posts
  const blog = content.blog || {};
  const posts = Array.isArray(blog.posts) ? blog.posts : [];
  for (const post of posts) {
    fs.writeFileSync(path.join(OUT, "pages", "post-" + post.id + ".html"), buildPostHTML(post, blog));
  }
  fs.writeFileSync(path.join(OUT, "pages", "post.html"), buildPostRedirect(posts));
  console.log("  ✔ " + posts.length + " blog posts (+ legacy ?id= redirect)");

  // Static assets
  for (const dir of ["assets", "styles", "dist"]) {
    fs.cpSync(path.join(ROOT, dir), path.join(OUT, dir), { recursive: true });
  }
  for (const file of ["robots.txt", "llms.txt"]) {
    if (fs.existsSync(path.join(ROOT, file))) fs.copyFileSync(path.join(ROOT, file), path.join(OUT, file));
  }
  console.log("  ✔ assets, styles, dist, robots.txt, llms.txt");

  // Sitemap + GitHub Pages files
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), buildSitemap(posts));
  fs.writeFileSync(path.join(OUT, ".nojekyll"), ""); // stop Jekyll eating _-prefixed paths
  // 404 falls back to the home page shell so mistyped URLs still render the site.
  fs.copyFileSync(path.join(OUT, "index.html"), path.join(OUT, "404.html"));
  if (CNAME) {
    fs.writeFileSync(path.join(OUT, "CNAME"), CNAME + "\n");
    console.log("  ✔ sitemap.xml, .nojekyll, 404.html, CNAME (" + CNAME + ")");
  } else {
    console.log("  ✔ sitemap.xml, .nojekyll, 404.html");
    console.log("  · no CNAME — publishing to the github.io preview URL");
  }

  console.log("  " + "─".repeat(37));
  console.log("  Output: site/   →  npx serve site\n");
}

main().catch((err) => {
  console.error("\n  ✗ Build failed:", err.message, "\n");
  process.exit(1);
});
