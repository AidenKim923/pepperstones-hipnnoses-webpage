<template>
  <ErrorBoundary>
    <div id="app">
      <!-- Skip to main content link for accessibility -->
      <a href="#main-content" class="skip-to-content">{{ $t('accessibility.skipToContent') }}</a>

      <AppHeader />

      <main id="main-content" role="main">
        <HeroSection />

        <section id="features" aria-labelledby="features-title">
          <FeaturesSection />
        </section>

        <section id="gameplay" aria-labelledby="gameplay-title">
          <GameplaySection />
        </section>

        <SocialSection />
      </main>

      <AppFooter />
    </div>
  </ErrorBoundary>
</template>

<script setup>
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import GameplaySection from '@/components/sections/GameplaySection.vue'
import SocialSection from '@/components/sections/SocialSection.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

// 스크롤 애니메이션 초기화
useScrollAnimation()
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
