# Decap GitHub OAuth proxy template

This folder contains a lightweight Cloudflare Worker that handles the GitHub
OAuth flow Decap needs when the CMS is served from a static site (GitHub Pages).
It is the direct port of the old Vercel `/api/cms-auth` proxy and speaks the
Decap 3.4.0 popup handshake.

## Required environment variables

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `PUBLIC_PROXY_BASE_URL` — e.g. `https://moroccan-desert-cms-auth.<your-subdomain>.workers.dev`
- `CMS_ALLOWED_ORIGIN` — the origin hosting the admin, e.g. `https://akimweb-bit.github.io`

## Routes

- `GET /auth` — starts the GitHub OAuth flow (redirects to GitHub authorize).
- `GET /callback` — exchanges the code for a token and completes the Decap popup handshake.

## Deploy steps

1. Create a GitHub OAuth App at https://github.com/settings/developers.
2. Set the **Authorization callback URL** to `https://<your-proxy-domain>/callback`.
3. `npx wrangler deploy` from this folder (Cloudflare account + logged-in CLI).
4. Add the four environment variables listed above in the Worker dashboard.
5. Point `public/admin/config.yml` at the deployed proxy domain
   (`base_url` = origin, `auth_endpoint` = `/auth`).

## Decap config values

```yml
backend:
  name: github
  repo: akimweb-bit/Moroccan-Desert
  branch: master
  base_url: https://moroccan-desert-cms-auth.<your-subdomain>.workers.dev
  auth_endpoint: /auth
  api_root: https://api.github.com
```
