// ===== Countdown Timer =====
const SPICEMAS_DATE = new Date('2026-08-10T06:00:00-04:00'); // 6 AM AST on Monday Aug 10

function updateCountdown() {
    const now = new Date();
    const diff = SPICEMAS_DATE - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    // Update glow data attributes
    daysEl.setAttribute('data-value', daysEl.textContent);
    hoursEl.setAttribute('data-value', hoursEl.textContent);
    minutesEl.setAttribute('data-value', minutesEl.textContent);
    secondsEl.setAttribute('data-value', secondsEl.textContent);
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===== Floating Confetti Particles =====
(function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Carnival palette — drawn from the costume & flag colors
    const COLORS = [
        '#CE1126', // Grenada red
        '#F7D036', // Grenada gold
        '#007A3D', // Grenada green
        '#e8175d', // hot pink
        '#ff6b4a', // coral
        '#00d4aa', // cyan/teal
        '#a855f7', // purple
        '#ffc857', // warm gold
        '#38bdf8', // sky blue
    ];

    const PARTICLE_COUNT_MOBILE = 30;
    const PARTICLE_COUNT_DESKTOP = 55;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function getParticleCount() {
        return width < 600 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    }

    function createParticle(randomizeY) {
        const size = Math.random() * 4 + 2;
        return {
            x: Math.random() * width,
            y: randomizeY ? Math.random() * height : -size,
            size: size,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            speedY: Math.random() * 0.4 + 0.15,
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.15,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            // Shape: 0 = circle, 1 = diamond, 2 = line
            shape: Math.floor(Math.random() * 3),
        };
    }

    function initParticles() {
        particles = [];
        const count = getParticleCount();
        for (let i = 0; i < count; i++) {
            particles.push(createParticle(true));
        }
    }

    function drawParticle(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 0) {
            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.shape === 1) {
            // Diamond
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size * 0.6, 0);
            ctx.lineTo(0, p.size);
            ctx.lineTo(-p.size * 0.6, 0);
            ctx.closePath();
            ctx.fill();
        } else {
            // Line / streak
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = p.opacity * 0.8;
            ctx.beginPath();
            ctx.moveTo(-p.size, 0);
            ctx.lineTo(p.size, 0);
            ctx.stroke();
        }

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            // Gentle drift oscillation
            p.x += Math.sin(p.y * 0.005) * 0.15;

            drawParticle(p);

            // Recycle particles that fall off screen
            if (p.y > height + 10 || p.x < -10 || p.x > width + 10) {
                particles[i] = createParticle(false);
                particles[i].x = Math.random() * width;
            }
        }

        requestAnimationFrame(animate);
    }

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        // Draw static particles once, no animation
        resize();
        initParticles();
        particles.forEach(drawParticle);
        window.addEventListener('resize', () => {
            resize();
            initParticles();
            ctx.clearRect(0, 0, width, height);
            particles.forEach(drawParticle);
        });
        return;
    }

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
        resize();
        // Re-balance particle count on resize
        const target = getParticleCount();
        while (particles.length < target) particles.push(createParticle(true));
        while (particles.length > target) particles.pop();
    });
})();
