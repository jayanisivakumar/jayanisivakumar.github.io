const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flowers = [];

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 4;
    this.opacity = 1;
    this.speedY = Math.random() * 0.5 + 0.3;
    this.color = `hsl(${Math.random()*40+300}, 70%, 75%)`;
  }
  update() {
    this.y -= this.speedY;
    this.opacity -= 0.015;
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    flowers.push(new Flower(e.x, e.y));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flowers = flowers.filter(f => f.opacity > 0);
  flowers.forEach(f => {
    f.update();
    f.draw();
  });
  requestAnimationFrame(animate);
}

animate();
