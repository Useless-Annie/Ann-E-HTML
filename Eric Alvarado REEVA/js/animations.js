const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
}), { threshold: .15 });

const observeReveals = () => document.querySelectorAll('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
observeReveals(); componentsReady.then(observeReveals);   
