import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [react(), mdx(), tsconfigPaths()],
  server: {
    port: 3000,
  },
});
