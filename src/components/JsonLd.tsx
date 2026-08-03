import { useEffect, useRef } from 'react';

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders a `<script type="application/ld+json">` block for structured data.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const ref = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (ref.current) ref.current.textContent = JSON.stringify(data);
  }, [data]);

  return <script ref={ref} type="application/ld+json" />;
}
