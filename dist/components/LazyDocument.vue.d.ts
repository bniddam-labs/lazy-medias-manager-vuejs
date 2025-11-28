export interface Props {
    src: string;
    title?: string;
    useIframe?: boolean;
    downloadText?: string;
    rootMargin?: string;
    threshold?: number;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        placeholder?(_: {}): any;
    };
    refs: {
        containerRef: HTMLDivElement;
        iframeRef: HTMLIFrameElement;
        objectRef: HTMLObjectElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    rootMargin: string;
    threshold: number;
    title: string;
    useIframe: boolean;
    downloadText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    containerRef: HTMLDivElement;
    iframeRef: HTMLIFrameElement;
    objectRef: HTMLObjectElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
