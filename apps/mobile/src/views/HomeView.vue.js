import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import { faBowlRice, faPlateWheat, faUtensils, faMedal, faShoePrints, faCog, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const router = useRouter();
const { user } = useAuthStore();
const handleScanRouting = () => {
    router.push('/dashboard/scan');
};
const routeToUserSettings = () => {
    router.push('/user/settings');
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
        ...{ class: ("p-6 w-full h-full flex items-center flex-col gap-6") },
    });
    const __VLS_13 = {}.IonCard;
    /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        ...{ class: ("p-2 w-full border-2 to-primary from-primary/50 bg-gradient-to-l border-primary rounded-2xl shadow-lg") },
    }));
    const __VLS_15 = __VLS_14({
        ...{ class: ("p-2 w-full border-2 to-primary from-primary/50 bg-gradient-to-l border-primary rounded-2xl shadow-lg") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = {}.IonCardContent;
    /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full h-full flex flex-row justify-between items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-row items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        ...{ class: ("w-16 bg-cover bg-center rounded-full") },
        src: ("https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid"),
        alt: ("user avatar"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-white flex flex-col ml-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    (__VLS_ctx.user?.name ? __VLS_ctx.user.name : 'Guest');
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
    });
    (__VLS_ctx.user?.email);
    const __VLS_25 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ 'onClick': {} },
        icon: ((__VLS_ctx.faCog)),
        ...{ class: ("text-white text-4xl") },
    }));
    const __VLS_27 = __VLS_26({
        ...{ 'onClick': {} },
        icon: ((__VLS_ctx.faCog)),
        ...{ class: ("text-white text-4xl") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_31;
    const __VLS_32 = {
        onClick: (__VLS_ctx.routeToUserSettings)
    };
    let __VLS_28;
    let __VLS_29;
    var __VLS_30;
    __VLS_24.slots.default;
    var __VLS_24;
    __VLS_18.slots.default;
    var __VLS_18;
    const __VLS_33 = {}.IonCard;
    /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg w-full") },
    }));
    const __VLS_35 = __VLS_34({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg w-full") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const __VLS_39 = {}.IonCardHeader;
    /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({}));
    const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const __VLS_45 = {}.IonCardTitle;
    /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
    const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_50.slots.default;
    var __VLS_50;
    __VLS_44.slots.default;
    var __VLS_44;
    const __VLS_51 = {}.IonCardContent;
    /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({}));
    const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full h-full flex flex-col justify-between items-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full h-full flex flex-row justify-between items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-row items-center justify-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
    });
    const __VLS_57 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        icon: ((__VLS_ctx.faPlateWheat)),
    }));
    const __VLS_59 = __VLS_58({
        icon: ((__VLS_ctx.faPlateWheat)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-row items-center justify-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
    });
    const __VLS_63 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        icon: ((__VLS_ctx.faUtensils)),
    }));
    const __VLS_65 = __VLS_64({
        icon: ((__VLS_ctx.faUtensils)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-row items-center justify-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
    });
    const __VLS_69 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
        icon: ((__VLS_ctx.faBowlRice)),
    }));
    const __VLS_71 = __VLS_70({
        icon: ((__VLS_ctx.faBowlRice)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    const __VLS_75 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
        ...{ 'onClick': {} },
        ...{ class: ("w-full text-white") },
    }));
    const __VLS_77 = __VLS_76({
        ...{ 'onClick': {} },
        ...{ class: ("w-full text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    let __VLS_81;
    const __VLS_82 = {
        onClick: (__VLS_ctx.handleScanRouting)
    };
    let __VLS_78;
    let __VLS_79;
    __VLS_80.slots.default;
    var __VLS_80;
    __VLS_56.slots.default;
    var __VLS_56;
    __VLS_38.slots.default;
    var __VLS_38;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full flex flex-row justify-between items-center gap-6") },
    });
    const __VLS_83 = {}.IonCard;
    /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-3/5") },
    }));
    const __VLS_85 = __VLS_84({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-3/5") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    const __VLS_89 = {}.IonCardHeader;
    /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({}));
    const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
    const __VLS_95 = {}.IonCardTitle;
    /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({}));
    const __VLS_97 = __VLS_96({}, ...__VLS_functionalComponentArgsRest(__VLS_96));
    const __VLS_101 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        icon: ((__VLS_ctx.faMedal)),
    }));
    const __VLS_103 = __VLS_102({
        icon: ((__VLS_ctx.faMedal)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    __VLS_100.slots.default;
    var __VLS_100;
    __VLS_94.slots.default;
    var __VLS_94;
    const __VLS_107 = {}.IonCardContent;
    /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
    // @ts-ignore
    const __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
        ...{ class: ("flex items-center justify-center") },
    }));
    const __VLS_109 = __VLS_108({
        ...{ class: ("flex items-center justify-center") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_108));
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        ...{ class: ("w-36 h-36 mb-2") },
        viewBox: ("0 0 64 64"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.circle)({
        ...{ class: ("text-medium-shade") },
        'stroke-width': ("4"),
        'stroke-dasharray': ("188"),
        'stroke-dashoffset': ("0"),
        'stroke-linecap': ("round"),
        stroke: ("currentColor"),
        fill: ("transparent"),
        r: ("30"),
        cx: ("32"),
        cy: ("32"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.circle)({
        ...{ class: ("calories-complete-circle text-primary") },
        'stroke-width': ("4"),
        'stroke-dasharray': ("188"),
        'stroke-dashoffset': ((188 - (188 * 30) / 100)),
        transform: ("rotate(-90 32 32)"),
        stroke: ("currentColor"),
        fill: ("transparent"),
        r: ("30"),
        cx: ("32"),
        cy: ("32"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
        ...{ class: ("text-xl calories-complete-percent") },
        x: ("50%"),
        y: ("50%"),
        'dominant-baseline': ("middle"),
        'text-anchor': ("middle"),
    });
    __VLS_112.slots.default;
    var __VLS_112;
    __VLS_88.slots.default;
    var __VLS_88;
    const __VLS_113 = {}.IonCard;
    /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
        ...{ class: ("flex flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-2/5") },
    }));
    const __VLS_115 = __VLS_114({
        ...{ class: ("flex flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-2/5") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_114));
    const __VLS_119 = {}.IonCardHeader;
    /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
    // @ts-ignore
    const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({}));
    const __VLS_121 = __VLS_120({}, ...__VLS_functionalComponentArgsRest(__VLS_120));
    const __VLS_125 = {}.IonCardTitle;
    /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
    // @ts-ignore
    const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({}));
    const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
    __VLS_130.slots.default;
    var __VLS_130;
    __VLS_124.slots.default;
    var __VLS_124;
    const __VLS_131 = {}.IonCardContent;
    /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
        ...{ class: ("flex flex-grow") },
    }));
    const __VLS_133 = __VLS_132({
        ...{ class: ("flex flex-grow") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full h-full flex flex-col justify-center items-center gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-4xl") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-row items-center justify-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
    });
    const __VLS_137 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
        icon: ((__VLS_ctx.faShoePrints)),
    }));
    const __VLS_139 = __VLS_138({
        icon: ((__VLS_ctx.faShoePrints)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-4xl") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-row items-center justify-center gap-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
    });
    const __VLS_143 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
        icon: ((__VLS_ctx.faMedal)),
    }));
    const __VLS_145 = __VLS_144({
        icon: ((__VLS_ctx.faMedal)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_144));
    __VLS_136.slots.default;
    var __VLS_136;
    __VLS_118.slots.default;
    var __VLS_118;
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_5.slots.default;
    var __VLS_5;
    ['p-6', 'w-full', 'h-full', 'flex', 'items-center', 'flex-col', 'gap-6', 'p-2', 'w-full', 'border-2', 'to-primary', 'from-primary/50', 'bg-gradient-to-l', 'border-primary', 'rounded-2xl', 'shadow-lg', 'w-full', 'h-full', 'flex', 'flex-row', 'justify-between', 'items-center', 'flex', 'flex-row', 'items-center', 'justify-center', 'w-16', 'bg-cover', 'bg-center', 'rounded-full', 'text-white', 'flex', 'flex-col', 'ml-2', 'text-sm', 'text-white', 'text-4xl', 'p-2', 'border-2', 'to-light', 'from-medium', 'bg-gradient-to-l', 'border-medium-shade', 'rounded-2xl', 'shadow-lg', 'w-full', 'w-full', 'h-full', 'flex', 'flex-col', 'justify-between', 'items-center', 'gap-2', 'w-full', 'h-full', 'flex', 'flex-row', 'justify-between', 'items-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'flex', 'flex-col', 'items-center', 'justify-center', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'flex', 'flex-col', 'items-center', 'justify-center', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'w-full', 'text-white', 'w-full', 'flex', 'flex-row', 'justify-between', 'items-center', 'gap-6', 'p-2', 'border-2', 'to-light', 'from-medium', 'bg-gradient-to-l', 'border-medium-shade', 'rounded-2xl', 'shadow-lg', 'h-full', 'w-3/5', 'flex', 'items-center', 'justify-center', 'w-36', 'h-36', 'mb-2', 'text-medium-shade', 'calories-complete-circle', 'text-primary', 'text-xl', 'calories-complete-percent', 'flex', 'flex-col', 'p-2', 'border-2', 'to-light', 'from-medium', 'bg-gradient-to-l', 'border-medium-shade', 'rounded-2xl', 'shadow-lg', 'h-full', 'w-2/5', 'flex', 'flex-grow', 'w-full', 'h-full', 'flex', 'flex-col', 'justify-center', 'items-center', 'gap-4', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-4xl', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-2', 'text-sm', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-4xl', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-2', 'text-sm',];
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
            faBowlRice: faBowlRice,
            faPlateWheat: faPlateWheat,
            faUtensils: faUtensils,
            faMedal: faMedal,
            faShoePrints: faShoePrints,
            faCog: faCog,
            FontAwesomeIcon: FontAwesomeIcon,
            user: user,
            handleScanRouting: handleScanRouting,
            routeToUserSettings: routeToUserSettings,
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
