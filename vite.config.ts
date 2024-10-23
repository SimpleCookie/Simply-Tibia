import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: {
      port: 3000,
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  build: {
    outDir: 'dist',
  },
})
