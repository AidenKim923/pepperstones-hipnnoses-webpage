export function detectLanguage() {
  const savedLang = localStorage.getItem('preferredLanguage')
  if (savedLang && ['ko', 'ja', 'en'].includes(savedLang)) {
    return savedLang
  }

  const browserLang = navigator.language || navigator.languages?.[0]

  if (!browserLang) {
    return 'en'
  }

  const langCode = browserLang.toLowerCase()

  if (langCode.startsWith('ko')) {
    return 'ko'
  }

  if (langCode.startsWith('ja')) {
    return 'ja'
  }

  return 'en'
}

export function saveLanguage(lang) {
  if (['ko', 'ja', 'en'].includes(lang)) {
    localStorage.setItem('preferredLanguage', lang)
  }
}
