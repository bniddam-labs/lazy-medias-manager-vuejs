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
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        placeholder?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {
        containerRef: HTMLDivElement;
        audioRef: HTMLAudioElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {
    audio: import('vue').Ref<HTMLAudioElement | null, HTMLAudioElement | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    rootMargin: string;
    threshold: number;
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
    loop: boolean;
    preload: "none" | "metadata" | "auto";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    containerRef: HTMLDivElement;
    audioRef: HTMLAudioElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
