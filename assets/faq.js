(function() {
  const faqButtons = document.querySelectorAll('.faq__filter');
  const faqPanels = document.querySelectorAll('.faq__panel');
  faqButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const faqId = button.getAttribute('aria-controls');
      faqButtons.forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
      });
      button.setAttribute('aria-expanded', 'true');
      faqPanels.forEach((panel) => {
        panel.style.display = 'none';
      });
      document.getElementById(faqId).style.display = 'block';
    });
  });
})();