# Deploying Transform Ventures to GitHub Pages

The site is **fully static** — no server, no database, no backend of any kind.
`build-static.js` renders every page to plain HTML in `site/`, and GitHub Actions
publishes that folder to GitHub Pages on every push to `main`.

- **Repo:** `hannah435/transform-ventures-3.0`
- **Publishing to:** https://hannah435.github.io/transform-ventures-3.0/
- **Eventual home:** https://www.transformventures.io — still on Squarespace until
  you do the DNS cutover in step 3.

---

## Day-to-day: publishing a change

```bash
git add -A
git commit -m "Update copy"
git push
```

That's it. The Actions workflow builds and publishes in about a minute.
Watch it under the repo's **Actions** tab.

**To edit page content**, edit `content.json` — it holds the text for every page,
keyed by page name (`home`, `about`, `blog`, …). The old admin CMS wrote to a
database; this file replaced it.

**To preview locally before pushing:**

```bash
npm run build:static   # renders everything into site/
npm run preview        # serves it at http://localhost:4000
```

The preview serves files exactly the way GitHub Pages does, so what you see is
what ships.

---

## One-time setup

### 1. Turn on GitHub Pages

Repo → **Settings** → **Pages** → **Source: GitHub Actions**.

Do *not* pick "Deploy from a branch" — the workflow in
`.github/workflows/deploy.yml` handles it.

### 2. Hook up the contact form

The site is static, so the form posts to **FormSubmit** (formsubmit.co) instead of
a backend. There is no account to create — the endpoint is just an email address.

1. In `components/subpage-dark.jsx`, set `FORM_ENDPOINT` near the top of the
   `Contact` component to `https://formsubmit.co/ajax/<your email>`.
2. Commit and push.
3. **Submit the live form once.** FormSubmit emails you a confirmation link — click
   it. Nothing is delivered until you do; this is a one-time activation.
4. After activating, FormSubmit shows you a random alias like
   `https://formsubmit.co/ajax/a1b2c3d4...`. Swap that in and push again, so your
   email address isn't sitting in the public JavaScript bundle for spam crawlers.

Free, unlimited submissions, and replies go straight back to the sender because the
form sets `_replyto`.

> The honeypot and validation still run client-side before anything is sent, so
> the spam behaviour matches the old server route.

### 3. Point the domain at GitHub (Cloudflare) — the cutover

**Do this last, once you're happy with the preview.**

`www.transformventures.io` currently serves the **old Squarespace site**. Until
you cut over, this site publishes to the preview URL instead:

> https://hannah435.github.io/transform-ventures-3.0/

Everything works there — the paths are all relative, so the site runs fine from a
subdirectory. Only the absolute URLs in `sitemap.xml` and the canonical/og tags
point at the real domain, which is what you want on cutover day.

When you're ready to replace Squarespace:

1. In `build-static.js`, set `const CNAME = "www.transformventures.io";`
   (it ships empty on purpose — a CNAME while DNS still points at Squarespace
   would redirect the preview URL to the old site and leave you nothing to review).
2. Add the DNS records below in Cloudflare.
3. Commit and push.

In Cloudflare → **DNS** for `transformventures.io`, **remove the existing
Squarespace records** for `@` and `www` first, then add:

| Type | Name | Value | Proxy |
|---|---|---|---|
| CNAME | `www` | `hannah435.github.io` | **DNS only** (grey cloud) |
| A | `@` | `185.199.108.153` | **DNS only** |
| A | `@` | `185.199.109.153` | **DNS only** |
| A | `@` | `185.199.110.153` | **DNS only** |
| A | `@` | `185.199.111.153` | **DNS only** |

The four A records let the bare `transformventures.io` redirect to the `www`
version.

**Two Cloudflare gotchas that will cost you an afternoon if you miss them:**

- **Set the proxy to "DNS only" (grey cloud), not proxied (orange).** With the
  orange cloud on, GitHub cannot complete the domain validation and your HTTPS
  certificate never issues. You can switch it back to proxied *after* GitHub
  shows the certificate as issued.
- **Cloudflare SSL/TLS mode must be "Full".** On "Flexible" you get an infinite
  redirect loop, because GitHub already forces HTTPS.

Then in Repo → **Settings** → **Pages**, confirm the custom domain reads
`www.transformventures.io` and tick **Enforce HTTPS** once the certificate has
issued (usually a few minutes, occasionally up to an hour).

---

## How the build works

`npm run build:static` runs two steps:

1. `npm run build` — Babel compiles the JSX in `components/` and `pages-src/`
   into `dist/`.
2. `node build-static.js` — loads `content.json`, renders each page through the
   same server-side renderer the old Express app used, and writes finished HTML
   into `site/`.

What comes out:

| Output | Served at | Notes |
|---|---|---|
| `index.html` | `/` | Home, fully server-rendered, with FAQ structured data |
| `<name>.html` | `/<name>` | The 11 root subpages — `/about`, `/divisions`, `/contact`… |
| `blog/index.html` | `/blog` | The blog index |
| `blog/<slug>.html` | `/blog/<slug>` | One file per post, each with its own title, canonical URL, and JSON-LD |
| `pages/*.html` | — | Redirect stubs for every retired URL; nothing indexed 404s |
| `sitemap.xml` | `/sitemap.xml` | Regenerated with the clean URLs |
| `CNAME`, `.nojekyll`, `404.html` | — | GitHub Pages plumbing |
| `assets/`, `styles/`, `dist/` | — | Copied as-is |

**URLs have no `.html`.** GitHub Pages resolves `/about` to `about.html` and `/blog`
to `blog/index.html` on its own, so the files keep their extensions on disk while the
URLs stay clean. The blog is a directory rather than `blog.html` so `/blog` and
`/blog/<slug>` can coexist without Pages having to choose between a file and a folder
of the same name.

**Every path in the markup is absolute** (`/assets/…`, `/about`) rather than relative.
That's what lets pages at different depths share one set of links. If you add markup
by hand, start paths with `/`.

Every page ships real HTML in `<div id="root">`, so crawlers and answer engines
that don't run JavaScript still see full content — the same SEO/AEO behaviour the
server used to provide.

`site/` is generated and git-ignored; CI rebuilds it on every push.

---

## Notes

- **URLs moved to the site root and dropped `.html`.** `/pages/about.html` is now
  `/about`, and `/pages/post.html?id=four-seasons` is now `/blog/four-seasons`.
  Every old URL has a redirect stub that forwards and canonicals to the new one, so
  existing links and anything already indexed keep working.
- **The old backend is gone.** `server/`, `api/`, and `admin/` are no longer
  deployed. `server/render.js` and `server/content-schema.js` are still used at
  build time; the rest is dead weight you can delete whenever you like.
- **Adding a blog post:** add an entry to the `posts` array in `content.json`
  under `blog`. The build creates its page and sitemap entry automatically.
- **Images:** drop them in `assets/` and reference them by relative path. There
  is no upload endpoint any more.
