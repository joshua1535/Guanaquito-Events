import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Guanaco-Tickets/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/tailwind.css";`,
      },
    },
  },
  resolve: {
    alias: {
      '@material-tailwind/react': resolve(__dirname, 'node_modules/@material-tailwind/react'),
    },
  },
});