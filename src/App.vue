<template>
  <ErrorBoundary>
    <div id="app">
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
import { useScrollAnimation } from '@/composables/useScrollAnimation'

useScrollAnimation()
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
