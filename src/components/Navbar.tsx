import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Compass } from 'lucide-react';
import { useScrolled } from '@/hooks/useReveal';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
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
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `link-underline text-sm font-medium tracking-wide transition-colors duration-300 ${
                  solid ? 'text-ink-700 hover:text-sand-700' : 'text-white/90 hover:text-white'
                } ${isActive ? (solid ? 'text-sand-700' : 'text-white') : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/tours" className="btn-primary !px-5 !py-2.5 !text-xs">
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
            <Link to="/tours" className="btn-primary mt-6 w-full">
              Book a Journey
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
