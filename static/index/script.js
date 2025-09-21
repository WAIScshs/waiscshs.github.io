const canvas = document.getElementById("gas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let particleCount = Math.floor((canvas.height * canvas.width * 2000) / (1920 * 1080));
particleCount = Math.max(100, Math.min(4000, particleCount));
const mouse = { x: null, y: null, radius: 120 };
let mouseRadiusSq = mouse.radius * mouse.radius;
let spriteBuckets = null;
const SPRITE_SIZES = [16, 24, 32, 40, 48];
const SPRITE_T_STEPS = 6;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
    mouseRadiusSq = mouse.radius * mouse.radius;
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
        if (spriteBuckets) {
            const tRaw = (this.y - canvas.height/1.2) / (canvas.height - canvas.height/1.2);
            const t = Math.max(0, Math.min(1, tRaw));
            const tIndex = Math.min(SPRITE_T_STEPS - 1, Math.floor(t * SPRITE_T_STEPS));
            let bestI = 0;
            let bestDiff = Infinity;
            for (let i = 0; i < SPRITE_SIZES.length; i++) {
                const diff = Math.abs(SPRITE_SIZES[i] - this.size);
                if (diff < bestDiff) { bestDiff = diff; bestI = i; }
            }
            const sprite = spriteBuckets[bestI][tIndex];
            if (sprite) {
                const drawSize = sprite.width; // sprite canvas is sized to diameter
                ctx.drawImage(sprite, this.x - drawSize / 2, this.y - drawSize / 2, drawSize, drawSize);
                return;
            }
        }

        const tRaw = (this.y - 800) / (canvas.height - 820);
        const t = Math.max(0, Math.min(1, tRaw));
        const r = Math.round(255 * (1 - t) + 240 * t);
        const g = Math.round(100 * (1 - t) + 240 * t);
        const b = Math.round(0   * (1 - t) + 240 * t);
        const alpha = Math.max(0, Math.min(1.0, this.opacity * (1 - t) * 1.5));
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.drift;
        this.y -= this.speed;

        if (this.y < canvas.height - 50) {
            this.y += this.speed * 4;
        }

        this.x += (this.ox - this.x) * this.speed;
        this.y += (this.oy - this.y) * this.speed;

        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadiusSq) {
                const inv = 1 / 15;
                this.x -= dx * inv;
                this.y -= dy * inv;
            }
        }

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;

        this.draw();
    }
}

function init() {
    particles = [];
    spriteBuckets = [];
    for (let s = 0; s < SPRITE_SIZES.length; s++) {
        const size = SPRITE_SIZES[s];
        const diameter = Math.ceil(size * 2);
        const bucket = [];
        for (let t = 0; t < SPRITE_T_STEPS; t++) {
            const off = document.createElement('canvas');
            off.width = diameter;
            off.height = diameter;
            const octx = off.getContext('2d');
            const tf = t / Math.max(1, SPRITE_T_STEPS - 1);
            const r = Math.round(255 * (1 - tf) + 240 * tf);
            const g = Math.round(100 * (1 - tf) + 240 * tf);
            const b = Math.round(0   * (1 - tf) + 240 * tf);

            const grad = octx.createRadialGradient(diameter/2, diameter/2, 0, diameter/2, diameter/2, diameter/2);
            grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
            grad.addColorStop(0.6, `rgba(${r},${g},${b},0.35)`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            octx.fillStyle = grad;
            octx.fillRect(0,0,diameter,diameter);
            bucket.push(off);
        }
        spriteBuckets.push(bucket);
    }
    for (let i = 0; i < particleCount; i++) {
        let x = Math.random() * canvas.width;
        let y = canvas.height - Math.random() * canvas.height/4;
        let size = 100;
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