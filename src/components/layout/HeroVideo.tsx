'use client';

import { useEffect, useState } from 'react';

// The film is only added after the window load event, so its few MB never compete with the
// poster frame (the page's largest paint) for bandwidth on a phone.
export default function HeroVideo({ base }: { base: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') return setLoaded(true);
    const onLoad = () => setLoaded(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);

  if (!loaded) return null;
  return (
    <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline aria-hidden="true">
      <source media="(orientation: landscape)" src={`${base}-landscape.webm`} type="video/webm" />
      <source media="(orientation: landscape)" src={`${base}-landscape.mp4`} type="video/mp4" />
      <source src={`${base}-portrait.webm`} type="video/webm" />
      <source src={`${base}-portrait.mp4`} type="video/mp4" />
    </video>
  );
}
