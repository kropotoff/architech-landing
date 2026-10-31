import { useEffect, useRef, useState } from 'react';
// Same asset as the hero logo, so the handoff at the end is seamless
import logo from '../assets/architech_logo.png';

const MIN_HOLD_MS = 1400; // how long the big logo stays centred at minimum
const MAX_HOLD_MS = 3200; // never block the page longer than this
const SNAP_MS = 850;
const LOGO_SHOW_MS = 900; // once the logo has loaded, let it be seen before it moves

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const waitForImage = (img: HTMLImageElement | null) =>
  new Promise<void>((resolve) => {
    if (!img || img.complete) return resolve();
    img.addEventListener('load', () => resolve(), { once: true });
    img.addEventListener('error', () => resolve(), { once: true });
  });

const shouldSkip = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  window.location.hash !== '' ||
  window.scrollY > 0;

const IntroOverlay = () => {
  const [done, setDone] = useState(shouldSkip);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (done) return;
    let cancelled = false;
    document.body.classList.add('intro-active');

    const run = async () => {
      const heroImage = document.querySelector<HTMLImageElement>('.hero-image');
      const heroLogo = document.querySelector<HTMLImageElement>('.hero-logo-overlay');

      // Hold the big logo until the hero is ready (or we've waited long enough)
      await Promise.race([
        Promise.all([
          sleep(MIN_HOLD_MS),
          waitForImage(logoRef.current).then(() => sleep(LOGO_SHOW_MS)),
          waitForImage(heroImage),
          waitForImage(heroLogo),
        ]),
        sleep(MAX_HOLD_MS),
      ]);
      if (cancelled) return;
      if (!logoRef.current || !overlayRef.current || !heroLogo) return finish();

      // Fly the centred logo onto the hero logo's exact position
      const from = logoRef.current.getBoundingClientRect();
      const to = heroLogo.getBoundingClientRect();
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const scale = to.width / from.width;

      const snap = logoRef.current.animate(
        [
          { transform: 'translate(0, 0) scale(1)' },
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
        ],
        { duration: SNAP_MS, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', fill: 'forwards' }
      );
      overlayRef.current.animate(
        [{ backgroundColor: 'rgba(10, 10, 12, 1)' }, { backgroundColor: 'rgba(10, 10, 12, 0)' }],
        { duration: SNAP_MS, delay: SNAP_MS * 0.35, easing: 'ease-out', fill: 'forwards' }
      );
      await snap.finished.catch(() => {});
      if (!cancelled) finish();
    };

    const finish = () => {
      document.body.classList.remove('intro-active');
      setDone(true);
    };

    run();
    return () => {
      cancelled = true;
      document.body.classList.remove('intro-active');
    };
  }, [done]);

  if (done) return null;

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
      <img
        ref={logoRef}
        src={logo}
        alt=""
        className={`intro-logo${logoLoaded ? ' is-loaded' : ''}`}
        onLoad={() => setLogoLoaded(true)}
      />
    </div>
  );
};

export default IntroOverlay;
