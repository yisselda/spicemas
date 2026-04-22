/**
 * Builder step wizard UI.
 * Renders step content into the bottom sheet based on current state.
 */

import { getState, setState, addZoneLayer, removeZoneLayer, setZoneLayer } from './state.js';
import { FRAMES } from './frames.js';
import { FEATHER_COLORS, getFeatherUrl } from './feathers.js';
import { metallicPalette } from './palette.js';

const stepContent = document.getElementById('step-content');
const stepTitle = document.getElementById('step-title');
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const dots = document.querySelectorAll('.step-dot');

const STEP_TITLES = [
    '', // 0-indexed padding
    'Choose Backpack Shape',
    'Design Your Wings',
    'Add Accents',
    'Preview & Share',
];

export function initUI(onRender) {
    btnNext.addEventListener('click', () => {
        const s = getState();
        if (s.step < 4) {
            setState({ step: s.step + 1 });
            renderStep(onRender);
        }
    });

    btnBack.addEventListener('click', () => {
        const s = getState();
        if (s.step > 1) {
            setState({ step: s.step - 1 });
            renderStep(onRender);
        }
    });

    renderStep(onRender);
}

export function renderStep(onRender) {
    const s = getState();
    const step = s.step;

    // Update dots
    dots.forEach((dot, i) => {
        const n = i + 1;
        dot.classList.toggle('active', n === step);
        dot.classList.toggle('completed', n < step);
    });

    // Update title
    stepTitle.textContent = STEP_TITLES[step];

    // Update nav buttons
    btnBack.disabled = step === 1;
    if (step === 4) {
        btnNext.textContent = 'Share';
        btnNext.className = 'btn btn-share';
    } else {
        btnNext.textContent = 'Next';
        btnNext.className = 'btn btn-next';
    }

    // Render step content
    switch (step) {
        case 1: renderFrameStep(onRender); break;
        case 2: renderZoneStep(onRender); break;
        case 3: renderAccentStep(onRender); break;
        case 4: renderPreviewStep(onRender); break;
    }

    onRender();
}

// ===== Step 1: Frame =====
function renderFrameStep(onRender) {
    const s = getState();

    let html = '<div class="selection-grid" style="grid-template-columns:repeat(2,1fr)">';
    for (const frame of FRAMES) {
        const selected = s.frameId === frame.id ? 'selected' : '';
        html += `<button class="selection-item ${selected}" data-frame="${frame.id}"
                    style="aspect-ratio:auto; padding:0.75rem">
            <div style="text-align:center">
                <div style="font-size:2rem; margin-bottom:0.3rem">${getFrameIcon(frame.id)}</div>
                <div class="item-label" style="font-size:0.7rem; color:var(--white-soft)">${frame.name}</div>
            </div>
        </button>`;
    }
    html += '</div>';

    stepContent.innerHTML = html;

    stepContent.querySelectorAll('[data-frame]').forEach(btn => {
        btn.addEventListener('click', () => {
            setState({ frameId: btn.dataset.frame });
            renderFrameStep(onRender);
            onRender();
        });
    });
}

function getFrameIcon(id) {
    const icons = {
        fan: `<svg viewBox="0 0 60 50" width="48" height="40"><path d="M30 45 L5 10 Q30 0 55 10 Z" fill="none" stroke="var(--white-soft)" stroke-width="1.5"/></svg>`,
        butterfly: `<svg viewBox="0 0 60 50" width="48" height="40"><path d="M30 45 Q10 30 5 15 Q15 5 30 10 Q45 5 55 15 Q50 30 30 45Z" fill="none" stroke="var(--white-soft)" stroke-width="1.5"/></svg>`,
        spreadWing: `<svg viewBox="0 0 60 50" width="48" height="40"><path d="M30 45 L3 5 Q30 12 57 5 Z" fill="none" stroke="var(--white-soft)" stroke-width="1.5"/></svg>`,
        tallPlume: `<svg viewBox="0 0 60 60" width="48" height="48"><path d="M30 55 L22 5 Q30 0 38 5 Z M30 55 L8 25 Q12 20 18 22Z M30 55 L52 25 Q48 20 42 22Z" fill="none" stroke="var(--white-soft)" stroke-width="1.5"/></svg>`,
    };
    return icons[id] || '';
}

// ===== Step 2: Zones =====
function renderZoneStep(onRender) {
    const s = getState();
    const zone = s.activeZone;
    const layers = s.zones[zone];

    // Zone tabs
    let html = '<div class="zone-tabs">';
    for (const z of ['top', 'middle', 'sides']) {
        const active = zone === z ? 'active' : '';
        const count = s.zones[z].length;
        html += `<button class="zone-tab ${active}" data-zone="${z}">
            ${z.charAt(0).toUpperCase() + z.slice(1)}${count ? ` (${count})` : ''}
        </button>`;
    }
    html += '</div>';

    // Existing layers
    if (layers.length > 0) {
        html += '<div class="layer-stack">';
        layers.forEach((layer, i) => {
            const color = FEATHER_COLORS.find(c => c.id === layer.featherColor);
            html += `<div class="layer-item${i === layers.length - 1 ? ' layer-active' : ''}" data-select-layer="${i}">
                <img class="layer-thumb" src="${getFeatherUrl(layer.featherColor)}"
                     alt="${color?.name || layer.featherColor}" width="24" height="36">
                <span class="layer-name">${color?.name || layer.featherColor}</span>
                <button class="layer-remove" data-remove="${i}" aria-label="Remove layer">&times;</button>
            </div>`;
        });
        html += '</div>';
    }

    // Add layer button
    html += `<button class="btn-add-layer" id="btn-add-layer">+ Add Feather Layer</button>`;

    // If there are layers, show controls for the last one
    if (layers.length > 0) {
        const activeIdx = layers.length - 1;
        const activeLayer = layers[activeIdx];
        html += renderLayerControls(activeLayer, activeIdx);
    }

    stepContent.innerHTML = html;

    // Bind zone tabs
    stepContent.querySelectorAll('[data-zone]').forEach(btn => {
        btn.addEventListener('click', () => {
            setState({ activeZone: btn.dataset.zone });
            renderZoneStep(onRender);
        });
    });

    // Bind remove buttons
    stepContent.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeZoneLayer(zone, parseInt(btn.dataset.remove));
            renderZoneStep(onRender);
            onRender();
        });
    });

    // Bind add layer
    const addBtn = document.getElementById('btn-add-layer');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            addZoneLayer(zone, {});
            renderZoneStep(onRender);
            onRender();
        });
    }

    // Bind layer controls
    bindLayerControls(zone, layers.length - 1, onRender);
}

function renderLayerControls(layer, index) {
    let html = '<div style="margin-top:0.75rem">';

    // Feather color picker — thumbnail grid
    html += '<div class="feather-color-grid">';
    for (const fc of FEATHER_COLORS) {
        const selected = layer.featherColor === fc.id ? 'selected' : '';
        html += `<button class="feather-color-option ${selected}" data-feather-color="${fc.id}"
                    title="${fc.name}">
            <img src="${getFeatherUrl(fc.id)}" alt="${fc.name}" loading="lazy">
        </button>`;
    }
    html += '</div>';

    // Sliders
    html += `<div class="slider-group">
        <div class="slider-row">
            <span class="slider-label">Spread</span>
            <input type="range" min="0.2" max="1" step="0.05" value="${layer.spread}" data-slider="spread">
        </div>
        <div class="slider-row">
            <span class="slider-label">Height</span>
            <input type="range" min="0.3" max="1" step="0.05" value="${layer.height}" data-slider="height">
        </div>
        <div class="slider-row">
            <span class="slider-label">Density</span>
            <input type="range" min="0.3" max="1.5" step="0.1" value="${layer.density}" data-slider="density">
        </div>
    </div>`;

    html += '</div>';
    return html;
}

function bindLayerControls(zone, index, onRender) {
    if (index < 0) return;

    // Feather color selection
    stepContent.querySelectorAll('[data-feather-color]').forEach(btn => {
        btn.addEventListener('click', () => {
            setZoneLayer(zone, index, { featherColor: btn.dataset.featherColor });
            renderZoneStep(onRender);
            onRender();
        });
    });

    // Sliders
    stepContent.querySelectorAll('[data-slider]').forEach(input => {
        input.addEventListener('input', () => {
            setZoneLayer(zone, index, { [input.dataset.slider]: parseFloat(input.value) });
            onRender();
        });
    });
}

// ===== Step 3: Accents =====
function renderAccentStep(onRender) {
    const s = getState();

    let html = '<div style="display:flex;flex-direction:column;gap:0.75rem">';

    // Toggle gems
    html += `<label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
        <input type="checkbox" id="gem-toggle" ${s.gems.enabled ? 'checked' : ''}
            style="width:1.2rem;height:1.2rem;accent-color:var(--warm-gold)">
        <span style="font-size:0.8rem;color:var(--white-soft)">Add gems along spine</span>
    </label>`;

    if (s.gems.enabled) {
        html += `<div class="palette-section">`;
        html += `<div class="palette-label">Gem Color</div>`;
        html += `<div class="palette-grid">`;
        for (const c of metallicPalette) {
            const selected = s.gems.color === c.hex ? 'selected' : '';
            html += `<button class="palette-swatch ${selected}"
                style="background:${c.hex}" data-gem-color="${c.hex}"></button>`;
        }
        // Add a few vibrant gem colors
        const gemColors = [
            { hex: '#E8175D', name: 'Ruby' },
            { hex: '#00D4AA', name: 'Emerald' },
            { hex: '#38BDF8', name: 'Sapphire' },
            { hex: '#A855F7', name: 'Amethyst' },
            { hex: '#FFFFFF', name: 'Diamond' },
        ];
        for (const c of gemColors) {
            const selected = s.gems.color === c.hex ? 'selected' : '';
            html += `<button class="palette-swatch ${selected}"
                style="background:${c.hex}" data-gem-color="${c.hex}"></button>`;
        }
        html += `</div></div>`;
    }

    html += '</div>';
    stepContent.innerHTML = html;

    // Bind toggle
    const toggle = document.getElementById('gem-toggle');
    if (toggle) {
        toggle.addEventListener('change', () => {
            setState({ gems: { ...s.gems, enabled: toggle.checked } });
            renderAccentStep(onRender);
            onRender();
        });
    }

    // Bind gem colors
    stepContent.querySelectorAll('[data-gem-color]').forEach(btn => {
        btn.addEventListener('click', () => {
            setState({ gems: { ...s.gems, color: btn.dataset.gemColor } });
            renderAccentStep(onRender);
            onRender();
        });
    });
}

// ===== Step 4: Preview & Share =====
function renderPreviewStep(onRender) {
    let html = `<div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem 0">
        <p style="font-size:0.8rem;color:var(--white-soft);text-align:center">
            Your backpack is ready! Share it or download the image.
        </p>
    </div>`;

    stepContent.innerHTML = html;

    // Change nav buttons for share step
    const nav = document.querySelector('.step-nav');
    nav.innerHTML = `
        <button class="btn btn-back" id="btn-back">Back</button>
        <button class="btn btn-download" id="btn-download">Download</button>
        <button class="btn btn-share" id="btn-share">Share</button>
    `;

    // Re-bind back
    document.getElementById('btn-back').addEventListener('click', () => {
        const s = getState();
        setState({ step: s.step - 1 });
        // Restore normal nav
        nav.innerHTML = `
            <button class="btn btn-back" id="btn-back">Back</button>
            <button class="btn btn-next" id="btn-next">Next</button>
        `;
        initUI(onRender);
    });

    // Download & share are bound by builder-main
    document.getElementById('btn-download')?.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('backpack:download'));
    });

    document.getElementById('btn-share')?.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('backpack:share'));
    });
}
