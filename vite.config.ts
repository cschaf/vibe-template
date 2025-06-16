import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
      tailwindcss(),
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
          devOptions: {
              enabled: false,
          },
          manifest: {
              name: 'Demo App',
              short_name: 'Demo App',
              description: 'A Vite + React + Typescript + Tailwind + PWA',
              theme_color: '#ffffff',
              icons: [
                  {
                      src: 'android-chrome-192x192.png',
                      sizes: '192x192',
                      type: 'image/png',
                  },
                  {
                      src: 'android-chrome-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                  },
              ],
          },
      }),
  ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
  base: "/vibe-template/", // ⚠️ WICHTIG: Ersetze 'DEIN_REPO_NAME' durch den Namen deines GitHub-Repositorys
  server: {
    open: true, // Optional: Öffnet die App automatisch im Browser bei `npm run dev`
    port: 3001, // Optional: Setzt den lokalen Entwicklungsport
  },
})