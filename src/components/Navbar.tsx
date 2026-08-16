import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Compass, ChevronDown } from 'lucide-react';
import { useScrolled } from '@/hooks/useReveal';
import { useLocale } from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const LINKS = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/tours', labelKey: 'nav.tours' },
  { to: '/experiences', labelKey: 'nav.experiences' },
  { to: '/blog', labelKey: 'nav.blog' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
  { to: '/custom-journey', labelKey: 'nav.customJourney' },
] as const;

const DROPDOWNS = [
  {
    id: 'tours',
    to: '/tours',
    labelKey: 'nav.tours',
    items: [
      { labelKey: 'nav.toursDropdown.all', descKey: 'nav.toursDropdown.allDesc', to: '/tours' },
      { labelKey: 'nav.toursDropdown.camel', descKey: 'nav.toursDropdown.camelDesc', to: '/tours?experience=camel-trekking' },
      { labelKey: 'nav.toursDropdown.camps', descKey: 'nav.toursDropdown.campsDesc', to: '/tours?experience=desert-camping' },
      { labelKey: 'nav.toursDropdown.fourxfour', descKey: 'nav.toursDropdown.fourxfourDesc', to: '/tours?experience=4x4-desert-routes' },
    ],
  },
  {
    id: 'experiences',
    to: '/experiences',
    labelKey: 'nav.experiences',
    items: [
      { labelKey: 'nav.expDropdown.all', descKey: 'nav.expDropdown.allDesc', to: '/experiences' },
      { labelKey: 'nav.expDropdown.nomad', descKey: 'nav.expDropdown.nomadDesc', to: '/tours?experience=nomadic-culture' },
      { labelKey: 'nav.expDropdown.stargazing', descKey: 'nav.expDropdown.stargazingDesc', to: '/tours?experience=stargazing' },
      { labelKey: 'nav.expDropdown.kasbahs', descKey: 'nav.expDropdown.kasbahsDesc', to: '/tours?experience=kasbahs-and-oases' },
    ],
  },
  {
    id: 'blog',
    to: '/blog',
    labelKey: 'nav.blog',
    items: [
      { labelKey: 'nav.blogDropdown.all', descKey: 'nav.blogDropdown.allDesc', to: '/blog' },
      { labelKey: 'nav.blogDropdown.post1', descKey: 'nav.blogDropdown.post1Desc', to: '/blog/how-to-plan-a-first-sahara-night' },
      { labelKey: 'nav.blogDropdown.post2', descKey: 'nav.blogDropdown.post2Desc', to: '/blog/what-makes-a-desert-camp-luxury' },
      { labelKey: 'nav.blogDropdown.post3', descKey: 'nav.blogDropdown.post3Desc', to: '/blog/three-ways-to-see-the-sahara-beyond-the-dunes' },
    ],
  },
] as const;

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { t } = useLocale();

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || pathname !== '/';

  const linkOrder = (to: string) =>
    to === '/' ? 'order-0' : to === '/about' ? 'order-4' : to === '/contact' ? 'order-5' : 'order-6';
  const dropdownOrder = (id: string) =>
    id === 'tours' ? 'order-1' : id === 'experiences' ? 'order-2' : 'order-3';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-sand-50/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(66,44,25,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={t('nav.homeAria')}>
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 ${
              solid ? 'border-sand-300 text-sand-700' : 'border-white/60 text-white'
            }`}
          >
            <Compass className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-xl font-semibold tracking-wide transition-colors duration-500 ${
                solid ? 'text-ink-900' : 'text-white'
              }`}
            >
              Sahara Vacation
            </span>
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.32em] transition-colors duration-500 ${
                solid ? 'text-sand-600' : 'text-sand-100/80'
              }`}
            >
              {t('nav.tagline')}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.filter((l) => !DROPDOWNS.some((dropdown) => dropdown.to === l.to)).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `link-underline ${linkOrder(l.to)} text-sm font-medium tracking-wide transition-colors duration-300 ${
                  solid ? 'text-ink-700 hover:text-sand-700' : 'text-white/90 hover:text-white'
                } ${isActive ? (solid ? 'text-sand-700' : 'text-white') : ''}`
              }
            >
              {t(l.labelKey)}
            </NavLink>
          ))}
          {DROPDOWNS.map((dropdown) => {
            const isOpen = openDropdown === dropdown.id;
            const isActive = pathname === dropdown.to || pathname.startsWith(`${dropdown.to}/`);
            const label = t(dropdown.labelKey);
            return (
              <div
                key={dropdown.id}
                className={`relative ${dropdownOrder(dropdown.id)}`}
                onMouseEnter={() => setOpenDropdown(dropdown.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center gap-1">
                  <NavLink
                    to={dropdown.to}
                    className={`link-underline text-sm font-medium tracking-wide transition-colors duration-300 ${solid ? 'text-ink-700 hover:text-sand-700' : 'text-white/90 hover:text-white'} ${isActive ? (solid ? 'text-sand-700' : 'text-white') : ''}`}
                  >
                    {label}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : dropdown.id)}
                    className={`rounded p-1 transition-transform ${solid ? 'text-ink-700' : 'text-white/90'} ${isOpen ? 'rotate-180' : ''}`}
                    aria-label={t('nav.toggleDropdown', { name: label })}
                    aria-expanded={isOpen}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className={`absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-2xl border border-sand-200/80 bg-white p-2 shadow-xl shadow-ink-950/15 transition-all duration-200 ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
                  {dropdown.items.map((item) => (
                    <Link key={item.to} to={item.to} className="block rounded-xl px-4 py-3 transition-colors hover:bg-sand-100">
                      <span className="block text-sm font-semibold text-ink-900">{t(item.labelKey)}</span>
                      <span className="mt-0.5 block text-xs text-sand-600">{t(item.descKey)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <Link to="/custom-journey" className="btn-primary order-7 !px-5 !py-2.5 !text-xs">
            {t('nav.book')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher solid={solid} />
          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              solid ? 'border-sand-300 text-ink-800' : 'border-white/50 text-white'
            }`}
            aria-label={t('nav.toggleMenu')}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-0 top-20 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          className={`fixed inset-x-0 top-20 origin-top bg-sand-50 px-5 pb-8 pt-4 shadow-2xl transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `border-b border-sand-100 py-4 font-display text-2xl transition-colors ${
                    isActive ? 'text-sand-700' : 'text-ink-800'
                  }`
                }
              >
                {t(l.labelKey)}
              </NavLink>
            ))}
            <Link to="/custom-journey" className="btn-primary mt-6 w-full">
              {t('nav.book')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
