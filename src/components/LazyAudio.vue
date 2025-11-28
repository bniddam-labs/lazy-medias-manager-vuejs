<template>
  <div ref="containerRef" class="lazy-audio-container">
    <!-- Placeholder before load -->
    <div v-if="!isIntersecting" class="lazy-audio-placeholder">
      <slot name="placeholder">
        <span class="lazy-audio-icon">🎵</span>
      </slot>
    </div>

    <!-- Audio element when in viewport -->
    <audio
      v-else
      ref="audioRef"
      :src="src"
      :controls="controls"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
      :preload="preload"
      class="lazy-audio"
      @loadeddata="onLoaded"
    >
      <slot></slot>
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export interface Props {
  src: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  rootMargin?: string;
  threshold?: number;
}

const props = withDefaults(defineProps<Props>(), {
  controls: true,
  autoplay: false,
  muted: false,
  loop: false,
  preload: 'metadata',
  rootMargin: '50px',
  threshold: 0.1,
});

const containerRef = ref<HTMLElement | null>(null);
const audioRef = ref<HTMLAudioElement | null>(null);
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
  audio: audioRef,
});
</script>
