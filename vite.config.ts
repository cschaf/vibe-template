import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [    tailwindcss(), react()],
  base: "/vibe-template/", // ⚠️ WICHTIG: Ersetze 'DEIN_REPO_NAME' durch den Namen deines GitHub-Repositorys
  server: {
    open: true, // Optional: Öffnet die App automatisch im Browser bei `npm run dev`
    port: 3001, // Optional: Setzt den lokalen Entwicklungsport
  },
})