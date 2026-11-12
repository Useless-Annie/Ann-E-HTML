function renderNavAccount() {
  const session = store.get('reeva_session', null);
  const btn = $('accountButton');
  if (btn) btn.textContent = session ? 'Hi, ' + session.name.split(' ')[0] : 'Log in';
}

componentsReady.then(() => {
  const navMenu = $('navMenu'), burger = $('burger');
  const closeMenu = () => {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.onclick = () => {
    const open = navMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  };
  navMenu.querySelectorAll('a').forEach(a => a.onclick = closeMenu);
  renderNavAccount();
});
