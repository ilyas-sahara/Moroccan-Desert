import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const redirect = sessionStorage.getItem('spa-redirect');
if (redirect) {
  sessionStorage.removeItem('spa-redirect');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const target = redirect === '/' ? base || '/' : `${base}/${redirect.replace(/^\//, '')}`;
  window.history.replaceState(null, '', target);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
