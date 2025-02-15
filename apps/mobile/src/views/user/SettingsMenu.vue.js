import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth.store';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonSegmentButton, IonPage, IonButtons, IonMenuButton, IonRouterOutlet, } from '@ionic/vue';
import ToastService from '../../services/ToastService';
const router = useRouter();
const authStore = useAuthStore();
const handleLogout = () => {
    try {
        authStore.logout();
        router.push('/login');
        ToastService.success('Logged out successfully');
    }
    catch (error) {
        ToastService.error('Error logging out');
        return;
    }
};
const routeToProfileSettings = () => {
    router.push('/user/settings/profile');
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.IonPage;
    /** @type { [typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = {}.IonMenu;
    /** @type { [typeof __VLS_components.IonMenu, typeof __VLS_components.ionMenu, typeof __VLS_components.IonMenu, typeof __VLS_components.ionMenu, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        contentId: ("main-content"),
    }));
    const __VLS_9 = __VLS_8({
        contentId: ("main-content"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_13 = {}.IonHeader;
    /** @type { [typeof __VLS_components.IonHeader, typeof __VLS_components.ionHeader, typeof __VLS_components.IonHeader, typeof __VLS_components.ionHeader, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = {}.IonToolbar;
    /** @type { [typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const __VLS_25 = {}.IonTitle;
    /** @type { [typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_30.slots.default;
    var __VLS_30;
    __VLS_24.slots.default;
    var __VLS_24;
    __VLS_18.slots.default;
    var __VLS_18;
    const __VLS_31 = {}.IonContent;
    /** @type { [typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, ] } */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ class: ("ion-padding") },
    }));
    const __VLS_33 = __VLS_32({
        ...{ class: ("ion-padding") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const __VLS_37 = {}.IonSegmentButton;
    /** @type { [typeof __VLS_components.IonSegmentButton, typeof __VLS_components.ionSegmentButton, typeof __VLS_components.IonSegmentButton, typeof __VLS_components.ionSegmentButton, ] } */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        ...{ 'onClick': {} },
    }));
    const __VLS_39 = __VLS_38({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_43;
    const __VLS_44 = {
        onClick: (__VLS_ctx.routeToProfileSettings)
    };
    let __VLS_40;
    let __VLS_41;
    __VLS_42.slots.default;
    var __VLS_42;
    const __VLS_45 = {}.IonSegmentButton;
    /** @type { [typeof __VLS_components.IonSegmentButton, typeof __VLS_components.ionSegmentButton, typeof __VLS_components.IonSegmentButton, typeof __VLS_components.ionSegmentButton, ] } */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ 'onClick': {} },
    }));
    const __VLS_47 = __VLS_46({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    let __VLS_51;
    const __VLS_52 = {
        onClick: (__VLS_ctx.handleLogout)
    };
    let __VLS_48;
    let __VLS_49;
    __VLS_50.slots.default;
    var __VLS_50;
    __VLS_36.slots.default;
    var __VLS_36;
    __VLS_12.slots.default;
    var __VLS_12;
    const __VLS_53 = {}.IonPage;
    /** @type { [typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, typeof __VLS_components.IonPage, typeof __VLS_components.ionPage, ] } */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        id: ("main-content"),
    }));
    const __VLS_55 = __VLS_54({
        id: ("main-content"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    const __VLS_59 = {}.IonHeader;
    /** @type { [typeof __VLS_components.IonHeader, typeof __VLS_components.ionHeader, typeof __VLS_components.IonHeader, typeof __VLS_components.ionHeader, ] } */ ;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({}));
    const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
    const __VLS_65 = {}.IonToolbar;
    /** @type { [typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, typeof __VLS_components.IonToolbar, typeof __VLS_components.ionToolbar, ] } */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
    const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
    const __VLS_71 = {}.IonButtons;
    /** @type { [typeof __VLS_components.IonButtons, typeof __VLS_components.ionButtons, typeof __VLS_components.IonButtons, typeof __VLS_components.ionButtons, ] } */ ;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        slot: ("start"),
    }));
    const __VLS_73 = __VLS_72({
        slot: ("start"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    const __VLS_77 = {}.IonMenuButton;
    /** @type { [typeof __VLS_components.IonMenuButton, typeof __VLS_components.ionMenuButton, typeof __VLS_components.IonMenuButton, typeof __VLS_components.ionMenuButton, ] } */ ;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({}));
    const __VLS_79 = __VLS_78({}, ...__VLS_functionalComponentArgsRest(__VLS_78));
    __VLS_76.slots.default;
    var __VLS_76;
    const __VLS_83 = {}.IonTitle;
    /** @type { [typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, typeof __VLS_components.IonTitle, typeof __VLS_components.ionTitle, ] } */ ;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({}));
    const __VLS_85 = __VLS_84({}, ...__VLS_functionalComponentArgsRest(__VLS_84));
    __VLS_88.slots.default;
    var __VLS_88;
    __VLS_70.slots.default;
    var __VLS_70;
    __VLS_64.slots.default;
    var __VLS_64;
    const __VLS_89 = {}.IonRouterOutlet;
    /** @type { [typeof __VLS_components.IonRouterOutlet, typeof __VLS_components.ionRouterOutlet, typeof __VLS_components.IonRouterOutlet, typeof __VLS_components.ionRouterOutlet, ] } */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({}));
    const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
    __VLS_58.slots.default;
    var __VLS_58;
    __VLS_5.slots.default;
    var __VLS_5;
    ['ion-padding',];
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
            IonMenu: IonMenu,
            IonHeader: IonHeader,
            IonToolbar: IonToolbar,
            IonTitle: IonTitle,
            IonContent: IonContent,
            IonSegmentButton: IonSegmentButton,
            IonPage: IonPage,
            IonButtons: IonButtons,
            IonMenuButton: IonMenuButton,
            IonRouterOutlet: IonRouterOutlet,
            handleLogout: handleLogout,
            routeToProfileSettings: routeToProfileSettings,
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
