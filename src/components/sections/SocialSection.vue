<template>
  <section class="social-section section">
    <div class="container">
      <h2 class="section-title" data-animate>
        {{ $t('social.title') }}
      </h2>
      <p class="section-subtitle" data-animate>
        {{ $t('social.subtitle') }}
      </p>

      <div class="social-grid">
        <a
          v-for="(social, index) in socialLinks"
          :key="index"
          :href="social.url"
          class="social-item"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Visit our ${social.label}`"
          :data-animate="true"
        >
          <font-awesome-icon :icon="['fab', social.icon]" class="social-icon" aria-hidden="true" />
          <span class="social-label">{{ social.label }}</span>
        </a>
      </div>

      <div class="newsletter-form" data-animate>
        <ComicPanel :has-hover="false">
          <h3 class="newsletter-title">{{ $t('social.newsletter.title') }}</h3>
          <form class="newsletter-inputs" @submit.prevent="handleSubscribe" aria-label="Newsletter subscription">
            <input
              id="newsletter-email"
              v-model="email"
              type="email"
              :placeholder="$t('social.newsletter.placeholder')"
              :aria-label="$t('social.newsletter.placeholder')"
              required
              class="email-input"
            />
            <ComicButton type="submit" :loading="isSubscribing" :aria-label="$t('social.newsletter.button')">
              {{ $t('social.newsletter.button') }}
            </ComicButton>
          </form>
        </ComicPanel>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ComicButton from '@/components/ui/ComicButton.vue'
import ComicPanel from '@/components/ui/ComicPanel.vue'
import { EXTERNAL_URLS } from '@/constants/urls'

const { t } = useI18n()

const email = ref('')
const isSubscribing = ref(false)

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

const handleSubscribe = async () => {
  isSubscribing.value = true
  setTimeout(() => {
    alert('구독해주셔서 감사합니다!')
    email.value = ''
    isSubscribing.value = false
  }, 1000)
}
</script>

<style scoped lang="scss">
.social-section {
  background: $bg-secondary;

  .section-title {
    font-family: $font-heading;
    font-size: $font-size-5xl;
    font-weight: 700;
    text-align: center;
    margin-bottom: $spacing-md;
    color: $text-primary;

    @media (max-width: $breakpoint-tablet) {
      font-size: $font-size-4xl;
    }

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-3xl;
    }
  }

  .section-subtitle {
    text-align: center;
    font-size: $font-size-lg;
    color: $text-secondary;
    margin-bottom: $spacing-4xl;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-base;
    }
  }

  .social-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-xl;
    margin-bottom: $spacing-4xl;

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-lg;
    }
  }

  .social-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-xl;
    background: $bg-card;
    color: $text-primary;
    border: $border-width solid $border-primary;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-md;
    transition: all $transition-base $easing-smooth;
    text-decoration: none;

    &:hover {
      transform: translateY(-4px);
      border-color: $border-accent;
      box-shadow: $shadow-lg, $glow-primary;

      .social-icon {
        color: $accent-primary;
      }
    }

    .social-icon {
      width: $font-size-5xl;
      height: $font-size-5xl;
      color: $text-primary;
      transition: color $transition-base;

      @media (max-width: $breakpoint-mobile) {
        width: $font-size-4xl;
        height: $font-size-4xl;
      }
    }

    .social-label {
      font-family: $font-display;
      font-size: $font-size-lg;
      font-weight: 600;
      text-transform: uppercase;
      text-align: center;

      @media (max-width: $breakpoint-mobile) {
        font-size: $font-size-base;
      }
    }
  }

  .newsletter-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .newsletter-title {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    color: $text-primary;
    margin-bottom: $spacing-lg;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-xl;
    }
  }

  .newsletter-inputs {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
    }
  }

  .email-input {
    flex: 1;
    min-width: 250px;
    padding: $spacing-md $spacing-lg;
    font-family: $font-body;
    font-size: $font-size-base;
    background: $bg-elevated;
    color: $text-primary;
    border: $border-width solid $border-primary;
    border-radius: $border-radius-md;
    transition: all $transition-base;

    &:focus {
      outline: none;
      border-color: $accent-primary;
      box-shadow: 0 0 0 3px rgba($accent-primary, 0.1);
    }

    &::placeholder {
      color: $text-muted;
    }

    @media (max-width: $breakpoint-mobile) {
      min-width: 100%;
    }
  }
}
</style>
