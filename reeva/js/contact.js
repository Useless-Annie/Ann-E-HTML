/* ==================== CONTACT FORM ==================== */
// Demo only: connect a real service (e.g. Formspree) to actually send messages.
componentsReady.then(() => {
  $('contactForm').onsubmit = e => {
    e.preventDefault();
    const f = e.target, msg = $('contactMessage');
    if (!f.elements.name.value.trim() || !isEmail(f.elements.email.value) || !f.elements.message.value.trim()) {
      msg.textContent = 'Please enter your name, a valid email and your message.';
      return;
    }
    msg.textContent = 'Message sent. Thank you for writing to us!';
    f.reset();
  };
});
