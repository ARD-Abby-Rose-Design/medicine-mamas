(function () {
  const buttons = document.querySelectorAll(".accordion--read-more");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parentEl = button.parentNode;
      const allAccordions = parentEl.querySelectorAll(".accordion");
      const expanded = button.getAttribute("aria-expanded") === "true" || false;
      if (!expanded) {
        allAccordions.forEach((accordion) => {
          allAccordions.forEach((accordion) => {
            accordion.classList.remove("hidden");
          });
          button.setAttribute("aria-expanded", "true");
          button.innerHTML = "SHOW LESS";
        });
      } else {
        allAccordions.forEach((accordion, index) => {
          if (index > 4) {
            accordion.classList.add("hidden");
          }
        });
        button.setAttribute("aria-expanded", "false");
        button.innerHTML = "SHOW ALL";
      }
    });
  });
})();
