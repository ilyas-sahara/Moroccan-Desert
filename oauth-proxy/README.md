# Decap GitHub OAuth proxy template

This folder contains a lightweight Cloudflare Worker template for the GitHub OAuth flow Decap needs when the CMS is served from a static site.

## Required environment variables

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `PUBLIC_PROXY_BASE_URL`

## Deploy steps

1. Create a GitHub OAuth App.
2. Set the callback URL to `https://<your-proxy-domain>/callback`.
3. Deploy this worker to Cloudflare Workers.
4. Point the Decap CMS config to the deployed proxy domain.

## Decap config values

Use the proxy domain in the `base_url` field and the `/auth` endpoint path:

```yml
backend:
  name: github
  repo: akimweb-bit/Moroccan-Desert-Journeys
  branch: main
  base_url: https://<your-proxy-domain>
  auth_endpoint: /auth
  api_root: https://api.github.com
  site_domain: https://<your-live-site-domain>
```

This proxy template is the missing piece that lets the GitHub popup complete the authorization flow from a static site.
