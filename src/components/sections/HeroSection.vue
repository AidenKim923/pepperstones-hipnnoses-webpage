<template>
  <section class="hero-section">
    <div class="hero-content container">
      <div class="hero-logo" data-animate>
        <img src="@/assets/images/logo.webp" alt="HIPS N NOSES" class="logo-image" />
      </div>

      <p class="hero-catchphrase" data-animate>
        <span class="text-part1">잠 못 드는 세상 </span>
        <span class="text-part2">멜라</span>
        <span class="text-part3">만 꿈을 꾼다</span>
      </p>

      <div class="hero-cta" data-animate>
        <ComicButton size="lg" @click="scrollToGameplay">
          {{ $t('hero.cta.video') }}
        </ComicButton>
        <ComicButton size="lg" variant="secondary" @click="openSteamPage">
          {{ $t('hero.cta.wishlist') }}
        </ComicButton>
      </div>

      <div class="scroll-hint" data-animate>
        <span>{{ $t('hero.scrollHint') }}</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ComicButton from '@/components/ui/ComicButton.vue'
import { EXTERNAL_URLS, LINK_OPTIONS } from '@/constants/urls'

const scrollToGameplay = () => {
  const gameplaySection = document.querySelector('.gameplay-section')
  if (gameplaySection) {
    gameplaySection.scrollIntoView({ behavior: 'smooth' })
  }
}

const openSteamPage = () => {
  window.open(EXTERNAL_URLS.STEAM, '_blank', LINK_OPTIONS)
}
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
    background: linear-gradient(180deg, rgba($bg-primary, 0.4) 0%, rgba($bg-secondary, 0.5) 100%);
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
    margin-bottom: $spacing-2xl;
    animation: fade-in-up 0.8s $easing-smooth both;
    display: flex;
    justify-content: center;
    align-items: center;
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

  .hero-catchphrase {
    font-family: 'MitmiFont', 'Noto Sans KR', sans-serif;
    font-size: $font-size-5xl;
    font-weight: 700;
    margin-bottom: $spacing-3xl;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    animation: fade-in-up 0.8s $easing-smooth 0.2s both;

    @media (max-width: $breakpoint-tablet) {
      font-size: $font-size-4xl;
    }

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-2xl;
      padding: 0 $spacing-md;
    }

    span {
      -webkit-text-stroke: 6px #FFFFFF;
      text-stroke: 2px #FFFFFF;
      paint-order: stroke fill;
    }

    .text-part1 {
      color: #443650;
    }

    .text-part2 {
      color: #ec986a;
    }

    .text-part3 {
      color: #000000;
    }
  }

  .hero-cta {
    display: flex;
    gap: $spacing-lg;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: $spacing-4xl;
    animation: fade-in-up 0.8s $easing-smooth 0.4s both;

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
      align-items: center;
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
