/* ==================== COMPONENTS ====================
   Shared HTML pieces (navbar, footer, contact, cart drawer, toast).
   They are injected by router.js on every page, so they work when you
   open the files directly (file://) and on any web server.
   {{root}} is replaced with "" (home) or "../" (inner pages).
   Edit a component here and it changes on every page.
===================================================== */
window.REEVA_COMPONENTS = {
  'navbar': `
<!-- ==================== SECTION: NAVBAR ==================== -->
<header>
  <div class="container bar">
    <a href="{{root}}index.html" class="logo" aria-label="REEVA home"><img src="{{root}}img/reeva-logo.png" alt="REEVA" onerror="this.replaceWith('REEVA')"></a>
    <nav id="navMenu" class="navbar-menu">
      <a href="{{root}}index.html" data-page="home">Home</a>
      <a href="{{root}}collection-centers/index.html" data-page="collection-centers">Collection Centers</a>
      <a href="{{root}}about-reeva/index.html" data-page="about-reeva">About REEVA</a>
      <a href="{{root}}marketplace/index.html" data-page="marketplace">Marketplace</a>
      <a href="{{root}}blog/index.html" data-page="blog">Blog</a>
      <a href="{{root}}account/index.html" data-page="account" class="only-m">My Account</a>
    </nav>
    <div class="tools">
      <a href="{{root}}account/index.html" class="btn btn-red acct" id="accountButton">Log in</a>
      <button class="cart-btn" id="openCart" aria-label="Open cart">🛒 <span class="cart-count" id="cartCount">0</span></button>
      <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span></button>
    </div>
  </div>
</header>
<!-- ==================== END SECTION: NAVBAR ==================== -->
`,
  'footer': `
<!-- ==================== SECTION: FOOTER ==================== -->
<footer>
  <div class="container">
    <div class="footer-row">
      <a href="{{root}}index.html" class="logo" aria-label="REEVA home"><img src="{{root}}img/reeva-logo.png" alt="REEVA" onerror="this.replaceWith('REEVA')"></a>
      <nav class="footer-links">
        <a href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener">TikTok</a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener">YouTube</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
      </nav>
    </div>
    <p class="footer-copy">© 2026 REEVA. All rights reserved. · Where Every Garment Tells a New Story.</p>
  </div>
</footer>
<!-- ==================== END SECTION: FOOTER ==================== -->
`,
  'contact-section': `
<!-- ==================== SECTION: CONTACT ==================== -->
<section class="contact" id="contact">
  <div class="container">
    <div class="contact-box reveal">
      <div>
        <h2>Give your clothes a second story.</h2>
        <p>Want to donate, design or become an ally? Write to us.</p>
        <div class="contact-info"><span>contacto@reeva.pa</span><span>+507 8000-0000</span><span>Panama City</span></div>
      </div>
      <form id="contactForm" novalidate>
        <input type="text" name="name" placeholder="Your name" aria-label="Name">
        <input type="email" name="email" placeholder="Your email" aria-label="Email">
        <textarea name="message" placeholder="Your message" aria-label="Message"></textarea>
        <button class="btn btn-light" type="submit">Send message</button>
        <div class="form-message" id="contactMessage" role="status"></div>
      </form>
    </div>
  </div>
</section>
<!-- ==================== END SECTION: CONTACT ==================== -->
`,
  'cart-drawer': `
<!-- ==================== SECTION: CART DRAWER ==================== -->
<div class="veil" id="veil"></div>
<aside class="drawer" id="drawer" aria-label="Cart">
  <h3>Your cart <button id="closeCart" aria-label="Close">×</button></h3>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-total"><span>Total</span><span id="cartTotal">$0</span></div>
  <button class="btn btn-red btn-center" id="checkoutButton">Checkout</button>
</aside>
<!-- ==================== END SECTION: CART DRAWER ==================== -->
`,
  'toast': `
<!-- ==================== SECTION: TOAST ==================== -->
<div class="toast" id="toast"></div>
<!-- ==================== END SECTION: TOAST ==================== -->
`,
};
