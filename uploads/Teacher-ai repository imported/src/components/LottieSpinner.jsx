import React, { useRef, useEffect } from 'react';

// Renders a dotLottie animation reliably by setting attributes imperatively
// (React can mishandle boolean attrs like `autoplay`/`loop` on custom elements)
// and calling play() once the player is ready.
export default function LottieSpinner({ src, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const start = () => {
      if (cancelled || !el) return;
      try {
        el.setAttribute('loop', '');
        el.setAttribute('autoplay', '');
        try { el.loop = true; el.autoplay = true; } catch (_) {}
        if (typeof el.load === 'function') el.load(src);
        else el.setAttribute('src', src);
        if (typeof el.setLooping === 'function') el.setLooping(true);
        if (typeof el.play === 'function') el.play();
      } catch (_) {}
    };
    // Wait for the custom element to be defined/upgraded before driving it.
    if (window.customElements && customElements.whenDefined) {
      customElements.whenDefined('dotlottie-player').then(start);
    }
    // Fallbacks: element may already be upgraded, or need a tick.
    start();
    const t = setTimeout(start, 250);
    const onReady = () => { if (!el) return; try { if (el.setLooping) el.setLooping(true); } catch (_) {} el.play && el.play(); };
    // Restart on completion as a safety net for builds that don't honor loop.
    const onComplete = () => { if (el && el.play) el.play(); };
    ['ready', 'load', 'data_ready'].forEach((n) => el.addEventListener(n, onReady));
    ['complete', 'loopComplete', 'freeze'].forEach((n) => el.addEventListener(n, onComplete));
    return () => {
      cancelled = true; clearTimeout(t);
      ['ready', 'load', 'data_ready'].forEach((n) => el.removeEventListener(n, onReady));
      ['complete', 'loopComplete', 'freeze'].forEach((n) => el.removeEventListener(n, onComplete));
    };
  }, [src]);

  return React.createElement('dotlottie-player', { ref, class: className, style });
}
