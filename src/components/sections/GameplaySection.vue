<template>
  <section class="gameplay-section section">
    <div class="container">
      <h2 id="gameplay-title" class="section-title" data-animate>
        {{ $t('gameplay.title') }}
      </h2>
      <p class="section-subtitle" data-animate>
        {{ $t('gameplay.subtitle') }}
      </p>

      <div class="gameplay-content">
        <div class="video-wrapper" data-animate>
          <div class="video-placeholder">
            <iframe
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              "
              src="https://www.youtube.com/embed/w7rcEfJT9vc"
              title="HIPS N NOSES - Official Gameplay Trailer"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
              aria-label="HIPS N NOSES gameplay trailer video"
            ></iframe>
          </div>
        </div>

        <div class="screenshots-grid">
          <div
            v-for="video in steamVideos"
            :key="video.id"
            class="screenshot-item"
            :data-animate="true"
          >
            <video
              :src="video.url"
              controls
              muted
              loop
              playsinline
              preload="metadata"
              class="screenshot-placeholder"
              :aria-label="$t(video.descKey)"
            >
              <!-- fallback 메시지 -->
              <p>{{ $t('error.videoNotSupported', 'Your browser does not support video playback.') }}</p>
            </video>
            <div class="video-description">
              <p>{{ $t(video.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/**
 * Steam 비디오 갤러리 데이터
 * CDN에서 호스팅되는 WebM 비디오
 */
const steamVideos = [
  {
    id: 'video-1',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3574200/extras/12e86ef46d00f31168d3ee9b0545e02e.webm?t=1758499452',
    descKey: 'gameplay.videos.desc1',
    thumbnail: null // 필요시 썸네일 추가
  },
  {
    id: 'video-2',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3574200/extras/b039d53db7e8cf6f194624be12091b86.webm?t=1758499452',
    descKey: 'gameplay.videos.desc2',
    thumbnail: null
  },
  {
    id: 'video-3',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3574200/extras/35b319f3ae3625917730ee3812d2f812.webm?t=1758499452',
    descKey: 'gameplay.videos.desc3',
    thumbnail: null
  },
  {
    id: 'video-4',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3574200/extras/a8a9e34e570f27f52b8973c2623c9f7d.webm?t=1758499452',
    descKey: 'gameplay.videos.desc4',
    thumbnail: null
  }
]
</script>

<style scoped lang="scss">
.gameplay-section {
  background: $bg-primary;

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

  .gameplay-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .video-wrapper {
    margin-bottom: $spacing-3xl;
    border-radius: $border-radius-lg;
    overflow: hidden;
    background: $bg-card;
    border: $border-width solid $border-primary;
    box-shadow: $shadow-lg;

    .video-placeholder {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
    }
  }

  .screenshots-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
    }
  }

  .screenshot-item {
    border-radius: $border-radius-md;
    overflow: hidden;
    background: $bg-card;
    border: $border-width solid $border-primary;
    box-shadow: $shadow-md;
    transition: all $transition-base $easing-smooth;

    &:hover {
      transform: translateY(-4px);
      border-color: $border-accent;
      box-shadow: $shadow-lg, $glow-primary;
    }

    .screenshot-placeholder {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
    }

    .video-description {
      padding: $spacing-md;
      font-size: $font-size-sm;
      color: $text-secondary;
    }
  }
}
</style>
