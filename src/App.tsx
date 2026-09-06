import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DEFAULT_LOCALE, LocaleProvider, isLocale, localePrefix } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SiteOrganization from '@/components/SiteOrganization';
import WhatsAppButton from '@/components/WhatsAppButton';
import Home from '@/pages/Home';

const Tours = lazy(() => import('@/pages/Tours'));
const TourDetail = lazy(() => import('@/pages/TourDetail'));
const Experiences = lazy(() => import('@/pages/Experiences'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogDetail = lazy(() => import('@/pages/BlogDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const CustomJourney = lazy(() => import('@/pages/CustomJourney'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const ResponsibleTravel = lazy(() => import('@/pages/ResponsibleTravel'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function routerBasename(): string {
  if (typeof window === 'undefined') return '';
  const seg = (window.location.pathname.split('/')[1] ?? '').toLowerCase();
  if (!isLocale(seg) || seg === DEFAULT_LOCALE) return '';
  return `/${seg}`;
}

const BASENAME = routerBasename();

/**
 * Normalizes legacy URLs:
 * - `/fr/...` -> `/...` (French is the default, served from the root)
 * - `?lang=` query -> real localized subpath (e.g. `?lang=de` -> `/de`)
 */
function LegacyLocaleRedirect() {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = window.location;
    const seg = (full.pathname.split('/')[1] ?? '').toLowerCase();
    if (seg === DEFAULT_LOCALE) {
      const rest = full.pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
      full.replace(rest + full.search);
      return;
    }
    if (!isLocale(seg)) {
      const params = new URLSearchParams(full.search);
      const lang = params.get('lang');
      if (lang && isLocale(lang)) {
        params.delete('lang');
        const qs = params.toString();
        full.replace(localePrefix(lang) + full.pathname + (qs ? `?${qs}` : ''));
      }
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter basename={BASENAME}>
        <ScrollToTop />
        <LegacyLocaleRedirect />
        <SiteOrganization />
        <WhatsAppButton />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:slug" element={<TourDetail />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/custom-journey" element={<CustomJourney />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/responsible-travel" element={<ResponsibleTravel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </LocaleProvider>
  );
}
