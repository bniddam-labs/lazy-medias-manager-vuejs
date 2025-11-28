<template>
  <div ref="containerRef" class="lazy-document-container">
    <!-- Placeholder before load -->
    <div v-if="!isIntersecting" class="lazy-document-placeholder">
      <slot name="placeholder">
        <div class="lazy-document-icon">
          <span>{{ iconForType }}</span>
          <span class="lazy-document-filename">{{ fileName }}</span>
        </div>
      </slot>
    </div>

    <!-- Document embed/iframe when in viewport -->
    <template v-else>
      <iframe
        v-if="useIframe"
        ref="iframeRef"
        :src="src"
        :title="title"
        class="lazy-document-iframe"
        @load="onLoaded"
      ></iframe>
      
      <object
        v-else
        ref="objectRef"
        :data="src"
        :type="mimeType"
        class="lazy-document-object"
        @load="onLoaded"
      >
        <a :href="src" :download="fileName" class="lazy-document-fallback">
          {{ downloadText }} {{ fileName }}
        </a>
      </object>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

export interface Props {
  src: string;
  title?: string;
  useIframe?: boolean;
  downloadText?: string;
  rootMargin?: string;
  threshold?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Document',
  useIframe: false,
  downloadText: 'Download',
  rootMargin: '50px',
  threshold: 0.1,
});

const containerRef = ref<HTMLElement | null>(null);
const iframeRef = ref<HTMLIFrameElement | null>(null);
const objectRef = ref<HTMLObjectElement | null>(null);
const isIntersecting = ref(false);
const isLoaded = ref(false);

const fileName = computed(() => {
  try {
    const url = new URL(props.src, window.location.origin);
    return url.pathname.split('/').pop() || 'document';
  } catch {
    return 'document';
  }
});

const extension = computed(() => {
  const name = fileName.value;
  const ext = name.split('.').pop()?.toLowerCase();
  return ext || '';
});

const mimeType = computed(() => {
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    csv: 'text/csv',
    rtf: 'application/rtf',
  };
  return mimeTypes[extension.value] || 'application/octet-stream';
});

const iconForType = computed(() => {
  const icons: Record<string, string> = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📽️',
    pptx: '📽️',
    txt: '📃',
    csv: '📊',
    rtf: '📝',
  };
  return icons[extension.value] || '📁';
});

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
</script>
