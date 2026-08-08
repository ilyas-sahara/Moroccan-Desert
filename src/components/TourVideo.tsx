import type { Tour } from '@/data/content';
import VideoPlayer from '@/components/VideoPlayer';
import { useLocale } from '@/i18n';

export default function TourVideo({ tour }: { tour: Tour }) {
  const { t } = useLocale();
  if (!tour.video) return null;

  return (
    <section className="bg-sand-50 py-12 lg:py-16">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow"><span className="hairline" /> {t('tours.watchVideo')}</p>
            <h2 className="mt-4 font-display text-2xl font-medium text-ink-900 sm:text-3xl">
              {t('tours.videoTitle', { name: tour.title })}
            </h2>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl bg-ink-950 shadow-lg ring-1 ring-sand-200/60">
          <VideoPlayer
            src={tour.video}
            title={tour.title}
            poster={tour.video_poster}
            className="aspect-video w-full"
          />
        </div>
      </div>
    </section>
  );
}
