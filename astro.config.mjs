// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://copivtikal.com',
  output: 'static',
  image: {
    domains: ['images.unsplash.com'],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          // Astro islands already split code per component;
          // these hints help group vendor libs into separate files
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap';
            if (id.includes('node_modules/leaflet')) return 'leaflet';
          },
        },
      },
    },
  },
  integrations: [react()],
});
