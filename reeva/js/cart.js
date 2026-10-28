/* ==================== SHOPPING CART DRAWER ==================== */
// The cart now lives in localStorage so it survives moving between pages.
let cart = store.get('reeva_cart', []);
const saveCart = () => store.set('reeva_cart', cart);

function renderCart() {
  $('cartCount').textContent = cart.length;
  $('cartItems').innerHTML = cart.length
    ? cart.map((p, i) => `<div class="item"><span>${p.name} — $${p.price}</span><button data-i="${i}" aria-label="Remove item">Remove</button></div>`).join('')
    : '<p class="empty">Your cart is empty.</p>';
  $('cartTotal').textContent = '$' + cart.reduce((sum, p) => sum + p.price, 0);
}

const setCart = open => {
  $('drawer').classList.toggle('open', open);
  $('veil').classList.toggle('show', open);
};

// Used by marketplace.js
const Cart = {
  add(name, price) {
    cart.push({ name, price });
    saveCart();
    renderCart();
    const count = $('cartCount');
    count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
    toast(name + ' added to cart');
  }
};

componentsReady.then(() => {
  $('cartItems').onclick = e => {
    if (e.target.dataset.i !== undefined) { cart.splice(+e.target.dataset.i, 1); saveCart(); renderCart(); }
  };
  $('openCart').onclick = () => setCart(true);
  $('closeCart').onclick = () => setCart(false);
  $('veil').onclick = () => setCart(false);

  $('checkoutButton').onclick = () => {
    if (!cart.length) return toast('Add an item first');
    if (!store.get('reeva_session', null)) {
      setCart(false);
      toast('Log in to complete your purchase');
      setTimeout(() => { location.href = PAGES.account; }, 900);
      return;
    }
    cart = []; saveCart(); renderCart(); setCart(false);
    toast('Thank you for your purchase (demo)');
  };

  renderCart();
});
