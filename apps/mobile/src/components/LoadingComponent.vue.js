import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '../stores/loading.store';
const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);
const messages = ref(['Loading…', 'Please wait…', 'Almost there…']);
const currentMessage = ref(messages.value[0]);
let messageIndex = 0;
let intervalId;
onMounted(() => {
    intervalId = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.value.length;
        currentMessage.value = messages.value[messageIndex];
    }, 4000);
});
onUnmounted(() => {
    clearInterval(intervalId);
}); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("loading-overlay") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col items-center justify-center bg-medium p-2 rounded-lg min-w-52 min-h-40") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("spinner") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            width: ("50"),
            height: ("50"),
            viewBox: ("0 0 50 50"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.circle, __VLS_intrinsicElements.circle)({
            cx: ("25"),
            cy: ("25"),
            r: ("20"),
            stroke: ("var(--ion-color-secondary)"),
            opacity: ("1"),
            'stroke-width': ("4"),
            fill: ("none"),
            'stroke-dasharray': ("125.6"),
            'stroke-dashoffset': ("0"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.animate)({
            attributeName: ("stroke-dashoffset"),
            from: ("125.6"),
            to: ("0"),
            dur: ("2s"),
            repeatCount: ("indefinite"),
            keyTimes: ("0; 1"),
            keySplines: ("0.42 0 0.58 1"),
            calcMode: ("spline"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.circle)({
            cx: ("25"),
            cy: ("25"),
            r: ("20"),
            stroke: ("var(--ion-color-primary)"),
            opacity: ("0.5"),
            'stroke-width': ("4"),
            fill: ("none"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("loading-message") },
        });
        (__VLS_ctx.currentMessage);
    }
    ['loading-overlay', 'flex', 'flex-col', 'items-center', 'justify-center', 'bg-medium', 'p-2', 'rounded-lg', 'min-w-52', 'min-h-40', 'spinner', 'loading-message',];
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
            isLoading: isLoading,
            currentMessage: currentMessage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
