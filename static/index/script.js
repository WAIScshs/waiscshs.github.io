const canvas = document.getElementById("gas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = (canvas.height * canvas.width * 500) / (1920 * 1080);
const mouse = { x: null, y: null, radius: 120 };

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.size = size;
        this.baseY = y;
        this.speed = Math.random() * 0.2 + 0.05;
        this.drift = 0;
        this.opacity = 0.5;
    }

    draw() {
        const tRaw = (this.y - 800) / (canvas.height - 820);
        console.log(this.y, canvas.height, tRaw)
        const t = Math.max(0, Math.min(1, tRaw));

        const white = { r: 240, g: 240, b: 240 };
        const orange = { r: 255, g: 100, b: 0 };

        const r = Math.round(orange.r * (1 - t) + white.r * t);
        const g = Math.round(orange.g * (1 - t) + white.g * t);
        const b = Math.round(orange.b * (1 - t) + white.b * t);

        const gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.2, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${this.opacity * (1-t) * 1.5})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.drift;
        this.y -= this.speed;

        if (this.y < canvas.height - 250) {
            this.y += this.speed * 4;
        }

        this.x += (this.ox - this.x) * this.speed;
        this.y += (this.oy - this.y) * this.speed;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            this.x -= dx / 15;
            this.y -= dy / 15;
        }

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;

        this.draw();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        let x = Math.random() * canvas.width;
        let y = canvas.height - Math.random() * 150;
        let size = Math.random() * 60 + 40;
        size *= 1.5;
        particles.push(new Particle(x, y, size));
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
}
animate();