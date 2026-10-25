import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/i18n';
import type { Locale } from '@/i18n';

const WIDGET_UNIQ = '51';

const WIDGET_LANGS: Record<Locale, string> = {
  fr: 'fr_FR',
  es: 'es_ES',
  de: 'de_DE',
  it: 'it_IT',
  en: 'en_US',
};

/**
 * TripAdvisor reviews widget.
 * Loaded lazily: the widget's script chain (~1.7 s of third-party requests)
 * only starts once the section approaches the viewport, so it stays out of
 * the initial-page-load critical path.
 */
export default function TrustpilotReviews() {
  const ref = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    // If the section is already in/near the viewport when mounted, load immediately.
    const rect = host.getBoundingClientRect();
    if (rect.top < window.innerHeight + 600) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setVisible(true);
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const host = ref.current;
    if (!host) return;

    host.innerHTML =
      `<div id="TA_selfserveprop${WIDGET_UNIQ}" class="TA_selfserveprop">` +
      `<ul id="0xRoG56D" class="TA_links 2EZOJp4d99Hc">` +
      '<li id="nmFDy3lkhx" class="A5RA5BpSu">' +
      '<a target="_blank" href="https://www.tripadvisor.com/Attraction_Review-g304023-d34674170-Reviews-Sahara_Vacation-Zagora_Souss_Massa.html">' +
      '<img src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" alt="TripAdvisor"/>' +
      '</a></li></ul></div>';

    const lang = WIDGET_LANGS[locale];
    const script = document.createElement('script');
    script.async = true;
    script.src =
      `https://www.jscache.com/wejs?wtype=selfserveprop&uniq=${WIDGET_UNIQ}&locationId=34674170&lang=${lang}` +
      '&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=true&border=false&display_version=2';
    script.setAttribute('data-loadtrk', '');
    script.addEventListener('load', () => {
      (script as HTMLScriptElement & { loadtrk?: boolean }).loadtrk = true;
    });
    host.appendChild(script);

    return () => {
      host.innerHTML = '';
    };
  }, [visible, locale]);

  return <div ref={ref} className="mt-14 flex justify-center" />;
}
