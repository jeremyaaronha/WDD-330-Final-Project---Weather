import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        header: 'src/partials/header.html',
        footer: 'src/partials/footer.html',
        login: 'src/login/login.html',
        register: 'src/register/register.html'
      },
    },
  },
  server: {
    open: true
  }
});
