import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/poke-app-react',
  plugins: [react()],
  server: {
    host: true, // same as 0.0.0.0
  },
})
