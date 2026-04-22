/**
 * Caribbean flag color palette, organized by country.
 * Each entry: { country, colors: [{ name, hex }] }
 */
export const caribbeanPalette = [
    {
        country: 'Grenada',
        colors: [
            { name: 'Red', hex: '#CE1126' },
            { name: 'Gold', hex: '#F7D036' },
            { name: 'Green', hex: '#007A3D' },
        ],
    },
    {
        country: 'Trinidad & Tobago',
        colors: [
            { name: 'Red', hex: '#DA121A' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Black', hex: '#1C1C1C' },
        ],
    },
    {
        country: 'Jamaica',
        colors: [
            { name: 'Black', hex: '#1A1A1A' },
            { name: 'Gold', hex: '#FED100' },
            { name: 'Green', hex: '#009B3A' },
        ],
    },
    {
        country: 'Barbados',
        colors: [
            { name: 'Ultramarine', hex: '#00267F' },
            { name: 'Gold', hex: '#FFC726' },
        ],
    },
    {
        country: 'St. Lucia',
        colors: [
            { name: 'Cerulean', hex: '#65CFFF' },
            { name: 'Gold', hex: '#FCD116' },
            { name: 'Black', hex: '#141414' },
            { name: 'White', hex: '#FFFFFF' },
        ],
    },
    {
        country: 'St. Vincent',
        colors: [
            { name: 'Blue', hex: '#0072C6' },
            { name: 'Gold', hex: '#FCD116' },
            { name: 'Green', hex: '#009E49' },
        ],
    },
    {
        country: 'Antigua & Barbuda',
        colors: [
            { name: 'Red', hex: '#CE1126' },
            { name: 'Blue', hex: '#0072C6' },
            { name: 'Gold', hex: '#FFC726' },
            { name: 'Black', hex: '#1A1A1A' },
            { name: 'White', hex: '#FFFFFF' },
        ],
    },
    {
        country: 'Bahamas',
        colors: [
            { name: 'Aquamarine', hex: '#00ABC9' },
            { name: 'Gold', hex: '#FFC726' },
            { name: 'Black', hex: '#1A1A1A' },
        ],
    },
    {
        country: 'Dominica',
        colors: [
            { name: 'Green', hex: '#006B3F' },
            { name: 'Yellow', hex: '#FCD116' },
            { name: 'Black', hex: '#1A1A1A' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Red', hex: '#D41C30' },
            { name: 'Purple', hex: '#6B3FA0' },
        ],
    },
    {
        country: 'Haiti',
        colors: [
            { name: 'Blue', hex: '#00209F' },
            { name: 'Red', hex: '#D21034' },
        ],
    },
    {
        country: 'Dominican Republic',
        colors: [
            { name: 'Blue', hex: '#002D62' },
            { name: 'Red', hex: '#CE1126' },
            { name: 'White', hex: '#FFFFFF' },
        ],
    },
    {
        country: 'Cuba',
        colors: [
            { name: 'Blue', hex: '#002A8F' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Red', hex: '#CF142B' },
        ],
    },
    {
        country: 'Guyana',
        colors: [
            { name: 'Green', hex: '#009E49' },
            { name: 'Gold', hex: '#FCD116' },
            { name: 'Red', hex: '#CE1126' },
            { name: 'Black', hex: '#1A1A1A' },
            { name: 'White', hex: '#FFFFFF' },
        ],
    },
    {
        country: 'St. Kitts & Nevis',
        colors: [
            { name: 'Green', hex: '#009E49' },
            { name: 'Red', hex: '#CE1126' },
            { name: 'Yellow', hex: '#FCD116' },
            { name: 'Black', hex: '#1A1A1A' },
            { name: 'White', hex: '#FFFFFF' },
        ],
    },
];

/**
 * Metallic colors for accents
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
 * Skin tone palette for silhouettes
 */
export const skinTonePalette = [
    { name: 'Tone 1', hex: '#F8D5C2' },
    { name: 'Tone 2', hex: '#E8B98D' },
    { name: 'Tone 3', hex: '#D4956B' },
    { name: 'Tone 4', hex: '#C07840' },
    { name: 'Tone 5', hex: '#8D5524' },
    { name: 'Tone 6', hex: '#6B3E1F' },
    { name: 'Tone 7', hex: '#4A2912' },
    { name: 'Tone 8', hex: '#3B1F0B' },
];

/**
 * Extra carnival colors (hot pinks, teals, etc. not in any flag)
 */
export const carnivalExtras = [
    { name: 'Hot Pink', hex: '#E8175D' },
    { name: 'Coral', hex: '#FF6B4A' },
    { name: 'Cyan', hex: '#00D4AA' },
    { name: 'Sky Blue', hex: '#38BDF8' },
    { name: 'Purple', hex: '#A855F7' },
    { name: 'Magenta', hex: '#D946EF' },
    { name: 'Turquoise', hex: '#06B6D4' },
    { name: 'Lime', hex: '#84CC16' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'Lavender', hex: '#C4B5FD' },
];

/**
 * Get a flat array of all feather-usable colors (flags + extras + metallics)
 */
export function getAllFeatherColors() {
    const seen = new Set();
    const result = [];

    for (const group of caribbeanPalette) {
        for (const c of group.colors) {
            if (!seen.has(c.hex)) {
                seen.add(c.hex);
                result.push({ ...c, group: group.country });
            }
        }
    }
    for (const c of carnivalExtras) {
        if (!seen.has(c.hex)) {
            seen.add(c.hex);
            result.push({ ...c, group: 'Carnival' });
        }
    }
    for (const c of metallicPalette) {
        if (!seen.has(c.hex)) {
            seen.add(c.hex);
            result.push({ ...c, group: 'Metallic' });
        }
    }

    return result;
}
