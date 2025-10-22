<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }" role="banner">
    <div class="container">
      <div class="header-content">
        <div class="header-logo">
          <a href="#" class="logo-link" aria-label="HIPS N NOSES - Home">
            <span class="logo-text">{{ $t('hero.title') }}</span>
          </a>
        </div>

        <nav
          class="header-nav"
          :class="{ 'is-open': isMobileMenuOpen }"
          role="navigation"
          aria-label="Main navigation"
        >
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            class="nav-link"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="header-actions">
          <LanguageSwitcher />
          <button
            class="mobile-menu-toggle"
            :class="{ 'is-active': isMobileMenuOpen }"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-nav"
            @click="toggleMobileMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = computed(() => [
  { id: 'features', href: '#features', label: t('features.title') },
  { id: 'characters', href: '#characters', label: t('characters.title') },
  { id: 'gameplay', href: '#gameplay', label: t('gameplay.title') },
  { id: 'info', href: '#info', label: t('gameInfo.title') }
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: $z-sticky;
  transition: all $transition-base;
  background: transparent;

  &.is-scrolled {
    background: rgba($bg-primary, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: $shadow-md;
    border-bottom: $border-width solid $border-primary;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-md 0;
  }

  .header-logo {
    z-index: $z-sticky + 1;

    .logo-link {
      text-decoration: none;
      transition: transform $transition-base;

      &:hover {
        transform: scale(1.02);
      }
    }

    .logo-text {
      font-family: $font-heading;
      font-size: $font-size-2xl;
      font-weight: 700;
      text-transform: uppercase;
      color: $text-primary;

      @media (max-width: $breakpoint-mobile) {
        font-size: $font-size-xl;
      }
    }
  }

  .header-nav {
    display: flex;
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) {
      position: fixed;
      top: 0;
      right: 0;
      width: 80%;
      max-width: 300px;
      height: 100vh;
      flex-direction: column;
      gap: 0;
      background: $bg-secondary;
      padding: $spacing-4xl $spacing-xl;
      transform: translateX(100%);
      transition: transform $transition-base;
      box-shadow: $shadow-xl;
      border-left: $border-width solid $border-primary;

      &.is-open {
        transform: translateX(0);
      }
    }

    .nav-link {
      font-family: $font-display;
      font-size: $font-size-base;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: $text-secondary;
      text-decoration: none;
      transition: color $transition-base;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: $accent-primary;
        transition: width $transition-base;
      }

      &:hover {
        color: $text-primary;

        &::after {
          width: 100%;
        }
      }

      @media (max-width: $breakpoint-tablet) {
        padding: $spacing-lg 0;
        border-bottom: $border-width solid $border-primary;
        color: $text-secondary;

        &::after {
          display: none;
        }

        &:hover {
          color: $accent-primary;
        }
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    z-index: $z-sticky + 1;
  }

  .mobile-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    width: 30px;
    height: 25px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    @media (max-width: $breakpoint-tablet) {
      display: flex;
    }

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: $text-primary;
      transition: all $transition-base;
      border-radius: $border-radius-sm;
    }

    &.is-active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
      }
    }
  }
}
</style>
