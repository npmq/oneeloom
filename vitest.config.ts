import reactVite from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { AliasConfig } from './src/vite/AliasConfig'

export default defineConfig({
  plugins: [reactVite()],
  resolve: {
    alias: AliasConfig,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    //setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules/', 'src/**/*.d.ts', 'src/**/*.module.scss'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/**/*.d.ts', 'src/**/*.module.scss'],
    },
  },
})
