import { IonApp, IonRouterOutlet } from '@ionic/vue';
import ModalComponent from './components/ModalComponent.vue';
import LoadingComponent from './components/LoadingComponent.vue'; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.IonApp;
    /** @type { [typeof __VLS_components.IonApp, typeof __VLS_components.ionApp, typeof __VLS_components.IonApp, typeof __VLS_components.ionApp, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    // @ts-ignore
    /** @type { [typeof LoadingComponent, ] } */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(LoadingComponent, new LoadingComponent({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    /** @type { [typeof ModalComponent, typeof ModalComponent, ] } */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(ModalComponent, new ModalComponent({
        modalId: ("modal"),
    }));
    const __VLS_13 = __VLS_12({
        modalId: ("modal"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { header: __VLS_thisSlot } = __VLS_16.slots;
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
            ...{ class: ("text-2xl font-bold") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { body: __VLS_thisSlot } = __VLS_16.slots;
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-lg") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { footer: __VLS_thisSlot } = __VLS_16.slots;
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ class: ("bg-blue-500 text-white px-4 py-2 rounded-lg") },
        });
    }
    var __VLS_16;
    const __VLS_17 = {}.IonRouterOutlet;
    /** @type { [typeof __VLS_components.IonRouterOutlet, typeof __VLS_components.ionRouterOutlet, ] } */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_5.slots.default;
    var __VLS_5;
    ['text-2xl', 'font-bold', 'text-lg', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-lg',];
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
            IonApp: IonApp,
            IonRouterOutlet: IonRouterOutlet,
            ModalComponent: ModalComponent,
            LoadingComponent: LoadingComponent,
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
