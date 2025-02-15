import { computed } from 'vue';
import { useModalStore } from '../stores/modal.store';
const modalStore = useModalStore();
// Compute the top modal (if any)
const currentModal = computed(() => {
    const stack = modalStore.modalStack;
    return stack.length ? stack[stack.length - 1] : null;
});
// Clicking on the backdrop closes the top modal
function handleClose() {
    modalStore.closeModal();
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.Teleport;
    /** @type { [typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("#modals"),
    }));
    const __VLS_2 = __VLS_1({
        to: ("#modals"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    if (__VLS_ctx.currentModal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (__VLS_ctx.handleClose) },
            ...{ class: ("modal-backdrop") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: () => { } },
            ...{ class: ("modal-content") },
        });
        const __VLS_7 = ((__VLS_ctx.currentModal.component));
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
            ...(__VLS_ctx.currentModal.props),
        }));
        const __VLS_9 = __VLS_8({
            ...(__VLS_ctx.currentModal.props),
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['modal-backdrop', 'modal-content',];
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
            currentModal: currentModal,
            handleClose: handleClose,
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
