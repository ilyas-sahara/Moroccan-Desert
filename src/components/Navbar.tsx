import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Compass, ChevronDown } from 'lucide-react';
import { useScrolled } from '@/hooks/useReveal';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const DROPDOWNS = [
  {
    label: 'Tours', to: '/tours',
    items: [
      { label: 'All Tours', description: 'Browse every journey', to: '/tours' },
      { label: 'Camel Treks', description: 'Follow the caravan', to: '/tours?experience=camel-trekking' },
      { label: 'Desert Camps', description: 'Sleep beneath the stars', to: '/tours?experience=desert-camping' },
      { label: '4x4 Desert Routes', description: 'Explore beyond the road', to: '/tours?experience=4x4-desert-routes' },
    ],
  },
  {
    label: 'Experiences', to: '/experiences',
    items: [
      { label: 'All Experiences', description: 'Find your perfect journey', to: '/experiences' },
      { label: 'Nomad Encounters', description: 'Meet the Sahara’s people', to: '/tours?experience=nomadic-culture' },
      { label: 'Stargazing', description: 'Discover the night sky', to: '/tours?experience=stargazing' },
      { label: 'Kasbahs & Oases', description: 'Culture beyond the dunes', to: '/tours?experience=kasbahs-and-oases' },
    ],
  },
  {
    label: 'Blog', to: '/blog',
    items: [
      { label: 'All Stories', description: 'Travel notes and guides', to: '/blog' },
      { label: 'Plan your first Sahara night', description: 'A practical guide', to: '/blog/how-to-plan-a-first-sahara-night' },
      { label: 'Desert camp comfort', description: 'What luxury really means', to: '/blog/what-makes-a-desert-camp-luxury' },
      { label: 'Beyond the dunes', description: 'Culture, music, and people', to: '/blog/three-ways-to-see-the-sahara-beyond-the-dunes' },
    ],
  },
];

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-sand-50/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(66,44,25,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Walk the Sahara home">
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
              Walk the Sahara
            </span>
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.32em] transition-colors duration-500 ${
                solid ? 'text-sand-600' : 'text-sand-100/80'
              }`}
            >
              Moroccan Desert Journeys
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
                `link-underline ${l.to === '/' ? 'order-0' : l.to === '/about' ? 'order-4' : 'order-5'} text-sm font-medium tracking-wide transition-colors duration-300 ${
                  solid ? 'text-ink-700 hover:text-sand-700' : 'text-white/90 hover:text-white'
                } ${isActive ? (solid ? 'text-sand-700' : 'text-white') : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {DROPDOWNS.map((dropdown) => {
            const isOpen = openDropdown === dropdown.label;
            const isActive = pathname === dropdown.to || pathname.startsWith(`${dropdown.to}/`);
            return (
              <div
                key={dropdown.label}
                className={`relative ${dropdown.label === 'Tours' ? 'order-1' : dropdown.label === 'Experiences' ? 'order-2' : 'order-3'}`}
                onMouseEnter={() => setOpenDropdown(dropdown.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center gap-1">
                  <NavLink
                    to={dropdown.to}
                    className={`link-underline text-sm font-medium tracking-wide transition-colors duration-300 ${solid ? 'text-ink-700 hover:text-sand-700' : 'text-white/90 hover:text-white'} ${isActive ? (solid ? 'text-sand-700' : 'text-white') : ''}`}
                  >
                    {dropdown.label}
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : dropdown.label)}
                    className={`rounded p-1 transition-transform ${solid ? 'text-ink-700' : 'text-white/90'} ${isOpen ? 'rotate-180' : ''}`}
                    aria-label={`Toggle ${dropdown.label} menu`}
                    aria-expanded={isOpen}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className={`absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-2xl border border-sand-200/80 bg-white p-2 shadow-xl shadow-ink-950/15 transition-all duration-200 ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
                  {dropdown.items.map((item) => (
                    <Link key={item.to} to={item.to} className="block rounded-xl px-4 py-3 transition-colors hover:bg-sand-100">
                      <span className="block text-sm font-semibold text-ink-900">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-sand-600">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <Link to="/custom-journey" className="btn-primary order-6 !px-5 !py-2.5 !text-xs">
            Book a Journey
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
            solid ? 'border-sand-300 text-ink-800' : 'border-white/50 text-white'
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
                {l.label}
              </NavLink>
            ))}
            <Link to="/custom-journey" className="btn-primary mt-6 w-full">
              Book a Journey
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
