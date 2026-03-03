import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All API calls proxy to config-svc
      "/api": {
        target: "https://config-svc.app.trustgraph.ai",
        // target: "http://localhost:8080",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
