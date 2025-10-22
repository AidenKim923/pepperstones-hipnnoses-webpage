/**
 * 반응형 breakpoint 상수
 * SCSS variables와 일치하도록 관리
 */

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440
}

export const MEDIA_QUERIES = {
  MOBILE: `(max-width: ${BREAKPOINTS.MOBILE}px)`,
  TABLET: `(max-width: ${BREAKPOINTS.TABLET}px)`,
  DESKTOP: `(max-width: ${BREAKPOINTS.DESKTOP}px)`,
  WIDE: `(min-width: ${BREAKPOINTS.WIDE}px)`
}

/**
 * 현재 breakpoint 확인 유틸리티
 */
export function getCurrentBreakpoint() {
  const width = window.innerWidth

  if (width <= BREAKPOINTS.MOBILE) return 'mobile'
  if (width <= BREAKPOINTS.TABLET) return 'tablet'
  if (width <= BREAKPOINTS.DESKTOP) return 'desktop'
  return 'wide'
}

/**
 * Media Query 매칭 확인
 */
export function matchesMediaQuery(query) {
  return window.matchMedia(query).matches
}
