# Decap CMS on GitHub Pages + Cloudflare Worker — Setup Guide

The site is built with Vite and deployed to GitHub Pages at
`https://akimweb-bit.github.io/Moroccan-Desert/`. The `/admin/` route is a
[Decap CMS](https://decapcms.org/) panel that writes content directly to this
GitHub repository. GitHub requires a server-side OAuth proxy for login, which is
provided by a free Cloudflare Worker in `oauth-proxy/worker.js` (the Vercel
proxy was removed when the site moved off Vercel).

## 1. Deploy the Cloudflare Worker

1. Create a GitHub OAuth App at **https://github.com/settings/developers**:
   - **Application name** — anything, e.g. `Moroccan Desert Decap CMS`.
   - **Homepage URL** — `https://akimweb-bit.github.io/Moroccan-Desert`
   - **Authorization callback URL** — `https://moroccan-desert-cms-auth.<your-subdomain>.workers.dev/callback`
2. Copy the **Client ID** and generate a **Client Secret**.
3. Deploy `oauth-proxy/worker.js` as a new Cloudflare Worker (e.g. name it
   `moroccan-desert-cms-auth`) with three environment variables:

   | Name                      | Value                                      |
   | ------------------------- | ------------------------------------------ |
   | `GITHUB_CLIENT_ID`        | the Client ID from step 1                  |
   | `GITHUB_CLIENT_SECRET`    | the client secret from step 1              |
   | `PUBLIC_PROXY_BASE_URL`   | `https://moroccan-desert-cms-auth.<your-subdomain>.workers.dev` |
   | `CMS_ALLOWED_ORIGIN`      | `https://akimweb-bit.github.io`            |

4. Take the Worker's URL and put it in `public/admin/config.yml`:

   ```yml
   base_url: https://moroccan-desert-cms-auth.<your-subdomain>.workers.dev
   auth_endpoint: /auth
   ```

   `base_url` is the origin only; `auth_endpoint` is the path on that origin.

## 2. Enable GitHub Pages

1. Go to the repo **Settings → Pages**.
2. Under **Source**, choose **GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow builds `dist` and deploys it on
   every push to `master` (including CMS content commits).

## 3. Verify

Visit `https://akimweb-bit.github.io/Moroccan-Desert/admin/`. A popup opens,
redirects to GitHub for authorization, then closes and the CMS loads.

Troubleshooting:

- Popup shows a 404 on GitHub → the OAuth App **Authorization callback URL**
  must match `${PUBLIC_PROXY_BASE_URL}/callback` exactly.
- Popup shows "CMS auth not configured" → the Worker env vars are missing.
- Media uploads return broken URLs → `public_folder` in `config.yml` must start
  with the Pages base (`/Moroccan-Desert/assets/images`).

## 4. Editing content

- Logged-in users with **write access** to the repo can edit any collection
  (tours, settings, blog, FAQs, …) from the sidebar.
- All edits land as commits on the `master` branch, which triggers a fresh
  GitHub Pages deployment automatically.

## 5. Custom domain (later)

When you point a custom domain at GitHub Pages, the deployment moves to the
root of that domain:

1. Change `base` in `vite.config.ts` from `/Moroccan-Desert/` to `/`.
2. Change `public_folder` in `config.yml` back to `/assets/images`.
3. Update the OAuth App **Homepage URL** and **Authorization callback URL**
   (the callback stays the Worker URL, so it usually needs no change).
4. Add the domain in **Settings → Pages**.
