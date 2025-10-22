<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">{{ $t('hero.title') }}</h3>
          <p class="footer-tagline">{{ $t('hero.catchphrase') }}</p>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">{{ $t('footer.language') }}</h4>
          <div class="footer-lang">
            <button
              v-for="lang in languages"
              :key="lang.code"
              class="lang-button"
              :class="{ 'is-active': lang.code === locale }"
              @click="changeLanguage(lang.code)"
            >
              {{ lang.flag }} {{ lang.name }}
            </button>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">{{ $t('footer.rights') }}</p>
        <div class="footer-badges">
          <span class="badge">G-STAR 2025</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { saveLanguage } from '@/utils/languageDetector'

const { locale } = useI18n()

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
]

const changeLanguage = code => {
  locale.value = code
  saveLanguage(code)
  document.documentElement.lang = code
}
</script>

<style scoped lang="scss">
.app-footer {
  background: $bg-secondary;
  border-top: $border-width solid $border-primary;
  color: $text-primary;
  padding: $spacing-4xl 0 $spacing-xl;

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-3xl;
    margin-bottom: $spacing-3xl;
    padding-bottom: $spacing-3xl;
    border-bottom: $border-width solid $border-primary;

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-2xl;
    }
  }

  .footer-section {
    .footer-title {
      font-family: $font-heading;
      font-size: $font-size-3xl;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: $spacing-md;
      text-transform: uppercase;
    }

    .footer-tagline {
      font-size: $font-size-sm;
      color: $text-secondary;
      line-height: 1.6;
    }

    .footer-heading {
      font-family: $font-display;
      font-size: $font-size-lg;
      font-weight: 600;
      text-transform: uppercase;
      color: $text-primary;
      margin-bottom: $spacing-md;
    }
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;

    .footer-link {
      color: $text-secondary;
      text-decoration: none;
      font-size: $font-size-sm;
      transition: color $transition-base;

      &:hover {
        color: $accent-primary;
      }
    }
  }

  .footer-lang {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;

    .lang-button {
      padding: $spacing-sm $spacing-md;
      background: transparent;
      border: $border-width solid $border-primary;
      border-radius: $border-radius-md;
      color: $text-secondary;
      font-size: $font-size-sm;
      text-align: left;
      cursor: pointer;
      transition: all $transition-base;

      &:hover {
        border-color: $accent-primary;
        color: $text-primary;
        background: rgba($accent-primary, 0.1);
      }

      &.is-active {
        background: $accent-primary;
        border-color: $accent-primary;
        color: $color-white;
        font-weight: 600;
      }
    }
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: $spacing-md;

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
      text-align: center;
    }

    .copyright {
      font-size: $font-size-sm;
      color: $text-muted;
    }

    .footer-badges {
      display: flex;
      gap: $spacing-md;

      .badge {
        padding: $spacing-xs $spacing-md;
        font-family: $font-display;
        font-size: $font-size-sm;
        font-weight: 600;
        background: $accent-primary;
        color: $color-white;
        border-radius: $border-radius-full;
        text-transform: uppercase;
        box-shadow: $glow-primary;
      }
    }
  }
}
</style>
