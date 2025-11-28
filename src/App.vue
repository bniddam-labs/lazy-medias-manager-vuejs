<script setup lang="ts">
import LazyImage from './components/LazyImage.vue';

const imageUrl = 'http://localhost:3000/medias/043d1868-97b1-405e-81f0-428f188a18b4.PNG';
</script>

<template>
  <div class="demo">
    <h1>LazyImage Demo</h1>
    
    <!-- Basic usage -->
    <div class="image-wrapper">
      <LazyImage :src="imageUrl" alt="Demo image" />
    </div>

    <!-- Custom sizes -->
    <div class="image-wrapper">
      <LazyImage 
        :src="imageUrl" 
        alt="Custom sizes" 
        :sizes="[50, 200, 600]"
      />
    </div>

    <!-- With custom placeholder -->
    <div class="image-wrapper">
      <LazyImage :src="imageUrl" alt="Custom placeholder">
        <template #placeholder>
          <span>Loading...</span>
        </template>
      </LazyImage>
    </div>
  </div>
</template>

<style scoped>
.demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.image-wrapper {
  width: 500px;
  height: 500px;
  margin: 20px 0;
  border: 1px solid #ddd;
}
</style>
