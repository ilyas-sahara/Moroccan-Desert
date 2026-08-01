# Decap CMS on Vercel — Setup Guide

The `/admin/` route is a [Decap CMS](https://decapcms.org/) (formerly Netlify CMS) panel that
writes content directly to this GitHub repository. Authentication goes through a tiny
serverless proxy at `/api/cms-auth/`, which keeps the GitHub OAuth credentials off the
browser and works on any static host — including Vercel.

If the admin popup opens GitHub but GitHub shows a 404, or if you see "auth isn't
configured" inside the popup, the environment variables are not set. Follow the steps
below once per Vercel project.

## 1. Create a GitHub OAuth App

1. Go to **https://github.com/settings/developers** and click **New OAuth App**.
2. Fill in:
   - **Application name** — anything, e.g. `Moroccan Desert Decap CMS`.
   - **Homepage URL** — `https://moroccan-desert.vercel.app`
     (use your custom domain if you have one).
   - **Authorization callback URL** — `https://moroccan-desert.vercel.app/api/cms-auth/callback`
3. Click **Register application**.
4. On the next screen, copy the **Client ID** and click **Generate a new client secret**, then
   copy the secret.

## 2. Add the secrets to Vercel

1. Open the Vercel dashboard and select the project.
2. Go to **Settings → Environment Variables**.
3. Add two variables for the **Production** environment (and Preview if you want):

   | Name                          | Value                                     |
   | ----------------------------- | ----------------------------------------- |
   | `GITHUB_OAUTH_CLIENT_ID`      | the Client ID from step 1                 |
   | `GITHUB_OAUTH_CLIENT_SECRET`  | the client secret from step 1             |

4. Save each variable.

## 3. Redeploy

Vercel picks up new environment variables on the next deployment.

1. Go to **Deployments**.
2. Open the **⋯** menu on the latest deployment and choose **Redeploy**.

## 4. Verify

Visit `https://moroccan-desert.vercel.app/admin/`. A popup should open and immediately
redirect you to GitHub asking you to authorize the OAuth App. After you authorize, the
popup closes and the CMS loads.

If the popup stays blank or shows "Page not found" on GitHub, the OAuth App's
**Authorization callback URL** is misconfigured (must match exactly
`https://<your-domain>/api/cms-auth/callback`).

If the popup shows "Decap CMS auth isn't configured on this deployment", the Vercel env
vars from step 2 are missing or the project hasn't been redeployed after adding them.

## 5. Editing content

- Logged-in users with **write access** to the repo can edit any collection
  (tours, settings, blog, FAQs, …) from the sidebar.
- All edits land as commits on the `master` branch, which triggers a fresh Vercel
  deployment automatically.
- For private repos, the GitHub account you authorize must be a collaborator.

## 6. Custom domain

If you later point a custom domain at this Vercel project, update both the
**Homepage URL** and **Authorization callback URL** in the GitHub OAuth App settings,
and update `base_url` in `public/admin/config.yml` to match the new origin.