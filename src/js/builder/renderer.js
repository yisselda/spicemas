/**
 * Canvas renderer for the backpack builder.
 *
 * Draws: background → feather layers → silhouette → gems → watermark.
 * Uses photo-based feather PNGs with transparent backgrounds.
 */

import { getState } from './state.js';
import { SILHOUETTES, getSilhouetteImage } from './silhouettes.js';
import { FRAMES, getZoneAnchors } from './frames.js';
import { getFeatherImage, preloadFeathers } from './feathers.js';

// Canvas dimensions (2x for retina)
const BASE_W = 400;
const BASE_H = 600;
const SCALE = 2;
const W = BASE_W * SCALE;
const H = BASE_H * SCALE;

// Backpack mount point — centered horizontally, upper back behind silhouette shoulders
const MOUNT_X = W / 2;
const MOUNT_Y = H * 0.38;

let canvas, ctx;

export function initRenderer(canvasEl) {
    canvas = canvasEl;
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = BASE_W + 'px';
    canvas.style.height = BASE_H + 'px';
    ctx = canvas.getContext('2d');

    // Preload default feather colors
    const s = getState();
    const colors = new Set();
    for (const zone of Object.values(s.zones)) {
        for (const layer of zone) {
            colors.add(layer.featherColor);
        }
    }
    preloadFeathers([...colors], () => render());
}

export function render() {
    if (!ctx) return;
    const s = getState();

    ctx.clearRect(0, 0, W, H);

    // Background
    drawBackground();

    // Feather layers behind silhouette (back-to-front: sides, middle, top)
    const frame = FRAMES.find(f => f.id === s.frameId);
    if (frame) {
        const hasFeathers = ['top', 'middle', 'sides'].some(z => s.zones[z].length > 0);

        if (!hasFeathers) {
            // Show frame outline when no feathers added yet
            drawFrameOutline(frame);
        }

        for (const zoneName of ['sides', 'middle', 'top']) {
            const layers = s.zones[zoneName];
            const zone = frame.zones[zoneName];
            for (const layer of layers) {
                drawFeatherLayer(zone, layer);
            }
        }
    }

    // Silhouette in front of feathers
    if (s.showSilhouette) {
        drawSilhouette(s);
    }

    // Gems on top of everything
    if (frame && s.gems.enabled) {
        drawGems(frame, s.gems.color);
    }

    // Watermark
    drawWatermark();
}

function drawBackground() {
    ctx.fillStyle = '#f5f0f0';
    ctx.fillRect(0, 0, W, H);
}

// Cache for silhouette images keyed by id + skinTone
const silhouetteCache = new Map();

function drawSilhouette(s) {
    const sil = SILHOUETTES.find(si => si.id === s.silhouetteId);
    if (!sil) return;

    const cacheKey = `${sil.id}_${s.skinTone}`;

    if (!silhouetteCache.has(cacheKey)) {
        // Mark as loading to avoid duplicate fetches
        silhouetteCache.set(cacheKey, null);

        getSilhouetteImage(sil, s.skinTone).then(img => {
            silhouetteCache.set(cacheKey, img);
            render(); // re-render once loaded
        });
        return; // skip this frame
    }

    const cached = silhouetteCache.get(cacheKey);
    if (!cached) return; // still loading

    // Draw cached silhouette
    const silH = H * 0.75;
    const silW = silH * (cached.naturalWidth / cached.naturalHeight);
    const silX = (W - silW) / 2;
    const silY = H - silH - H * 0.02;
    ctx.drawImage(cached, silX, silY, silW, silH);
}

function drawFrameOutline(frame) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);

    const zoneColors = {
        top: 'rgba(255, 180, 100, 0.25)',
        middle: 'rgba(255, 100, 180, 0.2)',
        sides: 'rgba(100, 200, 255, 0.2)',
    };

    for (const zoneName of ['sides', 'middle', 'top']) {
        const zone = frame.zones[zoneName];
        ctx.fillStyle = zoneColors[zoneName];

        // Draw zone arc area on right side
        ctx.beginPath();
        ctx.moveTo(MOUNT_X, MOUNT_Y);
        for (let a = zone.startAngle; a <= zone.endAngle; a += 0.05) {
            ctx.lineTo(
                MOUNT_X + Math.sin(a) * zone.radiusMax * SCALE,
                MOUNT_Y - Math.cos(a) * zone.radiusMax * SCALE
            );
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Mirror on left side
        ctx.beginPath();
        ctx.moveTo(MOUNT_X, MOUNT_Y);
        for (let a = zone.startAngle; a <= zone.endAngle; a += 0.05) {
            ctx.lineTo(
                MOUNT_X - Math.sin(a) * zone.radiusMax * SCALE,
                MOUNT_Y - Math.cos(a) * zone.radiusMax * SCALE
            );
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.restore();
}

function drawFeatherLayer(zone, layer) {
    const img = getFeatherImage(layer.featherColor, () => render());
    if (!img) return; // still loading

    const anchors = getZoneAnchors(zone, layer.density);

    // Draw from outermost angle to innermost for natural overlap
    const sorted = [...anchors].sort((a, b) => b.angle - a.angle);

    for (const anchor of sorted) {
        // Size varies by position — feathers near top (small angle) are taller
        const t = (anchor.angle - zone.startAngle) / (zone.endAngle - zone.startAngle);
        const sizeFactor = 1.0 - t * 0.3; // top feathers 100%, bottom 70%
        const featherHeight = zone.radiusMax * layer.height * sizeFactor * SCALE;
        const angle = anchor.angle * layer.spread;

        // Draw feather on right side
        drawSingleFeather(
            img,
            MOUNT_X + Math.sin(angle) * anchor.radiusMin * SCALE,
            MOUNT_Y - Math.cos(angle) * anchor.radiusMin * SCALE,
            angle,
            featherHeight
        );

        // Mirror on left side (flip horizontally)
        drawSingleFeather(
            img,
            MOUNT_X - Math.sin(angle) * anchor.radiusMin * SCALE,
            MOUNT_Y - Math.cos(angle) * anchor.radiusMin * SCALE,
            -angle,
            featherHeight,
            true // mirror
        );
    }
}

function drawSingleFeather(img, x, y, angle, height, mirror = false) {
    // Compute width from image aspect ratio
    const aspect = img.naturalWidth / img.naturalHeight;
    const fw = height * aspect;
    const fh = height;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    if (mirror) {
        ctx.scale(-1, 1);
    }
    ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;
    ctx.drawImage(img, -fw / 2, -fh, fw, fh);
    ctx.restore();
}

function drawGems(frame, color) {
    // Draw gems along the spine/center line
    const gemCount = 8;
    const startY = MOUNT_Y - 20 * SCALE;
    const endY = MOUNT_Y + 40 * SCALE;

    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6 * SCALE;

    for (let i = 0; i < gemCount; i++) {
        const t = i / (gemCount - 1);
        const y = startY + t * (endY - startY);
        const size = (3 + Math.sin(t * Math.PI) * 2) * SCALE;

        ctx.beginPath();
        // Diamond shape
        ctx.moveTo(MOUNT_X, y - size);
        ctx.lineTo(MOUNT_X + size * 0.6, y);
        ctx.lineTo(MOUNT_X, y + size);
        ctx.lineTo(MOUNT_X - size * 0.6, y);
        ctx.closePath();
        ctx.fill();
    }

    ctx.shadowBlur = 0;
}

function drawWatermark() {
    const s = getState();
    ctx.save();
    ctx.font = `${11 * SCALE}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.textAlign = 'center';
    ctx.fillText('SPICEMAS 2026', W / 2, H - 12 * SCALE);
    ctx.restore();
}

/**
 * Export the canvas as a PNG blob.
 */
export function exportBlob() {
    return new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png');
    });
}
