document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".exp-card");

  cards.forEach((card) => {
    const panel = card.querySelector(".exp-panel");

    // safety: ensure starts closed
    card.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;

    card.addEventListener("click", () => {
      const isOpen = card.getAttribute("aria-expanded") === "true";

      // close others (nice UX)
      cards.forEach((other) => {
        if (other === card) return;
        other.setAttribute("aria-expanded", "false");
        const otherPanel = other.querySelector(".exp-panel");
        if (otherPanel) otherPanel.hidden = true;
      });

      // toggle this one
      card.setAttribute("aria-expanded", String(!isOpen));
      if (panel) panel.hidden = isOpen;
    });
  });
});
