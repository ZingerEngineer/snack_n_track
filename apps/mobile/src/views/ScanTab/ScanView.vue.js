import { IonPage, IonBackButton, IonButtons, IonToolbar, IonRouterOutlet, IonBadge, IonList, } from '@ionic/vue';
import { computed, watch } from 'vue';
import { home } from 'ionicons/icons';
import { useScanStore } from '../../stores/scan.store';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useModalStore } from '../../stores/modal.store';
import SelectedImageModal from '../../components/SelectedImageModal.vue';
import { useRoute } from 'vue-router';
const scan = useScanStore();
const modal = useModalStore();
const isImageSelected = computed(() => scan.isImagePathSet);
const imagePath = computed(() => scan.imagePath);
watch([imagePath, isImageSelected], ([newImagePath, newIsImageSelected]) => {
    if (newImagePath && newIsImageSelected) {
        modal.openModal(SelectedImageModal, {
            title: 'Selected image',
            lowerText: 'Is this your right food?',
        });
    }
});
const router = useRoute(); /* PartiallyEnd: #3632/scriptSetup.vue */
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
    const __VLS_7 = {}.IonToolbar;
    /** @type { [typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_13 = {}.IonButtons;
    /** @type { [typeof __VLS_components.IonButtons, typeof __VLS_components.ionButtons, typeof __VLS_components.IonButtons, typeof __VLS_components.ionButtons, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        slot: ("start"),
    }));
    const __VLS_15 = __VLS_14({
        slot: ("start"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = {}.IonBackButton;
    /** @type { [typeof __VLS_components.IonBackButton, typeof __VLS_components.ionBackButton, typeof __VLS_components.IonBackButton, typeof __VLS_components.ionBackButton, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        icon: ((__VLS_ctx.home)),
        defaultHref: ("/dashboard/home"),
    }));
    const __VLS_21 = __VLS_20({
        icon: ((__VLS_ctx.home)),
        defaultHref: ("/dashboard/home"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_18.slots.default;
    var __VLS_18;
    if (__VLS_ctx.router.name === 'upload') {
        const __VLS_25 = {}.IonList;
        /** @type { [typeof __VLS_components.IonList, typeof __VLS_components.ionList, typeof __VLS_components.IonList, typeof __VLS_components.ionList, ] } */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            slot: ("end"),
        }));
        const __VLS_27 = __VLS_26({
            slot: ("end"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        if (__VLS_ctx.isImageSelected) {
            const __VLS_31 = {}.IonBadge;
            /** @type { [typeof __VLS_components.IonBadge, typeof __VLS_components.ionBadge, typeof __VLS_components.IonBadge, typeof __VLS_components.ionBadge, ] } */ ;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
                ...{ 'onClick': {} },
                color: ("danger"),
                ...{ class: ("rounded-r-none") },
            }));
            const __VLS_33 = __VLS_32({
                ...{ 'onClick': {} },
                color: ("danger"),
                ...{ class: ("rounded-r-none") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_32));
            let __VLS_37;
            const __VLS_38 = {
                onClick: (...[$event]) => {
                    if (!((__VLS_ctx.router.name === 'upload')))
                        return;
                    if (!((__VLS_ctx.isImageSelected)))
                        return;
                    __VLS_ctx.isImageSelected && __VLS_ctx.scan.resetPhoto();
                }
            };
            let __VLS_34;
            let __VLS_35;
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("flex flex-row items-center justify-center gap-2") },
            });
            const __VLS_39 = {}.FontAwesomeIcon;
            /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
            // @ts-ignore
            const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
                icon: ((__VLS_ctx.faTrash)),
                ...{ class: ("text-xl text-white") },
            }));
            const __VLS_41 = __VLS_40({
                icon: ((__VLS_ctx.faTrash)),
                ...{ class: ("text-xl text-white") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_40));
            __VLS_36.slots.default;
            var __VLS_36;
        }
        const __VLS_45 = {}.IonBadge;
        /** @type { [typeof __VLS_components.IonBadge, typeof __VLS_components.ionBadge, typeof __VLS_components.IonBadge, typeof __VLS_components.ionBadge, ] } */ ;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            ...{ 'onClick': {} },
            ...{ class: ((__VLS_ctx.isImageSelected ? 'rounded-l-none' : '')) },
        }));
        const __VLS_47 = __VLS_46({
            ...{ 'onClick': {} },
            ...{ class: ((__VLS_ctx.isImageSelected ? 'rounded-l-none' : '')) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        let __VLS_51;
        const __VLS_52 = {
            onClick: (...[$event]) => {
                if (!((__VLS_ctx.router.name === 'upload')))
                    return;
                __VLS_ctx.isImageSelected &&
                    __VLS_ctx.modal.openModal(__VLS_ctx.SelectedImageModal, {
                        title: 'Selected image',
                        lowerText: 'Is this your right food?',
                    });
            }
        };
        let __VLS_48;
        let __VLS_49;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex text-white flex-row items-center justify-center gap-2") },
        });
        const __VLS_53 = {}.FontAwesomeIcon;
        /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
        // @ts-ignore
        const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
            icon: ((__VLS_ctx.faImage)),
            ...{ class: ("text-xl") },
        }));
        const __VLS_55 = __VLS_54({
            icon: ((__VLS_ctx.faImage)),
            ...{ class: ("text-xl") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_54));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.isImageSelected ? '1 Selected' : '0 Selected');
        __VLS_50.slots.default;
        var __VLS_50;
        __VLS_30.slots.default;
        var __VLS_30;
    }
    const __VLS_59 = {}.IonTitle;
    /** @type { [typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, ] } */ ;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({}));
    const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
    __VLS_64.slots.default;
    var __VLS_64;
    __VLS_12.slots.default;
    var __VLS_12;
    const __VLS_65 = {}.IonRouterOutlet;
    /** @type { [typeof __VLS_components.IonRouterOutlet, typeof __VLS_components.ionRouterOutlet, typeof __VLS_components.IonRouterOutlet, typeof __VLS_components.ionRouterOutlet, ] } */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
    const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
    __VLS_5.slots.default;
    var __VLS_5;
    ['rounded-r-none', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-2', 'text-xl', 'text-white', 'flex', 'text-white', 'flex-row', 'items-center', 'justify-center', 'gap-2', 'text-xl',];
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
            IonBackButton: IonBackButton,
            IonButtons: IonButtons,
            IonToolbar: IonToolbar,
            IonRouterOutlet: IonRouterOutlet,
            IonBadge: IonBadge,
            IonList: IonList,
            home: home,
            faImage: faImage,
            faTrash: faTrash,
            FontAwesomeIcon: FontAwesomeIcon,
            SelectedImageModal: SelectedImageModal,
            scan: scan,
            modal: modal,
            isImageSelected: isImageSelected,
            router: router,
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
