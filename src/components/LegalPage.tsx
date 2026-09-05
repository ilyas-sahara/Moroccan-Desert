import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import SectionHeading from '@/components/SectionHeading';
import { useLocale } from '@/i18n';
import { SITE_URL, useSeo } from '@/hooks/useSeo';

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  sections: LegalSection[];
  numbered?: boolean;
  contact?: { email: string; phone: string; address: string };
};

const DEFAULT_CONTACT = {
  email: 'hello@saharavacation.com',
  phone: '+212 6 74 28 36 39',
  address: 'Avenue Mohammed V, Merzouga, Errachidia, Morocco',
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  path,
  seoTitle,
  seoDescription,
  sections,
  numbered = true,
  contact = DEFAULT_CONTACT,
}: LegalPageProps) {
  const { t } = useLocale();

  useSeo({ title: seoTitle, description: seoDescription, path });

  const base = `${SITE_URL}${import.meta.env.BASE_URL.replace(/\/$/, '')}`;
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: eyebrow, item: `${base}${path}` },
    ],
  };

  return (
    <main className="pt-20">
      <JsonLd data={breadcrumb} />

      <section className="relative overflow-hidden bg-ink-950 py-20 text-sand-50 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(192,137,64,0.25),transparent_45%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 to-ink-950" />
        </div>
        <div className="container-x relative z-10">
          <SectionHeading light eyebrow={eyebrow} title={title} subtitle={intro} />
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-sand-400">{updated}</p>
        </div>
      </section>

      <section className="bg-sand-50 py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {sections.map((section, i) => (
                <article
                  key={section.heading}
                  className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200/50 sm:p-9"
                >
                  <h2 className="flex items-baseline gap-3 font-display text-2xl font-medium text-ink-900 sm:text-3xl">
                    {numbered && <span className="text-sand-400">{i + 1}.</span>}
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-600">
                    {section.paragraphs.map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-ink-950 p-7 text-sand-100 shadow-lg sm:p-8">
              <h3 className="font-display text-xl font-medium text-white">Questions?</h3>
              <p className="mt-3 text-sm leading-relaxed text-sand-200/85">
                We read every message. Send us a note and a member of the team will reply within 24 hours.
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                  <a href={`mailto:${contact.email}`} className="hover:text-white">
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                  <span>{contact.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" strokeWidth={1.5} />
                  <span>{contact.address}</span>
                </li>
              </ul>
              <Link to="/contact" className="btn-light mt-8 flex w-full items-center justify-center">
                {t('common.planJourney')} <Send className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}