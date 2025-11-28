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
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        placeholder?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        containerRef: HTMLDivElement;
        videoRef: HTMLVideoElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    video: import('vue').Ref<HTMLVideoElement | null, HTMLVideoElement | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    alt: string;
    rootMargin: string;
    threshold: number;
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
    loop: boolean;
    preload: "none" | "metadata" | "auto";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    containerRef: HTMLDivElement;
    videoRef: HTMLVideoElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
