// Local preview that resolves URLs the way GitHub Pages does, so what you see here
// is what ships. A plain static server won't do: it serves paths literally, so the
// extensionless URLs the site now uses (/about, /blog/four-seasons) would 404 locally
// while working fine in production.
//
//   npm run preview        ->  http://localhost:4000
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "site");
const PORT = process.env.PORT || 4000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// GitHub Pages tries the literal path, then <path>.html, then <path>/index.html.
function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const base = path.join(ROOT, path.normalize(clean).replace(/^(\.\.[/\\])+/, ""));
  if (!base.startsWith(ROOT)) return null; // no escaping the output directory
  for (const candidate of [base, base + ".html", path.join(base, "index.html")]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

http
  .createServer((req, res) => {
    const file = resolve(req.url);
    if (!file) {
      const notFound = path.join(ROOT, "404.html");
      const body = fs.existsSync(notFound) ? fs.readFileSync(notFound) : "Not found";
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(body);
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log("\n  Preview (GitHub Pages URL rules)  ->  http://localhost:" + PORT + "\n");
  });
