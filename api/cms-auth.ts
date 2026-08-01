/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Buffer } from 'node:buffer';

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET ?? '';
const ALLOWED_ORIGIN = process.env.CMS_ALLOWED_ORIGIN ?? 'https://moroccan-desert.vercel.app';

const sendScript = (res: VercelResponse, token: string, provider: string) => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.status(200).send(`<!doctype html><html><head><meta charset="utf-8"><title>Authenticating…</title></head><body>
<script>
(function () {
  var payload = { type: 'authorization', token: ${JSON.stringify(token)}, provider: ${JSON.stringify(provider)} };
  try {
    if (window.opener && window.opener !== window) {
      window.opener.postMessage(payload, '*');
    } else if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, '*');
    } else {
      localStorage.setItem('decap-cms-auth', JSON.stringify(payload));
    }
  } catch (err) {
    localStorage.setItem('decap-cms-auth', JSON.stringify(payload));
  }
  window.close();
  setTimeout(function () { document.body.innerText = 'Authenticated. You can close this window.'; }, 200);
})();
</script>
</body></html>`);
};

const sendError = (res: VercelResponse, status: number, message: string) => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.status(status).send(`<!doctype html><html><head><meta charset="utf-8"><title>Auth error</title></head><body>
<p style="font-family: system-ui; padding: 2rem;">Authentication failed: ${message}. You can close this window and try again.</p>
</body></html>`);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('access-control-allow-origin', ALLOWED_ORIGIN);
    res.setHeader('access-control-allow-methods', 'GET, OPTIONS');
    res.setHeader('access-control-allow-headers', 'content-type');
    res.status(204).end();
    return;
  }

  const callbackMatch = req.url?.match(/\/callback(?:\?|$)/);
  const action = callbackMatch ? 'callback' : 'auth';

  if (action === 'auth') {
    const scope = (req.query.scope as string) || 'repo';
    const siteId = (req.query.site_id as string) || ALLOWED_ORIGIN;
    const host = req.headers.host ?? new URL(ALLOWED_ORIGIN).host;
    const origin = req.headers['x-forwarded-proto'] ? `${req.headers['x-forwarded-proto']}://${host}` : ALLOWED_ORIGIN;
    const redirectUri = `${origin}/api/cms-auth/callback`;
    const state = Buffer.from(JSON.stringify({ site_id: siteId, origin })).toString('base64url');
    const authorize = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;
    res.setHeader('cache-control', 'no-store');
    res.redirect(302, authorize);
    return;
  }

  const code = req.query.code as string | undefined;
  const stateRaw = req.query.state as string | undefined;
  let stateOrigin = ALLOWED_ORIGIN;
  if (stateRaw) {
    try {
      const parsed = JSON.parse(Buffer.from(stateRaw, 'base64url').toString('utf8'));
      if (parsed?.origin) stateOrigin = parsed.origin;
    } catch {
      // ignore
    }
  }

  if (!code) {
    sendError(res, 400, 'missing authorization code');
    return;
  }
  if (!CLIENT_ID || !CLIENT_SECRET) {
    sendError(res, 500, 'OAuth credentials are not configured');
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: `${stateOrigin.replace(/\/$/, '')}/api/cms-auth/callback`,
      }),
    });
    const tokenJson = (await tokenRes.json()) as { access_token?: string; error?: string; error_description?: string };
    if (tokenJson.error || !tokenJson.access_token) {
      sendError(res, 502, tokenJson.error_description || tokenJson.error || 'token exchange failed');
      return;
    }
    sendScript(res, tokenJson.access_token, 'github');
  } catch (err: any) {
    sendError(res, 500, err?.message ?? 'unknown error');
  }
}