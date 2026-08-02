import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { getFooterContent, type FooterContent } from '@/data/cms';

const DEFAULT_FOOTER: FooterContent = {
  brand_name: 'Walk the Sahara',
  description:
    'Luxury desert journeys through the golden dunes of Merzouga and beyond. Small groups, local guides, and camps that leave nothing behind but footprints.',
  instagram_url: '#',
  facebook_url: '#',
  explore_links: [
    { label: 'All Tours', to: '/tours' },
    { label: 'Experiences', to: '/experiences' },
    { label: 'Blog', to: '/blog' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  address: 'Avenue Mohammed V, Merzouga, Errachidia, Morocco',
  phone: '+212 5 35 00 00 00',
  email: 'hello@walkthesahara.com',
  copyright_text: 'All rights reserved.',
  legal_links: [
    { label: 'Privacy', to: '#' },
    { label: 'Terms', to: '#' },
    { label: 'Responsible Travel', to: '#' },
  ],
};

export default function Footer() {
  const [footer, setFooter] = useState<FooterContent>(DEFAULT_FOOTER);

  useEffect(() => {
    void (async () => {
      setFooter(await getFooterContent());
    })();
  }, []);

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
              <span className="font-display text-2xl font-semibold text-sand-50">{footer.brand_name}</span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-sand-200/80">{footer.description}</p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={footer.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/20 text-sand-200 transition-colors hover:border-sand-300 hover:text-sand-50"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={footer.facebook_url}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/20 text-sand-200 transition-colors hover:border-sand-300 hover:text-sand-50"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${footer.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-300/20 text-sand-200 transition-colors hover:border-sand-300 hover:text-sand-50"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-200/85">
              {footer.explore_links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="link-underline hover:text-sand-50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">Get in touch</h4>
            <ul className="mt-5 space-y-3 text-sm text-sand-200/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                <span>{footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                <span>{footer.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                <span>{footer.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-sand-300/10 pt-8 text-xs text-sand-300/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {footer.brand_name}. {footer.copyright_text}
          </p>
          <div className="flex items-center gap-6">
            {footer.legal_links.map((link) => (
              <a key={link.label} href={link.to} className="hover:text-sand-100">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
