const canvas = document.getElementById("leafCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Leaf {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 16 + 8;
    this.speedY = Math.random() * 0.3 + 0.1;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.opacity = Math.random() * 0.5 + 0.3;

    this.color = `rgba(95, 122, 87, ${this.opacity})`; // moss green
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.y > canvas.height) this.y = -10;
    if (this.x > canvas.width || this.x < 0) this.x = Math.random() * canvas.width;
  }

  draw() {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size * 0.6, this.size, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let leaves = [];
for (let i = 0; i < 40; i++) {
  leaves.push(new Leaf());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  leaves.forEach((leaf) => {
    leaf.update();
    leaf.draw();
  });
  requestAnimationFrame(animate);
}

animate();
