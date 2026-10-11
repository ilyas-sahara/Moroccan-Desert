const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/**
 * Captures the page the visitor was on, the referring site, and any UTM
 * campaign params from the current URL, so inbound leads can be attributed.
 */
export function getLeadMeta(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const take = (key: string) => {
    const value = params.get(key);
    return value ? value.trim().slice(0, 500) : '';
  };
  const meta: Record<string, string> = {
    page: `${window.location.pathname}${window.location.search}`.slice(0, 500),
    referrer: (document.referrer || '').slice(0, 500),
  };
  for (const key of UTM_KEYS) {
    const value = take(key);
    if (value) meta[key] = value;
  }
  return meta;
}