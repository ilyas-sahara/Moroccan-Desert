import { useEffect, useRef } from 'react';

const TRUSTPILOT_WIDGET_SRC = 'https://cdn.trustindex.io/loader.js?0586c4f824b6893ee62603086c2';

export default function TrustpilotReviews() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const script = document.createElement('script');
    script.src = TRUSTPILOT_WIDGET_SRC;
    script.async = true;
    script.defer = true;
    host.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return <div ref={ref} className="mt-14" />;
}