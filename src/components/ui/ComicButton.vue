<template>
  <button
    class="comic-button"
    :class="[variant, size, { 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span class="button-content">
      <slot />
    </span>
    <span v-if="loading" class="loading-spinner"></span>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = event => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped lang="scss">
.comic-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-display;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: none;
  background-color: $accent-primary;
  color: $color-white;
  cursor: pointer;
  transition: all $transition-base $easing-smooth;
  box-shadow: $shadow-md;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transition: left $transition-slow;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: $shadow-lg, $glow-primary;

    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: $shadow-sm;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.is-loading {
    .button-content {
      opacity: 0;
    }
  }

  .button-content {
    position: relative;
    z-index: 1;
  }

  .loading-spinner {
    position: absolute;
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-top-color: $color-white;
    border-radius: 50%;
    animation: spin-slow 0.8s linear infinite;
  }

  &.sm {
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-sm;
    border-radius: $border-radius-md;
  }

  &.md {
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-base;
    border-radius: $border-radius-md;
  }

  &.lg {
    padding: $spacing-lg $spacing-2xl;
    font-size: $font-size-lg;
    border-radius: $border-radius-lg;
  }

  &.primary {
    background: $accent-primary;
    color: $color-white;

    &:hover:not(:disabled) {
      background: color.adjust($accent-primary, $lightness: 5%);
    }
  }

  &.secondary {
    background: $bg-elevated;
    color: $text-primary;
    border: $border-width solid $border-primary;

    &:hover:not(:disabled) {
      background: $bg-hover;
      border-color: $accent-secondary;
      box-shadow: $shadow-lg, $glow-secondary;
    }
  }

  &.outline {
    background: transparent;
    color: $accent-primary;
    border: $border-width solid $accent-primary;
    box-shadow: none;

    &:hover:not(:disabled) {
      background: $accent-primary;
      color: $color-white;
      box-shadow: $glow-primary;
    }
  }
}
</style>
