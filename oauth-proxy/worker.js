export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const proxyOrigin = env.PUBLIC_PROXY_BASE_URL;
    const redirectUri = `${proxyOrigin}/callback`;

    if (url.pathname === '/auth') {
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', 'repo workflow');
      authUrl.searchParams.set('state', crypto.randomUUID());

      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (!code) {
        return new Response('Missing GitHub authorization code.', { status: 400 });
      }

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'decap-oauth-proxy',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
        }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      if (!accessToken) {
        return new Response('GitHub token exchange failed.', { status: 400 });
      }

      return new Response(`
        <!doctype html>
        <html>
          <head><meta charset="utf-8" /><title>Decap CMS Login</title></head>
          <body>
            <script>
              const data = {
                type: 'authorization:github:success',
                code: '${code}',
                token: '${accessToken}'
              };
              window.opener?.postMessage(data, '*');
              window.close();
            </script>
          </body>
        </html>
      `, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    return new Response('Not found', { status: 404 });
  },
};
