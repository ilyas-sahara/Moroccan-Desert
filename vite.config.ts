import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (info) => {
          const name = (info.names && info.names[0]) || info.name || '';
          return name.endsWith('.css') ? 'assets/site.css' : 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
