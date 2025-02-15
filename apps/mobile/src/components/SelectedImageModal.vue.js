import { IonButton } from '@ionic/vue';
import { useModalStore } from '../stores/modal.store';
import { useScanStore } from '../stores/scan.store';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
const __VLS_props = defineProps({
    title: { type: String, default: '' },
    lowerText: { type: String, default: '' },
});
const router = useRouter();
const scanStore = useScanStore();
const modalStore = useModalStore();
function handleAnalyse() {
    scanStore.anaylsePhotoHandler();
    close();
    router.push('/scan/upload-results');
}
function handleDelete() {
    scanStore.resetPhoto();
    close();
}
function close() {
    modalStore.closeModal();
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-w-72 flex flex-col gap-4 p-4 bg-white rounded-lg") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col gap-1") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-2xl") },
    });
    (__VLS_ctx.title);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full border-b-2 border-medium-shade/50") },
    });
    if (__VLS_ctx.lowerText) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-dark-tint") },
        });
        (__VLS_ctx.lowerText);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex justify-center items-center") },
    });
    if (__VLS_ctx.scanStore.isImagePathSet) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            ...{ class: ("w-52 border-2 rounded-lg border-medium-shade/50") },
            src: ((__VLS_ctx.scanStore.imagePath ?? '')),
            alt: ("Selected image"),
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center gap-4 mt-4") },
    });
    const __VLS_0 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.IonButton, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        ...{ class: ("text-white") },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        ...{ class: ("text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.close)
    };
    let __VLS_3;
    let __VLS_4;
    __VLS_5.slots.default;
    var __VLS_5;
    const __VLS_8 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.IonButton, ] } */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        ...{ class: ("text-white") },
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        ...{ class: ("text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_14;
    const __VLS_15 = {
        onClick: (__VLS_ctx.handleAnalyse)
    };
    let __VLS_11;
    let __VLS_12;
    __VLS_13.slots.default;
    var __VLS_13;
    const __VLS_16 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.IonButton, ] } */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ 'onClick': {} },
        color: ("danger"),
        ...{ class: ("text-white") },
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onClick': {} },
        color: ("danger"),
        ...{ class: ("text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_22;
    const __VLS_23 = {
        onClick: (__VLS_ctx.handleDelete)
    };
    let __VLS_19;
    let __VLS_20;
    const __VLS_24 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ class: ("text-white") },
        icon: ((__VLS_ctx.faTrash)),
    }));
    const __VLS_26 = __VLS_25({
        ...{ class: ("text-white") },
        icon: ((__VLS_ctx.faTrash)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_21.slots.default;
    var __VLS_21;
    ['min-w-72', 'flex', 'flex-col', 'gap-4', 'p-4', 'bg-white', 'rounded-lg', 'flex', 'flex-col', 'gap-1', 'text-2xl', 'w-full', 'border-b-2', 'border-medium-shade/50', 'text-dark-tint', 'flex', 'justify-center', 'items-center', 'w-52', 'border-2', 'rounded-lg', 'border-medium-shade/50', 'flex', 'items-center', 'gap-4', 'mt-4', 'text-white', 'text-white', 'text-white', 'text-white',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IonButton: IonButton,
            faTrash: faTrash,
            FontAwesomeIcon: FontAwesomeIcon,
            scanStore: scanStore,
            handleAnalyse: handleAnalyse,
            handleDelete: handleDelete,
            close: close,
        };
    },
    props: {
        title: { type: String, default: '' },
        lowerText: { type: String, default: '' },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        title: { type: String, default: '' },
        lowerText: { type: String, default: '' },
    },
});
; /* PartiallyEnd: #4569/main.vue */
