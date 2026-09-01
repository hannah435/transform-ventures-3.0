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
// Set at cutover from Squarespace — the matching Cloudflare DNS records are in
// DEPLOY.md (records must be grey-cloud / DNS-only, and SSL/TLS mode Full).
const CNAME = "www.transformventures.io";

// Every server-rendered subpage (file name === content key).
const SUBPAGES = [
  "about", "divisions",
  "division-group", "division-events", "division-capital", "division-strategies", "division-fund",
  "events", "leadership", "media", "blog", "contact",
];

// Scroll-driven background brightness pulse — sets --bg-dim (0.1 bright -> ~0.54 faded)
// as a cosine of scroll position. Injected on every page, exactly as the server did.
const BG_PULSE = "<script>(function(){var o=document.documentElement;function u(){var y=window.pageYOffset||0;o.style.setProperty('--bg-dim',(0.42*(1-Math.cos(y/280))).toFixed(3));}var t=false;addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(function(){u();t=false;});}},{passive:true});u();})();</script>";

// Canonical entity definitions, reused across every JSON-LD block on the site.
// `sameAs` is what lets search and answer engines tie these pages to the same
// real-world entity they already know from elsewhere, so it is worth keeping accurate.
// Only profiles actually linked from the site are listed — an unverifiable sameAs is
// worse than none.
const ORG_SAME_AS = ["https://www.linkedin.com/company/transform-ventures/"];
const PERSON_SAME_AS = [
  "https://www.linkedin.com/in/michaelterpin/",
  "https://twitter.com/michaelterpin",
  "https://medium.com/@michaelterpin",
];

const AUTHOR = {
  "@type": "Person",
  name: "Michael Terpin",
  url: SITE + "/leadership",
  jobTitle: "Founder & CEO",
  sameAs: PERSON_SAME_AS,
};

const PUBLISHER = {
  "@type": "Organization",
  name: "Transform Ventures",
  url: SITE + "/",
  logo: { "@type": "ImageObject", url: SITE + "/assets/transform-ventures.png" },
  sameAs: ORG_SAME_AS,
};

// Public URL for a subpage. Everything sits at the root except the blog, which owns
// a directory so /blog and /blog/<slug> don't collide. The blog keeps its trailing
// slash because GitHub Pages 301s /blog -> /blog/, and linking to the pre-redirect
// form would put an extra hop on every blog link and in the sitemap.
const publicPath = (page) => (page === "blog" ? "/blog/" : "/" + page);

// Where that page's file is written inside the output directory.
const outputFile = (page) => (page === "blog" ? path.join("blog", "index.html") : page + ".html");

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

// Page-specific JSON-LD beyond what the HTML shells already carry. Everything here is
// derived from content.json rather than written by hand, so it can't drift from what
// the page actually says — structured data that contradicts the page is penalised.
function extraLd(page, data, html) {
  const descOf = () => {
    const m = html.match(/<meta name="description" content="([^"]*)"/);
    return m ? m[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"') : "";
  };
  const out = [];

  // Each division is a real sub-organisation of Transform Ventures.
  if (page.startsWith("division-")) {
    out.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: TITLES[page] || page,
      url: SITE + publicPath(page),
      description: (data.hero && data.hero.intro) || descOf(),
      parentOrganization: { "@type": "Organization", name: "Transform Ventures", url: SITE + "/" },
    });
  }

  // The press page: an ItemList of the actual coverage, each entry pointing at the
  // outlet's own URL so the citation is attributable.
  if (page === "media" && Array.isArray(data.items) && data.items.length) {
    out.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Transform Ventures in the press",
      description: descOf(),
      numberOfItems: data.items.length,
      itemListElement: data.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": it.type === "youtube" || it.type === "podcast" || it.type === "interview" ? "MediaObject" : "Article",
          name: it.title,
          url: it.url,
          ...(it.desc ? { description: it.desc } : {}),
          ...(it.src ? { publisher: { "@type": "Organization", name: it.src } } : {}),
          about: { "@type": "Person", name: "Michael Terpin", sameAs: PERSON_SAME_AS },
        },
      })),
    });
  }

  return out;
}

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

  for (const ld of extraLd(page, data, html)) {
    html = html.replace("</head>", () => '<script type="application/ld+json">' + jsonForScript(ld) + "</script>\n</head>");
  }

  return injectSSR(html, renderPage(page, data, pathname));
}

// Blog posts become one static file each at blog/<slug>.html, served as /blog/<slug>.
// The blog index lives at blog/index.html rather than blog.html so that /blog and
// /blog/<slug> can coexist without GitHub Pages having to guess between a file and a
// directory of the same name.
function buildPostHTML(post, blog) {
  let html = detachFromVercel(fs.readFileSync(path.join(ROOT, "pages", "post.html"), "utf8"));

  const title = post.title;
  const desc = post.lede || "";
  const url = SITE + "/blog/" + encodeURIComponent(post.id);

  html = html
    .replace(/\{\{TITLE\}\}/g, () => escAttr(title))
    .replace(/\{\{DESC\}\}/g, () => escAttr(desc))
    .replace(/\{\{URL\}\}/g, () => escAttr(url));

  const published = toISODate(post.date);
  const bodyText = Array.isArray(post.body) ? post.body.join(" ") : "";

  const ld = [
    {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: title, description: desc,
      datePublished: published,
      // No separate edit date is tracked, so the two match rather than claiming a
      // freshness the content doesn't have.
      dateModified: published,
      articleSection: post.tag || "",
      author: AUTHOR,
      publisher: PUBLISHER,
      inLanguage: "en-US",
      ...(bodyText ? { wordCount: bodyText.split(/\s+/).filter(Boolean).length } : {}),
      isPartOf: { "@type": "Blog", name: "Transform Ventures Blog", url: SITE + "/blog/" },
      url, mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: SITE + "/blog/" },
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

  return injectSSR(html, renderPage("post", blog, "/blog/" + post.id, "?id=" + post.id));
}

// A redirect stub for an old URL. GitHub Pages can't do server-side redirects, so
// each retired path gets a tiny page that canonicals to the new one and forwards.
// `location.replace` keeps the dead URL out of the visitor's back-button history.
function buildRedirect(target, label) {
  return `<!DOCTYPE html>
<html lang="en" data-dark>
<head>
  <meta charset="UTF-8"/>
  <meta name="robots" content="noindex, follow"/>
  <title>Redirecting: Transform Ventures</title>
  <link rel="canonical" href="${SITE}${target}"/>
  <meta http-equiv="refresh" content="0; url=${target}"/>
  <script>location.replace(${JSON.stringify(target)} + location.hash);</script>
</head>
<body>
  <p>This page moved to <a href="${target}">${label || target}</a>.</p>
</body>
</html>
`;
}

// The old `/pages/post.html?id=<slug>` URL carried the slug in the query string, so
// it needs to read it at runtime rather than redirect to one fixed target.
function buildPostQueryRedirect(posts) {
  return `<!DOCTYPE html>
<html lang="en" data-dark>
<head>
  <meta charset="UTF-8"/>
  <meta name="robots" content="noindex, follow"/>
  <title>Redirecting: Transform Ventures</title>
  <link rel="canonical" href="${SITE}/blog"/>
  <script>
    (function () {
      var ids = ${JSON.stringify(posts.map((p) => p.id))};
      var id = new URLSearchParams(location.search).get('id');
      location.replace(ids.indexOf(id) !== -1 ? '/blog/' + encodeURIComponent(id) : '/blog');
    })();
  </script>
</head>
<body>
  <p>This page moved. <a href="/blog">All posts</a>.</p>
</body>
</html>
`;
}

// Editorial preamble for llms.txt. Only the prose lives here — every URL below it is
// generated, because the hand-maintained version silently kept pointing at /pages/*.html
// URLs for a while after the site moved to clean ones.
const LLMS_INTRO = `# Transform Ventures

> Transform Ventures is the blockchain and digital asset venture platform of Michael Terpin, known as the "Godfather of Crypto" (CNBC). It provides capital, resources, and strategic guidance to high-growth digital asset projects across five specialized divisions, and is headquartered in San Juan, Puerto Rico.

Founded on three decades of building at the intersection of media and money, Transform Ventures grew out of Globe Newswire (the first internet-based newswire, sold to NASDAQ for $200M), BitAngels (the first digital asset angel group, 2013), and Transform Group (the original blockchain PR firm, which powered the first-ever token sale, Mastercoin, 2013, and 100+ ICO-era tokens including Ethereum, EOS, and Tether).

## Key facts
- Founder & CEO: Michael Terpin, early bitcoin investor, author of "Bitcoin Supercycle: How the Crypto Calendar Can Make You Rich" (Skyhorse, 2024), creator of the "Four Seasons of Bitcoin" cycle model.
- Headquarters: San Juan, Puerto Rico.
- Five divisions: Transform Group (PR & communications), Transform Events (Tokenize, BitAngels, Tiger Mansion), Transform Capital (family office), Transform Strategies (advisory & consulting), Bitcoin Supercycle Fund (the first liquid bitcoin-only hedge fund).
`;

const LLMS_MAIN = ["about", "divisions", "leadership", "events", "media", "blog", "contact"];
const LLMS_DIVISIONS = ["division-group", "division-events", "division-capital", "division-strategies", "division-fund"];
const TITLES = {
  about: "About", divisions: "Divisions", leadership: "Leadership", events: "Events",
  media: "News & Media", blog: "Blog", contact: "Contact",
  "division-group": "Transform Group", "division-events": "Transform Events",
  "division-capital": "Transform Capital", "division-strategies": "Transform Strategies",
  "division-fund": "Bitcoin Supercycle Fund",
};

// `descriptions` is each page's own <meta name="description">, so llms.txt and the
// pages can never describe the site differently.
function buildLlmsTxt(descriptions, posts) {
  const line = (page) =>
    `- [${TITLES[page] || page}](${SITE}${publicPath(page)}): ${descriptions[page] || ""}`.trimEnd();

  const sections = [
    LLMS_INTRO,
    "## Main pages",
    `- [Home](${SITE}/): ${descriptions.home || ""}`.trimEnd(),
    ...LLMS_MAIN.map(line),
    "",
    "## Divisions",
    ...LLMS_DIVISIONS.map(line),
  ];

  if (posts.length) {
    sections.push("", "## Articles");
    for (const p of posts) {
      const when = p.date ? ` (${p.date})` : "";
      sections.push(`- [${p.title}](${SITE}/blog/${encodeURIComponent(p.id)})${when}: ${(p.lede || "").trim()}`.trimEnd());
    }
  }

  sections.push(
    "",
    "## Contact",
    "- Email: info@transformventures.io",
    "- Location: San Juan, Puerto Rico",
    ""
  );
  return sections.join("\n");
}

function buildSitemap(posts) {
  // lastmod is only emitted where a real date is known — the posts carry their own.
  // Stamping every page with the build date would tell crawlers the whole site changed
  // on every deploy, and Google's documented response to inaccurate lastmod is to stop
  // trusting the field altogether.
  const url = (loc, priority, changefreq, lastmod) =>
    `  <url>\n    <loc>${loc}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : "") +
    `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

  const entries = [
    url(SITE + "/", "1.0", "weekly"),
    ...SUBPAGES.map((p) => url(SITE + publicPath(p), p === "divisions" ? "0.9" : "0.8", "monthly")),
    ...posts.map((p) =>
      url(SITE + "/blog/" + encodeURIComponent(p.id), "0.6", "monthly", toISODate(p.date))
    ),
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
  fs.mkdirSync(path.join(OUT, "blog"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "pages"), { recursive: true }); // redirect stubs only

  // Each page's own <meta name="description">, reused to build llms.txt.
  const descriptions = {};
  const describe = (page, html) => {
    const m = html.match(/<meta name="description" content="([^"]*)"/);
    if (m) descriptions[page] = m[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"');
  };

  // Home
  const homeHTML = buildPageHTML("home", "index.html", "/", content);
  describe("home", homeHTML);
  fs.writeFileSync(path.join(OUT, "index.html"), homeHTML);
  console.log("  ✔ index.html");

  // Subpages — written to the root (blog gets its own directory) and served
  // extensionless, which GitHub Pages resolves to the .html file for us.
  for (const page of SUBPAGES) {
    const html = buildPageHTML(page, "pages/" + page + ".html", publicPath(page), content);
    describe(page, html);
    fs.writeFileSync(path.join(OUT, outputFile(page)), html);
  }
  console.log("  ✔ " + SUBPAGES.length + " subpages at /<name>");

  // Blog posts
  const blog = content.blog || {};
  const posts = Array.isArray(blog.posts) ? blog.posts : [];
  for (const post of posts) {
    fs.writeFileSync(path.join(OUT, "blog", post.id + ".html"), buildPostHTML(post, blog));
  }
  console.log("  ✔ " + posts.length + " blog posts at /blog/<slug>");

  // Redirect stubs for every URL the old structure exposed, so nothing that is
  // already indexed or linked from elsewhere starts 404ing.
  let stubs = 0;
  for (const page of SUBPAGES) {
    fs.writeFileSync(path.join(OUT, "pages", page + ".html"), buildRedirect(publicPath(page), page));
    stubs++;
  }
  for (const post of posts) {
    fs.writeFileSync(
      path.join(OUT, "pages", "post-" + post.id + ".html"),
      buildRedirect("/blog/" + encodeURIComponent(post.id), post.title)
    );
    stubs++;
  }
  fs.writeFileSync(path.join(OUT, "pages", "post.html"), buildPostQueryRedirect(posts));
  stubs++;
  console.log("  ✔ " + stubs + " redirect stubs for the old /pages/ URLs");

  // Static assets
  for (const dir of ["assets", "styles", "dist"]) {
    fs.cpSync(path.join(ROOT, dir), path.join(OUT, dir), { recursive: true });
  }
  if (fs.existsSync(path.join(ROOT, "robots.txt"))) {
    fs.copyFileSync(path.join(ROOT, "robots.txt"), path.join(OUT, "robots.txt"));
  }
  // llms.txt is generated, never copied — see buildLlmsTxt.
  fs.writeFileSync(path.join(OUT, "llms.txt"), buildLlmsTxt(descriptions, posts));
  console.log("  ✔ assets, styles, dist, robots.txt, llms.txt (generated)");

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
