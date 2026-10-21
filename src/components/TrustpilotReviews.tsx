import { useEffect, useRef } from 'react';

export default function TrustpilotReviews() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (host.dataset.loaded) return;
    host.dataset.loaded = 'true';

    host.innerHTML = '<div id="TA_selfserveprop51" class="TA_selfserveprop"><ul id="0xRoG56D" class="TA_links 2EZOJp4d99Hc"><li id="nmFDy3lkhx" class="A5RA5BpSu"><a target="_blank" href="https://www.tripadvisor.com/Attraction_Review-g304023-d34674170-Reviews-Sahara_Vacation-Zagora_Souss_Massa.html"><img src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" alt="TripAdvisor"/></a></li></ul></div>';

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.jscache.com/wejs?wtype=selfserveprop&uniq=51&locationId=34674170&lang=en_US&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=false&border=true&display_version=2';
    script.setAttribute('data-loadtrk', '');
    (script as HTMLScriptElement & { onload?: any }).onload = function() {
      (this as HTMLScriptElement & { loadtrk?: boolean }).loadtrk = true;
    };
    host.appendChild(script);
  }, []);

  return <div ref={ref} className="mt-14" />;
}