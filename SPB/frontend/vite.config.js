import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
// https://vite.dev/config/

export default defineConfig({
  server: {
    host: true, // This is equivalent to --host and binds to 0.0.0.0
    port: 5173, // Optional: ensure the port is 5173
  },
  plugins: [react(), tailwindcss(),


  VitePWA({
    registerType: 'autoUpdate', // automatically update SW
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'], // add your icons here
    manifest: {
      name: 'PortaBuild',
      short_name: 'PortaBuild',
      description: 'The ultimate portfolio builder for developers & designers',
      theme_color: '#0F172A',
      background_color: '#FFFFFF',
      display: 'standalone',
      orientation: 'any',
      start_url: '/',
      "icons": [
        {
          "src": "icons/icon-48x48.png",
          "sizes": "48x48",
          "type": "image/png"
        },
        {
          "src": "icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        },
        {
          "src": "icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        },
        {
          "src": "icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "icons/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },
        {
          "src": "icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
        },
        {
          "src": "icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    }

  })


  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
})
