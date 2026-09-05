import { useEffect, useState } from 'react';
import JsonLd from '@/components/JsonLd';
import { getSiteSettings, type SiteSettings } from '@/data/cms';
import { SITE_URL } from '@/hooks/useSeo';

const DEFAULT_SETTINGS: SiteSettings = {
  brand_name: 'Sahara Vacation',
  tagline: 'Moroccan Desert Journeys',
  phone: '+212 6 74 28 36 39',
  email: 'hello@saharavacation.com',
  address: 'Avenue Mohammed V, Merzouga, Errachidia, Morocco',
  instagram_url: '#',
  facebook_url: '#',
};

/**
 * Global Organization schema, emitted on every page so Google understands
 * the brand (contacts, logo, social profiles) site-wide.
 */
export default function SiteOrganization() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    let active = true;
    getSiteSettings().then((s) => {
      if (active) setSettings(s);
    });
    return () => {
      active = false;
    };
  }, []);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const logo = `${SITE_URL}${base}/logo.png`;
  const socials = [settings.instagram_url, settings.facebook_url].filter(
    (u) => Boolean(u) && u !== '#' && u !== '',
  );

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.brand_name,
    slogan: settings.tagline,
    url: `${SITE_URL}${base}/`,
    logo,
    image: logo,
    email: settings.email,
    telephone: settings.phone,
    description: 'Luxury Moroccan desert journeys from the dunes of Merzouga, Morocco.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressCountry: 'MA',
    },
    foundingDate: '2009',
    areaServed: 'Morocco',
    ...(socials.length ? { sameAs: socials } : {}),
  };

  return <JsonLd data={organization} />;
}
