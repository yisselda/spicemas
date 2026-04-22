/**
 * Builder state — single source of truth for the backpack configuration.
 * The UI reads from and writes to this object, and the renderer
 * consumes it to draw the canvas.
 */

import { FRAMES } from './frames.js';
import { SILHOUETTES } from './silhouettes.js';
import { skinTonePalette } from './palette.js';

const listeners = new Set();

const state = {
    step: 1, // 1-5: silhouette, frame, zones, accents, preview

    // Step 1: Silhouette
    silhouetteId: SILHOUETTES[0].id,
    skinTone: skinTonePalette[4].hex,

    // Step 2: Frame
    frameId: FRAMES[0].id,

    // Step 3: Zones — each zone has an array of feather layers
    zones: {
        top: [],    // [{ featherId, color, spread, height, density }]
        middle: [],
        sides: [],
    },
    activeZone: 'top',

    // Step 4: Accents
    gems: {
        enabled: false,
        color: '#D4AF37', // default gold
    },
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
        featherId: 'ostrich',
        color: '#CE1126',
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
