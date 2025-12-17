document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".exp-accordion");

  cards.forEach((card) => {
    const toggle = card.querySelector(".exp-toggle");
    const panel  = card.querySelector(".exp-details");

    // safety: start closed
    card.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;

    toggle.addEventListener("click", () => {
      const isOpen = card.getAttribute("data-open") === "true";

      // close all other cards (accordion behavior)
      cards.forEach((other) => {
        if (other === card) return;
        other.setAttribute("data-open", "false");
        other.querySelector(".exp-toggle").setAttribute("aria-expanded", "false");
        other.querySelector(".exp-details").hidden = true;
      });

      // toggle current card
      card.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });
});
