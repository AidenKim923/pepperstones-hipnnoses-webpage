<template>
  <div class="language-switcher">
    <button
      class="lang-button"
      :class="{ 'is-open': isOpen }"
      aria-label="Language selector"
      @click="toggleDropdown"
    >
      <span class="current-lang">{{ currentLanguage.flag }}</span>
      <span class="arrow">{{ isOpen ? '▲' : '▼' }}</span>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="lang-dropdown">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="lang-option"
          :class="{ 'is-active': lang.code === locale }"
          @click="selectLanguage(lang.code)"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          <span class="lang-name">{{ lang.name }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { saveLanguage } from '@/utils/languageDetector'

const { locale } = useI18n()

const isOpen = ref(false)

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[1]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = code => {
  locale.value = code
  saveLanguage(code)
  isOpen.value = false

  document.documentElement.lang = code
}

const closeDropdown = event => {
  if (!event.target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped lang="scss">
.language-switcher {
  position: relative;

  .lang-button {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
    background-color: $bg-elevated;
    border: $border-width solid $border-primary;
    border-radius: $border-radius-sm;
    color: $text-primary;
    font-size: $font-size-base;
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      background: $bg-hover;
      border-color: $accent-secondary;
    }

    &.is-open {
      background: $bg-hover;
      border-color: $accent-secondary;
    }

    .arrow {
      font-size: $font-size-xs;
    }
  }

  .lang-dropdown {
    position: absolute;
    top: calc(100% + $spacing-sm);
    right: 0;
    min-width: 150px;
    background-color: $bg-elevated;
    border: $border-width solid $border-primary;
    border-radius: $border-radius-md;
    box-shadow: $shadow-lg;
    overflow: hidden;
    z-index: $z-dropdown;
  }

  .lang-option {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    width: 100%;
    padding: $spacing-md;
    background-color: transparent;
    border: none;
    border-bottom: $border-width solid $border-primary;
    color: $text-primary;
    font-size: $font-size-base;
    text-align: left;
    cursor: pointer;
    transition: background-color $transition-fast;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: $bg-hover;
    }

    &.is-active {
      background-color: $accent-secondary;
      font-weight: 700;
      color: $text-primary;
    }

    .lang-flag {
      font-size: $font-size-xl;
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all $transition-base;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
