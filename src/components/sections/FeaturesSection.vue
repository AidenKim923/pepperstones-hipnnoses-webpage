<template>
  <section class="features-section section">
    <div class="container">
      <h2 id="features-title" class="section-title" data-animate>
        {{ $t('features.title') }}
      </h2>

      <div class="features-grid">
        <ComicPanel
          v-for="(feature, index) in features"
          :key="index"
          :data-animate="true"
        >
          <div class="feature-content">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </ComicPanel>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ComicPanel from '@/components/ui/ComicPanel.vue'

const { t } = useI18n()

const features = computed(() => [
  {
    icon: '🍰',
    title: t('features.recipe.title'),
    description: t('features.recipe.description'),
    effect: t('features.recipe.effect')
  },
  {
    icon: '⚔️',
    title: t('features.combat.title'),
    description: t('features.combat.description'),
    effect: t('features.combat.effect')
  },
  {
    icon: '🏪',
    title: t('features.cafe.title'),
    description: t('features.cafe.description'),
    effect: t('features.cafe.effect')
  },
  {
    icon: '📖',
    title: t('features.story.title'),
    description: t('features.story.description'),
    effect: t('features.story.effect')
  }
])
</script>

<style scoped lang="scss">
.features-section {
  background: $bg-secondary;

  .section-title {
    font-family: $font-heading;
    font-size: $font-size-5xl;
    font-weight: 700;
    text-align: center;
    margin-bottom: $spacing-4xl;
    color: $text-primary;

    @media (max-width: $breakpoint-tablet) {
      font-size: $font-size-4xl;
    }

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-3xl;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-xl;

    @media (min-width: $breakpoint-mobile) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-desktop) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .feature-content {
    text-align: center;
  }

  .feature-icon {
    font-size: $font-size-6xl;
    margin-bottom: $spacing-lg;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-5xl;
    }
  }

  .feature-title {
    font-family: $font-display;
    font-size: $font-size-xl;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $text-primary;
    margin-bottom: $spacing-md;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-lg;
    }
  }

  .feature-description {
    font-size: $font-size-base;
    line-height: 1.6;
    color: $text-secondary;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-sm;
    }
  }
}
</style>
