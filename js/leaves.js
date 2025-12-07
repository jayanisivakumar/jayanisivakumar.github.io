const canvas = document.getElementById("leafCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

// Cursor movement listener
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  // occasional petals bloom at cursor
  for (let i = 0; i < 1; i++) {
    particles.push(new Particle(e.x, e.y, true));
  }
});

// ---------------------- PARTICLE CLASS ----------------------

class Particle {
  constructor(x, y, cursorSpawn = false) {
    // Position
    this.x = cursorSpawn ? x : Math.random() * canvas.width;
    this.y = cursorSpawn ? y : Math.random() * canvas.height;

    // Size variations
    this.size = Math.random() * 12 + 6;

    // Dreamy drift speed
    this.speedY = Math.random() * 0.25 + 0.05; 
    this.speedX = Math.random() * 0.3 - 0.15;

    // Styles: 0 = leaf, 1 = petal, 2 = watercolor dot
    this.type = Math.floor(Math.random() * 3);

    // Opacity
    this.opacity = cursorSpawn ? 1 : Math.random() * 0.6 + 0.2;

    // Rotation
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = (Math.random() * 0.01 - 0.005);

    // Cottagecore colors
    const leafGreen = "rgba(112, 135, 103, OP)";
    const petalCream = "rgba(230, 215, 190, OP)";
    const watercolorDot = "rgba(180, 200, 175, OP)";

    this.colors = [leafGreen, petalCream, watercolorDot];
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    let color = this.colors[this.type].replace("OP", this.opacity);

    // Draw shapes
    if (this.type === 0) {
      // leaf shape
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.4, this.size, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else if (this.type === 1) {
      // small petal
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.3, this.size * 0.4, Math.PI / 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      // watercolor dot
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    ctx.restore();
  }

  update() {
    // Slow dreamy fall
    this.y += this.speedY;
    this.x += this.speedX;

    // Gentle rotation
    this.angle += this.angularSpeed;

    // Subtle attraction to mouse for parallax effect
    if (mouse.x && mouse.y && Math.random() < 0.3) {
      let dx = (mouse.x - this.x) * 0.002;
      let dy = (mouse.y - this.y) * 0.002;
      this.x += dx;
      this.y += dy;
    }

    // Fade-out for cursor-spawned petals
    if (this.opacity > 0.01 && this.size < 8) {
      this.opacity -= 0.01;
    }

    // Reset when leaving screen
    if (this.y > canvas.height + 40) {
      this.reset();
    }
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.opacity = Math.random() * 0.5 + 0.3;
  }
}

// ---------------------- INITIALIZE ----------------------

let particles = [];

// More particles = dreamier vibe
for (let i = 0; i < 70; i++) {
  particles.push(new Particle());
}

// ---------------------- ANIMATION LOOP ----------------------

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
