import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/lansh-3d-portfolio/',
  plugins: [react()],
})
