import { ref } from 'vue'

/**
 * 함수 실행을 throttle하는 composable
 * 스크롤 이벤트 등 고빈도 이벤트 처리에 사용
 *
 * @param {Function} callback - throttle할 함수
 * @param {Number} delay - throttle 지연 시간 (ms)
 * @returns {Function} - throttled 함수
 */
export function useThrottle(callback, delay = 100) {
  const isThrottled = ref(false)
  let timeoutId = null

  return function throttledFunction(...args) {
    if (isThrottled.value) return

    callback.apply(this, args)
    isThrottled.value = true

    timeoutId = setTimeout(() => {
      isThrottled.value = false
    }, delay)
  }
}

/**
 * debounce 함수 (검색 입력 등에 사용)
 */
export function useDebounce(callback, delay = 300) {
  let timeoutId = null

  return function debouncedFunction(...args) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
  }
}
