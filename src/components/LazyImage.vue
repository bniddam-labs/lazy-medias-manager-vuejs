<template>
  <div ref="containerRef" class="lazy-image-container">
    <img
      v-if="currentSrc"
      :src="currentSrc"
      :alt="alt"
      :class="['lazy-image', { loaded: isFullLoaded }]"
    />
    <div v-else class="lazy-image-placeholder">
      <slot name="placeholder">
        <span class="lazy-image-spinner"></span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

export interface Props {
  src: string;
  alt?: string;
  sizes?: number[];
  rootMargin?: string;
  threshold?: number;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  sizes: () => [100, 400],
  rootMargin: '50px',
  threshold: 0.1,
});

const containerRef = ref<HTMLElement | null>(null);
const currentSrc = ref<string | null>(null);
const isFullLoaded = ref(false);
const isIntersecting = ref(false);
const abortController = ref<AbortController | null>(null);

// Build sized URL - works with any URL that accepts ?size= or adds it
const getSizedUrl = (size: number): string => {
  const url = new URL(props.src, window.location.origin);
  url.searchParams.set('size', size.toString());
  return url.toString();
};

// Preload image with abort support
const preloadImage = (src: string, signal?: AbortSignal): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    const cleanup = () => {
      img.onload = null;
      img.onerror = null;
    };

    if (signal) {
      signal.addEventListener('abort', () => {
        cleanup();
        img.src = '';
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }

    img.onload = () => {
      cleanup();
      resolve(src);
    };

    img.onerror = () => {
      cleanup();
      reject(new Error(`Failed to load: ${src}`));
    };

    img.src = src;
  });
};

// Main loading logic
const startLoading = async () => {
  if (abortController.value) {
    abortController.value.abort();
  }
  
  abortController.value = new AbortController();
  const signal = abortController.value.signal;

  // Start full image loading in background
  const fullPromise = preloadImage(props.src, signal)
    .then((src) => {
      currentSrc.value = src;
      isFullLoaded.value = true;
      // Abort remaining intermediate loads
      abortController.value?.abort();
    })
    .catch(() => {
      // Ignore abort errors
    });

  // Progressive loading: chain intermediate sizes
  for (const size of props.sizes) {
    if (signal.aborted || isFullLoaded.value) break;

    try {
      const sizedUrl = getSizedUrl(size);
      const loadedSrc = await preloadImage(sizedUrl, signal);
      
      // Only update if full isn't loaded yet
      if (!isFullLoaded.value) {
        currentSrc.value = loadedSrc;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        break;
      }
      // Continue to next size on error
    }
  }

  // Wait for full image if not yet loaded
  await fullPromise;
};

// IntersectionObserver setup
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isIntersecting.value) {
        isIntersecting.value = true;
        startLoading();
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
  abortController.value?.abort();
});

// Re-trigger loading if src changes while visible
watch(() => props.src, () => {
  if (isIntersecting.value) {
    currentSrc.value = null;
    isFullLoaded.value = false;
    startLoading();
  }
});
</script>