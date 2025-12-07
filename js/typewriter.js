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

<script>
document.getElementById("scroll-up").onclick = () => {
  window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
};

document.getElementById("scroll-down").onclick = () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
};
</script>
