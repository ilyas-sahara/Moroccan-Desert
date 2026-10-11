import { Link } from 'react-router-dom';
import { Clock, Users, ArrowUpRight } from 'lucide-react';
import type { ExperienceItem, ExperienceKind } from '@/data/content';
import { useLocale, type TranslationKey } from '@/i18n';
import { responsiveImage } from '@/utils/responsiveImage';

const KIND_LABEL: Record<ExperienceKind, TranslationKey> = {
  activity: 'expDetail.kinds.activity',
  festival: 'expDetail.kinds.festival',
  retreat: 'expDetail.kinds.retreat',
};

const KIND_STYLE: Record<ExperienceKind, string> = {
  activity: 'bg-sand-50/95 text-sand-800',
  festival: 'bg-clay-100/95 text-clay-800',
  retreat: 'bg-oasis-100/95 text-oasis-800',
};

export default function ExperienceCard({ item, index = 0 }: { item: ExperienceItem; index?: number }) {
  const { t } = useLocale();
  const img = responsiveImage(item.image, {
    sizes: '(min-width:1280px) 25vw, (min-width:640px) 40vw, 92vw',
  });
  const delay = `reveal-delay-${Math.min(index % 4, 4) + 1}`;
  return (
    <Link
      to={`/experiences/${item.slug}`}
      className={`reveal ${delay} group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/50 card-lift`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={img.sizes}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
        <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${KIND_STYLE[item.kind]}`}>
          {t(KIND_LABEL[item.kind])}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-sand-600">
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" strokeWidth={1.5} />{item.duration}</span>
          <span className="h-3 w-px bg-sand-200" />
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" strokeWidth={1.5} />{item.groupSize}</span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-medium text-ink-900">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.subtitle}</p>

        <div className="mt-5 flex items-end justify-between border-t border-sand-100 pt-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-sand-500">
              {item.priceFrom ? t('common.from') : t('experiences.priceOnRequest')}
            </p>
            <p className="font-display text-2xl font-semibold text-ink-900">
              {item.priceFrom ? (
                <>€{item.priceFrom}<span className="ml-1 text-xs font-normal text-ink-400">{t('common.perPerson')}</span></>
              ) : (
                <span className="text-lg">{t('experiences.bookOnRequest')}</span>
              )}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-sand-700 transition-colors group-hover:text-sand-800">
            {t('experiences.bookOnRequest')}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </Link>
  );
}