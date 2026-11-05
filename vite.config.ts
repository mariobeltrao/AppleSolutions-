import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Duas páginas: a inicial (/) e a de produtos (/produtos/).
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        produtos: fileURLToPath(new URL('./produtos/index.html', import.meta.url)),
      },
    },
  },
});
