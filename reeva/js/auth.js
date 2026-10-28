/* ==================== AUTHENTICATION (MY ACCOUNT) ==================== */
// Demo only: accounts live in this browser's localStorage. Not secure for real users.
const sha256 = async text => {
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  return btoa(unescape(encodeURIComponent(text)));
};

let session = store.get('reeva_session', null);
const setAuthMessage = text => { $('authMessage').textContent = text; };

function renderAuth() {
  const loggedIn = !!session;
  $('authGuest').hidden = loggedIn;
  $('authUser').hidden = !loggedIn;
  renderNavAccount();
  if (loggedIn) { $('userName').textContent = session.name; $('userEmail').textContent = session.email; }
}

componentsReady.then(() => {
  document.querySelectorAll('.tab').forEach(tab => tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t === tab));
    $('loginForm').hidden = tab.dataset.tab !== 'in';
    $('signupForm').hidden = tab.dataset.tab !== 'up';
    setAuthMessage('');
  });

  $('signupForm').onsubmit = async e => {
    e.preventDefault();
    const f = e.target, name = f.elements.name.value.trim(), email = f.elements.email.value.trim().toLowerCase();
    if (!name || !isEmail(email) || f.elements.password.value.length < 6) return setAuthMessage('Enter your name, a valid email and a password of at least 6 characters.');
    const users = store.get('reeva_users', []);
    if (users.some(u => u.email === email)) return setAuthMessage('That email already has an account. Please log in.');
    users.push({ name, email, pass: await sha256(f.elements.password.value) });
    store.set('reeva_users', users);
    session = { name, email };
    store.set('reeva_session', session);
    f.reset(); setAuthMessage(''); renderAuth();
    toast('Account created. Welcome to REEVA!');
  };

  $('loginForm').onsubmit = async e => {
    e.preventDefault();
    const f = e.target, email = f.elements.email.value.trim().toLowerCase();
    if (!isEmail(email) || !f.elements.password.value) return setAuthMessage('Enter your email and your password.');
    const user = store.get('reeva_users', []).find(u => u.email === email);
    if (!user || user.pass !== await sha256(f.elements.password.value)) return setAuthMessage('Incorrect email or password.');
    session = { name: user.name, email };
    store.set('reeva_session', session);
    f.reset(); setAuthMessage(''); renderAuth();
    toast('Logged in');
  };

  $('logoutButton').onclick = () => {
    session = null;
    store.set('reeva_session', null);
    renderAuth();
    toast('Logged out');
  };

  renderAuth();
});
