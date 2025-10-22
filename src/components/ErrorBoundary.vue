<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <h2 class="error-title">{{ $t('error.title') }}</h2>
      <p class="error-message">{{ $t('error.message') }}</p>
      <div class="error-actions">
        <button class="error-button" @click="handleReload">
          {{ $t('error.reload') }}
        </button>
        <button class="error-button error-button-secondary" @click="handleReset">
          {{ $t('error.reset') }}
        </button>
      </div>
      <details v-if="errorDetails" class="error-details">
        <summary>{{ $t('error.technicalDetails') }}</summary>
        <pre>{{ errorDetails }}</pre>
      </details>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const hasError = ref(false)
const errorDetails = ref(null)

// Vue 3의 onErrorCaptured 훅을 사용하여 하위 컴포넌트의 에러를 캡처
onErrorCaptured((err, instance, info) => {
  hasError.value = true
  errorDetails.value = `
Error: ${err.message}
Info: ${info}
Stack: ${err.stack}
Component: ${instance?.$options?.name || 'Unknown'}
  `.trim()

  // 에러를 콘솔에도 출력 (개발 환경에서 디버깅용)
  if (import.meta.env.DEV) {
    console.error('Error caught by ErrorBoundary:', err)
    console.error('Component info:', info)
    console.error('Instance:', instance)
  }

  // false를 반환하여 에러 전파 중지
  return false
})

const handleReload = () => {
  window.location.reload()
}

const handleReset = () => {
  hasError.value = false
  errorDetails.value = null
}
</script>

<style scoped lang="scss">
.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-primary;
  padding: $spacing-xl;
}

.error-container {
  max-width: 600px;
  background: $bg-card;
  border: $border-width solid $border-primary;
  border-radius: $border-radius-lg;
  padding: $spacing-3xl;
  box-shadow: $shadow-lg;
  text-align: center;
}

.error-icon {
  font-size: $font-size-8xl;
  margin-bottom: $spacing-lg;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.error-title {
  font-family: $font-heading;
  font-size: $font-size-3xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $spacing-md;

  @media (max-width: $breakpoint-mobile) {
    font-size: $font-size-2xl;
  }
}

.error-message {
  font-family: $font-body;
  font-size: $font-size-lg;
  color: $text-secondary;
  margin-bottom: $spacing-2xl;
  line-height: 1.6;

  @media (max-width: $breakpoint-mobile) {
    font-size: $font-size-base;
  }
}

.error-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: $spacing-xl;
}

.error-button {
  font-family: $font-display;
  font-size: $font-size-base;
  font-weight: 600;
  padding: $spacing-md $spacing-xl;
  background: $accent-primary;
  color: $color-white;
  border: none;
  border-radius: $border-radius-md;
  cursor: pointer;
  transition: all $transition-base $easing-smooth;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    background: color.adjust(#ff6b9d, $lightness: -10%);
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  &:active {
    transform: translateY(0);
  }

  &-secondary {
    background: transparent;
    color: $text-primary;
    border: $border-width solid $border-primary;

    &:hover {
      background: $bg-hover;
      border-color: $border-accent;
    }
  }
}

.error-details {
  text-align: left;
  margin-top: $spacing-xl;
  padding: $spacing-md;
  background: $bg-elevated;
  border: $border-width solid $border-secondary;
  border-radius: $border-radius-md;
  cursor: pointer;

  summary {
    font-family: $font-display;
    font-size: $font-size-sm;
    font-weight: 600;
    color: $text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: $spacing-sm;
    user-select: none;

    &:hover {
      color: $accent-primary;
    }
  }

  pre {
    font-family: 'Courier New', monospace;
    font-size: $font-size-xs;
    color: $text-muted;
    white-space: pre-wrap;
    word-break: break-all;
    margin: $spacing-md 0 0;
    padding: $spacing-md;
    background: $bg-primary;
    border-radius: $border-radius-sm;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
