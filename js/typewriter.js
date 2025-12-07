document.addEventListener("DOMContentLoaded", function () {
  const nameText = "Jayani Sivakumar";
  let i = 0;

  function typeEffect() {
    if (i < nameText.length) {
      document.getElementById("typed-name").textContent += nameText.charAt(i);
      i++;
      setTimeout(typeEffect, 110);
    }
  }

  typeEffect();
});
