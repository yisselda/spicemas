/**
 * SVG feather definitions.
 *
 * Each feather is a function that returns an SVG string.
 * Feathers are drawn in grayscale (#888 base) and tinted at render time.
 * The viewBox is normalized so all feathers share consistent sizing;
 * the canvas renderer scales them to the desired height.
 */

/**
 * Ostrich Plume — tall, dramatic, wispy barbs that droop at the tip.
 * Inspired by the tall plumes in the red and yellow costume inspo.
 */
export function ostrichPlume() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 300">
    <!-- Central rachis (shaft) -->
    <path d="M40 295 Q39 200 38 140 Q37 80 40 5"
          stroke="#666" stroke-width="1.5" fill="none" stroke-linecap="round"/>

    <!-- Left barbs — wispy, curved, varying lengths -->
    <path d="M38 280 Q28 275 15 278" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M38 270 Q25 262 10 268" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M38 258 Q22 248 8 255" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M38 245 Q20 232 6 240" stroke="#888" stroke-width="0.8" fill="none"/>
    <path d="M38 232 Q18 218 5 226" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M38 218 Q16 200 4 210" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M38 204 Q15 184 3 195" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M38 190 Q14 168 3 180" stroke="#888" stroke-width="0.8" fill="none"/>
    <path d="M38 175 Q13 150 2 164" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M38 160 Q12 132 2 148" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M38 144 Q14 118 4 132" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M38 128 Q16 105 6 118" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M38 112 Q18 92 8 104" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M38 96 Q20 80 12 90" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M38 80 Q24 68 16 76" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M39 64 Q28 56 22 62" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M39 48 Q32 44 28 48" stroke="#999" stroke-width="0.4" fill="none"/>
    <path d="M39 34 Q35 32 33 35" stroke="#888" stroke-width="0.4" fill="none"/>

    <!-- Right barbs — mirror with slight asymmetry -->
    <path d="M42 280 Q52 275 65 278" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 270 Q55 262 70 268" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M42 258 Q58 248 72 255" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 245 Q60 232 74 240" stroke="#888" stroke-width="0.8" fill="none"/>
    <path d="M42 232 Q62 218 75 226" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 218 Q64 200 76 210" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M42 204 Q65 184 77 195" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 190 Q66 168 77 180" stroke="#888" stroke-width="0.8" fill="none"/>
    <path d="M42 175 Q67 150 78 164" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 160 Q68 132 78 148" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M42 144 Q66 118 76 132" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 128 Q64 105 74 118" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M42 112 Q62 92 72 104" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 96 Q60 80 68 90" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M42 80 Q56 68 64 76" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M41 64 Q52 56 58 62" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M41 48 Q48 44 52 48" stroke="#999" stroke-width="0.4" fill="none"/>
    <path d="M41 34 Q45 32 47 35" stroke="#888" stroke-width="0.4" fill="none"/>

    <!-- Soft body fill for density illusion -->
    <path d="M38 280 Q28 245 8 245 Q3 200 3 180 Q2 148 6 118 Q12 90 22 62 Q33 35 40 5
             Q47 35 58 62 Q68 90 74 118 Q78 148 78 180 Q77 200 77 245 Q58 245 42 280 Z"
          fill="#888" opacity="0.12"/>

    <!-- Feathery tip droop -->
    <path d="M40 5 Q38 2 35 8 Q38 4 40 5" stroke="#888" stroke-width="0.4" fill="none"/>
</svg>`;
}

/**
 * Peacock Eye Feather — oval eye pattern near tip, iridescent feel, rigid stem.
 * Inspired by the blue/green/purple costume inspo.
 */
export function peacockEye() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 280">
    <!-- Rigid rachis -->
    <path d="M35 275 L35 15"
          stroke="#555" stroke-width="1.8" fill="none" stroke-linecap="round"/>

    <!-- Barb body — narrower, stiffer than ostrich -->
    <path d="M35 260 Q20 200 14 140 Q12 100 18 60 Q24 30 35 15
             Q46 30 52 60 Q58 100 56 140 Q50 200 35 260 Z"
          fill="#888" opacity="0.18"/>

    <!-- Fine barbs — shorter, more structured -->
    <path d="M34 240 Q24 235 16 238" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M34 220 Q22 212 14 218" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M34 200 Q20 190 13 196" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M34 180 Q18 168 12 176" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M34 160 Q17 148 13 155" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M34 140 Q18 130 14 136" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M34 120 Q20 112 17 118" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M34 100 Q22 94 20 99" stroke="#999" stroke-width="0.4" fill="none"/>
    <path d="M34 80 Q26 76 24 80" stroke="#888" stroke-width="0.4" fill="none"/>

    <path d="M36 240 Q46 235 54 238" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M36 220 Q48 212 56 218" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M36 200 Q50 190 57 196" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M36 180 Q52 168 58 176" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M36 160 Q53 148 57 155" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M36 140 Q52 130 56 136" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M36 120 Q50 112 53 118" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M36 100 Q48 94 50 99" stroke="#999" stroke-width="0.4" fill="none"/>
    <path d="M36 80 Q44 76 46 80" stroke="#888" stroke-width="0.4" fill="none"/>

    <!-- Eye pattern — outer ring -->
    <ellipse cx="35" cy="50" rx="16" ry="22" fill="none"
             stroke="#777" stroke-width="2.5" opacity="0.6"/>

    <!-- Eye — middle ring -->
    <ellipse cx="35" cy="50" rx="11" ry="15" fill="#888" opacity="0.25"/>

    <!-- Eye — inner dark spot -->
    <ellipse cx="35" cy="48" rx="6" ry="9" fill="#555" opacity="0.4"/>

    <!-- Eye — bright center dot -->
    <ellipse cx="35" cy="46" rx="3" ry="4.5" fill="#999" opacity="0.5"/>

    <!-- Highlight crescent -->
    <path d="M32 40 Q35 36 38 40" stroke="#aaa" stroke-width="0.8" fill="none" opacity="0.4"/>
</svg>`;
}

/**
 * Fluffy Boa Feather — soft, dense, rounded clusters. Used as base layers.
 * Inspired by the fluffy base layers in the carnival costumes.
 */
export function fluffyBoa() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200">
    <!-- Short hidden rachis -->
    <path d="M50 195 Q50 150 50 100 Q50 60 50 30"
          stroke="#666" stroke-width="1" fill="none" opacity="0.3"/>

    <!-- Dense fluffy clusters — layered puffs -->
    <!-- Bottom cluster -->
    <circle cx="50" cy="175" r="18" fill="#888" opacity="0.15"/>
    <path d="M32 180 Q28 170 35 162 Q30 158 38 150 Q34 145 42 140"
          stroke="#999" stroke-width="0.7" fill="none"/>
    <path d="M68 180 Q72 170 65 162 Q70 158 62 150 Q66 145 58 140"
          stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M38 185 Q42 175 36 168" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M62 185 Q58 175 64 168" stroke="#888" stroke-width="0.5" fill="none"/>

    <!-- Middle cluster -->
    <circle cx="50" cy="130" r="22" fill="#888" opacity="0.15"/>
    <path d="M28 140 Q22 128 30 118 Q24 110 34 102" stroke="#999" stroke-width="0.7" fill="none"/>
    <path d="M72 140 Q78 128 70 118 Q76 110 66 102" stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M35 135 Q30 125 36 116 Q32 110 38 104" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M65 135 Q70 125 64 116 Q68 110 62 104" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M45 138 Q40 130 44 120" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M55 138 Q60 130 56 120" stroke="#888" stroke-width="0.5" fill="none"/>

    <!-- Top cluster -->
    <circle cx="50" cy="75" r="25" fill="#888" opacity="0.12"/>
    <path d="M25 90 Q18 75 26 60 Q20 50 30 40 Q26 32 35 25"
          stroke="#999" stroke-width="0.7" fill="none"/>
    <path d="M75 90 Q82 75 74 60 Q80 50 70 40 Q74 32 65 25"
          stroke="#888" stroke-width="0.7" fill="none"/>
    <path d="M32 85 Q26 72 33 58 Q28 48 36 38" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M68 85 Q74 72 67 58 Q72 48 64 38" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M42 88 Q36 76 41 62 Q38 52 44 42" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M58 88 Q64 76 59 62 Q62 52 56 42" stroke="#888" stroke-width="0.5" fill="none"/>

    <!-- Tip wisps -->
    <path d="M50 30 Q45 20 42 12" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M50 30 Q55 20 58 12" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M50 30 Q50 18 50 8" stroke="#888" stroke-width="0.4" fill="none"/>

    <!-- Soft overall body fill -->
    <path d="M30 190 Q15 150 18 110 Q20 70 25 50 Q30 30 42 12
             Q50 5 58 12 Q70 30 75 50 Q80 70 82 110 Q85 150 70 190 Z"
          fill="#888" opacity="0.08"/>
</svg>`;
}

/**
 * Rigid Pointed Feather — stiff, blade-like, clean edges.
 * Structural accent feather, used for geometric shapes.
 */
export function rigidPointed() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 260">
    <!-- Strong rachis -->
    <path d="M25 255 L25 5"
          stroke="#555" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Vane body — sharp, clean edges -->
    <path d="M25 240 Q15 200 10 160 Q6 120 8 80 Q10 50 18 25 Q22 12 25 5
             Q28 12 32 25 Q40 50 42 80 Q44 120 40 160 Q35 200 25 240 Z"
          fill="#888" opacity="0.2"/>

    <!-- Left barbs — tight, parallel, structured -->
    <path d="M24 230 L10 224" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M24 215 L9 207" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M24 200 L8 190" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M24 185 L7 173" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M24 170 L7 156" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M24 155 L7 140" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M24 140 L7 124" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M24 125 L8 108" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M24 110 L9 94" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M24 95 L10 80" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M24 80 L12 66" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M24 65 L16 52" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M24 50 L18 40" stroke="#888" stroke-width="0.4" fill="none"/>
    <path d="M24 35 L20 28" stroke="#999" stroke-width="0.4" fill="none"/>

    <!-- Right barbs -->
    <path d="M26 230 L40 224" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M26 215 L41 207" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M26 200 L42 190" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M26 185 L43 173" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M26 170 L43 156" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M26 155 L43 140" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M26 140 L43 124" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M26 125 L42 108" stroke="#999" stroke-width="0.6" fill="none"/>
    <path d="M26 110 L41 94" stroke="#888" stroke-width="0.6" fill="none"/>
    <path d="M26 95 L40 80" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M26 80 L38 66" stroke="#888" stroke-width="0.5" fill="none"/>
    <path d="M26 65 L34 52" stroke="#999" stroke-width="0.5" fill="none"/>
    <path d="M26 50 L32 40" stroke="#888" stroke-width="0.4" fill="none"/>
    <path d="M26 35 L30 28" stroke="#999" stroke-width="0.4" fill="none"/>
</svg>`;
}

/**
 * All feather types for the picker UI
 */
export const FEATHER_TYPES = [
    { id: 'ostrich', name: 'Ostrich Plume', svg: ostrichPlume },
    { id: 'peacock', name: 'Peacock Eye', svg: peacockEye },
    { id: 'fluffy',  name: 'Fluffy Boa', svg: fluffyBoa },
    { id: 'rigid',   name: 'Rigid Pointed', svg: rigidPointed },
];
