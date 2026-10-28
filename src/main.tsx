import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { getInitialLocale } from './i18n/index.tsx';
import { loadLocaleDict, prefetchAllLocaleDicts } from './i18n/translations/index.ts';
import './index.css';

const redirect = sessionStorage.getItem('spa-redirect');
if (redirect) {
  sessionStorage.removeItem('spa-redirect');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const target = redirect === '/' ? base || '/' : `${base}/${redirect.replace(/^\//, '')}`;
  window.history.replaceState(null, '', target);
}

// Locale dictionaries for de/es/it are lazy chunks; the matching one must be
// in place before the first render so the page paints translated text (the
// prerendered HTML already does). en+fr live in the main bundle and resolve
// immediately. The fetch starts at module evaluation; the guard timeout only
// covers pathological cases (offline) — rendering with en fallback then is
// better than a blank page.
const bootDict = loadLocaleDict(getInitialLocale());
const bootReady = Promise.race([bootDict, new Promise((r) => setTimeout(r, 1500))]);
void bootReady.then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  prefetchAllLocaleDicts();
});
