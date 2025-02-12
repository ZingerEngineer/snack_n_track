import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import { faBowlRice, faPlateWheat, faUtensils, faMedal, faShoePrints, faCog, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const router = useRouter();
const { user } = useAuthStore();
const handleScanRouting = () => {
    router.push('/dashboard/scan');
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
    (__VLS_ctx.user.name ? __VLS_ctx.user.name : 'Guest');
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm") },
    });
    (__VLS_ctx.user?.email);
    const __VLS_25 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        icon: ((__VLS_ctx.faCog)),
        ...{ class: ("text-white text-4xl") },
    }));
    const __VLS_27 = __VLS_26({
        icon: ((__VLS_ctx.faCog)),
        ...{ class: ("text-white text-4xl") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_24.slots.default;
    var __VLS_24;
    __VLS_18.slots.default;
    var __VLS_18;
    const __VLS_31 = {}.IonCard;
    /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg w-full") },
    }));
    const __VLS_33 = __VLS_32({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg w-full") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const __VLS_37 = {}.IonCardHeader;
    /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
    const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
    const __VLS_43 = {}.IonCardTitle;
    /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
    const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
    __VLS_48.slots.default;
    var __VLS_48;
    __VLS_42.slots.default;
    var __VLS_42;
    const __VLS_49 = {}.IonCardContent;
    /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
    const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
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
    const __VLS_55 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        icon: ((__VLS_ctx.faPlateWheat)),
    }));
    const __VLS_57 = __VLS_56({
        icon: ((__VLS_ctx.faPlateWheat)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
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
    const __VLS_61 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        icon: ((__VLS_ctx.faUtensils)),
    }));
    const __VLS_63 = __VLS_62({
        icon: ((__VLS_ctx.faUtensils)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
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
    const __VLS_67 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
        icon: ((__VLS_ctx.faBowlRice)),
    }));
    const __VLS_69 = __VLS_68({
        icon: ((__VLS_ctx.faBowlRice)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    const __VLS_73 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        ...{ 'onClick': {} },
        ...{ class: ("w-full text-white") },
    }));
    const __VLS_75 = __VLS_74({
        ...{ 'onClick': {} },
        ...{ class: ("w-full text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    let __VLS_79;
    const __VLS_80 = {
        onClick: (__VLS_ctx.handleScanRouting)
    };
    let __VLS_76;
    let __VLS_77;
    __VLS_78.slots.default;
    var __VLS_78;
    __VLS_54.slots.default;
    var __VLS_54;
    __VLS_36.slots.default;
    var __VLS_36;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full flex flex-row justify-between items-center gap-6") },
    });
    const __VLS_81 = {}.IonCard;
    /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-3/5") },
    }));
    const __VLS_83 = __VLS_82({
        ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-3/5") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    const __VLS_87 = {}.IonCardHeader;
    /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({}));
    const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
    const __VLS_93 = {}.IonCardTitle;
    /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({}));
    const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
    const __VLS_99 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
        icon: ((__VLS_ctx.faMedal)),
    }));
    const __VLS_101 = __VLS_100({
        icon: ((__VLS_ctx.faMedal)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
    __VLS_98.slots.default;
    var __VLS_98;
    __VLS_92.slots.default;
    var __VLS_92;
    const __VLS_105 = {}.IonCardContent;
    /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        ...{ class: ("flex items-center justify-center") },
    }));
    const __VLS_107 = __VLS_106({
        ...{ class: ("flex items-center justify-center") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
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
    __VLS_110.slots.default;
    var __VLS_110;
    __VLS_86.slots.default;
    var __VLS_86;
    const __VLS_111 = {}.IonCard;
    /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
    // @ts-ignore
    const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
        ...{ class: ("flex flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-2/5") },
    }));
    const __VLS_113 = __VLS_112({
        ...{ class: ("flex flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg h-full w-2/5") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_112));
    const __VLS_117 = {}.IonCardHeader;
    /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({}));
    const __VLS_119 = __VLS_118({}, ...__VLS_functionalComponentArgsRest(__VLS_118));
    const __VLS_123 = {}.IonCardTitle;
    /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({}));
    const __VLS_125 = __VLS_124({}, ...__VLS_functionalComponentArgsRest(__VLS_124));
    __VLS_128.slots.default;
    var __VLS_128;
    __VLS_122.slots.default;
    var __VLS_122;
    const __VLS_129 = {}.IonCardContent;
    /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
        ...{ class: ("flex flex-grow") },
    }));
    const __VLS_131 = __VLS_130({
        ...{ class: ("flex flex-grow") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
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
    const __VLS_135 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
        icon: ((__VLS_ctx.faShoePrints)),
    }));
    const __VLS_137 = __VLS_136({
        icon: ((__VLS_ctx.faShoePrints)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
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
    const __VLS_141 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
        icon: ((__VLS_ctx.faMedal)),
    }));
    const __VLS_143 = __VLS_142({
        icon: ((__VLS_ctx.faMedal)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    __VLS_134.slots.default;
    var __VLS_134;
    __VLS_116.slots.default;
    var __VLS_116;
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
