/**
 * Silhouettes for the backpack builder.
 *
 * Loads real SVG silhouette assets from /public/silhouettes/.
 * Each figure is a distinct SVG file — no scaling variants.
 * Tinting replaces fill colors with the chosen skin tone.
 */

const BASE_URL = import.meta.env.BASE_URL + 'silhouettes/';

// Cache for fetched raw SVG text
const rawCache = new Map();

async function fetchSvg(filename) {
    if (rawCache.has(filename)) return rawCache.get(filename);
    const resp = await fetch(BASE_URL + filename);
    const text = await resp.text();
    rawCache.set(filename, text);
    return text;
}

/**
 * Create a tinted SVG string from a silhouette figure + color.
 * Handles both Adobe Illustrator and potrace SVG formats.
 */
export async function getSilhouetteSvg(figure, color) {
    const raw = await fetchSvg(figure.file);

    // Extract viewBox
    const vbMatch = raw.match(/viewBox="([^"]+)"/);
    const viewBox = vbMatch ? vbMatch[1] : '0 0 360 740';

    // Extract inner content (everything between <svg> tags)
    const innerMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
    if (!innerMatch) return raw;

    let inner = innerMatch[1];

    // Strip metadata, doctype, xml declarations
    inner = inner.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');

    // Replace all fill colors with the skin tone
    inner = inner
        .replace(/fill="[^"]*"/g, `fill="${color}"`)
        .replace(/fill:\s*[^;"]+/g, `fill: ${color}`);

    // Parse viewBox dimensions for explicit width/height (needed for canvas rasterization)
    const [, , vbW, vbH] = viewBox.split(/\s+/).map(Number);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${vbW}" height="${vbH}">${inner}</svg>`;
}

/**
 * Create an Image element from a silhouette figure + color.
 * Returns a promise that resolves to a ready-to-draw HTMLImageElement.
 */
export async function getSilhouetteImage(figure, color) {
    const svgStr = await getSilhouetteSvg(figure, color);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = reject;
        img.src = url;
    });
}

/**
 * Generate a small preview SVG string for the picker UI.
 */
export async function getPreviewSvg(figure) {
    return getSilhouetteSvg(figure, '#c0c0c0');
}

/**
 * All silhouettes for the picker UI.
 * Each is a distinct SVG file, labeled Fig 1–3.
 */
export const SILHOUETTES = [
    { id: 'fig1', label: 'Fig 1', file: 'figure_a.svg' },
];
