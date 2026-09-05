import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LocaleProvider } from '@/i18n';
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

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <ScrollToTop />
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
