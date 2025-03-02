<script lang="ts">
import { defineComponent } from "vue";
import LazyImage from "./components/LazyImage.vue";

export default defineComponent({
  components: {
    LazyImage,
  },
  setup() {
    const baseUrl = "http://localhost:3000/images";
    const fileName = "043d1868-97b1-405e-81f0-428f188a18b4.PNG";

    return {
      baseUrl,
      fileName,
    };
  },
});
</script>

<template>
  <div>
    <LazyImage :baseUrl="baseUrl" :fileName="fileName" />
  </div>
</template>

<style scoped>
img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}
</style>
