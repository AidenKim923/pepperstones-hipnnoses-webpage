import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './plugins/i18n'
import { setupFontAwesome } from './plugins/fontawesome'
import { detectLanguage } from './utils/languageDetector'

/**
 * 애플리케이션 초기화
 * 성능 최적화를 위한 모듈화된 구조
 */
async function initializeApp() {
  const app = createApp(App)

  // 언어 감지
  const detectedLanguage = detectLanguage()

  // i18n 설정 (code splitting 적용)
  const i18n = await setupI18n(detectedLanguage)
  app.use(i18n)

  // FontAwesome 설정 (필요한 아이콘만 tree-shaking)
  setupFontAwesome(app)

  // 앱 마운트
  app.mount('#app')

  // HTML lang 속성 설정 (접근성)
  document.documentElement.lang = detectedLanguage

  // 성능 모니터링 (개발 환경에서만)
  if (import.meta.env.DEV) {
    if (window.performance && performance.getEntriesByType) {
      const perfEntries = performance.getEntriesByType('navigation')
      if (perfEntries.length > 0) {
        const navTiming = perfEntries[0]
        console.log('[Performance] DOM Content Loaded:', navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart, 'ms')
        console.log('[Performance] Page Load Time:', navTiming.loadEventEnd - navTiming.loadEventStart, 'ms')
      }
    }
  }
}

// 앱 초기화 실행
initializeApp().catch(error => {
  console.error('Failed to initialize app:', error)
})
