<template>
  <section class="hero-section">
    <div class="hero-content container">
      <div class="hero-logo" data-animate>
        <img
          src="@/assets/images/logo.webp"
          alt="HIPS N NOSES"
          class="logo-image"
          width="600"
          height="auto"
          fetchpriority="high"
        />
      </div>

      <div class="social-links-compact" data-animate>
        <a
          v-for="(social, index) in socialLinks"
          :key="index"
          :href="social.url"
          class="social-link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Visit our ${social.label}`"
        >
          <font-awesome-icon :icon="['fab', social.icon]" class="social-icon" />
        </a>
      </div>

      <div class="scroll-hint" data-animate>
        <span>{{ $t('hero.scrollHint') }}</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { EXTERNAL_URLS } from '@/constants/urls'

const { t } = useI18n()

/**
 * 소셜 링크 데이터
 * computed를 사용하여 언어 변경 시 자동 업데이트
 */
const socialLinks = computed(() => [
  {
    icon: 'steam',
    label: t('social.steam'),
    url: EXTERNAL_URLS.STEAM
  },
  {
    icon: 'discord',
    label: t('social.discord'),
    url: EXTERNAL_URLS.DISCORD
  },
  {
    icon: 'x-twitter',
    label: t('social.x'),
    url: EXTERNAL_URLS.TWITTER
  },
  {
    icon: 'instagram',
    label: t('social.instagram'),
    url: EXTERNAL_URLS.INSTAGRAM
  }
])

/**
 * 배경 이미지 preload
 * LCP(Largest Contentful Paint) 최적화
 */
const isBackgroundLoaded = ref(false)

onMounted(() => {
  // 배경 이미지 preload
  const bgImage = new Image()
  bgImage.src = new URL('@/assets/images/background.webp', import.meta.url).href
  bgImage.onload = () => {
    isBackgroundLoaded.value = true
  }
})
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: url('@/assets/images/background.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: $breakpoint-mobile) {
    background-size: auto 100%;
    background-position: center center;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba($bg-primary, 0.2) 0%, rgba($bg-secondary, 0.3) 100%);
    pointer-events: none;

    @media (max-width: $breakpoint-mobile) {
      background: linear-gradient(180deg, rgba($bg-primary, 0.2) 0%, rgba($bg-secondary, 0.3) 100%);
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: $spacing-2xl 0;

    @media (max-width: $breakpoint-mobile) {
      padding-top: 25vh;
    }
  }

  .hero-logo {
    margin-top: calc(#{$spacing-5xl} + 100px);
    margin-bottom: $spacing-2xl;
    animation: fade-in-up 0.8s $easing-smooth both;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: $breakpoint-mobile) {
      margin-top: $spacing-3xl;
    }
  }

  .logo-image {
    max-width: 600px;
    width: 100%;
    height: auto;
    animation: float 3s ease-in-out infinite;
    display: block;

    @media (max-width: $breakpoint-tablet) {
      max-width: 450px;
    }

    @media (max-width: $breakpoint-mobile) {
      max-width: 300px;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .social-links-compact {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-xl;
    margin-bottom: $spacing-3xl;
    animation: fade-in-up 0.8s $easing-smooth 0.4s both;

    @media (max-width: $breakpoint-mobile) {
      gap: $spacing-lg;
      margin-bottom: $spacing-2xl;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      background: rgba($bg-card, 0.95);
      border: 2px solid rgba($text-primary, 0.3);
      border-radius: $border-radius-lg;
      color: $text-primary;
      transition: all $transition-base $easing-smooth;
      text-decoration: none;
      backdrop-filter: blur(10px);
      box-shadow: $shadow-md;

      @media (max-width: $breakpoint-mobile) {
        width: 52px;
        height: 52px;
      }

      &:hover {
        background: $bg-elevated;
        border-color: $accent-primary;
        transform: translateY(-4px) scale(1.05);
        box-shadow: $shadow-lg, $glow-primary;

        .social-icon {
          color: $accent-primary;
        }
      }

      .social-icon {
        width: 32px;
        height: 32px;
        color: $text-primary;
        transition: color $transition-base;

        @media (max-width: $breakpoint-mobile) {
          width: 26px;
          height: 26px;
        }
      }
    }
  }

  .scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
    color: $text-muted;
    font-family: $font-display;
    font-size: $font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    animation: fade-in 0.8s $easing-smooth 0.8s both;

    .scroll-arrow {
      font-size: $font-size-2xl;
      animation: float 2s ease-in-out infinite;
      color: $accent-primary;
    }
  }
}
</style>
