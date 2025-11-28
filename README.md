# @bniddam-labs/lazy-medias-manager-vuejs

[![npm version](https://img.shields.io/npm/v/@bniddam-labs/lazy-medias-manager-vuejs.svg)](https://www.npmjs.com/package/@bniddam-labs/lazy-medias-manager-vuejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Vue 3 components for lazy loading media (images, videos, audio, documents) using IntersectionObserver.

## ✨ Features

- 🖼️ **LazyImage** - Progressive blur-up loading with thumbnail sizes
- 🎬 **LazyVideo** - Lazy video with poster support
- 🎵 **LazyAudio** - Lazy audio player
- 📄 **LazyDocument** - Lazy PDF/document embed with fallback
- 👁️ **IntersectionObserver** - Only loads when entering viewport
- ⚡ **AbortController** - Cancels unnecessary requests (LazyImage)
- 🎨 **Fully customizable** - CSS variables or bring your own styles
- 🔧 **TypeScript** - Full type support
- 📦 **Tree-shakeable** - Import only what you need

## 📦 Installation

```bash
# pnpm (recommended)
pnpm add @bniddam-labs/lazy-medias-manager-vuejs

# npm
npm install @bniddam-labs/lazy-medias-manager-vuejs

# yarn
yarn add @bniddam-labs/lazy-medias-manager-vuejs
```

### Install from GitHub

```bash
pnpm add github:bniddam-labs/lazy-medias-manager-vuejs
```

## 🚀 Quick Start

### Global Registration (Plugin)

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import LazyMediaPlugin from "@bniddam-labs/lazy-medias-manager-vuejs";
import "@bniddam-labs/lazy-medias-manager-vuejs/style.css";

const app = createApp(App);
app.use(LazyMediaPlugin);
app.mount("#app");
```

Now use components anywhere:

```vue
<template>
  <LazyImage src="/api/medias/photo.jpg" alt="Photo" />
  <LazyVideo src="/api/medias/video.mp4" poster="/api/medias/poster.jpg" />
  <LazyAudio src="/api/medias/song.mp3" />
  <LazyDocument src="/api/medias/report.pdf" />
</template>
```

### Local Registration (Tree-shaking)

```vue
<script setup lang="ts">
import { LazyImage, LazyVideo } from "@bniddam-labs/lazy-medias-manager-vuejs";
import "@bniddam-labs/lazy-medias-manager-vuejs/style.css";
</script>

<template>
  <LazyImage src="/photo.jpg" alt="Photo" />
</template>
```

---

## 📖 Components

### LazyImage

Progressive image loading with blur-up effect. Loads small thumbnails first, then the full image.

```vue
<LazyImage
  src="https://example.com/image.jpg"
  alt="Beautiful landscape"
  :sizes="[100, 400]"
/>
```

#### How it works

1. Waits until component enters viewport (IntersectionObserver)
2. Starts loading first thumbnail (100px) + full image in parallel
3. Shows thumbnail with blur effect when it loads
4. Loads next size (400px) if full image isn't ready yet
5. Shows full image and removes blur when loaded
6. Aborts remaining thumbnail requests when full image arrives

#### Props

| Prop         | Type       | Default      | Description                                                    |
| ------------ | ---------- | ------------ | -------------------------------------------------------------- |
| `src`        | `string`   | **required** | Full image URL. The component appends `?size=X` for thumbnails |
| `alt`        | `string`   | `''`         | Alt text for accessibility                                     |
| `sizes`      | `number[]` | `[100, 400]` | Intermediate thumbnail sizes to load progressively             |
| `rootMargin` | `string`   | `'50px'`     | IntersectionObserver root margin (preload distance)            |
| `threshold`  | `number`   | `0.1`        | IntersectionObserver threshold                                 |

> **Note**: Works with any backend that accepts `?size=` query parameter, including `@bniddam-labs/medias-manager-nestjs`

---

### LazyVideo

Lazy-loaded video player with poster support.

```vue
<LazyVideo
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  controls
  muted
/>
```

#### Props

| Prop         | Type                             | Default      | Description                    |
| ------------ | -------------------------------- | ------------ | ------------------------------ |
| `src`        | `string`                         | **required** | Video URL                      |
| `poster`     | `string`                         | -            | Poster/thumbnail image URL     |
| `alt`        | `string`                         | `''`         | Alt text for poster            |
| `controls`   | `boolean`                        | `true`       | Show video controls            |
| `autoplay`   | `boolean`                        | `false`      | Autoplay when loaded           |
| `muted`      | `boolean`                        | `false`      | Muted by default               |
| `loop`       | `boolean`                        | `false`      | Loop video                     |
| `preload`    | `'none' \| 'metadata' \| 'auto'` | `'metadata'` | Preload strategy               |
| `rootMargin` | `string`                         | `'50px'`     | IntersectionObserver margin    |
| `threshold`  | `number`                         | `0.1`        | IntersectionObserver threshold |

#### Accessing the video element

```vue
<script setup>
import { ref } from "vue";

const videoRef = ref();

const play = () => {
  videoRef.value.video.play();
};
</script>

<template>
  <LazyVideo ref="videoRef" src="/video.mp4" />
  <button @click="play">Play</button>
</template>
```

---

### LazyAudio

Lazy-loaded audio player.

```vue
<LazyAudio src="https://example.com/song.mp3" controls />
```

#### Props

| Prop         | Type                             | Default      | Description                    |
| ------------ | -------------------------------- | ------------ | ------------------------------ |
| `src`        | `string`                         | **required** | Audio URL                      |
| `controls`   | `boolean`                        | `true`       | Show audio controls            |
| `autoplay`   | `boolean`                        | `false`      | Autoplay when loaded           |
| `muted`      | `boolean`                        | `false`      | Muted by default               |
| `loop`       | `boolean`                        | `false`      | Loop audio                     |
| `preload`    | `'none' \| 'metadata' \| 'auto'` | `'metadata'` | Preload strategy               |
| `rootMargin` | `string`                         | `'50px'`     | IntersectionObserver margin    |
| `threshold`  | `number`                         | `0.1`        | IntersectionObserver threshold |

#### Accessing the audio element

```vue
<script setup>
const audioRef = ref();
</script>

<template>
  <LazyAudio ref="audioRef" src="/song.mp3" />
</template>
```

---

### LazyDocument

Lazy-loaded document viewer (PDF, etc.) with download fallback.

```vue
<LazyDocument src="https://example.com/report.pdf" title="Annual Report 2024" />
```

#### Props

| Prop           | Type      | Default      | Description                          |
| -------------- | --------- | ------------ | ------------------------------------ |
| `src`          | `string`  | **required** | Document URL                         |
| `title`        | `string`  | `'Document'` | Document title for accessibility     |
| `useIframe`    | `boolean` | `false`      | Use `<iframe>` instead of `<object>` |
| `downloadText` | `string`  | `'Download'` | Fallback download link text          |
| `rootMargin`   | `string`  | `'50px'`     | IntersectionObserver margin          |
| `threshold`    | `number`  | `0.1`        | IntersectionObserver threshold       |

---

## 🎨 Customization

### CSS Variables

Override these variables in your CSS to customize the default styles:

```css
:root {
  /* Blur effect */
  --lazy-image-blur: 10px;
  --lazy-image-blur-transition: filter 0.3s ease;

  /* Image fit */
  --lazy-image-object-fit: cover;

  /* Placeholder */
  --lazy-image-placeholder-bg: #f0f0f0;

  /* Spinner */
  --lazy-image-spinner-size: 24px;
  --lazy-image-spinner-color: #ddd;
  --lazy-image-spinner-color-active: #333;
}
```

### Custom Placeholder Slot

All components support a `#placeholder` slot:

```vue
<!-- Custom image placeholder -->
<LazyImage src="/photo.jpg">
  <template #placeholder>
    <div class="skeleton-loader"></div>
  </template>
</LazyImage>

<!-- Custom video placeholder -->
<LazyVideo src="/video.mp4">
  <template #placeholder>
    <img src="/custom-poster.jpg" alt="Video preview" />
    <button class="play-button">▶</button>
  </template>
</LazyVideo>

<!-- Custom audio placeholder -->
<LazyAudio src="/song.mp3">
  <template #placeholder>
    <div class="audio-skeleton">Loading audio...</div>
  </template>
</LazyAudio>

<!-- Custom document placeholder -->
<LazyDocument src="/report.pdf">
  <template #placeholder>
    <div class="doc-preview">
      <span>📄</span>
      <span>Click to load PDF</span>
    </div>
  </template>
</LazyDocument>
```

### Without Default Styles

Import components without the default CSS and define your own:

```typescript
// Don't import style.css
import { LazyImage, LazyVideo } from "@bniddam-labs/lazy-medias-manager-vuejs";
```

Then define all classes yourself:

```css
/* Your custom styles */
.lazy-image-container {
  /* ... */
}
.lazy-image {
  /* ... */
}
.lazy-image.loaded {
  /* ... */
}
```

---

## 📚 CSS Classes Reference

### LazyImage

| Class                     | Description                       |
| ------------------------- | --------------------------------- |
| `.lazy-image-container`   | Wrapper element                   |
| `.lazy-image`             | The `<img>` element               |
| `.lazy-image.loaded`      | Applied when full image is loaded |
| `.lazy-image-placeholder` | Shown before any image loads      |
| `.lazy-image-spinner`     | Default loading spinner           |

### LazyVideo

| Class                     | Description              |
| ------------------------- | ------------------------ |
| `.lazy-video-container`   | Wrapper element          |
| `.lazy-video`             | The `<video>` element    |
| `.lazy-video-placeholder` | Shown before video loads |
| `.lazy-video-poster`      | Poster image             |
| `.lazy-video-icon`        | Default play icon        |

### LazyAudio

| Class                     | Description              |
| ------------------------- | ------------------------ |
| `.lazy-audio-container`   | Wrapper element          |
| `.lazy-audio`             | The `<audio>` element    |
| `.lazy-audio-placeholder` | Shown before audio loads |
| `.lazy-audio-icon`        | Default audio icon       |

### LazyDocument

| Class                        | Description                           |
| ---------------------------- | ------------------------------------- |
| `.lazy-document-container`   | Wrapper element                       |
| `.lazy-document-iframe`      | The `<iframe>` element (if useIframe) |
| `.lazy-document-object`      | The `<object>` element                |
| `.lazy-document-placeholder` | Shown before document loads           |
| `.lazy-document-icon`        | Document type icon                    |
| `.lazy-document-filename`    | File name display                     |
| `.lazy-document-fallback`    | Download link fallback                |

---

## 🔗 Works With

- **[@bniddam-labs/medias-manager-nestjs](https://github.com/bniddam-labs/medias-manager-nestjs)** - NestJS backend for media storage with on-demand image resizing
- Any backend that accepts `?size=` query parameter for images
- Any static file server

---

## 📄 License

MIT © [Benjamin Niddam](https://github.com/bniddam-labs)
