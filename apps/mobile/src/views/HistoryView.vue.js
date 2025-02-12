import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { INutritionData, IEstimatedNutritionData } from '../types/global.types';
const scannedFood = ref(null); /* PartiallyEnd: #3632/scriptSetup.vue */
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
    const __VLS_7 = {}.IonContent;
    /** @type { [typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, typeof __VLS_components.IonContent, typeof __VLS_components.ionContent, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    if (__VLS_ctx.scannedFood && __VLS_ctx.scannedFood.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        for (const [data] of __VLS_getVForSourceType((__VLS_ctx.scannedFood))) {
            const __VLS_13 = {}.IonCard;
            /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
            // @ts-ignore
            const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
                key: ((data.id)),
            }));
            const __VLS_15 = __VLS_14({
                key: ((data.id)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_14));
            const __VLS_19 = {}.IonCardHeader;
            /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
            // @ts-ignore
            const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
            const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
            const __VLS_25 = {}.IonCardTitle;
            /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
            // @ts-ignore
            const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
            const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
            (data.name || data.estimated_name);
            __VLS_30.slots.default;
            var __VLS_30;
            __VLS_24.slots.default;
            var __VLS_24;
            const __VLS_31 = {}.IonCardContent;
            /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({}));
            const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
            const __VLS_37 = {}.IonGrid;
            /** @type { [typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, ] } */ ;
            // @ts-ignore
            const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
            const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
            const __VLS_43 = {}.IonRow;
            /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
            const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
            const __VLS_49 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
            const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
            __VLS_54.slots.default;
            var __VLS_54;
            const __VLS_55 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
            const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
            (data.id);
            __VLS_60.slots.default;
            var __VLS_60;
            __VLS_48.slots.default;
            var __VLS_48;
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
            (data.percentage_of_certainty);
            __VLS_78.slots.default;
            var __VLS_78;
            __VLS_66.slots.default;
            var __VLS_66;
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
            (data.isSure ? 'Yes' : 'No');
            __VLS_96.slots.default;
            var __VLS_96;
            __VLS_84.slots.default;
            var __VLS_84;
            if ('name' in data) {
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
                (data.name);
                __VLS_114.slots.default;
                var __VLS_114;
                __VLS_102.slots.default;
                var __VLS_102;
            }
            if ('estimated_name' in data) {
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
                (data.estimated_name);
                __VLS_132.slots.default;
                var __VLS_132;
                __VLS_120.slots.default;
                var __VLS_120;
            }
            if ('type_of_food' in data) {
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
                (data.type_of_food);
                __VLS_150.slots.default;
                var __VLS_150;
                __VLS_138.slots.default;
                var __VLS_138;
            }
            if ('estimated_typeOfFood' in data) {
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
                (data.estimated_typeOfFood);
                __VLS_168.slots.default;
                var __VLS_168;
                __VLS_156.slots.default;
                var __VLS_156;
            }
            if ('proteins' in data) {
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
                (data.proteins);
                __VLS_186.slots.default;
                var __VLS_186;
                __VLS_174.slots.default;
                var __VLS_174;
            }
            if ('carbs' in data) {
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
                (data.carbs);
                __VLS_204.slots.default;
                var __VLS_204;
                __VLS_192.slots.default;
                var __VLS_192;
            }
            if ('fats' in data) {
                const __VLS_205 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_206 = __VLS_asFunctionalComponent(__VLS_205, new __VLS_205({}));
                const __VLS_207 = __VLS_206({}, ...__VLS_functionalComponentArgsRest(__VLS_206));
                const __VLS_211 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({}));
                const __VLS_213 = __VLS_212({}, ...__VLS_functionalComponentArgsRest(__VLS_212));
                __VLS_216.slots.default;
                var __VLS_216;
                const __VLS_217 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({}));
                const __VLS_219 = __VLS_218({}, ...__VLS_functionalComponentArgsRest(__VLS_218));
                (data.fats);
                __VLS_222.slots.default;
                var __VLS_222;
                __VLS_210.slots.default;
                var __VLS_210;
            }
            if ('vitamins' in data) {
                const __VLS_223 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_224 = __VLS_asFunctionalComponent(__VLS_223, new __VLS_223({}));
                const __VLS_225 = __VLS_224({}, ...__VLS_functionalComponentArgsRest(__VLS_224));
                const __VLS_229 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({}));
                const __VLS_231 = __VLS_230({}, ...__VLS_functionalComponentArgsRest(__VLS_230));
                __VLS_234.slots.default;
                var __VLS_234;
                const __VLS_235 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_236 = __VLS_asFunctionalComponent(__VLS_235, new __VLS_235({}));
                const __VLS_237 = __VLS_236({}, ...__VLS_functionalComponentArgsRest(__VLS_236));
                __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                for (const [vitamin, index] of __VLS_getVForSourceType((data.vitamins))) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                        key: ((index)),
                    });
                    (vitamin.vitamin_name);
                    (vitamin.vitamin_portion);
                }
                __VLS_240.slots.default;
                var __VLS_240;
                __VLS_228.slots.default;
                var __VLS_228;
            }
            __VLS_42.slots.default;
            var __VLS_42;
            __VLS_36.slots.default;
            var __VLS_36;
            __VLS_18.slots.default;
            var __VLS_18;
        }
    }
    if (!__VLS_ctx.scannedFood) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-full h-full flex justify-center items-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-xl") },
        });
    }
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_5.slots.default;
    var __VLS_5;
    ['w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'text-xl',];
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
            IonCard: IonCard,
            IonCardHeader: IonCardHeader,
            IonCardTitle: IonCardTitle,
            IonCardContent: IonCardContent,
            IonGrid: IonGrid,
            IonRow: IonRow,
            IonCol: IonCol,
            scannedFood: scannedFood,
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
