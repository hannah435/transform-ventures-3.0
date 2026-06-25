// Transform Ventures — web app server.
// Serves the server-rendered public site, a content API, image uploads, and a
// login-protected admin panel. Runs as a normal Node server locally and as a
// serverless function on Vercel (this module exports the Express `app`).
const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("./db");
const { SCHEMA, DEFAULTS } = require("./content-schema");
const { renderPage } = require("./render");
const { saveImage, UPLOADS } = require("./storage");

const ROOT = path.join(__dirname, "..");

// Every server-rendered subpage (file name === content key).
const SUBPAGES = [
  "about", "divisions",
  "division-group", "division-events", "division-capital", "division-strategies", "division-fund",
  "events", "leadership", "media", "blog", "contact",
];

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

// One-time DB init + admin seed (runs once per process / cold start).
let _ready;
function ready() {
  if (!_ready) {
    _ready = (async () => {
      await db.initDb();
      const u = process.env.ADMIN_USER || "admin";
      if (!(await db.getUser(u))) await db.createUser(u, process.env.ADMIN_PASS || "transform2026");
    })();
  }
  return _ready;
}
app.use((req, res, next) => {
  ready().then(() => next()).catch(next);
});

// Application surfaces must never be indexed (defense-in-depth with robots.txt).
app.use(["/admin", "/api"], (req, res, next) => {
  res.set("X-Robots-Tag", "noindex, nofollow");
  next();
});

// ---------- auth helpers ----------
async function currentUser(req) {
  const session = await db.getSession(req.cookies.tv_session);
  return session ? session.username : null;
}
async function requireAuth(req, res, next) {
  if (!(await currentUser(req))) return res.status(401).json({ error: "Not authenticated" });
  next();
}

// ---------- auth routes ----------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!(await db.verifyUser(username, password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  const token = await db.createSession(username);
  res.cookie("tv_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
  res.json({ ok: true, username });
});

app.post("/api/logout", async (req, res) => {
  await db.deleteSession(req.cookies.tv_session);
  res.clearCookie("tv_session");
  res.json({ ok: true });
});

app.get("/api/me", async (req, res) => {
  const username = await currentUser(req);
  if (!username) return res.status(401).json({ error: "Not authenticated" });
  res.json({ username });
});

// ---------- content API ----------
app.get("/api/pages", (req, res) => {
  res.json(Object.entries(SCHEMA).map(([key, v]) => ({ key, label: v.label })));
});

app.get("/api/schema/:page", (req, res) => {
  const schema = SCHEMA[req.params.page];
  if (!schema) return res.status(404).json({ error: "Unknown page" });
  res.json(schema);
});

app.get("/api/content/:page", async (req, res) => {
  const data = await db.getContent(req.params.page);
  if (!data) return res.status(404).json({ error: "Unknown page" });
  res.json(data);
});

app.put("/api/content/:page", requireAuth, async (req, res) => {
  if (!DEFAULTS[req.params.page]) return res.status(404).json({ error: "Unknown page" });
  await db.saveContent(req.params.page, req.body);
  res.json({ ok: true });
});

// Reset a page back to the built-in defaults
app.post("/api/content/:page/reset", requireAuth, async (req, res) => {
  const def = DEFAULTS[req.params.page];
  if (!def) return res.status(404).json({ error: "Unknown page" });
  await db.saveContent(req.params.page, def);
  res.json({ ok: true, data: def });
});

// ---------- image uploads ----------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype)),
});

app.post("/api/upload", requireAuth, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });
  try {
    const { filename, url } = await saveImage(req.file.buffer, req.file.originalname, req.file.mimetype);
    await db.recordMedia(filename, req.file.originalname, url);
    res.json({ url });
  } catch (err) {
    console.error("[upload]", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/api/media", requireAuth, async (req, res) => {
  res.json(await db.listMedia());
});

// ---------- admin panel ----------
app.use("/admin", express.static(path.join(ROOT, "admin")));

// ---------- public site: server-side rendered ----------
// The home page is rendered to full HTML on the server (great for SEO + AEO, since
// answer-engine crawlers often don't run JS); content is also injected as
// window.__TV_CONTENT__ so the client React app takes over seamlessly.
async function buildPageHTML(page, file, pathname) {
  const data = (await db.getContent(page)) || {};
  let html = fs.readFileSync(path.join(ROOT, file), "utf8");

  const tag =
    "<script>window.__TV_PAGE__=" +
    JSON.stringify(page) +
    ";window.__TV_CONTENT__=" +
    JSON.stringify({ [page]: data }).replace(/</g, "\\u003c") +
    ";</script>";
  html = html.replace(/<body([^>]*)>/, `<body$1>\n  ${tag}`);

  const ssr = renderPage(page, data, pathname);
  if (ssr) html = html.replace(/<div id="root">\s*<\/div>/, '<div id="root">' + ssr + "</div>");
  return html;
}

app.get(["/", "/index.html"], async (req, res) => {
  res.set("Cache-Control", "no-cache");
  try {
    res.type("html").send(await buildPageHTML("home", "index.html", "/"));
  } catch (err) {
    console.error("[home] render error:", err.message);
    res.type("html").send(fs.readFileSync(path.join(ROOT, "index.html"), "utf8"));
  }
});

// Server-render subpages at /pages/<name>.html (must precede express.static).
app.get("/pages/:file", async (req, res, next) => {
  const m = /^([a-z0-9-]+)\.html$/.exec(req.params.file);
  if (!m || !SUBPAGES.includes(m[1])) return next();
  const page = m[1];
  res.set("Cache-Control", "no-cache");
  try {
    res.type("html").send(await buildPageHTML(page, "pages/" + page + ".html", "/pages/" + page + ".html"));
  } catch (err) {
    console.error("[" + page + "] render error:", err.message);
    next();
  }
});

// Static assets (styles, dist, assets, pages, robots.txt, sitemap.xml, uploads…)
app.use("/uploads", express.static(UPLOADS));
app.use(express.static(ROOT, { index: false }));

// Run as a normal server locally; on Vercel the app is imported as a function.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("");
    console.log("  Transform Ventures is running");
    console.log("  ─────────────────────────────────────");
    console.log("  Public site:  http://localhost:" + PORT);
    console.log("  Admin panel:  http://localhost:" + PORT + "/admin");
    console.log("  ─────────────────────────────────────");
    console.log("");
  });
}

module.exports = app;
