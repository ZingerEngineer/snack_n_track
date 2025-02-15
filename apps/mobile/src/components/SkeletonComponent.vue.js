import { defineProps } from 'vue';
const __VLS_props = defineProps({
    // The component to be rendered.
    is: {
        type: [Object, Function, String],
        required: true,
    },
    // Optional props to pass on to the wrapped component.
    componentProps: {
        type: Object,
        default: () => ({}),
    },
}); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.Suspense;
    /** @type { [typeof __VLS_components.Suspense, typeof __VLS_components.Suspense, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { default: __VLS_thisSlot } = __VLS_5.slots;
        const __VLS_6 = ((__VLS_ctx.is));
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
            ...(__VLS_ctx.componentProps),
        }));
        const __VLS_8 = __VLS_7({
            ...(__VLS_ctx.componentProps),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { fallback: __VLS_thisSlot } = __VLS_5.slots;
        var __VLS_12 = {};
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("skeleton-loader") },
        });
        __VLS_5.slots.default;
    }
    var __VLS_5;
    ['skeleton-loader',];
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
        return {};
    },
    props: {
        // The component to be rendered.
        is: {
            type: [Object, Function, String],
            required: true,
        },
        // Optional props to pass on to the wrapped component.
        componentProps: {
            type: Object,
            default: () => ({}),
        },
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        // The component to be rendered.
        is: {
            type: [Object, Function, String],
            required: true,
        },
        // Optional props to pass on to the wrapped component.
        componentProps: {
            type: Object,
            default: () => ({}),
        },
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
