/**
 * 애니메이션 타이밍 상수
 * SCSS variables와 일치하도록 관리
 */

export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 200,
  SLOW: 300,
  SLOWER: 500
}

export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 100,
  MEDIUM: 200,
  LONG: 400
}

export const EASING = {
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  LINEAR: 'linear'
}

export const SCROLL_ANIMATION_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  duration: 600,
  delay: 50
}
