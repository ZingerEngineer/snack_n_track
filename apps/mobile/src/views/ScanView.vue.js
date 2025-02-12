import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { useScanStore } from '../stores/scan.store';
import { faCameraAlt, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const { pickPhotoHandler, resetPhoto, anaylsePhotoHandler, imagePath, nutritionData } = useScanStore(); /* PartiallyEnd: #3632/scriptSetup.vue */
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
        ...{ class: ("content-wrapper h-full flex flex-col items-center justify-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full h-full flex flex-col justify-center items-center gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col w-full h-full justify-center items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.pickPhotoHandler) },
        ...{ class: ("bg-primary-shade w-full h-full flex justify-center items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center gap-2") },
    });
    const __VLS_13 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        icon: ((__VLS_ctx.faCameraAlt)),
        ...{ class: ("text-5xl text-white") },
    }));
    const __VLS_15 = __VLS_14({
        icon: ((__VLS_ctx.faCameraAlt)),
        ...{ class: ("text-5xl text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-white font-bold text-sm") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.pickPhotoHandler) },
        ...{ class: ("bg-tertiary w-full h-full flex justify-center items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center justify-center gap-2") },
    });
    const __VLS_19 = {}.FontAwesomeIcon;
    /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        icon: ((__VLS_ctx.faImages)),
        ...{ class: ("text-5xl text-white") },
    }));
    const __VLS_21 = __VLS_20({
        icon: ((__VLS_ctx.faImages)),
        ...{ class: ("text-5xl text-white") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-white font-bold text-sm") },
    });
    if (__VLS_ctx.imagePath) {
        const __VLS_25 = {}.IonButton;
        /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            onclick: ((__VLS_ctx.anaylsePhotoHandler)),
        }));
        const __VLS_27 = __VLS_26({
            onclick: ((__VLS_ctx.anaylsePhotoHandler)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        __VLS_30.slots.default;
        var __VLS_30;
    }
    if (__VLS_ctx.nutritionData) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mt-4 w-full px-8") },
        });
        if (__VLS_ctx.nutritionData) {
            const __VLS_31 = {}.IonCard;
            /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
                ...{ class: (({
                        'border-2 border-green-500': 'name' in __VLS_ctx.nutritionData,
                        'border-2 border-yellow-500': 'estimated_name' in __VLS_ctx.nutritionData,
                    })) },
            }));
            const __VLS_33 = __VLS_32({
                ...{ class: (({
                        'border-2 border-green-500': 'name' in __VLS_ctx.nutritionData,
                        'border-2 border-yellow-500': 'estimated_name' in __VLS_ctx.nutritionData,
                    })) },
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
            const __VLS_55 = {}.IonGrid;
            /** @type { [typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, ] } */ ;
            // @ts-ignore
            const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
            const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
            if ('name' in __VLS_ctx.nutritionData) {
                const __VLS_61 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({}));
                const __VLS_63 = __VLS_62({}, ...__VLS_functionalComponentArgsRest(__VLS_62));
                const __VLS_67 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({}));
                const __VLS_69 = __VLS_68({}, ...__VLS_functionalComponentArgsRest(__VLS_68));
                __VLS_72.slots.default;
                var __VLS_72;
                const __VLS_73 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({}));
                const __VLS_75 = __VLS_74({}, ...__VLS_functionalComponentArgsRest(__VLS_74));
                (__VLS_ctx.nutritionData.name);
                __VLS_78.slots.default;
                var __VLS_78;
                __VLS_66.slots.default;
                var __VLS_66;
            }
            if ('estimated_name' in __VLS_ctx.nutritionData) {
                const __VLS_79 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({}));
                const __VLS_81 = __VLS_80({}, ...__VLS_functionalComponentArgsRest(__VLS_80));
                const __VLS_85 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({}));
                const __VLS_87 = __VLS_86({}, ...__VLS_functionalComponentArgsRest(__VLS_86));
                __VLS_90.slots.default;
                var __VLS_90;
                const __VLS_91 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({}));
                const __VLS_93 = __VLS_92({}, ...__VLS_functionalComponentArgsRest(__VLS_92));
                (__VLS_ctx.nutritionData.estimated_name);
                __VLS_96.slots.default;
                var __VLS_96;
                __VLS_84.slots.default;
                var __VLS_84;
            }
            if ('type_of_food' in __VLS_ctx.nutritionData) {
                const __VLS_97 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({}));
                const __VLS_99 = __VLS_98({}, ...__VLS_functionalComponentArgsRest(__VLS_98));
                const __VLS_103 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({}));
                const __VLS_105 = __VLS_104({}, ...__VLS_functionalComponentArgsRest(__VLS_104));
                __VLS_108.slots.default;
                var __VLS_108;
                const __VLS_109 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({}));
                const __VLS_111 = __VLS_110({}, ...__VLS_functionalComponentArgsRest(__VLS_110));
                (__VLS_ctx.nutritionData.type_of_food);
                __VLS_114.slots.default;
                var __VLS_114;
                __VLS_102.slots.default;
                var __VLS_102;
            }
            if ('estimated_typeOfFood' in __VLS_ctx.nutritionData) {
                const __VLS_115 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({}));
                const __VLS_117 = __VLS_116({}, ...__VLS_functionalComponentArgsRest(__VLS_116));
                const __VLS_121 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({}));
                const __VLS_123 = __VLS_122({}, ...__VLS_functionalComponentArgsRest(__VLS_122));
                __VLS_126.slots.default;
                var __VLS_126;
                const __VLS_127 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({}));
                const __VLS_129 = __VLS_128({}, ...__VLS_functionalComponentArgsRest(__VLS_128));
                (__VLS_ctx.nutritionData.estimated_typeOfFood);
                __VLS_132.slots.default;
                var __VLS_132;
                __VLS_120.slots.default;
                var __VLS_120;
            }
            if ('proteins' in __VLS_ctx.nutritionData) {
                const __VLS_133 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({}));
                const __VLS_135 = __VLS_134({}, ...__VLS_functionalComponentArgsRest(__VLS_134));
                const __VLS_139 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({}));
                const __VLS_141 = __VLS_140({}, ...__VLS_functionalComponentArgsRest(__VLS_140));
                __VLS_144.slots.default;
                var __VLS_144;
                const __VLS_145 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({}));
                const __VLS_147 = __VLS_146({}, ...__VLS_functionalComponentArgsRest(__VLS_146));
                (__VLS_ctx.nutritionData.proteins);
                __VLS_150.slots.default;
                var __VLS_150;
                __VLS_138.slots.default;
                var __VLS_138;
            }
            if ('carbs' in __VLS_ctx.nutritionData) {
                const __VLS_151 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({}));
                const __VLS_153 = __VLS_152({}, ...__VLS_functionalComponentArgsRest(__VLS_152));
                const __VLS_157 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({}));
                const __VLS_159 = __VLS_158({}, ...__VLS_functionalComponentArgsRest(__VLS_158));
                __VLS_162.slots.default;
                var __VLS_162;
                const __VLS_163 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({}));
                const __VLS_165 = __VLS_164({}, ...__VLS_functionalComponentArgsRest(__VLS_164));
                (__VLS_ctx.nutritionData.carbs);
                __VLS_168.slots.default;
                var __VLS_168;
                __VLS_156.slots.default;
                var __VLS_156;
            }
            if ('fats' in __VLS_ctx.nutritionData) {
                const __VLS_169 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({}));
                const __VLS_171 = __VLS_170({}, ...__VLS_functionalComponentArgsRest(__VLS_170));
                const __VLS_175 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_176 = __VLS_asFunctionalComponent(__VLS_175, new __VLS_175({}));
                const __VLS_177 = __VLS_176({}, ...__VLS_functionalComponentArgsRest(__VLS_176));
                __VLS_180.slots.default;
                var __VLS_180;
                const __VLS_181 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({}));
                const __VLS_183 = __VLS_182({}, ...__VLS_functionalComponentArgsRest(__VLS_182));
                (__VLS_ctx.nutritionData.fats);
                __VLS_186.slots.default;
                var __VLS_186;
                __VLS_174.slots.default;
                var __VLS_174;
            }
            if ('vitamins' in __VLS_ctx.nutritionData) {
                const __VLS_187 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({}));
                const __VLS_189 = __VLS_188({}, ...__VLS_functionalComponentArgsRest(__VLS_188));
                const __VLS_193 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({}));
                const __VLS_195 = __VLS_194({}, ...__VLS_functionalComponentArgsRest(__VLS_194));
                __VLS_198.slots.default;
                var __VLS_198;
                const __VLS_199 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_200 = __VLS_asFunctionalComponent(__VLS_199, new __VLS_199({}));
                const __VLS_201 = __VLS_200({}, ...__VLS_functionalComponentArgsRest(__VLS_200));
                __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                for (const [vitamin, index] of __VLS_getVForSourceType((__VLS_ctx.nutritionData.vitamins))) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                        key: ((index)),
                    });
                    (vitamin.vitamin_name);
                    (vitamin.vitamin_portion);
                }
                __VLS_204.slots.default;
                var __VLS_204;
                __VLS_192.slots.default;
                var __VLS_192;
            }
            __VLS_60.slots.default;
            var __VLS_60;
            __VLS_54.slots.default;
            var __VLS_54;
            __VLS_36.slots.default;
            var __VLS_36;
        }
    }
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_5.slots.default;
    var __VLS_5;
    ['content-wrapper', 'h-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'h-full', 'flex', 'flex-col', 'justify-center', 'items-center', 'gap-4', 'flex', 'flex-col', 'w-full', 'h-full', 'justify-center', 'items-center', 'bg-primary-shade', 'w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-2', 'text-5xl', 'text-white', 'text-white', 'font-bold', 'text-sm', 'bg-tertiary', 'w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-2', 'text-5xl', 'text-white', 'text-white', 'font-bold', 'text-sm', 'mt-4', 'w-full', 'px-8', 'border-2', 'border-green-500', 'border-2', 'border-yellow-500',];
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
            faCameraAlt: faCameraAlt,
            faImages: faImages,
            FontAwesomeIcon: FontAwesomeIcon,
            pickPhotoHandler: pickPhotoHandler,
            anaylsePhotoHandler: anaylsePhotoHandler,
            imagePath: imagePath,
            nutritionData: nutritionData,
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
