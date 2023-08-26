import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Themes': path.resolve('./src/styles/themes'),
      '@Components': path.resolve('./src/components'),
      '@Pages': path.resolve('./src/pages'),
      '@Redux': path.resolve('./src/redux'),
      '@Images': path.resolve('./src/images'),
      '@Services': path.resolve('./src/services'),
      '@Interfaces': path.resolve('./src/interfaces'),
      '@Validations': path.resolve('./src/validations'),
    },
  },
  server: {
    port: 80,
    host: true,
  },
})
