import { getEmbed } from '@/lib/media';

export default function VideoPlayer({
  src,
  title,
  poster,
  className,
}: {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
}) {
  const embed = getEmbed(src);
  if (!embed) return null;

  if (embed.type === 'file') {
    return (
      <video key={embed.src} className={className} controls preload="metadata" poster={poster || undefined}>
        <source src={embed.src} />
      </video>
    );
  }

  return (
    <div className={className}>
      <iframe
        src={embed.src}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
