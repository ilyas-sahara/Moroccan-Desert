import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Buffer } from 'node:buffer';

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET ?? '';
const ALLOWED_ORIGIN = process.env.CMS_ALLOWED_ORIGIN ?? 'https://moroccan-desert.vercel.app';

const sendScript = (res: VercelResponse, token: string, provider: string) => {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  const payload = JSON.stringify({ token, provider });
  res.status(200).send(`<!doctype html><html><head><meta charset="utf-8"><title>Authenticating…</title></head><body>
<script>
(function () {
  var provider = ${JSON.stringify(provider)};
  var payload = ${JSON.stringify(payload)};
  var successMessage = 'authorization:' + provider + ':success:' + payload;
  function post(msg) {
    try { if (window.opener && window.opener !== window) window.opener.postMessage(msg, '*'); } catch (e) {}
    try { if (window.parent && window.parent !== window) window.parent.postMessage(msg, '*'); } catch (e) {}
  }
  window.addEventListener('message', function (event) {
    if (event.data === 'authorizing:' + provider) {
      post('authorizing:' + provider);
      setTimeout(function () { post(successMessage); window.close(); }, 50);
    }
  });
  setTimeout(function () { document.body.innerText = 'Authenticated. You can close this window.'; }, 1500);
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error';
    sendError(res, 500, message);
  }
}