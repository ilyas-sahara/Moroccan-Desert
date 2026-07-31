# Walk the Sahara CMS foundation

This project now includes a blog route and a GitHub-backed Decap CMS admin surface for non-developers.

## How to complete the GitHub setup

1. Fork or create a repository.
2. Replace the placeholder values in `public/admin/config.yml` and `public/admin/config.js`:
   - `YOUR_GITHUB_USERNAME`
   - `YOUR_REPO_NAME`
3. Commit the files to the repo and deploy the site.
4. Open `/admin/` to sign in with GitHub and manage content.

## What this foundation supports

- Add and edit blog articles
- Upload images/videos through the CMS media folder
- Add tours and update tour details
- Keep page content editable without changing code

> The site UI does not yet fully read from markdown files in the live app; this provides the editorial foundation and admin surface you can extend to the full data layer in a second pass.
