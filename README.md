# Transform Ventures 3.0

Static site for [transformventures.io](https://www.transformventures.io/) — dark-themed marketing site built with React 18 (UMD) + JSX, pre-compiled to plain JS.

## Structure

```
index.html             ← home
pages/*.html           ← 11 subpages + blog
components/*.jsx       ← React component source
pages-src/*.jsx        ← per-page entry source (extracted from inline scripts)
dist/                  ← compiled JS (committed; rebuild with `npm run build`)
styles/                ← CSS
assets/                ← images
sitemap.xml, robots.txt
```

## Local development

```bash
# install build deps once
npm install

# rebuild after editing any .jsx file
npm run build

# serve locally
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Deploying to Cloudflare Pages

1. Connect the GitHub repo to Cloudflare Pages.
2. **Framework preset:** None (static).
3. **Build command:** `npm run build` (or leave empty — `dist/` is committed).
4. **Build output directory:** `/`
5. **Root directory:** `/`
6. Add the custom domain `transformventures.io` in the Pages dashboard.

The site is pure static HTML/CSS/JS — no backend, no env vars.

## Known TODO before launch

- **Contact form backend.** The form in `components/subpage-dark.jsx` currently falls back to `mailto:info@transformventures.io`. Wire up [Formspree](https://formspree.io/) or a Cloudflare Worker for proper inbox delivery.
- **Social links.** Footer + hero socials use `href="#"` placeholders. Replace with real X/LinkedIn/YouTube URLs.
- **301s from old domain.** If migrating from a `.com` or any prior URL structure, configure CF Pages redirects.
