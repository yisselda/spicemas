/**
 * Builder state — single source of truth for the backpack configuration.
 * The UI reads from and writes to this object, and the renderer
 * consumes it to draw the canvas.
 */

import { FRAMES } from './frames.js';
const listeners = new Set();

const state = {
    step: 1, // 1-4: frame, zones, accents, preview

    // Silhouette (fixed for now)
    silhouetteId: 'fig1',
    skinTone: '#000000',

    // Step 1: Frame
    frameId: 'butterfly',

    // Step 2: Zones — layered feather colors (photo-based)
    // Default preset matches the butterfly inspo image (8 feathers per side)
    // Each layer uses density to control feather count, spread to fan out
    zones: {
        top: [
            { featherColor: 'mint', spread: 0.75, height: 0.85, density: 1.0 },
            { featherColor: 'coral', spread: 1.0, height: 0.85, density: 1.0 },
            { featherColor: 'mint', spread: 1.25, height: 0.85, density: 1.0 },
        ],
        middle: [
            { featherColor: 'burgundy', spread: 0.9, height: 0.85, density: 1.0 },
            { featherColor: 'burgundy', spread: 1.1, height: 0.85, density: 1.0 },
        ],
        sides: [
            { featherColor: 'candy-pink', spread: 0.85, height: 0.85, density: 1.0 },
            { featherColor: 'teal', spread: 1.0, height: 0.85, density: 1.0 },
            { featherColor: 'mint', spread: 1.15, height: 0.85, density: 1.0 },
        ],
    },
    activeZone: 'top',

    // Step 3: Accents
    gems: {
        enabled: false,
        color: '#D4AF37',
    },

    // Feather curve direction: true = tips curve outward (wings open), false = inward
    curveOut: true,

    // Display — silhouette shown by default
    showSilhouette: true,
    // Silhouette transform (user-adjustable via drag/pinch)
    silX: 0,      // horizontal offset (canvas px)
    silY: 0,      // vertical offset (canvas px)
    silScale: 1.0, // scale multiplier
};

export function getState() {
    return state;
}

export function setState(updates) {
    Object.assign(state, updates);
    notify();
}

export function setZoneLayer(zone, index, updates) {
    const layer = state.zones[zone][index];
    if (layer) {
        Object.assign(layer, updates);
        notify();
    }
}

export function addZoneLayer(zone, layer) {
    state.zones[zone].push({
        featherColor: 'red',
        spread: 0.7,
        height: 0.8,
        density: 0.7,
        ...layer,
    });
    notify();
}

export function removeZoneLayer(zone, index) {
    state.zones[zone].splice(index, 1);
    notify();
}

export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

function notify() {
    for (const fn of listeners) fn(state);
}
