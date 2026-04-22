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
    zones: {
        top: [
            { featherColor: 'mint', spread: 1.0, height: 0.95, density: 0.5 },
            { featherColor: 'shocking-pink', spread: 1.0, height: 0.85, density: 0.5 },
            { featherColor: 'burgundy', spread: 1.0, height: 0.65, density: 0.5 },
        ],
        middle: [
            { featherColor: 'mint', spread: 1.0, height: 0.9, density: 0.5 },
            { featherColor: 'burgundy', spread: 1.0, height: 0.7, density: 0.5 },
        ],
        sides: [
            { featherColor: 'candy-pink', spread: 1.0, height: 0.85, density: 0.5 },
            { featherColor: 'teal', spread: 1.0, height: 0.7, density: 0.5 },
        ],
    },
    activeZone: 'top',

    // Step 3: Accents
    gems: {
        enabled: false,
        color: '#D4AF37',
    },

    // Display — wings-only by default
    showSilhouette: false,
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
