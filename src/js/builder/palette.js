/**
 * Curated feather color palette — flat, simple, carnival-ready.
 */
export const featherColors = [
    // Warm
    { name: 'Coral', hex: '#FF6B6B' },
    { name: 'Salmon', hex: '#FA8072' },
    { name: 'Hot Pink', hex: '#E8175D' },
    { name: 'Soft Pink', hex: '#FFB6C1' },
    { name: 'Magenta', hex: '#D946EF' },
    { name: 'Red', hex: '#CE1126' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Orange', hex: '#F97316' },
    // Gold / Yellow
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Yellow', hex: '#FCD116' },
    { name: 'Champagne', hex: '#F7E7CE' },
    // Cool
    { name: 'Teal', hex: '#00897B' },
    { name: 'Mint', hex: '#98D8C8' },
    { name: 'Sage', hex: '#87AE73' },
    { name: 'Green', hex: '#009E49' },
    { name: 'Turquoise', hex: '#06B6D4' },
    { name: 'Sky Blue', hex: '#38BDF8' },
    { name: 'Royal Blue', hex: '#0072C6' },
    { name: 'Navy', hex: '#002D62' },
    // Neutral / Metallic
    { name: 'Purple', hex: '#A855F7' },
    { name: 'Lavender', hex: '#C4B5FD' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Black', hex: '#1A1A1A' },
];

/**
 * Metallic colors for gem accents
 */
export const metallicPalette = [
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Rose Gold', hex: '#B76E79' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Bronze', hex: '#CD7F32' },
    { name: 'Copper', hex: '#B87333' },
    { name: 'Champagne', hex: '#F7E7CE' },
];

/**
 * Skin tone gradient stops.
 * Position 0 = darkest, 100 = lightest.
 * More stops in the dark-to-medium range for finer control.
 */
export const skinToneStops = [
    { pos: 0,   r: 45,  g: 25,  b: 10  }, // #2D190A deep espresso
    { pos: 8,   r: 59,  g: 31,  b: 11  }, // #3B1F0B
    { pos: 16,  r: 74,  g: 41,  b: 18  }, // #4A2912
    { pos: 24,  r: 90,  g: 52,  b: 22  }, // #5A3416
    { pos: 32,  r: 107, g: 62,  b: 31  }, // #6B3E1F
    { pos: 40,  r: 120, g: 72,  b: 36  }, // #784824
    { pos: 48,  r: 141, g: 85,  b: 36  }, // #8D5524
    { pos: 56,  r: 165, g: 102, b: 45  }, // #A5662D
    { pos: 64,  r: 192, g: 120, b: 64  }, // #C07840
    { pos: 72,  r: 212, g: 149, b: 107 }, // #D4956B
    { pos: 80,  r: 224, g: 172, b: 130 }, // #E0AC82
    { pos: 88,  r: 232, g: 185, b: 141 }, // #E8B98D
    { pos: 96,  r: 243, g: 209, b: 183 }, // #F3D1B7
    { pos: 100, r: 248, g: 213, b: 194 }, // #F8D5C2
];

/**
 * Interpolate skin tone stops at a given position (0–100).
 * Returns a hex color string.
 */
export function skinToneAtPosition(pos) {
    pos = Math.max(0, Math.min(100, pos));

    // Find surrounding stops
    let lo = skinToneStops[0];
    let hi = skinToneStops[skinToneStops.length - 1];
    for (let i = 0; i < skinToneStops.length - 1; i++) {
        if (pos >= skinToneStops[i].pos && pos <= skinToneStops[i + 1].pos) {
            lo = skinToneStops[i];
            hi = skinToneStops[i + 1];
            break;
        }
    }

    const t = hi.pos === lo.pos ? 0 : (pos - lo.pos) / (hi.pos - lo.pos);
    const r = Math.round(lo.r + t * (hi.r - lo.r));
    const g = Math.round(lo.g + t * (hi.g - lo.g));
    const b = Math.round(lo.b + t * (hi.b - lo.b));

    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

/**
 * Build a CSS linear-gradient string for the skin tone slider track.
 */
export function skinToneGradientCSS() {
    return 'linear-gradient(to right, ' +
        skinToneStops.map(s =>
            `rgb(${s.r},${s.g},${s.b}) ${s.pos}%`
        ).join(', ') + ')';
}

