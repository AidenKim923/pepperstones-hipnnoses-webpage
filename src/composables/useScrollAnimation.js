import { onMounted } from 'vue'
import { useIntersectionObserver } from './useIntersectionObserver'
import { SCROLL_ANIMATION_CONFIG } from '@/constants/animations'

/**
 * 스크롤 애니메이션 composable
 * Intersection Observer를 활용한 성능 최적화된 스크롤 애니메이션
 *
 * @param {Object} config - 애니메이션 설정 (duration, delay, threshold 등)
 */
export function useScrollAnimation(config = {}) {
  const animationConfig = {
    ...SCROLL_ANIMATION_CONFIG,
    ...config
  }

  const initAnimationStyles = (elements) => {
    elements.forEach((el, index) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity ${animationConfig.duration}ms ease-out, transform ${animationConfig.duration}ms ease-out`
      el.style.transitionDelay = `${index * animationConfig.delay}ms`
    })
  }

  const animateElement = (entry) => {
    if (entry.isIntersecting) {
      const target = entry.target
      target.style.opacity = '1'
      target.style.transform = 'translateY(0)'

      // 애니메이션 완료 후 observer 해제 (성능 최적화)
      if (observer.value) {
        observer.value.unobserve(target)
      }
    }
  }

  const { observer, observe } = useIntersectionObserver(
    {
      threshold: animationConfig.threshold,
      rootMargin: animationConfig.rootMargin
    },
    animateElement
  )

  const initObserver = () => {
    const animateElements = document.querySelectorAll('[data-animate]')

    if (animateElements.length === 0) return

    initAnimationStyles(animateElements)
    animateElements.forEach(el => observe(el))
  }

  onMounted(() => {
    // DOM이 완전히 렌더링된 후 실행
    requestAnimationFrame(() => {
      initObserver()
    })
  })

  return {
    initObserver,
    observer
  }
}
