import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(), // resolves @/ aliases
  ],
  base: mode === 'development' ? '/' : '/slick-cut-landing/',
}));
