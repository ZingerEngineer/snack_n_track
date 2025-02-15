import { IonPage, IonContent } from '@ionic/vue';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleRouteToUpload = () => {
    router.push('/scan/upload');
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
        ...{ class: ("content-wrapper h-full flex gap-5 flex-col items-center justify-center bg-tertiary") },
    });
    const __VLS_13 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        icon: ((__VLS_ctx.faMagicWandSparkles)),
        ...{ class: ("absolute blur-md top-[15rem] opacity-50 text-8xl text-white") },
    }));
    const __VLS_15 = __VLS_14({
        icon: ((__VLS_ctx.faMagicWandSparkles)),
        ...{ class: ("absolute blur-md top-[15rem] opacity-50 text-8xl text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        icon: ((__VLS_ctx.faMagicWandSparkles)),
        ...{ class: ("absolute blur-sm opacity-10 text-[22rem] left-40 text-white") },
    }));
    const __VLS_21 = __VLS_20({
        icon: ((__VLS_ctx.faMagicWandSparkles)),
        ...{ class: ("absolute blur-sm opacity-10 text-[22rem] left-40 text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const __VLS_25 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        icon: ((__VLS_ctx.faMagicWandSparkles)),
        ...{ class: ("text-8xl text-white") },
    }));
    const __VLS_27 = __VLS_26({
        icon: ((__VLS_ctx.faMagicWandSparkles)),
        ...{ class: ("text-8xl text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("font-bold text-white") },
    });
    const __VLS_31 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ 'onClick': {} },
    }));
    const __VLS_33 = __VLS_32({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    let __VLS_37;
    const __VLS_38 = {
        onClick: (__VLS_ctx.handleRouteToUpload)
    };
    let __VLS_34;
    let __VLS_35;
    __VLS_36.slots.default;
    var __VLS_36;
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_5.slots.default;
    var __VLS_5;
    ['content-wrapper', 'h-full', 'flex', 'gap-5', 'flex-col', 'items-center', 'justify-center', 'bg-tertiary', 'absolute', 'blur-md', 'top-[15rem]', 'opacity-50', 'text-8xl', 'text-white', 'absolute', 'blur-sm', 'opacity-10', 'text-[22rem]', 'left-40', 'text-white', 'text-8xl', 'text-white', 'font-bold', 'text-white',];
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
            faMagicWandSparkles: faMagicWandSparkles,
            FontAwesomeIcon: FontAwesomeIcon,
            handleRouteToUpload: handleRouteToUpload,
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
