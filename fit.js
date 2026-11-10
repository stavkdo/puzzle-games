// Fit the whole game on one screen: everything is sized in rem, so shrink the root
// font size until the page no longer scrolls. Runs on load, resize and font load.
(() => {
  const root = document.documentElement;
  const MAX = 16, MIN = 9;
  const fits = () => root.scrollHeight <= window.innerHeight + 1;
  function fit() {
    root.style.fontSize = MAX + 'px';
    if (fits()) return;
    let lo = MIN, hi = MAX;
    for (let i = 0; i < 8; i++) {
      const mid = (lo + hi) / 2;
      root.style.fontSize = mid + 'px';
      if (fits()) lo = mid; else hi = mid;
    }
    root.style.fontSize = lo + 'px';
  }
  let raf;
  const queue = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); };
  addEventListener('resize', queue);
  addEventListener('load', fit);
  if (document.fonts) document.fonts.ready.then(fit);
  fit();
})();
