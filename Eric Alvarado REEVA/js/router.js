
const $ = id => document.getElementById(id);
const isEmail = v => /^\S+@\S+\.\S+$/.test(v);

const store = {
  get(key, fallback) { try { const v = JSON.parse(localStorage.getItem(key)); return v === null ? fallback : v; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
};

function toast(text) {
  const el = $('toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 1800);
}

const ROOT = document.body.dataset.root || '';
const PAGES = {
  home: ROOT + 'index.html',
  'collection-centers': ROOT + 'collection-centers/index.html',
  'about-reeva': ROOT + 'about-reeva/index.html',
  marketplace: ROOT + 'marketplace/index.html',
  blog: ROOT + 'blog/index.html',
  account: ROOT + 'account/index.html'
};

function loadComponent(slot) {
  const html = (window.REEVA_COMPONENTS || {})[slot.dataset.component];
  if (html === undefined) { console.error('REEVA: component not found: ' + slot.dataset.component); slot.remove(); return; }
  slot.outerHTML = html.split('{{root}}').join(ROOT);
}

const LEGACY_ROUTES = {
  home: PAGES.home, 'collection-centers': PAGES['collection-centers'], about: PAGES['about-reeva'],
  marketplace: PAGES.marketplace, blog: PAGES.blog, login: PAGES.account
};
const legacyTarget = LEGACY_ROUTES[location.hash.replace('#', '').replace(/^\//, '')];
if (legacyTarget) location.replace(legacyTarget);

function markCurrentPage() {
  const page = document.body.dataset.page;
  document.querySelectorAll('#navMenu a[data-page]').forEach(a => a.classList.toggle('current', a.dataset.page === page));
}

document.querySelectorAll('[data-component]').forEach(loadComponent);
markCurrentPage();
if (location.hash === '#contact' && $('contact')) $('contact').scrollIntoView({ behavior: 'smooth' });
const componentsReady = Promise.resolve();
