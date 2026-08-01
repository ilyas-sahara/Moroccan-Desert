import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Buffer } from 'node:buffer';

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID ?? '';
const ALLOWED_ORIGIN = process.env.CMS_ALLOWED_ORIGIN ?? 'https://moroccan-desert.vercel.app';

const renderConfigError = (res: VercelResponse, message: string) => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.status(500).send(`<!doctype html><html><head><meta charset="utf-8"><title>CMS auth not configured</title>
<style>body{font-family:system-ui,sans-serif;background:#1a1a1a;color:#eee;margin:0;padding:3rem;line-height:1.6}
.card{max-width:640px;margin:0 auto;background:#262626;padding:2rem 2.5rem;border-radius:12px;border:1px solid #404040}
h1{color:#ff8a80;margin-top:0;font-size:1.4rem}
code{background:#1a1a1a;padding:0.15rem 0.4rem;border-radius:4px;font-size:0.9em;color:#ffd180}
ol{margin:0.5rem 0 1.5rem 1.2rem}</style></head><body><div class="card">
<h1>Decap CMS auth isn't configured on this deployment</h1>
<p>${message}</p>
<ol>
<li>Open the Vercel dashboard and select this project.</li>
<li>Go to <code>Settings &rarr; Environment Variables</code>.</li>
<li>Add the missing variables for the <code>Production</code> environment.</li>
<li>Redeploy the project (Deployments &rarr; &hellip; &rarr; Redeploy).</li>
</ol>
<p>See <code>SETUP.md</code> in the repo for the full walkthrough.</p>
</div></body></html>`);
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (!CLIENT_ID) {
    renderConfigError(
      res,
      'The <code>GITHUB_OAUTH_CLIENT_ID</code> environment variable is not set on this Vercel deployment.',
    );
    return;
  }

  const scope = (req.query.scope as string) || 'repo';
  const siteId = (req.query.site_id as string) || ALLOWED_ORIGIN;
  const host = req.headers.host ?? new URL(ALLOWED_ORIGIN).host;
  const forwardedProto = (req.headers['x-forwarded-proto'] as string | undefined) ?? 'https';
  const origin = `${forwardedProto}://${host}`;
  const redirectUri = `${origin}/api/cms-auth/callback`;
  const state = Buffer.from(JSON.stringify({ site_id: siteId, origin })).toString('base64url');
  const authorize = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;
  res.setHeader('cache-control', 'no-store');
  res.redirect(302, authorize);
}