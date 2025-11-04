import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import typescipts from '@vitejs/plugin-typescript'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), typescipts()],
  root: "./src",
  build: {
    outDir: "dist"
  },
})
