import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),compression()],
  server: {
    proxy: {
      "/api": {
        target: "https://vaishnav-library-k2hr.onrender.com/"
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 2000 
  }
})
