import { IonButton, IonLoading } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: { IonButton, IonLoading },
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = { IonButton, IonLoading };
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        id: ("open-loading"),
    }));
    const __VLS_2 = __VLS_1({
        id: ("open-loading"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    const __VLS_6 = {}.IonLoading;
    /** @type { [typeof __VLS_components.IonLoading, typeof __VLS_components.ionLoading, typeof __VLS_components.IonLoading, typeof __VLS_components.ionLoading, ] } */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        ...{ class: ("custom-loading") },
        trigger: ("open-loading"),
        message: ("Loading..."),
        duration: ("3000"),
    }));
    const __VLS_8 = __VLS_7({
        ...{ class: ("custom-loading") },
        trigger: ("open-loading"),
        message: ("Loading..."),
        duration: ("3000"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ['custom-loading',];
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
let __VLS_self;
