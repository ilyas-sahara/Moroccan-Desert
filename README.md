# Walk the Sahara CMS foundation

This project now includes a blog route and a GitHub-backed Decap CMS admin surface for non-developers.

## Local-only GitHub auth setup

For a local development setup, you do not need a public web host. Decap can run from a local dev server and use the GitHub backend with the Netlify auth endpoint shape that matches the expected local browser flow.

## How to complete the setup

1. Keep your real repo name in [public/admin/config.yml](public/admin/config.yml).
2. Use the local development site domain value in `site_domain`.
3. Use the standard local auth pattern:
   - `base_url: https://api.netlify.com`
   - `auth_endpoint: auth`
   - `api_root: https://api.github.com`
4. Start the app locally and open `/admin/`.
5. Click **Login with GitHub** and complete the popup flow.

This is the local-only configuration path that matches the working admin example you showed.

## What this foundation supports

- Add and edit blog articles
- Upload images/videos through the CMS media folder
- Add tours and update tour details
- Keep page content editable without changing code

> The admin shell is wired and the GitHub login path now expects a real OAuth proxy deployment. That is the final missing server-side piece for the popup flow to complete.
