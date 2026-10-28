/* ==================== SCROLL REVEAL ==================== */
// Elements with .reveal fade in when they enter the viewport
const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
}), { threshold: .15 });

const observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
observeReveals();                       // content of the page itself
componentsReady.then(observeReveals);   // content that comes from components (contact section)
