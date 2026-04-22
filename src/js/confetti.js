const PARTICLE_COUNT_MOBILE = 30;
const PARTICLE_COUNT_DESKTOP = 55;

/**
 * Read the carnival palette from CSS custom properties so colors
 * stay in sync with the stylesheet.
 */
function getPalette() {
    const style = getComputedStyle(document.documentElement);
    const get = (name) => style.getPropertyValue(name).trim();
    return [
        get('--red'),
        get('--gold'),
        get('--green'),
        get('--hot-pink'),
        get('--coral'),
        get('--cyan'),
        get('--warm-gold'),
    ].filter(Boolean);
}

export function initConfetti(canvas) {
    if (!canvas) return { stop() {} };

    const ctx = canvas.getContext('2d');
    const colors = getPalette();
    let width, height;
    let particles = [];
    let rafId = null;
    let stopped = false;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function targetCount() {
        return width < 600 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    }

    function createParticle(randomizeY) {
        const size = Math.random() * 4 + 2;
        return {
            x: Math.random() * width,
            y: randomizeY ? Math.random() * height : -size,
            size,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 0.4 + 0.15,
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.15,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            shape: Math.floor(Math.random() * 3), // 0=circle 1=diamond 2=line
        };
    }

    function seedParticles() {
        particles = Array.from({ length: targetCount() }, () => createParticle(true));
    }

    function draw(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 0) {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.shape === 1) {
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size * 0.6, 0);
            ctx.lineTo(0, p.size);
            ctx.lineTo(-p.size * 0.6, 0);
            ctx.closePath();
            ctx.fill();
        } else {
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
        if (stopped) return;
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(p.y * 0.005) * 0.15;
            p.rotation += p.rotationSpeed;

            draw(p);

            if (p.y > height + 10 || p.x < -10 || p.x > width + 10) {
                particles[i] = createParticle(false);
                particles[i].x = Math.random() * width;
            }
        }

        rafId = requestAnimationFrame(animate);
    }

    // Debounce resize
    let resizeTimer;
    function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
            const target = targetCount();
            while (particles.length < target) particles.push(createParticle(true));
            while (particles.length > target) particles.pop();
        }, 200);
    }

    // Reduced motion: draw once, no loop
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resize();
    seedParticles();

    if (prefersReducedMotion) {
        particles.forEach(draw);
    } else {
        animate();
    }

    window.addEventListener('resize', onResize);

    return {
        stop() {
            stopped = true;
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
            clearTimeout(resizeTimer);
        },
    };
}
