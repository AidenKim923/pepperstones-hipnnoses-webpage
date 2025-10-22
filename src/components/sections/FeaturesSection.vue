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
            <div class="feature-icon">
              <img v-if="feature.icon" :src="feature.icon" :alt="feature.title" />
              <div v-else class="icon-placeholder">🏪</div>
            </div>
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

import recipeIcon from '@/assets/images/recipe.webp'
import combatIcon from '@/assets/images/combat.webp'
import storyIcon from '@/assets/images/story.webp'
import cafeIcon from '@/assets/images/Cafe.webp'

const features = computed(() => [
  {
    icon: recipeIcon,
    title: t('features.recipe.title'),
    description: t('features.recipe.description'),
    effect: t('features.recipe.effect')
  },
  {
    icon: combatIcon,
    title: t('features.combat.title'),
    description: t('features.combat.description'),
    effect: t('features.combat.effect')
  },
  {
    icon: cafeIcon,
    title: t('features.cafe.title'),
    description: t('features.cafe.description'),
    effect: t('features.cafe.effect')
  },
  {
    icon: storyIcon,
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
    margin-bottom: $spacing-lg;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      object-fit: contain;

      @media (max-width: $breakpoint-mobile) {
        width: 100px;
        height: 100px;
      }
    }

    .icon-placeholder {
      font-size: $font-size-6xl;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: $breakpoint-mobile) {
        font-size: $font-size-5xl;
        width: 100px;
        height: 100px;
      }
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
