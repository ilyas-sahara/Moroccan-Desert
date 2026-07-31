import { Link } from 'react-router-dom';
import { Compass, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-sand-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #C08940 0, transparent 40%), radial-gradient(circle at 80% 70%, #855529 0, transparent 45%)',
        }}
      />
      <div className="container-x relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/40 text-sand-300">
                <Compass className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="font-display text-2xl font-semibold text-sand-50">Walk the Sahara</span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-sand-200/80">
              Luxury desert journeys through the golden dunes of Merzouga and beyond.
              Small groups, local guides, and camps that leave nothing behind but footprints.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/20 text-sand-200 transition-colors hover:border-sand-300 hover:text-sand-50"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-200/85">
              <li><Link to="/tours" className="link-underline hover:text-sand-50">All Tours</Link></li>
              <li><Link to="/experiences" className="link-underline hover:text-sand-50">Experiences</Link></li>
              <li><Link to="/blog" className="link-underline hover:text-sand-50">Blog</Link></li>
              <li><Link to="/about" className="link-underline hover:text-sand-50">About Us</Link></li>
              <li><Link to="/contact" className="link-underline hover:text-sand-50">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">Get in touch</h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-200/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                <span>Avenue Mohammed V, Merzouga, Errachidia, Morocco</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                <span>+212 5 35 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                <span>hello@walkthesahara.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-sand-300/10 pt-8 text-xs text-sand-300/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Walk the Sahara. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sand-100">Privacy</a>
            <a href="#" className="hover:text-sand-100">Terms</a>
            <a href="#" className="hover:text-sand-100">Responsible Travel</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
