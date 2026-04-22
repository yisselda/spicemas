/**
 * Backpack frame shapes.
 *
 * Angles in radians from vertical (0 = straight up, π/2 = horizontal right).
 * Renderer mirrors left/right automatically.
 *
 * startAngle begins >0 to leave center gap between wing halves.
 */

const fan = {
    id: 'fan',
    name: 'Fan',
    zones: {
        top: {
            startAngle: 0.3,
            endAngle: 0.7,
            radiusMin: 20,
            radiusMax: 270,
            anchorCount: 2,
        },
        middle: {
            startAngle: 0.7,
            endAngle: 1.15,
            radiusMin: 18,
            radiusMax: 250,
            anchorCount: 2,
        },
        sides: {
            startAngle: 1.9,
            endAngle: 2.5,
            radiusMin: 18,
            radiusMax: 200,
            anchorCount: 2,
        },
    },
};

const butterfly = {
    id: 'butterfly',
    name: 'Butterfly',
    zones: {
        top: {
            startAngle: 0.4,
            endAngle: 0.85,
            radiusMin: 20,
            radiusMax: 270,
            anchorCount: 2,
        },
        middle: {
            startAngle: 0.85,
            endAngle: 1.35,
            radiusMin: 18,
            radiusMax: 260,
            anchorCount: 2,
        },
        sides: {
            startAngle: 2.0,
            endAngle: 2.6,
            radiusMin: 18,
            radiusMax: 210,
            anchorCount: 2,
        },
    },
};

const spreadWing = {
    id: 'spreadWing',
    name: 'Spread Wing',
    zones: {
        top: {
            startAngle: 0.35,
            endAngle: 0.75,
            radiusMin: 20,
            radiusMax: 280,
            anchorCount: 2,
        },
        middle: {
            startAngle: 0.75,
            endAngle: 1.25,
            radiusMin: 18,
            radiusMax: 260,
            anchorCount: 2,
        },
        sides: {
            startAngle: 2.0,
            endAngle: 2.55,
            radiusMin: 18,
            radiusMax: 210,
            anchorCount: 2,
        },
    },
};

const tallPlume = {
    id: 'tallPlume',
    name: 'Tall Plume',
    zones: {
        top: {
            startAngle: 0.25,
            endAngle: 0.55,
            radiusMin: 48,
            radiusMax: 320,
            anchorCount: 2,
        },
        middle: {
            startAngle: 0.55,
            endAngle: 0.95,
            radiusMin: 38,
            radiusMax: 260,
            anchorCount: 2,
        },
        sides: {
            startAngle: 1.7,
            endAngle: 2.3,
            radiusMin: 18,
            radiusMax: 190,
            anchorCount: 2,
        },
    },
};

export const FRAMES = [fan, butterfly, spreadWing, tallPlume];

/**
 * Generate anchor positions for a zone.
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
