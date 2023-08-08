import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Themes': path.resolve(__dirname, 'src/styles/themes'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Redux': path.resolve(__dirname, 'src/redux'),
      '@Images': path.resolve(__dirname, 'src/images'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@Validations': path.resolve(__dirname, 'src/validations'),
    },
  },
  server: {
    port: 80,
    host: true,
  },
})
