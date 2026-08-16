# Saharavacation — Moroccan Desert Journeys

Marketing site for Saharavacation (Merzouga, Morocco), built with Vite +
React + TypeScript + Tailwind. Includes a blog, tours, experiences, and a
GitHub-backed Decap CMS admin surface for non-developers.

## Hosting

- **Site**: GitHub Pages at `https://saharavacation.com`
- **CMS login**: Decap CMS with a Cloudflare Worker OAuth proxy (`oauth-proxy/`)
- **Deploys**: `.github/workflows/deploy.yml` builds and publishes on every push
  to `master` (including CMS content commits)

See [SETUP.md](SETUP.md) for the full GitHub Pages + Cloudflare Worker setup.

## Local development

```bash
npm install
npm run dev
```

Run `/admin/` locally from `npm run dev` — login still goes through the deployed
Cloudflare Worker.

## Content editing

The Decap CMS panel at `/admin/` lets editors with repo write access edit
tours, settings, blog, FAQs, testimonials, experiences, and page content.
All edits are committed to `master` and trigger a fresh Pages deployment.

## Note on the base path

The site is served at the custom domain root, so `vite.config.ts` sets
`base: '/'` and the router uses the same basename, with a `public/CNAME`
pointing at `saharavacation.com`.
