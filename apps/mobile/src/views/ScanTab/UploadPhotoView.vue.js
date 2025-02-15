import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { useScanStore } from '../../stores/scan.store';
import { faCameraAlt, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const scan = useScanStore();
const isImageSelected = computed(() => scan.isImagePathSet);
const router = useRouter();
const handleScan = () => {
    scan.anaylsePhotoHandler();
    router.push('/scan/upload-results');
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.IonPage;
    /** @type { [typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = {}.IonContent;
    /** @type { [typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("content-wrapper h-full flex flex-col items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full h-full flex flex-col justify-center items-center gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col w-full h-full justify-center items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.scan.pickPhotoHandler) },
        ...{ class: ("bg-primary-shade hover:to-primary-shade hover:from-emerald-300 hover:bg-gradient-to-t relative w-full h-full flex justify-center items-center z-[1]") },
    });
    const __VLS_13 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        icon: ((__VLS_ctx.faCameraAlt)),
        ...{ class: ("text-[15rem] absolute z-[1] text-white/30 left-1 rotate-12") },
    }));
    const __VLS_15 = __VLS_14({
        icon: ((__VLS_ctx.faCameraAlt)),
        ...{ class: ("text-[15rem] absolute z-[1] text-white/30 left-1 rotate-12") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center gap-2 z-[2]") },
    });
    const __VLS_19 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        icon: ((__VLS_ctx.faCameraAlt)),
        ...{ class: ("text-5xl text-white") },
    }));
    const __VLS_21 = __VLS_20({
        icon: ((__VLS_ctx.faCameraAlt)),
        ...{ class: ("text-5xl text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-white font-bold text-sm") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.scan.pickPhotoHandler) },
        ...{ class: ("bg-tertiary-shade hover:from-tertiary-shade hover:to-secondary hover:bg-gradient-to-t relative w-full h-full flex justify-center items-center z[1]") },
    });
    const __VLS_25 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        icon: ((__VLS_ctx.faImages)),
        ...{ class: ("text-[15rem] absolute z-[1] text-white/30 right-1 -rotate-12") },
    }));
    const __VLS_27 = __VLS_26({
        icon: ((__VLS_ctx.faImages)),
        ...{ class: ("text-[15rem] absolute z-[1] text-white/30 right-1 -rotate-12") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center gap-2 z-[2]") },
    });
    const __VLS_31 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        icon: ((__VLS_ctx.faImages)),
        ...{ class: ("text-5xl text-white") },
    }));
    const __VLS_33 = __VLS_32({
        icon: ((__VLS_ctx.faImages)),
        ...{ class: ("text-5xl text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-white font-bold text-sm") },
    });
    if (__VLS_ctx.isImageSelected) {
        const __VLS_37 = {}.IonButton;
        /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
            ...{ 'onClick': {} },
            ...{ class: ("absolute bottom-10 right-10 transition-all duration-300 ease-in-out text-white z-50") },
        }));
        const __VLS_39 = __VLS_38({
            ...{ 'onClick': {} },
            ...{ class: ("absolute bottom-10 right-10 transition-all duration-300 ease-in-out text-white z-50") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_38));
        let __VLS_43;
        const __VLS_44 = {
            onClick: (__VLS_ctx.handleScan)
        };
        let __VLS_40;
        let __VLS_41;
        __VLS_42.slots.default;
        var __VLS_42;
    }
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_5.slots.default;
    var __VLS_5;
    ['content-wrapper', 'h-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'h-full', 'flex', 'flex-col', 'justify-center', 'items-center', 'gap-4', 'flex', 'flex-col', 'w-full', 'h-full', 'justify-center', 'items-center', 'bg-primary-shade', 'hover:to-primary-shade', 'hover:from-emerald-300', 'hover:bg-gradient-to-t', 'relative', 'w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'z-[1]', 'text-[15rem]', 'absolute', 'z-[1]', 'text-white/30', 'left-1', 'rotate-12', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-2', 'z-[2]', 'text-5xl', 'text-white', 'text-white', 'font-bold', 'text-sm', 'bg-tertiary-shade', 'hover:from-tertiary-shade', 'hover:to-secondary', 'hover:bg-gradient-to-t', 'relative', 'w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'z[1]', 'text-[15rem]', 'absolute', 'z-[1]', 'text-white/30', 'right-1', '-rotate-12', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-2', 'z-[2]', 'text-5xl', 'text-white', 'text-white', 'font-bold', 'text-sm', 'absolute', 'bottom-10', 'right-10', 'transition-all', 'duration-300', 'ease-in-out', 'text-white', 'z-50',];
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
            IonPage: IonPage,
            IonContent: IonContent,
            IonButton: IonButton,
            faCameraAlt: faCameraAlt,
            faImages: faImages,
            FontAwesomeIcon: FontAwesomeIcon,
            scan: scan,
            isImageSelected: isImageSelected,
            handleScan: handleScan,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
