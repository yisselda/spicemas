import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/spicemas/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                builder: resolve(__dirname, 'builder.html'),
            },
        },
    },
});
