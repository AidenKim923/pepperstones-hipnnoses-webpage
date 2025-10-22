import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue({
      // Vue 컴파일러 최적화
      template: {
        compilerOptions: {
          // 프로덕션 모드에서 주석 제거
          comments: false
        }
      }
    }),
    // 빌드 번들 분석 플러그인 (ANALYZE=true 환경변수로 활성화)
    visualizer({
      filename: './dist/stats.html',
      open: process.env.ANALYZE === 'true',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        // 청크 분리 전략 개선
        manualChunks: (id) => {
          // Vue 코어 라이브러리
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vue-vendor'
          }

          // i18n 관련
          if (id.includes('node_modules/vue-i18n') || id.includes('node_modules/@intlify')) {
            return 'i18n-vendor'
          }

          // FontAwesome
          if (id.includes('node_modules/@fortawesome')) {
            return 'fontawesome-vendor'
          }

          // locale 파일들은 개별 청크로
          if (id.includes('/locales/')) {
            const match = id.match(/\/locales\/(\w+)\.json/)
            if (match) {
              return `locale-${match[1]}`
            }
          }
        },
        // 파일명 최적화
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]

          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]'
          } else if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    // CSS 코드 분리
    cssCodeSplit: true,
    // 압축 크기 리포트
    reportCompressedSize: true,
    // 청크 크기 경고 임계값
    chunkSizeWarningLimit: 500,
    // 소스맵 설정 (프로덕션에서는 비활성화)
    sourcemap: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:color";
@import "@/assets/styles/variables.scss";`
      }
    },
    // CSS 최적화
    devSourcemap: true
  },
  // 서버 최적화
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    cors: true
  },
  // 미리보기 서버 설정
  preview: {
    port: 4173,
    strictPort: false,
    open: true
  },
  // 최적화 옵션
  optimizeDeps: {
    include: ['vue', 'vue-i18n'],
    exclude: []
  }
})
