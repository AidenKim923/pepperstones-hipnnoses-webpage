import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer = null

  const initObserver = () => {
    const animateElements = document.querySelectorAll('[data-animate]')
    animateElements.forEach((el, index) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
      el.style.transitionDelay = `${index * 0.05}s`
    })

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, options)

    animateElements.forEach(el => observer.observe(el))
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    initObserver
  }
}
