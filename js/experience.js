document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".exp-accordion");

  cards.forEach((card) => {
    const toggle = card.querySelector(".exp-toggle");
    const panel  = card.querySelector(".exp-details");

    // start closed
    card.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;

    toggle.addEventListener("click", () => {
      const isOpen = card.getAttribute("data-open") === "true";

      // close others
      cards.forEach((other) => {
        if (other === card) return;
        other.setAttribute("data-open", "false");
        other.querySelector(".exp-toggle").setAttribute("aria-expanded", "false");
        other.querySelector(".exp-details").hidden = true;
      });

      // toggle this one
      card.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });
});
