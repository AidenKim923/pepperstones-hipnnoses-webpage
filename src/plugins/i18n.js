import { createI18n } from 'vue-i18n'

// 전역 i18n 인스턴스 (다른 모듈에서 접근 가능)
let i18nInstance = null

/**
 * i18n 플러그인 설정
 * 다국어 지원을 위한 vue-i18n 초기화
 *
 * @param {String} locale - 초기 언어 설정
 * @returns {Object} - i18n 인스턴스
 */
export async function setupI18n(locale = 'en') {
  // 동적 import로 필요한 언어 파일만 로드 (code splitting)
  const messages = {}

  try {
    // 초기 언어만 먼저 로드
    const initialLocale = await import(`../locales/${locale}.json`)
    messages[locale] = initialLocale.default || initialLocale

    // fallback 언어 로드 (en)
    if (locale !== 'en') {
      const fallbackLocale = await import('../locales/en.json')
      messages.en = fallbackLocale.default || fallbackLocale
    }
  } catch (error) {
    console.error('Failed to load locale:', error)

    // fallback으로 영어 로드
    const fallbackLocale = await import('../locales/en.json')
    messages.en = fallbackLocale.default || fallbackLocale
  }

  i18nInstance = createI18n({
    legacy: false, // Composition API 사용
    locale,
    fallbackLocale: 'en',
    messages,
    globalInjection: true, // 전역 $t 함수 사용
    silentFallbackWarn: import.meta.env.PROD // 프로덕션에서는 경고 숨김
  })

  return i18nInstance
}

/**
 * i18n 인스턴스 가져오기
 * @returns {Object} - i18n 인스턴스
 */
export function getI18n() {
  return i18nInstance
}

/**
 * 언어 동적 로드
 * 언어 전환 시 필요한 언어 파일을 동적으로 로드
 *
 * @param {String} locale - 로드할 언어
 */
export async function loadLocaleMessages(locale) {
  if (!i18nInstance) {
    console.error('i18n instance not initialized')
    return
  }

  // 이미 로드된 언어는 스킵
  if (i18nInstance.global.availableLocales.includes(locale)) {
    return
  }

  try {
    const messages = await import(`../locales/${locale}.json`)
    i18nInstance.global.setLocaleMessage(locale, messages.default || messages)
  } catch (error) {
    console.error(`Failed to load locale ${locale}:`, error)
  }
}
