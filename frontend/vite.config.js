import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    // origin: 'http://10.12.89.43:8080'
    host: '10.12.89.59',    
  },
  preview : {
    host: '10.12.89.59',    
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Увеличьте лимит предупреждений о размере чанка, если необходимо
  },
})
