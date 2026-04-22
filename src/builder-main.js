import './css/base.css';
import './css/builder.css';

import { initRenderer, render, exportBlob, CANVAS_SCALE } from './js/builder/renderer.js';
import { initUI } from './js/builder/ui.js';
import { getState, setState } from './js/builder/state.js';

const canvas = document.getElementById('builder-canvas');
initRenderer(canvas);
initUI(render);

// Silhouette toggle
const silToggle = document.getElementById('sil-toggle');
const silReset = document.getElementById('sil-reset');

// Initialize UI to match default state (silhouette on)
silReset.style.display = '';
canvas.classList.add('draggable');

silToggle.addEventListener('click', () => {
    const show = !getState().showSilhouette;
    setState({ showSilhouette: show });
    silToggle.classList.toggle('off', !show);
    silReset.style.display = show ? '' : 'none';
    canvas.classList.toggle('draggable', show);
    render();
});

silReset.addEventListener('click', () => {
    setState({ silX: 0, silY: 0, silScale: 1.0 });
    render();
});

// ===== Silhouette drag/pinch on canvas =====
// Converts CSS coordinates to canvas coordinates
function cssToCanvas(dx) {
    return dx * CANVAS_SCALE;
}

let dragState = null;

canvas.addEventListener('touchstart', (e) => {
    if (!getState().showSilhouette) return;

    if (e.touches.length === 1) {
        // Single finger — drag
        const t = e.touches[0];
        dragState = { type: 'drag', startX: t.clientX, startY: t.clientY, origSilX: getState().silX, origSilY: getState().silY };
        e.preventDefault();
    } else if (e.touches.length === 2) {
        // Two fingers — pinch to scale
        const dist = Math.hypot(
            e.touches[1].clientX - e.touches[0].clientX,
            e.touches[1].clientY - e.touches[0].clientY
        );
        dragState = { type: 'pinch', startDist: dist, origScale: getState().silScale };
        e.preventDefault();
    }
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    if (!dragState) return;
    e.preventDefault();

    if (dragState.type === 'drag' && e.touches.length === 1) {
        const t = e.touches[0];
        const dx = cssToCanvas(t.clientX - dragState.startX);
        const dy = cssToCanvas(t.clientY - dragState.startY);
        setState({ silX: dragState.origSilX + dx, silY: dragState.origSilY + dy });
        render();
    } else if (dragState.type === 'pinch' && e.touches.length === 2) {
        const dist = Math.hypot(
            e.touches[1].clientX - e.touches[0].clientX,
            e.touches[1].clientY - e.touches[0].clientY
        );
        const scale = Math.max(0.3, Math.min(2.5, dragState.origScale * (dist / dragState.startDist)));
        setState({ silScale: scale });
        render();
    }
}, { passive: false });

canvas.addEventListener('touchend', () => {
    dragState = null;
});

// Desktop: mouse drag + scroll wheel
let mouseDown = false;
let mouseStart = null;

canvas.addEventListener('mousedown', (e) => {
    if (!getState().showSilhouette) return;
    mouseDown = true;
    mouseStart = { x: e.clientX, y: e.clientY, origSilX: getState().silX, origSilY: getState().silY };
    canvas.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!mouseDown || !mouseStart) return;
    const dx = cssToCanvas(e.clientX - mouseStart.x);
    const dy = cssToCanvas(e.clientY - mouseStart.y);
    setState({ silX: mouseStart.origSilX + dx, silY: mouseStart.origSilY + dy });
    render();
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
    mouseStart = null;
    canvas.style.cursor = '';
});

canvas.addEventListener('wheel', (e) => {
    if (!getState().showSilhouette) return;
    e.preventDefault();
    const s = getState();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const scale = Math.max(0.3, Math.min(2.5, s.silScale + delta));
    setState({ silScale: scale });
    render();
}, { passive: false });

// ===== Export handlers (always-visible buttons) =====
async function downloadImage() {
    const blob = await exportBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spicemas-2026-backpack.png';
    a.click();
    URL.revokeObjectURL(url);
}

async function shareImage() {
    const blob = await exportBlob();
    const file = new File([blob], 'spicemas-2026-backpack.png', { type: 'image/png' });

    if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
            title: 'My Spicemas 2026 Backpack',
            text: 'Check out the backpack I designed for Spicemas 2026!',
            files: [file],
        });
    } else {
        downloadImage();
    }
}

document.getElementById('btn-download').addEventListener('click', downloadImage);
document.getElementById('btn-share').addEventListener('click', shareImage);
// Also listen for events from step 4 UI
document.addEventListener('backpack:download', downloadImage);
document.addEventListener('backpack:share', shareImage);
