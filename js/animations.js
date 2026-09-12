document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) revealItems.forEach(el => el.classList.add('visible'));
  else {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .12 });
    revealItems.forEach(el => revealObserver.observe(el));
  }

  const counters = document.querySelectorAll('[data-counter]');
  const update = counter => {
    const end = Number(counter.dataset.counter); const suffix = counter.dataset.suffix || ''; const start = performance.now();
    const tick = now => { const progress = Math.min((now - start) / 1200, 1); counter.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * end).toLocaleString() + suffix; if (progress < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  if (reduced || !('IntersectionObserver' in window)) counters.forEach(update);
  else {
    const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { update(entry.target); counterObserver.unobserve(entry.target); } }), { threshold: .45 });
    counters.forEach(el => counterObserver.observe(el));
  }
});
