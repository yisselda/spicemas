/**
 * Photo-based feather assets.
 *
 * Each feather color is a transparent PNG in /feathers/{color}.png.
 * Images are preloaded and cached for instant rendering.
 */

export const FEATHER_COLORS = [
    // Warm
    { id: 'red', name: 'Red' },
    { id: 'coral', name: 'Coral' },
    { id: 'hot-orange', name: 'Hot Orange' },
    { id: 'orange', name: 'Orange' },
    { id: 'shocking-pink', name: 'Shocking Pink' },
    { id: 'candy-pink', name: 'Candy Pink' },
    { id: 'pink-orient', name: 'Pink Orient' },
    { id: 'very-berry', name: 'Very Berry' },
    { id: 'burgundy', name: 'Burgundy' },
    // Gold / Yellow / Warm neutral
    { id: 'yellow', name: 'Yellow' },
    { id: 'marigold', name: 'Marigold' },
    { id: 'gold', name: 'Gold' },
    { id: 'champagne', name: 'Champagne' },
    { id: 'copper', name: 'Copper' },
    { id: 'cinnamon', name: 'Cinnamon' },
    { id: 'toasted-almond', name: 'Toasted Almond' },
    { id: 'beige', name: 'Beige' },
    // Cool
    { id: 'teal', name: 'Teal' },
    { id: 'dark-aqua', name: 'Dark Aqua' },
    { id: 'mint', name: 'Mint' },
    { id: 'light-turquoise', name: 'Light Turquoise' },
    { id: 'dark-turquoise', name: 'Dark Turquoise' },
    { id: 'kelly', name: 'Kelly Green' },
    { id: 'lime', name: 'Lime' },
    { id: 'olive', name: 'Olive' },
    { id: 'sky', name: 'Sky Blue' },
    { id: 'royal', name: 'Royal Blue' },
    { id: 'navy', name: 'Navy' },
    // Purple / Lavender
    { id: 'purple', name: 'Purple' },
    { id: 'amethyst', name: 'Amethyst' },
    { id: 'regal', name: 'Regal' },
    { id: 'lavender', name: 'Lavender' },
    // Neutral
    { id: 'white', name: 'White' },
    { id: 'ivory', name: 'Ivory' },
    { id: 'natural', name: 'Natural' },
    { id: 'silver', name: 'Silver' },
    { id: 'brown', name: 'Brown' },
    { id: 'black', name: 'Black' },
    // Special
    { id: 'mango', name: 'Mango' },
    { id: 'met-gala-potpourri', name: 'Met Gala' },
];

const imageCache = new Map();
const BASE = import.meta.env.BASE_URL;

/**
 * Get the public URL for a feather image.
 */
export function getFeatherUrl(colorId) {
    return `${BASE}feathers/${colorId}.png`;
}

/**
 * Get a feather image by color id. Returns the cached Image if loaded,
 * or null if still loading (triggers async load + render callback).
 */
export function getFeatherImage(colorId, onLoad) {
    if (imageCache.has(colorId)) {
        return imageCache.get(colorId);
    }

    // Mark as loading
    imageCache.set(colorId, null);

    const img = new Image();
    img.onload = () => {
        imageCache.set(colorId, img);
        if (onLoad) onLoad();
    };
    img.onerror = () => {
        console.warn(`Failed to load feather: ${colorId}`);
        imageCache.delete(colorId);
    };
    img.src = getFeatherUrl(colorId);

    return null; // not ready yet
}

/**
 * Preload a set of feather colors so they're ready when needed.
 */
export function preloadFeathers(colorIds, onLoad) {
    for (const id of colorIds) {
        getFeatherImage(id, onLoad);
    }
}
