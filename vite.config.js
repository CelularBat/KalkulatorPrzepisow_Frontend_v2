import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  server: {
    proxy: { // to use cross-site cookies on localhost without https!
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,               
       
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@re': path.resolve(__dirname, 'src/SCSS_Lib/reusables'), 
      '@effects': path.resolve(__dirname, 'src/SCSS_Lib/effects'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
      '@layouts': path.resolve(__dirname, 'src/Layouts'),
      '@zustand': path.resolve(__dirname, 'src/zustand'),
      '@utils': path.resolve(__dirname, 'src/Utils'),

    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/_variables' as *;`
      }
    }
  }

})