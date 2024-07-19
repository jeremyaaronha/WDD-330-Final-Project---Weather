import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/index.html',
      input: 'src/partials/header.html',
      input: 'src/partials/footer.html',
      input: 'src/login/login.html.html',
      input: 'src/register/register.html'
    },
  },
  server: {
    open: true
  }
});
