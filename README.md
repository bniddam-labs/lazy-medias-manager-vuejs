# @bniddam-labs/lazy-media-vuejs

Vue 3 components for lazy loading media (images, videos, audio, documents) with IntersectionObserver.

## Features

- 🖼️ **LazyImage** - Progressive blur-up loading with thumbnails
- 🎬 **LazyVideo** - Lazy video with poster support
- 🎵 **LazyAudio** - Lazy audio player
- 📄 **LazyDocument** - Lazy PDF/document embed
- 👁️ **IntersectionObserver** - Only loads when entering viewport
- 🎨 **Fully customizable** - CSS variables or bring your own styles
- 🔧 **TypeScript** - Full type support

## Installation

```bash
pnpm add @bniddam-labs/lazy-media-vuejs
```

## Quick Start

```typescript
// main.ts
import { createApp } from 'vue'
import LazyMediaPlugin from '@bniddam-labs/lazy-media-vuejs'
import '@bniddam-labs/lazy-media-vuejs/style.css'

app.use(LazyMediaPlugin)
```

```vue
<template>
  <LazyImage src="/api/images/photo.jpg" alt="Photo" />
  <LazyVideo src="/api/videos/clip.mp4" poster="/api/images/poster.jpg" />
  <LazyAudio src="/api/audio/song.mp3" />
  <LazyDocument src="/api/docs/report.pdf" />
</template>
```

## Components

### LazyImage

Progressive image loading with blur-up effect.

```vue
<LazyImage 
  src="https://example.com/image.jpg"
  alt="Description"
  :sizes="[100, 400]"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Full image URL |
| `alt` | `string` | `''` | Alt text |
| `sizes` | `number[]` | `[100, 400]` | Thumbnail sizes for progressive loading |
| `rootMargin` | `string` | `'50px'` | IntersectionObserver margin |
| `threshold` | `number` | `0.1` | IntersectionObserver threshold |

### LazyVideo

Lazy-loaded video with optional poster.

```vue
<LazyVideo 
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  controls
  muted
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Video URL |
| `poster` | `string` | - | Poster image URL |
| `controls` | `boolean` | `true` | Show controls |
| `autoplay` | `boolean` | `false` | Autoplay when loaded |
| `muted` | `boolean` | `false` | Muted |
| `loop` | `boolean` | `false` | Loop video |
| `preload` | `string` | `'metadata'` | Preload strategy |

### LazyAudio

Lazy-loaded audio player.

```vue
<LazyAudio 
  src="https://example.com/audio.mp3"
  controls
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Audio URL |
| `controls` | `boolean` | `true` | Show controls |
| `autoplay` | `boolean` | `false` | Autoplay when loaded |
| `muted` | `boolean` | `false` | Muted |
| `loop` | `boolean` | `false` | Loop audio |
| `preload` | `string` | `'metadata'` | Preload strategy |

### LazyDocument

Lazy-loaded document (PDF, etc.) with fallback download link.

```vue
<LazyDocument 
  src="https://example.com/document.pdf"
  title="Report 2024"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Document URL |
| `title` | `string` | `'Document'` | Document title |
| `useIframe` | `boolean` | `false` | Use iframe instead of object |
| `downloadText` | `string` | `'Download'` | Fallback link text |

## Customization

### CSS Variables

```css
:root {
  --lazy-image-blur: 10px;
  --lazy-image-blur-transition: filter 0.3s ease;
  --lazy-image-object-fit: cover;
  --lazy-image-placeholder-bg: #f0f0f0;
  --lazy-image-spinner-size: 24px;
  --lazy-image-spinner-color: #ddd;
  --lazy-image-spinner-color-active: #333;
}
```

### Custom Placeholder (all components)

```vue
<LazyImage src="...">
  <template #placeholder>
    <MySkeleton />
  </template>
</LazyImage>

<LazyVideo src="...">
  <template #placeholder>
    <MyVideoPoster />
  </template>
</LazyVideo>
```

### Without default styles

```typescript
import { LazyImage, LazyVideo } from '@bniddam-labs/lazy-media-vuejs'
// Don't import style.css
```

## CSS Classes

| Component | Classes |
|-----------|---------|
| LazyImage | `.lazy-image-container`, `.lazy-image`, `.lazy-image.loaded`, `.lazy-image-placeholder`, `.lazy-image-spinner` |
| LazyVideo | `.lazy-video-container`, `.lazy-video`, `.lazy-video-placeholder`, `.lazy-video-poster`, `.lazy-video-icon` |
| LazyAudio | `.lazy-audio-container`, `.lazy-audio`, `.lazy-audio-placeholder`, `.lazy-audio-icon` |
| LazyDocument | `.lazy-document-container`, `.lazy-document-iframe`, `.lazy-document-object`, `.lazy-document-placeholder`, `.lazy-document-icon`, `.lazy-document-filename`, `.lazy-document-fallback` |

## License

MIT
