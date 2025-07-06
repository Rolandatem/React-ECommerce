import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 3000, // Uses env PORT (Cloud Run) or 3000 (local)
    host: true // Needed for Docker/Cloud Run
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions'
        ]
      }
    }
  }
})