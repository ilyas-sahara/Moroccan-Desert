import { Link } from 'react-router-dom';
import { Clock, Users, ArrowUpRight } from 'lucide-react';
import type { Tour } from '@/data/content';
import { useLocale } from '@/i18n';
import { responsiveImage } from '@/utils/responsiveImage';

function MarqueeCard({ tour }: { tour: Tour }) {
  const { t } = useLocale();
  const img = responsiveImage(tour.image, { sizes: '50vw', widths: [300, 600, 900, 1200] });
  return (
    <Link
      to={`/tours/${tour.slug}`}
      className="group relative mr-6 flex w-64 shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50 card-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={img.sizes}
          alt={tour.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-sand-50/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sand-800">
          {tour.region.split('·')[0].trim()}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-sand-600">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={1.5} />{tour.duration}</span>
          <span className="h-3 w-px bg-sand-200" />
          <span className="flex items-center gap-1"><Users className="h-3 w-3" strokeWidth={1.5} />{tour.groupSize}</span>
        </div>

        <h3 className="mt-2 line-clamp-2 font-display text-base font-medium text-ink-900">{tour.title}</h3>

        <div className="mt-auto flex items-end justify-between border-t border-sand-100 pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-sand-500">{t('common.from')}</p>
            <p className="font-display text-lg font-semibold text-ink-900">
              €{tour.priceFrom}
              {tour.days > 0 && <span className="ml-1 text-[10px] font-normal text-ink-400">{t('common.perPerson')}</span>}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-sand-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
        </div>
      </div>
    </Link>
  );
}

type Props = {
  tours: Tour[];
  className?: string;
};

export default function TourMarquee({ tours, className = '' }: Props) {
  const rowA = tours;
  const rowB = [...tours].reverse();

  return (
    <div className={`marquee-pause relative flex flex-col gap-6 overflow-hidden ${className}`}>
      <div className="marquee-track marquee-rtl">
        {[...rowA, ...rowA].map((tour, i) => (
          <MarqueeCard key={`a-${tour.slug}-${i}`} tour={tour} />
        ))}
      </div>
      <div className="marquee-track marquee-ltr">
        {[...rowB, ...rowB].map((tour, i) => (
          <MarqueeCard key={`b-${tour.slug}-${i}`} tour={tour} />
        ))}
      </div>
    </div>
  );
}
