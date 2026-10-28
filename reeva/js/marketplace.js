/* ==================== MARKETPLACE PRODUCTS ==================== */
componentsReady.then(() => {
  document.querySelectorAll('.add').forEach(btn => btn.onclick = () => Cart.add(btn.dataset.name, +btn.dataset.price));
});
