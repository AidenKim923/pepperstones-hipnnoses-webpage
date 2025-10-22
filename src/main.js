import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { detectLanguage } from './utils/languageDetector'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSteam,
  faDiscord,
  faXTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

library.add(faSteam, faDiscord, faXTwitter, faInstagram)

import ko from './locales/ko.json'
import en from './locales/en.json'
import ja from './locales/ja.json'

const detectedLanguage = detectLanguage()
const i18n = createI18n({
  legacy: false,
  locale: detectedLanguage,
  fallbackLocale: 'en',
  messages: {
    ko,
    en,
    ja
  }
})

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(i18n)
app.mount('#app')

document.documentElement.lang = detectedLanguage
