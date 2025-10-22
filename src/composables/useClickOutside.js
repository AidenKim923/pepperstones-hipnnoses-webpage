import { onMounted, onUnmounted } from 'vue'

/**
 * 엘리먼트 외부 클릭을 감지하는 composable
 * 드롭다운, 모달 등에서 재사용 가능
 *
 * @param {Ref} elementRef - 감지할 엘리먼트의 ref
 * @param {Function} callback - 외부 클릭 시 실행할 콜백
 * @param {Object} options - 옵션 (exclude: 제외할 셀렉터 배열)
 */
export function useClickOutside(elementRef, callback, options = {}) {
  const { exclude = [] } = options

  const handleClick = (event) => {
    if (!elementRef.value) return

    // 클릭된 요소가 타겟 엘리먼트 내부인지 확인
    const isInside = elementRef.value.contains(event.target)

    // 제외할 엘리먼트 확인
    const isExcluded = exclude.some(selector => {
      const excludedEl = document.querySelector(selector)
      return excludedEl && excludedEl.contains(event.target)
    })

    if (!isInside && !isExcluded) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClick, true)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick, true)
  })

  return {
    handleClick
  }
}
