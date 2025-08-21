import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { copyFileSync } from 'fs'

import mkcert from 'vite-plugin-mkcert'


// https://vite.dev/config/
export default defineConfig({
  base: '/poke-app-react',
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    {
      name: 'copy-404', // serves index.html even when the page is not found
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'dist/index.html'),
          resolve(__dirname, 'dist/404.html')
        )
      }
    },
    mkcert()
  ],
  server: {
    host: true, // same as 0.0.0.0
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('fontawesome')) return 'fontawesome';
            if (id.includes('react')) return 'react';
            return 'vendor';
          }
          if (id.includes('src/components')) return 'components';
        }
      }
    }
  }
})
