import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Build/generate endpoint
      "/api/generate": {
        target: "https://config-ui.demo.trustgraph.ai",
        changeOrigin: true,
        secure: true,
      },
      // Config resources (dialog-flow, config-prepare, docs-manifest, docs)
      "/api": {
        target: "https://config-svc.app.trustgraph.ai",
//          target: "http://localhost:8080",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
