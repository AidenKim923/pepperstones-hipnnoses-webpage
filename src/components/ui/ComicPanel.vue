<template>
  <div class="comic-panel" :class="{ 'has-hover': hasHover }">
    <div class="panel-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
/**
 * 만화 스타일 패널 컴포넌트
 * 특징 카드, 정보 박스 등에 재사용
 */
const props = defineProps({
  /**
   * 호버 효과 활성화 여부
   */
  hasHover: {
    type: Boolean,
    default: true,
    validator: (value) => typeof value === 'boolean'
  },

  /**
   * 패널 변형 스타일 (향후 확장용)
   */
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'highlighted', 'muted'].includes(value)
  }
})
</script>

<style scoped lang="scss">
.comic-panel {
  position: relative;
  padding: $spacing-xl;
  background: $bg-card;
  border: $border-width solid $border-primary;
  box-shadow: $shadow-md;
  border-radius: $border-radius-lg;
  transition: all $transition-base $easing-smooth;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, $accent-primary, $accent-secondary);
    opacity: 0;
    transition: opacity $transition-base;
  }

  .panel-content {
    position: relative;
    z-index: 1;
  }

  &.has-hover {
    &:hover {
      transform: translateY(-4px);
      border-color: $border-accent;
      box-shadow: $shadow-lg, $glow-primary;

      &::before {
        opacity: 1;
      }
    }
  }

  @media (max-width: $breakpoint-mobile) {
    padding: $spacing-lg;
  }
}
</style>
