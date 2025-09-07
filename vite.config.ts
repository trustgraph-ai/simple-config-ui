import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/socket": {
        target: "ws://localhost:8088/",
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: () => "/api/v1/socket",
      },
      "/api/versions": {
        target: "https://config-ui.demo.trustgraph.ai/",
        changeOrigin: true,
        secure: false,
      },
      "/api/build/versions": {
        target: "https://config-ui.demo.trustgraph.ai/",
        changeOrigin: true,
        secure: false,
        rewrite: () => "/api/versions",
      },
      "/api/build/generate": {
        target: "https://config-ui.demo.trustgraph.ai/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/build/, "/api"),
      },
    },
  },
})
