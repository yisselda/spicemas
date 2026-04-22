/**
 * Backpack frame shapes.
 *
 * Each frame defines the overall wing silhouette and zone geometry.
 * Zones: top, middle, sides — each zone has anchor points where
 * feathers are placed, plus angle ranges for spread.
 *
 * Coordinates are relative to the backpack center (0,0).
 * Positive x = right, negative x = left, negative y = up.
 *
 * The canvas renderer mirrors left/right automatically, so we only
 * define the right-side anchors and the renderer mirrors them.
 */

/**
 * Fan — wide symmetrical spread, inspired by the red costume.
 * Even radial distribution, like a peacock tail fan.
 */
const fan = {
    id: 'fan',
    name: 'Fan',
    /**
     * Zone definitions with feather anchor arcs.
     * Each zone has:
     *   startAngle / endAngle: radians from vertical (0 = straight up)
     *   radiusMin / radiusMax: distance from center for feather base/tip
     *   anchorCount: default number of feather positions per side
     */
    zones: {
        top: {
            startAngle: -0.15,
            endAngle: 0.5,
            radiusMin: 20,
            radiusMax: 180,
            anchorCount: 5,
        },
        middle: {
            startAngle: 0.5,
            endAngle: 1.1,
            radiusMin: 20,
            radiusMax: 160,
            anchorCount: 5,
        },
        sides: {
            startAngle: 1.1,
            endAngle: 1.65,
            radiusMin: 15,
            radiusMax: 130,
            anchorCount: 4,
        },
    },
    // Frame spine SVG for the structural outline
    spinePath: `M0 0 Q-2 -20 -1 -40 L0 -60 L1 -40 Q2 -20 0 0`,
};

/**
 * Butterfly — rounded wing shape, inspired by the teal/pink costume.
 * Softer curves, wider in the middle.
 */
const butterfly = {
    id: 'butterfly',
    name: 'Butterfly',
    zones: {
        top: {
            startAngle: -0.1,
            endAngle: 0.4,
            radiusMin: 20,
            radiusMax: 160,
            anchorCount: 4,
        },
        middle: {
            startAngle: 0.4,
            endAngle: 1.0,
            radiusMin: 25,
            radiusMax: 190,
            anchorCount: 6,
        },
        sides: {
            startAngle: 1.0,
            endAngle: 1.5,
            radiusMin: 15,
            radiusMax: 140,
            anchorCount: 4,
        },
    },
    spinePath: `M0 0 Q-3 -25 -2 -50 Q0 -60 2 -50 Q3 -25 0 0`,
};

/**
 * Spread Wing — angular, peacock-inspired, from the blue/purple costume.
 * Taller with dramatic upward sweep.
 */
const spreadWing = {
    id: 'spreadWing',
    name: 'Spread Wing',
    zones: {
        top: {
            startAngle: -0.2,
            endAngle: 0.35,
            radiusMin: 25,
            radiusMax: 200,
            anchorCount: 4,
        },
        middle: {
            startAngle: 0.35,
            endAngle: 0.85,
            radiusMin: 20,
            radiusMax: 170,
            anchorCount: 5,
        },
        sides: {
            startAngle: 0.85,
            endAngle: 1.4,
            radiusMin: 15,
            radiusMax: 120,
            anchorCount: 4,
        },
    },
    spinePath: `M0 0 Q-1 -30 0 -65 Q1 -30 0 0`,
};

/**
 * Tall Plume — vertical emphasis with cascading sides, yellow costume inspo.
 * Very tall center, shorter sides.
 */
const tallPlume = {
    id: 'tallPlume',
    name: 'Tall Plume',
    zones: {
        top: {
            startAngle: -0.1,
            endAngle: 0.3,
            radiusMin: 30,
            radiusMax: 220,
            anchorCount: 3,
        },
        middle: {
            startAngle: 0.3,
            endAngle: 0.8,
            radiusMin: 20,
            radiusMax: 150,
            anchorCount: 4,
        },
        sides: {
            startAngle: 0.8,
            endAngle: 1.5,
            radiusMin: 15,
            radiusMax: 100,
            anchorCount: 5,
        },
    },
    spinePath: `M0 0 Q-1 -35 0 -70 Q1 -35 0 0`,
};

export const FRAMES = [fan, butterfly, spreadWing, tallPlume];

/**
 * Generate anchor positions for a zone.
 * Returns array of { angle, radius } for each feather position.
 */
export function getZoneAnchors(zone, density = 1.0) {
    const count = Math.max(1, Math.round(zone.anchorCount * density));
    const anchors = [];
    for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0.5 : i / (count - 1);
        anchors.push({
            angle: zone.startAngle + t * (zone.endAngle - zone.startAngle),
            radiusMin: zone.radiusMin,
            radiusMax: zone.radiusMax,
        });
    }
    return anchors;
}
