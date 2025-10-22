import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 필요한 아이콘만 개별 import (tree-shaking 최적화)
import {
  faSteam,
  faDiscord,
  faXTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

/**
 * FontAwesome 플러그인 설정
 * Tree-shaking을 위해 필요한 아이콘만 개별 import
 *
 * @param {Object} app - Vue 앱 인스턴스
 */
export function setupFontAwesome(app) {
  // 실제 사용하는 아이콘만 라이브러리에 추가
  library.add(faSteam, faDiscord, faXTwitter, faInstagram)

  // FontAwesome 컴포넌트 전역 등록
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
