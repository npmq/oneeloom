import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import reactVite from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { AliasConfig } from './src/vite/AliasConfig'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 4000,
  },
  plugins: [reactVite(), TanStackRouterVite({})],
  resolve: {
    alias: AliasConfig,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local',
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:6]'
          : '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
        //additionalData: `@import "@styles/_variables.scss"`,
      },
    },
  },
})
