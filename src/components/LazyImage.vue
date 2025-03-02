<template>
  <div>
    <!-- Show only the last loaded thumbnail if the full-size image is not loaded -->
    <div v-if="!imageFullSizeLoaded && lastLoadedIndex !== null">
      <img :src="thumbnailsUrls[lastLoadedIndex]" alt="Last Loaded Thumbnail">
    </div>

    <!-- Show full-size image when loaded -->
    <img v-if="imageFullSizeLoaded" :src="imageUrl" alt="Full Image">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  props: {
    baseUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const thumbnailSizes = [50, 100, 200, 400, 800, 1600];
    const thumbnailsLoadedRef = ref<boolean[]>(Array(thumbnailSizes.length).fill(false));
    const imageFullSizeLoaded = ref(false);
    const lastLoadedIndex = ref<number | null>(null); // Store last loaded index

    const thumbnailsUrls = computed(() =>
      thumbnailSizes.map((size) => `${props.baseUrl}/${props.fileName}?size=${size}`)
    );
    const imageUrl = computed(() => `${props.baseUrl}/${props.fileName}`);

    onMounted(() => {
      thumbnailSizes.forEach((size, index) => {
        const image = new Image();
        image.src = thumbnailsUrls.value[index];
        image.onload = () => {
          console.log(`Thumbnail ${size}px loaded`);
          thumbnailsLoadedRef.value[index] = true;
          lastLoadedIndex.value = index; // Update last loaded index
        };
        image.onerror = () => {
          console.log(`Thumbnail ${size}px failed to load`);
        };
      });

      // Load full-size image
      const fullImage = new Image();
      fullImage.src = imageUrl.value;
      fullImage.onload = () => {
        console.log("Full-size image loaded");
        imageFullSizeLoaded.value = true;
      };
      fullImage.onerror = () => {
        console.log("Full-size image failed to load");
      };
    });

    return {
      thumbnailsUrls,
      thumbnailsLoadedRef,
      imageFullSizeLoaded,
      imageUrl,
      lastLoadedIndex,
    };
  },
});
</script>

<style scoped>
img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}
</style>