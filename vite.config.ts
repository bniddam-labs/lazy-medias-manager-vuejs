import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    // Library build
    return {
      plugins: [
        vue(),
        dts({
          tsconfigPath: './tsconfig.app.json',
          outDir: 'dist',
          insertTypesEntry: true,
        }),
      ],
      build: {
        cssCodeSplit: false,
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'LazyMedia',
          fileName: 'lazy-media',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            exports: 'named',
            globals: {
              vue: 'Vue',
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') return 'lazy-image.css';
              return assetInfo.name || 'asset';
            },
          },
        },
      },
    }
  }

  // Dev build
  return {
    plugins: [vue()],
  }
})
