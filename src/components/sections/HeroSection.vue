<template>
  <section class="hero-section">
    <div class="hero-content container">
      <div class="hero-logo" data-animate>
        <h1 class="game-title">
          <span class="title-main">{{ $t('hero.title') }}</span>
          <span class="title-sub">{{ $t('hero.subtitle') }}</span>
        </h1>
      </div>

      <p class="hero-catchphrase" data-animate>
        {{ $t('hero.catchphrase') }}
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
  background: linear-gradient(180deg, $bg-primary 0%, $bg-secondary 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient($border-secondary 1px, transparent 1px),
      linear-gradient(90deg, $border-secondary 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.5;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: $spacing-2xl 0;
  }

  .hero-logo {
    margin-bottom: $spacing-2xl;
    animation: fade-in-up 0.8s $easing-smooth both;
  }

  .game-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;

    .title-main {
      font-family: $font-heading;
      font-size: $font-size-8xl;
      font-weight: 700;
      line-height: 1;
      color: $text-primary;
      letter-spacing: -0.02em;

      @media (max-width: $breakpoint-tablet) {
        font-size: $font-size-6xl;
      }

      @media (max-width: $breakpoint-mobile) {
        font-size: $font-size-5xl;
      }
    }

    .title-sub {
      font-family: $font-display;
      font-size: $font-size-3xl;
      font-weight: 500;
      color: $accent-primary;
      text-transform: uppercase;
      letter-spacing: 0.1em;

      @media (max-width: $breakpoint-tablet) {
        font-size: $font-size-2xl;
      }

      @media (max-width: $breakpoint-mobile) {
        font-size: $font-size-xl;
      }
    }
  }

  .hero-catchphrase {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: 400;
    color: $text-secondary;
    margin-bottom: $spacing-3xl;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    animation: fade-in-up 0.8s $easing-smooth 0.2s both;

    @media (max-width: $breakpoint-tablet) {
      font-size: $font-size-xl;
    }

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-lg;
      padding: 0 $spacing-md;
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
