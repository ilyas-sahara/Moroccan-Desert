import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Buffer } from 'node:buffer';

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID ?? '';
const ALLOWED_ORIGIN = process.env.CMS_ALLOWED_ORIGIN ?? 'https://moroccan-desert.vercel.app';

export default function handler(req: VercelRequest, res: VercelResponse) {
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