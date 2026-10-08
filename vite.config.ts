/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 커스텀 도메인(vibedic.chichiboo.link)이 루트 경로에서 서빙되므로 base는 '/'입니다.
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // 자주 바뀌지 않는 라이브러리를 앱 코드와 나눠, 콘텐츠만 바뀐 배포에서는 브라우저 캐시를 재사용합니다.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['fuse.js', 'lucide-react'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
