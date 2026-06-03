// Load shared portal menu.html into sidebars (single source for nav links)
function loadPortalMenu() {
  const nav = document.querySelector('nav.nav[data-include]');
  if (!nav) return;
  const src = nav.getAttribute('data-include');
  const active = nav.getAttribute('data-active') || location.pathname.split('/').pop() || '';
  fetch(src)
    .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
    .then(function (html) {
      nav.innerHTML = html;
      if (active) {
        nav.querySelectorAll('a[href]').forEach(function (a) {
          const href = (a.getAttribute('href') || '').split('#')[0].split('?')[0];
          if (href === active) a.classList.add('active');
        });
      }
    })
    .catch(function () { /* keep build-time inline fallback */ });
}

document.addEventListener('DOMContentLoaded', loadPortalMenu);

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
