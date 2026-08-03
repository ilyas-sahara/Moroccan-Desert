export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const clientId = env.GITHUB_CLIENT_ID || '';
    const clientSecret = env.GITHUB_CLIENT_SECRET || '';
    const proxyBaseUrl = (env.PUBLIC_PROXY_BASE_URL || '').replace(/\/$/, '');
    const allowedOrigin = env.CMS_ALLOWED_ORIGIN || '';

    if (url.pathname === '/auth') {
      if (!clientId || !proxyBaseUrl) {
        return new Response(configError('GITHUB_CLIENT_ID and PUBLIC_PROXY_BASE_URL must be set on this Worker.'), {
          status: 500,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });
      }

      const scope = url.searchParams.get('scope') || 'repo';
      const siteId = url.searchParams.get('site_id') || allowedOrigin;
      const redirectUri = `${proxyBaseUrl}/callback`;
      const state = btoa(JSON.stringify({ site_id: siteId, origin: allowedOrigin || proxyBaseUrl }));
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', clientId);
      authorize.searchParams.set('scope', scope);
      authorize.searchParams.set('redirect_uri', redirectUri);
      authorize.searchParams.set('state', state);

      return Response.redirect(authorize.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response(sendError('missing authorization code'), {
          status: 400,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });
      }
      if (!clientId || !clientSecret || !proxyBaseUrl) {
        return new Response(sendError('OAuth credentials are not configured on this Worker.'), {
          status: 500,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });
      }

      const redirectUri = `${proxyBaseUrl}/callback`;
      try {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
          }),
        });
        const tokenJson = await tokenRes.json();
        if (tokenJson.error || !tokenJson.access_token) {
          return new Response(sendError(tokenJson.error_description || tokenJson.error || 'token exchange failed'), {
            status: 502,
            headers: { 'content-type': 'text/html; charset=utf-8' },
          });
        }
        return new Response(sendScript(tokenJson.access_token), {
          headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
        });
      } catch (err) {
        return new Response(sendError(err instanceof Error ? err.message : 'unknown error'), {
          status: 500,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });
      }
    }

    return new Response('Not found', { status: 404 });
  },
};

function sendScript(token) {
  const provider = 'github';
  const payload = JSON.stringify({ token, provider });
  return `<!doctype html><html><head><meta charset="utf-8"><title>Authenticating…</title></head><body>
<script>
(function () {
  var provider = ${JSON.stringify(provider)};
  var payload = ${JSON.stringify(payload)};
  var handshakeMessage = 'authorizing:' + provider;
  var successMessage = 'authorization:' + provider + ':success:' + payload;
  function post(msg) {
    try { if (window.opener && window.opener !== window) window.opener.postMessage(msg, '*'); } catch (e) {}
    try { if (window.parent && window.parent !== window) window.parent.postMessage(msg, '*'); } catch (e) {}
  }
  post(handshakeMessage);
  window.addEventListener('message', function (event) {
    if (event.data === handshakeMessage) {
      setTimeout(function () { post(successMessage); window.close(); }, 50);
    }
  });
  setTimeout(function () {
    post(successMessage);
    document.body.innerText = 'Authenticated. You can close this window.';
  }, 1500);
})();
</script>
</body></html>`;
}

function sendError(message) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Auth error</title></head><body>
<p style="font-family: system-ui; padding: 2rem;">Authentication failed: ${message}. You can close this window and try again.</p>
</body></html>`;
}

function configError(message) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>CMS auth not configured</title></head><body>
<p style="font-family: system-ui; padding: 2rem;">${message}</p>
</body></html>`;
}
