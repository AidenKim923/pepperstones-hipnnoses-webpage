import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from './useIntersectionObserver'

/**
 * 이미지 lazy loading을 위한 composable
 * Intersection Observer를 활용한 성능 최적화
 *
 * @param {String} src - 이미지 소스 URL
 * @param {String} placeholder - 플레이스홀더 이미지 (optional)
 * @returns {Object} - imageSrc, isLoaded, imageRef
 */
export function useLazyImage(src, placeholder = '') {
  const imageSrc = ref(placeholder)
  const isLoaded = ref(false)
  const imageRef = ref(null)

  const loadImage = () => {
    if (isLoaded.value || !src) return

    const img = new Image()
    img.src = src

    img.onload = () => {
      imageSrc.value = src
      isLoaded.value = true
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`)
      isLoaded.value = false
    }
  }

  const { observe } = useIntersectionObserver(
    { threshold: 0.01, rootMargin: '50px' },
    (entry) => {
      if (entry.isIntersecting) {
        loadImage()
      }
    }
  )

  onMounted(() => {
    if (imageRef.value) {
      observe(imageRef.value)
    }
  })

  return {
    imageSrc,
    isLoaded,
    imageRef,
    loadImage
  }
}
