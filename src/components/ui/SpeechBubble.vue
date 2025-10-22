<template>
  <div class="speech-bubble" :class="[direction, variant]">
    <div class="bubble-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    default: 'bottom-left',
    validator: value =>
      ['bottom-left', 'bottom-right', 'top-left', 'top-right'].includes(value)
  },
  variant: {
    type: String,
    default: 'white',
    validator: value => ['white', 'yellow', 'red'].includes(value)
  }
})
</script>

<style scoped lang="scss">
.speech-bubble {
  position: relative;
  display: inline-block;
  padding: $spacing-md $spacing-lg;
  border: none;
  border-radius: $border-radius-xl;
  box-shadow: $shadow-soft-md;

  .bubble-content {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
  }

  &.bottom-left {
    &::after {
      bottom: -25px;
      left: 25px;
    }
  }

  &.bottom-right {
    &::after {
      bottom: -25px;
      right: 25px;
    }
  }

  &.top-left {
    &::after {
      top: -25px;
      left: 25px;
    }
  }

  &.top-right {
    &::after {
      top: -25px;
      right: 25px;
    }
  }

  &.white {
    background-color: $color-white;
    color: $color-text;

    &.bottom-left::after,
    &.bottom-right::after {
      border-top-color: $color-white;
    }

    &.top-left::after,
    &.top-right::after {
      border-bottom-color: $color-white;
    }
  }

  &.yellow {
    background: linear-gradient(
      135deg,
      $accent-star 0%,
      lighten($accent-star, 5%) 100%
    );
    color: $color-text;

    &.bottom-left::after,
    &.bottom-right::after {
      border-top-color: $accent-star;
    }

    &.top-left::after,
    &.top-right::after {
      border-bottom-color: $accent-star;
    }
  }

  &.red {
    background: linear-gradient(
      135deg,
      $primary-pink 0%,
      lighten($primary-pink, 5%) 100%
    );
    color: $color-white;

    &.bottom-left::after,
    &.bottom-right::after {
      border-top-color: $primary-pink;
    }

    &.top-left::after,
    &.top-right::after {
      border-bottom-color: $primary-pink;
    }
  }
}
</style>
