import path from 'path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    resolve: {
      alias: {
        api: path.resolve(__dirname, 'src/api'),
        pages: path.resolve(__dirname, 'src/pages'),
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'named',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
        exclude: '**/components/Marker/images/**/*.svg',
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
  }
})
