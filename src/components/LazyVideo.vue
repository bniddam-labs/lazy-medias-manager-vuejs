<template>
  <div ref="containerRef" class="lazy-video-container">
    <!-- Poster/Thumbnail before load -->
    <div v-if="!isIntersecting" class="lazy-video-placeholder">
      <slot name="placeholder">
        <img v-if="poster" :src="poster" :alt="alt" class="lazy-video-poster" />
        <span v-else class="lazy-video-icon">▶</span>
      </slot>
    </div>

    <!-- Video element when in viewport -->
    <video
      v-else
      ref="videoRef"
      :src="src"
      :poster="poster"
      :controls="controls"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
      :preload="preload"
      class="lazy-video"
      @loadeddata="onLoaded"
    >
      <slot></slot>
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export interface Props {
  src: string;
  poster?: string;
  alt?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  rootMargin?: string;
  threshold?: number;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  controls: true,
  autoplay: false,
  muted: false,
  loop: false,
  preload: 'metadata',
  rootMargin: '50px',
  threshold: 0.1,
});

const containerRef = ref<HTMLElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
const isIntersecting = ref(false);
const isLoaded = ref(false);

const onLoaded = () => {
  isLoaded.value = true;
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isIntersecting.value) {
        isIntersecting.value = true;
        observer?.disconnect();
      }
    },
    {
      rootMargin: props.rootMargin,
      threshold: props.threshold,
    }
  );

  observer.observe(containerRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

defineExpose({
  video: videoRef,
});
</script>
