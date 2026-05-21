// Shared prototype behaviour
document.addEventListener('click', function (e) {
  // sidebar toggle (mobile)
  if (e.target.closest('.hamburger')) {
    document.querySelector('.sidebar')?.classList.toggle('open');
  }
  // generic prototype links that should not navigate
  const a = e.target.closest('[data-noop]');
  if (a) { e.preventDefault(); }
});

// Simple wizard step navigation (used in apply.html)
window.gotoStep = function (n) {
  document.querySelectorAll('[data-panel]').forEach(p => {
    p.style.display = (Number(p.dataset.panel) === n) ? 'block' : 'none';
  });
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('current', 'done');
    if (i + 1 < n) s.classList.add('done');
    if (i + 1 === n) s.classList.add('current');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
