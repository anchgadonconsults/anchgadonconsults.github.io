# anchgadon.com

Personal portfolio site for Angel Gadon — data systems specialist, econometrician, and statistical educator based in the Philippines.

**Live site:** [anchgadon.com](https://anchgadonconsults.github.io)

---

## Tech stack

- Plain HTML, CSS, JavaScript — no frameworks, no build step
- Google Fonts (Cormorant Garamond, DM Sans, DM Mono)
- Deployed on Netlify (primary) and GitHub Pages (mirror)

---

## Project structure

```
anch-website/
├── angel.html        # Main SPA — all five pages in one file
├── angel.css         # All styles and CSS custom properties
├── angel.js          # Navigation, portfolio logic, theme, burger menu
├── og-image.png      # Open Graph image (1200×630)
├── robots.txt
├── sitemap.xml
├── 404.html          # Custom error page
├── _headers          # Netlify security headers (CSP, HSTS, etc.)
└── _redirects        # Netlify rewrite: / → angel.html
```

---

## Local development

No build tools required. Open directly in a browser:

```bash
open angel.html
# or on Windows
start angel.html
```

For accurate font loading and to avoid CORS issues with local file paths, serve with any static server:

```bash
# Python
python -m http.server 3000

# Node
npx serve .
```

Then visit `http://localhost:3000`.

---

## Deployment

### Netlify (primary)

**Option A — Drag and drop**

1. Go to [netlify.com](https://netlify.com) and log in.
2. From the dashboard, drag the entire project folder onto the **"Deploy manually"** drop zone.
3. Netlify will assign a URL like `amazing-fox-123.netlify.app`.
4. To use a custom domain: **Site settings → Domain management → Add custom domain**.

**Option B — Connect to GitHub (auto-deploy on push)**

1. Push this repo to GitHub (see below).
2. Netlify dashboard → **Add new site → Import an existing project → GitHub**.
3. Select this repo, then set:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
4. Click **Deploy site**.

Every `git push` to `main` will trigger a redeploy automatically.

> The `_headers` file configures security headers (CSP, HSTS, X-Frame-Options).  
> The `_redirects` file rewrites `/` to `angel.html` so the root URL resolves correctly.

---

### GitHub Pages (mirror)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set branch to `main` and folder to `/ (root)`.
5. Click **Save**.

GitHub Pages will serve the site at `https://<your-username>.github.io/<repo-name>/`.

**Important:** GitHub Pages does not process `_headers` or `_redirects`. To make the root URL resolve, rename `angel.html` to `index.html` for the Pages deployment, or use a GitHub Actions workflow to handle this at build time. The `_headers` security rules also will not apply on Pages — they are Netlify-specific.

---

## Customization

| What to change | Where |
|---|---|
| Personal details, copy, contact info | `angel.html` |
| Project cards and data | `angel.js` — `projects` array (line 26) |
| Colors and design tokens | `angel.css` — `:root` block |
| Social/footer links | `angel.html` — footer and contact sidebar |
| OG image | Replace `og-image.png` (keep it 1200×630px) |
| Sitemap date | `sitemap.xml` — `<lastmod>` field |

---

## Contact

Angel Gadon — [anchgadonconsults@gmail.com](mailto:anchgadonconsults@gmail.com)  
LinkedIn — [linkedin.com/in/anchgadonconsults](https://www.linkedin.com/in/anchgadonconsults)
