'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// One scroll motion pass for the page: [data-reveal] fades up, [data-reveal-image] settles from a slight zoom.
// Transforms and opacity only, so nothing shifts layout. Under prefers-reduced-motion nothing is registered
// and the server-rendered content stays as it is.
export default function ScrollReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, { autoAlpha: 0, y: 24, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal-image]').forEach((el) => {
        gsap.from(el, { scale: 1.08, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return null;
}
