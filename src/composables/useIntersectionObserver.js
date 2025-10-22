import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Intersection Observer를 활용한 재사용 가능한 composable
 * 스크롤 애니메이션, lazy loading 등에 사용
 *
 * @param {Object} options - IntersectionObserver 옵션
 * @param {Function} callback - 엘리먼트가 보일 때 실행할 콜백
 * @returns {Object} - observe, unobserve 메서드와 observer 인스턴스
 */
export function useIntersectionObserver(options = {}, callback = null) {
  const observer = ref(null)

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }

  const observe = (element) => {
    if (!element || !observer.value) return
    observer.value.observe(element)
  }

  const unobserve = (element) => {
    if (!element || !observer.value) return
    observer.value.unobserve(element)
  }

  const disconnect = () => {
    if (observer.value) {
      observer.value.disconnect()
    }
  }

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (callback) {
          callback(entry)
        }
      })
    }, defaultOptions)
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    observer,
    observe,
    unobserve,
    disconnect
  }
}
