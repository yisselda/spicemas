/**
 * Canvas renderer for the backpack builder.
 *
 * Draws: background → silhouette → backpack frame → feather layers → gems → watermark.
 * Uses an offscreen canvas to rasterize and tint SVG feathers.
 */

import { getState } from './state.js';
import { SILHOUETTES } from './silhouettes.js';
import { FRAMES, getZoneAnchors } from './frames.js';
import { FEATHER_TYPES } from './feathers.js';

// Canvas dimensions (2x for retina)
const BASE_W = 400;
const BASE_H = 600;
const SCALE = 2;
const W = BASE_W * SCALE;
const H = BASE_H * SCALE;

// Backpack center relative to canvas
const MOUNT_X = W / 2;
const MOUNT_Y = H * 0.35;

let canvas, ctx;

export function initRenderer(canvasEl) {
    canvas = canvasEl;
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = BASE_W + 'px';
    canvas.style.height = BASE_H + 'px';
    ctx = canvas.getContext('2d');
}

export function render() {
    if (!ctx) return;
    const s = getState();

    ctx.clearRect(0, 0, W, H);

    // Background
    drawBackground();

    // Silhouette
    drawSilhouette(s);

    // Feather layers (back-to-front: sides, middle, top)
    const frame = FRAMES.find(f => f.id === s.frameId);
    if (frame) {
        for (const zoneName of ['sides', 'middle', 'top']) {
            const layers = s.zones[zoneName];
            const zone = frame.zones[zoneName];
            for (const layer of layers) {
                drawFeatherLayer(zone, layer);
            }
        }

        // Gems
        if (s.gems.enabled) {
            drawGems(frame, s.gems.color);
        }
    }

    // Watermark
    drawWatermark();
}

function drawBackground() {
    const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
    grad.addColorStop(0, '#2d1458');
    grad.addColorStop(1, '#1a0a2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
}

function drawSilhouette(s) {
    const sil = SILHOUETTES.find(si => si.id === s.silhouetteId);
    if (!sil) return;

    const svgStr = sil.svg().replace(/currentColor/g, s.skinTone);
    const img = new Image();
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    // We need to draw synchronously for the render pipeline,
    // so we cache the image after first load.
    if (!sil._cachedImg || sil._cachedTone !== s.skinTone) {
        sil._cachedTone = s.skinTone;
        sil._cachedImg = null;

        img.onload = () => {
            sil._cachedImg = img;
            URL.revokeObjectURL(url);
            render(); // re-render once loaded
        };
        img.src = url;
        return; // skip this frame, re-render on load
    }

    // Draw cached silhouette
    const silH = H * 0.75;
    const silW = silH * (200 / 500);
    const silX = (W - silW) / 2;
    const silY = H - silH - H * 0.02;
    ctx.drawImage(sil._cachedImg, silX, silY, silW, silH);
}

function drawFeatherLayer(zone, layer) {
    const featherType = FEATHER_TYPES.find(f => f.id === layer.featherId);
    if (!featherType) return;

    const anchors = getZoneAnchors(zone, layer.density);
    const featherHeight = zone.radiusMax * layer.height * SCALE;

    for (const anchor of anchors) {
        // Draw feather on right side
        drawSingleFeather(
            featherType,
            layer.color,
            MOUNT_X + Math.sin(anchor.angle * layer.spread) * anchor.radiusMin * SCALE,
            MOUNT_Y - Math.cos(anchor.angle * layer.spread) * anchor.radiusMin * SCALE,
            anchor.angle * layer.spread,
            featherHeight
        );

        // Mirror on left side
        drawSingleFeather(
            featherType,
            layer.color,
            MOUNT_X - Math.sin(anchor.angle * layer.spread) * anchor.radiusMin * SCALE,
            MOUNT_Y - Math.cos(anchor.angle * layer.spread) * anchor.radiusMin * SCALE,
            -anchor.angle * layer.spread,
            featherHeight
        );
    }
}

// Cache for tinted feather images
const featherCache = new Map();

function drawSingleFeather(featherType, color, x, y, angle, height) {
    const cacheKey = `${featherType.id}_${color}_${Math.round(height)}`;

    if (!featherCache.has(cacheKey)) {
        // Create tinted feather via offscreen canvas
        const svgStr = featherType.svg();
        const img = new Image();
        const blob = new Blob([svgStr], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            // Draw SVG to offscreen canvas
            const offW = Math.round(height * 0.3);
            const offH = Math.round(height);
            const off = new OffscreenCanvas(offW, offH);
            const offCtx = off.getContext('2d');

            offCtx.drawImage(img, 0, 0, offW, offH);

            // Tint: draw color with source-in composite
            offCtx.globalCompositeOperation = 'source-in';
            offCtx.fillStyle = color;
            offCtx.fillRect(0, 0, offW, offH);

            // Add some luminosity variation back
            offCtx.globalCompositeOperation = 'luminosity';
            offCtx.drawImage(img, 0, 0, offW, offH);

            featherCache.set(cacheKey, off);
            URL.revokeObjectURL(url);
            render(); // re-render with cached feather
        };
        img.src = url;
        return;
    }

    const cached = featherCache.get(cacheKey);
    const fw = cached.width;
    const fh = cached.height;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(cached, -fw / 2, -fh, fw, fh);
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
    ctx.save();
    ctx.font = `${11 * SCALE}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
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
