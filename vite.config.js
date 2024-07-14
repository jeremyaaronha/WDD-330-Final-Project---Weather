import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Apuntar a la carpeta src
  build: {
    outDir: '../dist', // La carpeta de salida debe estar fuera de src
  },
  server: {
    open: true
  }
});
