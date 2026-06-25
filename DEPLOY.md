# Deploying Transform Ventures to Vercel

The app is a server-rendered Express site with a login-protected admin CMS.
Because Vercel is serverless (no persistent disk), two things live in managed cloud
services instead of on local disk:

- **Database** → **Turso** (cloud SQLite) — stores your edited content, the admin user, sessions
- **Uploaded images** → **Vercel Blob**

Everything else is already wired. You only need to (1) create those two stores,
(2) set a few environment variables, (3) deploy.

---

## 1. Create the Turso database (free)

Install the CLI and sign up:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
turso auth signup
```

Create the database and grab its two credentials:

```bash
turso db create transform-ventures
turso db show transform-ventures --url          # -> TURSO_DATABASE_URL  (libsql://...)
turso db tokens create transform-ventures       # -> TURSO_AUTH_TOKEN    (long token string)
```

Keep those two values handy.

---

## 2. Install Vercel CLI and link the project

```bash
npm i -g vercel
vercel login
vercel link          # run inside this folder; create a new project when asked
```

---

## 3. Add Vercel Blob (for image uploads)

In the Vercel dashboard → your project → **Storage** → **Create** → **Blob** →
connect it to this project. Vercel automatically adds the `BLOB_READ_WRITE_TOKEN`
environment variable for you.

---

## 4. Set environment variables

Either in the Vercel dashboard (Project → Settings → Environment Variables) or via CLI:

```bash
vercel env add TURSO_DATABASE_URL      production   # paste the libsql:// url
vercel env add TURSO_AUTH_TOKEN        production   # paste the token
vercel env add ADMIN_USER              production   # e.g. hannah
vercel env add ADMIN_PASS              production   # a strong password (CHANGE THE DEFAULT!)
vercel env add NODE_ENV                production   # value: production
```

`BLOB_READ_WRITE_TOKEN` is added automatically in step 3.

> The admin account is created automatically on first run from `ADMIN_USER` / `ADMIN_PASS`.
> If you don't set them it defaults to `admin` / `transform2026` — **do not ship the default.**

---

## 5. Deploy

```bash
vercel --prod
```

That's it. Vercel runs `npm run build` (compiles the React components), then serves the
SSR site + admin from the serverless function.

- **Site:**  `https://<your-project>.vercel.app/`
- **Admin:** `https://<your-project>.vercel.app/admin`

---

## Notes

- **Upload size:** Vercel serverless requests cap the body at ~4.5 MB, so keep uploaded
  images under that. (Optimized web images are normally well below it.)
- **Custom domain:** add `transformventures.io` in Project → Settings → Domains.
- **Local dev still works unchanged:** `npm run dev` uses a local `content.db` file and
  saves images to `uploads/` — no Turso/Blob needed locally.
- **Changing the admin password later:** update the `ADMIN_PASS` env var and redeploy, or
  run the seed script against Turso with the env vars set: `npm run seed`.
