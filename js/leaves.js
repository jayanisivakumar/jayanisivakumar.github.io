const canvas = document.getElementById("leafCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  // occasional petals bloom at cursor
  particles.push(new Particle(e.x, e.y, true));
});

class Particle {
  constructor(x, y, cursorSpawn = false) {
    this.x = cursorSpawn ? x : Math.random() * canvas.width;
    this.y = cursorSpawn ? y : Math.random() * canvas.height;

    this.size = Math.random() * 12 + 6;

    this.speedY = Math.random() * 0.25 + 0.05;
    this.speedX = Math.random() * 0.3 - 0.15;

    this.type = Math.floor(Math.random() * 3);

    this.opacity = cursorSpawn ? 0.7 : Math.random() * 0.4 + 0.1;

    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = (Math.random() * 0.01 - 0.005);

    const leafGreen = "rgba(173, 188, 170, OP)";
    const eucalyptus = "rgba(199, 214, 202, OP)";
    const watercolorDot = "rgba(210, 220, 210, OP)";

    this.colors = [leafGreen, eucalyptus, watercolorDot];
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    let color = this.colors[this.type].replace("OP", this.opacity);

    if (this.type === 0) {
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.4, this.size, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else if (this.type === 1) {
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.3, this.size * 0.4, Math.PI / 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    ctx.restore();
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    this.angle += this.angularSpeed;

    if (mouse.x && mouse.y && Math.random() < 0.3) {
      let dx = (mouse.x - this.x) * 0.002;
      let dy = (mouse.y - this.y) * 0.002;
      this.x += dx;
      this.y += dy;
    }

    if (this.opacity > 0.01 && this.size < 8) {
      this.opacity -= 0.01;
    }

    if (this.y > canvas.height + 40) {
      this.reset();
    }
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
}

let particles = [];

for (let i = 0; i < 70; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
