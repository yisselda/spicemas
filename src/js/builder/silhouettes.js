/**
 * Rear-facing body silhouettes for the backpack builder.
 *
 * 6 figures: 3 builds x 2 frames.
 * Frame A: narrower shoulders/hips
 * Frame B: wider shoulders/hips
 * Build 1: slim, Build 2: medium, Build 3: full
 *
 * All share a 200x500 viewBox. The backpack mount point is at the
 * upper back (~x:100, y:110) for all figures.
 *
 * Silhouettes are filled with the user-selected skin tone color.
 */

function figure1() {
    // Frame A, slim build
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 500">
    <!-- Head -->
    <ellipse cx="100" cy="42" rx="22" ry="28" fill="currentColor"/>
    <!-- Neck -->
    <rect x="92" y="68" width="16" height="18" rx="4" fill="currentColor"/>
    <!-- Torso -->
    <path d="M72 86 Q68 86 64 90 L56 110 Q52 130 54 160 L56 200 Q58 220 62 240
             L66 260 Q70 270 76 272 L84 274 Q92 275 100 275
             Q108 275 116 274 L124 272 Q130 270 134 260
             L138 240 Q142 220 144 200 L146 160 Q148 130 144 110
             L136 90 Q132 86 128 86 Z"
          fill="currentColor"/>
    <!-- Left arm -->
    <path d="M64 90 Q54 92 48 100 Q42 112 40 130 Q38 150 38 170
             Q38 190 40 210 Q42 230 44 245 Q46 255 50 260 Q54 264 56 260
             Q58 252 58 240 Q58 220 58 200 Q56 180 56 160"
          fill="currentColor"/>
    <!-- Right arm -->
    <path d="M136 90 Q146 92 152 100 Q158 112 160 130 Q162 150 162 170
             Q162 190 160 210 Q158 230 156 245 Q154 255 150 260 Q146 264 144 260
             Q142 252 142 240 Q142 220 142 200 Q144 180 144 160"
          fill="currentColor"/>
    <!-- Left leg -->
    <path d="M76 272 Q74 290 72 320 Q70 360 70 400 Q70 430 72 460
             Q73 475 74 485 Q76 495 82 498 Q88 498 88 492
             Q86 480 84 460 Q82 430 82 400 Q82 360 84 320 Q86 290 88 274"
          fill="currentColor"/>
    <!-- Right leg -->
    <path d="M124 272 Q126 290 128 320 Q130 360 130 400 Q130 430 128 460
             Q127 475 126 485 Q124 495 118 498 Q112 498 112 492
             Q114 480 116 460 Q118 430 118 400 Q118 360 116 320 Q114 290 112 274"
          fill="currentColor"/>
</svg>`;
}

function figure2() {
    // Frame A, medium build
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 500">
    <ellipse cx="100" cy="42" rx="23" ry="28" fill="currentColor"/>
    <rect x="91" y="68" width="18" height="18" rx="4" fill="currentColor"/>
    <path d="M68 86 Q63 86 58 92 L48 114 Q44 136 46 168 L48 208 Q52 228 56 248
             L62 268 Q68 280 78 282 L88 284 Q94 285 100 285
             Q106 285 112 284 L122 282 Q132 280 138 268
             L144 248 Q148 228 152 208 L154 168 Q156 136 152 114
             L142 92 Q137 86 132 86 Z"
          fill="currentColor"/>
    <path d="M58 92 Q46 95 40 105 Q34 120 32 140 Q30 162 30 184
             Q30 206 32 226 Q34 244 36 256 Q38 266 42 270 Q48 274 50 268
             Q52 258 52 246 Q52 226 52 206 Q50 184 50 164"
          fill="currentColor"/>
    <path d="M142 92 Q154 95 160 105 Q166 120 168 140 Q170 162 170 184
             Q170 206 168 226 Q166 244 164 256 Q162 266 158 270 Q152 274 150 268
             Q148 258 148 246 Q148 226 148 206 Q150 184 150 164"
          fill="currentColor"/>
    <path d="M78 282 Q75 302 72 334 Q68 374 68 410 Q68 440 70 466
             Q72 480 74 490 Q76 498 84 500 Q90 498 90 492
             Q88 480 86 466 Q84 440 84 410 Q84 374 86 334 Q88 302 90 284"
          fill="currentColor"/>
    <path d="M122 282 Q125 302 128 334 Q132 374 132 410 Q132 440 130 466
             Q128 480 126 490 Q124 498 116 500 Q110 498 110 492
             Q112 480 114 466 Q116 440 116 410 Q116 374 114 334 Q112 302 110 284"
          fill="currentColor"/>
</svg>`;
}

function figure3() {
    // Frame A, full build
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 500">
    <ellipse cx="100" cy="42" rx="24" ry="28" fill="currentColor"/>
    <rect x="90" y="68" width="20" height="18" rx="5" fill="currentColor"/>
    <path d="M64 86 Q58 88 52 96 L40 120 Q36 146 38 178 L40 218 Q44 240 50 258
             L58 276 Q66 290 78 292 L90 294 Q96 295 100 295
             Q104 295 110 294 L122 292 Q134 290 142 276
             L150 258 Q156 240 160 218 L162 178 Q164 146 160 120
             L148 96 Q142 88 136 86 Z"
          fill="currentColor"/>
    <path d="M52 96 Q38 100 32 112 Q26 128 24 150 Q22 174 22 198
             Q22 220 24 240 Q26 258 28 268 Q32 278 36 280 Q42 282 44 276
             Q46 266 46 254 Q46 234 46 214 Q44 194 44 174"
          fill="currentColor"/>
    <path d="M148 96 Q162 100 168 112 Q174 128 176 150 Q178 174 178 198
             Q178 220 176 240 Q174 258 172 268 Q168 278 164 280 Q158 282 156 276
             Q154 266 154 254 Q154 234 154 214 Q156 194 156 174"
          fill="currentColor"/>
    <path d="M78 292 Q74 314 70 348 Q66 388 66 420 Q66 448 68 472
             Q70 484 72 492 Q76 500 84 500 Q90 498 90 492
             Q88 482 86 472 Q84 448 84 420 Q84 388 86 348 Q88 314 92 294"
          fill="currentColor"/>
    <path d="M122 292 Q126 314 130 348 Q134 388 134 420 Q134 448 132 472
             Q130 484 128 492 Q124 500 116 500 Q110 498 110 492
             Q112 482 114 472 Q116 448 116 420 Q116 388 114 348 Q112 314 108 294"
          fill="currentColor"/>
</svg>`;
}

function figure4() {
    // Frame B, slim build
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 500">
    <ellipse cx="100" cy="42" rx="22" ry="27" fill="currentColor"/>
    <rect x="92" y="67" width="16" height="18" rx="4" fill="currentColor"/>
    <path d="M68 85 Q62 86 56 92 L46 112 Q42 132 44 160 L46 198 Q48 218 52 236
             L58 256 Q64 268 76 272 L86 274 Q94 275 100 275
             Q106 275 114 274 L124 272 Q136 268 142 256
             L148 236 Q152 218 154 198 L156 160 Q158 132 154 112
             L144 92 Q138 86 132 85 Z"
          fill="currentColor"/>
    <path d="M56 92 Q44 96 38 106 Q32 120 30 140 Q28 160 28 180
             Q28 200 30 218 Q32 234 34 248 Q36 258 40 262 Q46 266 48 260
             Q50 250 50 240 Q50 220 50 200 Q48 180 48 160"
          fill="currentColor"/>
    <path d="M144 92 Q156 96 162 106 Q168 120 170 140 Q172 160 172 180
             Q172 200 170 218 Q168 234 166 248 Q164 258 160 262 Q154 266 152 260
             Q150 250 150 240 Q150 220 150 200 Q152 180 152 160"
          fill="currentColor"/>
    <path d="M76 272 Q74 292 72 322 Q68 362 68 400 Q68 432 70 460
             Q72 476 74 486 Q76 496 82 498 Q88 498 88 492
             Q86 480 84 460 Q82 432 82 400 Q82 362 84 322 Q86 292 88 274"
          fill="currentColor"/>
    <path d="M124 272 Q126 292 128 322 Q132 362 132 400 Q132 432 130 460
             Q128 476 126 486 Q124 496 118 498 Q112 498 112 492
             Q114 480 116 460 Q118 432 118 400 Q118 362 116 322 Q114 292 112 274"
          fill="currentColor"/>
</svg>`;
}

function figure5() {
    // Frame B, medium build
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 500">
    <ellipse cx="100" cy="42" rx="23" ry="27" fill="currentColor"/>
    <rect x="90" y="67" width="20" height="18" rx="5" fill="currentColor"/>
    <path d="M62 85 Q55 87 48 96 L36 118 Q32 142 34 174 L36 212 Q40 234 46 252
             L54 270 Q62 284 76 286 L88 288 Q94 289 100 289
             Q106 289 112 288 L124 286 Q138 284 146 270
             L154 252 Q160 234 164 212 L166 174 Q168 142 164 118
             L152 96 Q145 87 138 85 Z"
          fill="currentColor"/>
    <path d="M48 96 Q34 100 28 112 Q22 128 20 150 Q18 174 18 196
             Q18 218 20 236 Q22 252 24 264 Q28 274 32 276 Q38 278 40 272
             Q42 262 42 250 Q42 230 42 210 Q40 190 40 170"
          fill="currentColor"/>
    <path d="M152 96 Q166 100 172 112 Q178 128 180 150 Q182 174 182 196
             Q182 218 180 236 Q178 252 176 264 Q172 274 168 276 Q162 278 160 272
             Q158 262 158 250 Q158 230 158 210 Q160 190 160 170"
          fill="currentColor"/>
    <path d="M76 286 Q73 306 70 340 Q66 378 66 414 Q66 444 68 468
             Q70 482 72 492 Q76 500 84 500 Q90 498 90 492
             Q88 482 86 468 Q84 444 84 414 Q84 378 86 340 Q88 306 90 288"
          fill="currentColor"/>
    <path d="M124 286 Q127 306 130 340 Q134 378 134 414 Q134 444 132 468
             Q130 482 128 492 Q124 500 116 500 Q110 498 110 492
             Q112 482 114 468 Q116 444 116 414 Q116 378 114 340 Q112 306 110 288"
          fill="currentColor"/>
</svg>`;
}

function figure6() {
    // Frame B, full build
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 500">
    <ellipse cx="100" cy="42" rx="24" ry="27" fill="currentColor"/>
    <rect x="89" y="67" width="22" height="18" rx="5" fill="currentColor"/>
    <path d="M58 85 Q50 88 42 98 L28 124 Q24 152 26 186 L28 224 Q34 248 40 266
             L50 284 Q60 298 76 300 L90 302 Q96 303 100 303
             Q104 303 110 302 L124 300 Q140 298 150 284
             L160 266 Q166 248 172 224 L174 186 Q176 152 172 124
             L158 98 Q150 88 142 85 Z"
          fill="currentColor"/>
    <path d="M42 98 Q28 103 22 116 Q16 134 14 158 Q12 182 12 206
             Q12 228 14 248 Q16 264 18 274 Q22 284 26 286 Q32 288 34 282
             Q36 272 36 260 Q36 240 36 220 Q34 200 34 180"
          fill="currentColor"/>
    <path d="M158 98 Q172 103 178 116 Q184 134 186 158 Q188 182 188 206
             Q188 228 186 248 Q184 264 182 274 Q178 284 174 286 Q168 288 166 282
             Q164 272 164 260 Q164 240 164 220 Q166 200 166 180"
          fill="currentColor"/>
    <path d="M76 300 Q72 322 68 356 Q64 394 64 426 Q64 454 66 476
             Q68 488 70 494 Q74 500 82 500 Q88 498 88 492
             Q86 484 84 476 Q82 454 82 426 Q82 394 84 356 Q86 322 90 302"
          fill="currentColor"/>
    <path d="M124 300 Q128 322 132 356 Q136 394 136 426 Q136 454 134 476
             Q132 488 130 494 Q126 500 118 500 Q112 498 112 492
             Q114 484 116 476 Q118 454 118 426 Q118 394 116 356 Q114 322 110 302"
          fill="currentColor"/>
</svg>`;
}

/**
 * All silhouettes for the picker UI.
 * The backpack mount point is consistent: center-x=100, upper-back y≈105
 */
export const SILHOUETTES = [
    { id: 'fig1', label: 'Fig 1', svg: figure1, mountY: 105 },
    { id: 'fig2', label: 'Fig 2', svg: figure2, mountY: 105 },
    { id: 'fig3', label: 'Fig 3', svg: figure3, mountY: 105 },
    { id: 'fig4', label: 'Fig 4', svg: figure4, mountY: 105 },
    { id: 'fig5', label: 'Fig 5', svg: figure5, mountY: 105 },
    { id: 'fig6', label: 'Fig 6', svg: figure6, mountY: 105 },
];
