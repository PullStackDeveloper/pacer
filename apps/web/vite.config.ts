import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    // 5180 em vez do padrão 5173, que costuma estar ocupado por outros projetos.
    port: 5180,
    strictPort: true,
    // Em dev, /api/* vai para a API local. Na AWS, o CloudFront faz o mesmo papel (Fase 8).
    proxy: { '/api': 'http://localhost:3000' },
  },
});
