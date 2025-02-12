import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
const router = useRouter();
const goHome = () => {
    router.push('/dashboard/home');
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['not-found-container', 'not-found-container',];
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.IonPage;
    /** @type { [typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = {}.IonHeader;
    /** @type { [typeof __VLS_components.IonHeader, typeof __VLS_components.ionHeader, typeof __VLS_components.IonHeader, typeof __VLS_components.ionHeader, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_13 = {}.IonToolbar;
    /** @type { [typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = {}.IonTitle;
    /** @type { [typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_24.slots.default;
    var __VLS_24;
    __VLS_18.slots.default;
    var __VLS_18;
    __VLS_12.slots.default;
    var __VLS_12;
    const __VLS_25 = {}.IonContent;
    /** @type { [typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ class: ("ion-padding") },
    }));
    const __VLS_27 = __VLS_26({
        ...{ class: ("ion-padding") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("not-found-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
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
        onClick: (__VLS_ctx.goHome)
    };
    let __VLS_34;
    let __VLS_35;
    __VLS_36.slots.default;
    var __VLS_36;
    __VLS_30.slots.default;
    var __VLS_30;
    __VLS_5.slots.default;
    var __VLS_5;
    ['ion-padding', 'not-found-container', 'text-sm',];
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
            IonHeader: IonHeader,
            IonToolbar: IonToolbar,
            IonTitle: IonTitle,
            IonContent: IonContent,
            IonButton: IonButton,
            goHome: goHome,
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
