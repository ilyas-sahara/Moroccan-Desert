import { useReveal } from '@/hooks/useReveal';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
}: Props) {
  const ref = useReveal<HTMLDivElement>();
  const center = align === 'center';
  return (
    <div
      ref={ref}
      className={`reveal flex flex-col ${center ? 'items-center text-center' : 'items-start'} ${
        light ? 'text-sand-50' : 'text-ink-900'
      }`}
    >
      {eyebrow && (
        <span className={`eyebrow ${light ? 'text-sand-300' : ''}`}>
          <span className="hairline" /> {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-[2.75rem] ${
          center ? 'max-w-2xl' : 'max-w-3xl'
        } text-balance`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 ${center ? 'max-w-xl' : 'max-w-2xl'} text-base leading-relaxed ${
            light ? 'text-sand-200/85' : 'text-ink-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
