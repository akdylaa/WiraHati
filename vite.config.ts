import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        // This proxy catches requests to /api/proxy and forwards them to your real backend URL
        // This completely bypasses browser CORS restrictions during development!
        '/api/proxy': {
          target: env.VITE_WIRAHATI_API_URL || 'http://localhost',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/proxy/, '')
        }
      }
    },
  };
});
