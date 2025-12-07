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

    const leafGreen = "rgba(195, 210, 190, OP)";      // pastel sage
    const eucalyptus = "rgba(220, 232, 220, OP)";     // pale eucalyptus
    const watercolorDot = "rgba(235, 240, 233, OP)";  // soft white-green


    this.colors = [leafGreen, eucalyptus, watercolorDot];
  }

  draw() {
  ctx.save();
  ctx.globalAlpha = this.opacity;

  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  ctx.globalCompositeOperation = "lighter";

  let color = this.colors[this.type].replace("OP", this.opacity);
  ctx.fillStyle = color;

  // --- Shape Types ---
  if (this.type === 0) {
    // 🌿 Pastel leaf (curved sides, pointed tip)
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.bezierCurveTo(
      this.size * 0.8, -this.size * 0.2,
      this.size * 0.8,  this.size * 0.2,
      0, this.size
    );
    ctx.bezierCurveTo(
      -this.size * 0.8, this.size * 0.2,
      -this.size * 0.8, -this.size * 0.2,
      0, -this.size
    );
    ctx.fill();

  } else if (this.type === 1) {
    // 🌾 Long eucalyptus leaf
    ctx.beginPath();
    ctx.moveTo(0, -this.size * 1.4);
    ctx.bezierCurveTo(
      this.size * 0.6, -this.size * 0.3,
      this.size * 0.6,  this.size * 0.3,
      0, this.size * 1.4
    );
    ctx.bezierCurveTo(
      -this.size * 0.6, this.size * 0.3,
      -this.size * 0.6, -this.size * 0.3,
      0, -this.size * 1.4
    );
    ctx.fill();

  } else {
    // ● Watercolor dot
    ctx.beginPath();
    ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
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
       ...
    }
  
    // Fade-out for cursor-spawned petals
    if (this.opacity > 0.01 && this.size < 8) {
       ...
    }
  
    // Reset when leaving screen
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

for (let i = 0; i < 40; i++) {
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
