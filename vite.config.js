import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages repo URL: https://devakumar-a.github.io/Devakumar/
  // base must match the repo name path so asset URLs resolve correctly
  base: "/Devakumar/",
})
