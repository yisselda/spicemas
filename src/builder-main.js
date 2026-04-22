import './css/base.css';
import './css/builder.css';

import { initRenderer, render, exportBlob } from './js/builder/renderer.js';
import { initUI } from './js/builder/ui.js';

const canvas = document.getElementById('builder-canvas');
initRenderer(canvas);
initUI(render);

// Export handlers
document.addEventListener('backpack:download', async () => {
    const blob = await exportBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spicemas-2026-backpack.png';
    a.click();
    URL.revokeObjectURL(url);
});

document.addEventListener('backpack:share', async () => {
    const blob = await exportBlob();
    const file = new File([blob], 'spicemas-2026-backpack.png', { type: 'image/png' });

    if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
            title: 'My Spicemas 2026 Backpack',
            text: 'Check out the backpack I designed for Spicemas 2026!',
            files: [file],
        });
    } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'spicemas-2026-backpack.png';
        a.click();
        URL.revokeObjectURL(url);
    }
});
