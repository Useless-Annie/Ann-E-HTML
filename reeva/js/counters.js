/* ==================== ANIMATED COUNTERS ==================== */
// Used in Fashion Impact and Environmental Impact (home page)
const animateCount = el => {
  const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, suffix = el.dataset.suffix || '', t0 = performance.now();
  const tick = t => {
    const p = Math.min((t - t0) / 1800, 1), v = end * (1 - Math.pow(1 - p, 3));
    el.textContent = v.toLocaleString('en', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const countObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { animateCount(e.target); countObserver.unobserve(e.target); }
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
