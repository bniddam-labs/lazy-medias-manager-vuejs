import type { App, Plugin } from 'vue';
import LazyImage from './components/LazyImage.vue';
import LazyVideo from './components/LazyVideo.vue';
import LazyAudio from './components/LazyAudio.vue';
import LazyDocument from './components/LazyDocument.vue';

// Import CSS for side-effect (users can import separately)
import './lazy-image.css';

// Export components
export { LazyImage, LazyVideo, LazyAudio, LazyDocument };

// Export types
export type { Props as LazyImageProps } from './components/LazyImage.vue';
export type { Props as LazyVideoProps } from './components/LazyVideo.vue';
export type { Props as LazyAudioProps } from './components/LazyAudio.vue';
export type { Props as LazyDocumentProps } from './components/LazyDocument.vue';

// Plugin install
const LazyMediaPlugin: Plugin = {
  install(app: App) {
    app.component('LazyImage', LazyImage);
    app.component('LazyVideo', LazyVideo);
    app.component('LazyAudio', LazyAudio);
    app.component('LazyDocument', LazyDocument);
  },
};

export { LazyMediaPlugin };
export default LazyMediaPlugin;
