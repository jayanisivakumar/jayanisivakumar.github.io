const nameText = "Jayani Sivakumar";
let i = 0;

function typeEffect() {
  if (i < nameText.length) {
    document.getElementById("typed-name").innerHTML += nameText.charAt(i);
    i++;
    setTimeout(typeEffect, 110); // typing speed
  }
}

window.onload = typeEffect;
