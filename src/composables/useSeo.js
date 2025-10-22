import { watch } from 'vue'

/**
 * SEO 메타 태그 관리 composable
 * 페이지별 메타 태그 동적 설정
 *
 * @param {Object} metaData - 메타 태그 데이터
 */
export function useSeo(metaData) {
  const updateMetaTag = (name, content, property = false) => {
    if (!content) return

    const attribute = property ? 'property' : 'name'
    let element = document.querySelector(`meta[${attribute}="${name}"]`)

    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      document.head.appendChild(element)
    }

    element.setAttribute('content', content)
  }

  const updateTitle = (title) => {
    if (title) {
      document.title = title
    }
  }

  const updateMeta = (data) => {
    const {
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      ogType = 'website',
      twitterCard = 'summary_large_image',
      twitterTitle,
      twitterDescription,
      canonical
    } = data

    // 기본 메타 태그
    updateTitle(title)
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)

    // Open Graph
    updateMetaTag('og:title', ogTitle || title, true)
    updateMetaTag('og:description', ogDescription || description, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:type', ogType, true)

    // Twitter Card
    updateMetaTag('twitter:card', twitterCard)
    updateMetaTag('twitter:title', twitterTitle || title)
    updateMetaTag('twitter:description', twitterDescription || description)

    // Canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]')
      if (!linkElement) {
        linkElement = document.createElement('link')
        linkElement.setAttribute('rel', 'canonical')
        document.head.appendChild(linkElement)
      }
      linkElement.setAttribute('href', canonical)
    }
  }

  // 초기 메타 태그 설정
  if (metaData) {
    updateMeta(metaData)
  }

  // 반응형 메타 데이터 업데이트
  watch(
    () => metaData,
    (newData) => {
      if (newData) {
        updateMeta(newData)
      }
    },
    { deep: true, immediate: true }
  )

  return {
    updateMeta,
    updateTitle,
    updateMetaTag
  }
}
