import { IonPage, IonContent } from '@ionic/vue';
import { useScanStore } from '../../stores/scan.store';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useLoadingStore } from '../../stores/loading.store';
import formatNutritionString from './util/uploadResults';
import { faCircleCheck, faSadTear } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRotateBack, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
const router = useRouter();
const scanStore = useScanStore();
const loadingStore = useLoadingStore();
const nutritionData = computed(() => scanStore.nutritionData);
const isLoading = computed(() => loadingStore.isLoading);
const routeToDashBoard = () => {
    router.push('/dashboard');
};
const routeToUploadPhoto = () => {
    router.push('/scan/upload');
};
const handleAddFood = () => { };
watch(nutritionData, (newValue) => {
    console.log('Nutrition data updated:', newValue);
}); /* PartiallyEnd: #3632/scriptSetup.vue */
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
        ...{ class: ("w-full h-full flex justify-center items-center") },
    });
    if (__VLS_ctx.nutritionData && !__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mt-[22rem] w-full px-8 flex justify-center items-center flex-col gap-6") },
        });
        if (__VLS_ctx.scanStore.imagePath) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
                src: ((__VLS_ctx.scanStore.imagePath ? __VLS_ctx.scanStore.imagePath : '')),
                ...{ class: ("w-1/2 h-1/2 rounded-lg shadow-lg border-2 border-primary") },
            });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col gap-6") },
        });
        if ('name' in __VLS_ctx.nutritionData) {
            const __VLS_13 = {}.IonCard;
            /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
            // @ts-ignore
            const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
                ...{ class: ("relative p-2 w-full border-2 to-primary from-primary/50 bg-gradient-to-l border-primary rounded-2xl shadow-lg") },
            }));
            const __VLS_15 = __VLS_14({
                ...{ class: ("relative p-2 w-full border-2 to-primary from-primary/50 bg-gradient-to-l border-primary rounded-2xl shadow-lg") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_14));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("absolute top-2 right-2 flex flex-row items-center justify-center rounded-lg bg-white p-2 gap-2") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: ("text-primary text-xs") },
            });
            const __VLS_19 = {}.FontAwesomeIcon;
            /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
            // @ts-ignore
            const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
                ...{ class: ("text-primary text-lg") },
                icon: ((__VLS_ctx.faCircleCheck)),
            }));
            const __VLS_21 = __VLS_20({
                ...{ class: ("text-primary text-lg") },
                icon: ((__VLS_ctx.faCircleCheck)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_20));
            const __VLS_25 = {}.IonCardHeader;
            /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
            // @ts-ignore
            const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
            const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
            const __VLS_31 = {}.IonCardTitle;
            /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
                ...{ class: ("text-white") },
            }));
            const __VLS_33 = __VLS_32({
                ...{ class: ("text-white") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_32));
            __VLS_36.slots.default;
            var __VLS_36;
            __VLS_30.slots.default;
            var __VLS_30;
            const __VLS_37 = {}.IonCardContent;
            /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
            // @ts-ignore
            const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
                ...{ class: ("text-xs text-white") },
            }));
            const __VLS_39 = __VLS_38({
                ...{ class: ("text-xs text-white") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_38));
            const __VLS_43 = {}.IonGrid;
            /** @type { [typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, ] } */ ;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
            const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
            const __VLS_49 = {}.IonRow;
            /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
            // @ts-ignore
            const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
            const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
            const __VLS_55 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
            const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
            __VLS_60.slots.default;
            var __VLS_60;
            const __VLS_61 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({}));
            const __VLS_63 = __VLS_62({}, ...__VLS_functionalComponentArgsRest(__VLS_62));
            (__VLS_ctx.nutritionData.name);
            __VLS_66.slots.default;
            var __VLS_66;
            __VLS_54.slots.default;
            var __VLS_54;
            if ('type_of_food' in __VLS_ctx.nutritionData) {
                const __VLS_67 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({}));
                const __VLS_69 = __VLS_68({}, ...__VLS_functionalComponentArgsRest(__VLS_68));
                const __VLS_73 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({}));
                const __VLS_75 = __VLS_74({}, ...__VLS_functionalComponentArgsRest(__VLS_74));
                __VLS_78.slots.default;
                var __VLS_78;
                const __VLS_79 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({}));
                const __VLS_81 = __VLS_80({}, ...__VLS_functionalComponentArgsRest(__VLS_80));
                (__VLS_ctx.nutritionData.type_of_food);
                __VLS_84.slots.default;
                var __VLS_84;
                __VLS_72.slots.default;
                var __VLS_72;
            }
            __VLS_48.slots.default;
            var __VLS_48;
            __VLS_42.slots.default;
            var __VLS_42;
            __VLS_18.slots.default;
            var __VLS_18;
        }
        if ('estimated_name' in __VLS_ctx.nutritionData) {
            const __VLS_85 = {}.IonCard;
            /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
            // @ts-ignore
            const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
                ...{ class: ("p-2 w-full border-2 to-yellow-500 from-yellow-300/50 bg-gradient-to-l border-yellow-500 rounded-2xl shadow-lg") },
            }));
            const __VLS_87 = __VLS_86({
                ...{ class: ("p-2 w-full border-2 to-yellow-500 from-yellow-300/50 bg-gradient-to-l border-yellow-500 rounded-2xl shadow-lg") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_86));
            const __VLS_91 = {}.IonCardHeader;
            /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
            // @ts-ignore
            const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({}));
            const __VLS_93 = __VLS_92({}, ...__VLS_functionalComponentArgsRest(__VLS_92));
            const __VLS_97 = {}.IonCardTitle;
            /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
            // @ts-ignore
            const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({}));
            const __VLS_99 = __VLS_98({}, ...__VLS_functionalComponentArgsRest(__VLS_98));
            __VLS_102.slots.default;
            var __VLS_102;
            __VLS_96.slots.default;
            var __VLS_96;
            const __VLS_103 = {}.IonCardContent;
            /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
            // @ts-ignore
            const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({}));
            const __VLS_105 = __VLS_104({}, ...__VLS_functionalComponentArgsRest(__VLS_104));
            const __VLS_109 = {}.IonGrid;
            /** @type { [typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, ] } */ ;
            // @ts-ignore
            const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({}));
            const __VLS_111 = __VLS_110({}, ...__VLS_functionalComponentArgsRest(__VLS_110));
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
            (__VLS_ctx.nutritionData.estimated_name);
            __VLS_132.slots.default;
            var __VLS_132;
            __VLS_120.slots.default;
            var __VLS_120;
            if ('estimated_typeOfFood' in __VLS_ctx.nutritionData) {
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
                (__VLS_ctx.nutritionData.estimated_typeOfFood);
                __VLS_150.slots.default;
                var __VLS_150;
                __VLS_138.slots.default;
                var __VLS_138;
            }
            __VLS_114.slots.default;
            var __VLS_114;
            __VLS_108.slots.default;
            var __VLS_108;
            __VLS_90.slots.default;
            var __VLS_90;
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-row gap-6 justify-center") },
        });
        const __VLS_151 = {}.IonCard;
        /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
        // @ts-ignore
        const __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
            ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow") },
        }));
        const __VLS_153 = __VLS_152({
            ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_152));
        const __VLS_157 = {}.IonCardHeader;
        /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
        // @ts-ignore
        const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({}));
        const __VLS_159 = __VLS_158({}, ...__VLS_functionalComponentArgsRest(__VLS_158));
        const __VLS_163 = {}.IonCardTitle;
        /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
        // @ts-ignore
        const __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163({
            ...{ class: ("text-lg") },
        }));
        const __VLS_165 = __VLS_164({
            ...{ class: ("text-lg") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_164));
        __VLS_168.slots.default;
        var __VLS_168;
        __VLS_162.slots.default;
        var __VLS_162;
        const __VLS_169 = {}.IonCardContent;
        /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
        // @ts-ignore
        const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
            ...{ class: ("text-xs") },
        }));
        const __VLS_171 = __VLS_170({
            ...{ class: ("text-xs") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_170));
        const __VLS_175 = {}.IonGrid;
        /** @type { [typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, ] } */ ;
        // @ts-ignore
        const __VLS_176 = __VLS_asFunctionalComponent(__VLS_175, new __VLS_175({}));
        const __VLS_177 = __VLS_176({}, ...__VLS_functionalComponentArgsRest(__VLS_176));
        if ('proteins' in __VLS_ctx.nutritionData) {
            const __VLS_181 = {}.IonRow;
            /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
            // @ts-ignore
            const __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({}));
            const __VLS_183 = __VLS_182({}, ...__VLS_functionalComponentArgsRest(__VLS_182));
            const __VLS_187 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({}));
            const __VLS_189 = __VLS_188({}, ...__VLS_functionalComponentArgsRest(__VLS_188));
            __VLS_192.slots.default;
            var __VLS_192;
            const __VLS_193 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({}));
            const __VLS_195 = __VLS_194({}, ...__VLS_functionalComponentArgsRest(__VLS_194));
            (__VLS_ctx.formatNutritionString(__VLS_ctx.nutritionData.proteins));
            __VLS_198.slots.default;
            var __VLS_198;
            __VLS_186.slots.default;
            var __VLS_186;
        }
        if ('carbs' in __VLS_ctx.nutritionData) {
            const __VLS_199 = {}.IonRow;
            /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
            // @ts-ignore
            const __VLS_200 = __VLS_asFunctionalComponent(__VLS_199, new __VLS_199({}));
            const __VLS_201 = __VLS_200({}, ...__VLS_functionalComponentArgsRest(__VLS_200));
            const __VLS_205 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_206 = __VLS_asFunctionalComponent(__VLS_205, new __VLS_205({}));
            const __VLS_207 = __VLS_206({}, ...__VLS_functionalComponentArgsRest(__VLS_206));
            __VLS_210.slots.default;
            var __VLS_210;
            const __VLS_211 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_212 = __VLS_asFunctionalComponent(__VLS_211, new __VLS_211({}));
            const __VLS_213 = __VLS_212({}, ...__VLS_functionalComponentArgsRest(__VLS_212));
            (__VLS_ctx.formatNutritionString(__VLS_ctx.nutritionData.carbs));
            __VLS_216.slots.default;
            var __VLS_216;
            __VLS_204.slots.default;
            var __VLS_204;
        }
        if ('fats' in __VLS_ctx.nutritionData) {
            const __VLS_217 = {}.IonRow;
            /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
            // @ts-ignore
            const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({}));
            const __VLS_219 = __VLS_218({}, ...__VLS_functionalComponentArgsRest(__VLS_218));
            const __VLS_223 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_224 = __VLS_asFunctionalComponent(__VLS_223, new __VLS_223({}));
            const __VLS_225 = __VLS_224({}, ...__VLS_functionalComponentArgsRest(__VLS_224));
            __VLS_228.slots.default;
            var __VLS_228;
            const __VLS_229 = {}.IonCol;
            /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
            // @ts-ignore
            const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({}));
            const __VLS_231 = __VLS_230({}, ...__VLS_functionalComponentArgsRest(__VLS_230));
            (__VLS_ctx.formatNutritionString(__VLS_ctx.nutritionData.fats));
            __VLS_234.slots.default;
            var __VLS_234;
            __VLS_222.slots.default;
            var __VLS_222;
        }
        __VLS_180.slots.default;
        var __VLS_180;
        __VLS_174.slots.default;
        var __VLS_174;
        __VLS_156.slots.default;
        var __VLS_156;
        if ('vitamins' in __VLS_ctx.nutritionData) {
            const __VLS_235 = {}.IonCard;
            /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
            // @ts-ignore
            const __VLS_236 = __VLS_asFunctionalComponent(__VLS_235, new __VLS_235({
                ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow") },
            }));
            const __VLS_237 = __VLS_236({
                ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_236));
            const __VLS_241 = {}.IonCardHeader;
            /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
            // @ts-ignore
            const __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({}));
            const __VLS_243 = __VLS_242({}, ...__VLS_functionalComponentArgsRest(__VLS_242));
            const __VLS_247 = {}.IonCardTitle;
            /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
            // @ts-ignore
            const __VLS_248 = __VLS_asFunctionalComponent(__VLS_247, new __VLS_247({
                ...{ class: ("text-lg") },
            }));
            const __VLS_249 = __VLS_248({
                ...{ class: ("text-lg") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_248));
            __VLS_252.slots.default;
            var __VLS_252;
            __VLS_246.slots.default;
            var __VLS_246;
            const __VLS_253 = {}.IonCardContent;
            /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
            // @ts-ignore
            const __VLS_254 = __VLS_asFunctionalComponent(__VLS_253, new __VLS_253({
                ...{ class: ("text-xs") },
            }));
            const __VLS_255 = __VLS_254({
                ...{ class: ("text-xs") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_254));
            const __VLS_259 = {}.IonGrid;
            /** @type { [typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, typeof __VLS_components.IonGrid, typeof __VLS_components.ionGrid, ] } */ ;
            // @ts-ignore
            const __VLS_260 = __VLS_asFunctionalComponent(__VLS_259, new __VLS_259({}));
            const __VLS_261 = __VLS_260({}, ...__VLS_functionalComponentArgsRest(__VLS_260));
            for (const [vitamin, index] of __VLS_getVForSourceType((__VLS_ctx.nutritionData.vitamins))) {
                const __VLS_265 = {}.IonRow;
                /** @type { [typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, typeof __VLS_components.IonRow, typeof __VLS_components.ionRow, ] } */ ;
                // @ts-ignore
                const __VLS_266 = __VLS_asFunctionalComponent(__VLS_265, new __VLS_265({
                    key: ((index)),
                }));
                const __VLS_267 = __VLS_266({
                    key: ((index)),
                }, ...__VLS_functionalComponentArgsRest(__VLS_266));
                const __VLS_271 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_272 = __VLS_asFunctionalComponent(__VLS_271, new __VLS_271({}));
                const __VLS_273 = __VLS_272({}, ...__VLS_functionalComponentArgsRest(__VLS_272));
                (vitamin.vitamin_name);
                __VLS_276.slots.default;
                var __VLS_276;
                const __VLS_277 = {}.IonCol;
                /** @type { [typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, typeof __VLS_components.IonCol, typeof __VLS_components.ionCol, ] } */ ;
                // @ts-ignore
                const __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({}));
                const __VLS_279 = __VLS_278({}, ...__VLS_functionalComponentArgsRest(__VLS_278));
                (__VLS_ctx.formatNutritionString(vitamin.vitamin_portion));
                __VLS_282.slots.default;
                var __VLS_282;
                __VLS_270.slots.default;
                var __VLS_270;
            }
            __VLS_264.slots.default;
            var __VLS_264;
            __VLS_258.slots.default;
            var __VLS_258;
            __VLS_240.slots.default;
            var __VLS_240;
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-center mt-4 gap-2") },
        });
        const __VLS_283 = {}.IonButton;
        /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
        // @ts-ignore
        const __VLS_284 = __VLS_asFunctionalComponent(__VLS_283, new __VLS_283({
            ...{ 'onClick': {} },
            routerLink: ("/dashboard/scan"),
            color: ("primary"),
        }));
        const __VLS_285 = __VLS_284({
            ...{ 'onClick': {} },
            routerLink: ("/dashboard/scan"),
            color: ("primary"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_284));
        let __VLS_289;
        const __VLS_290 = {
            onClick: (__VLS_ctx.handleAddFood)
        };
        let __VLS_286;
        let __VLS_287;
        const __VLS_291 = {}.FontAwesomeIcon;
        /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
        // @ts-ignore
        const __VLS_292 = __VLS_asFunctionalComponent(__VLS_291, new __VLS_291({
            ...{ class: ("mr-2 text-lg") },
            icon: ((__VLS_ctx.faPlusCircle)),
        }));
        const __VLS_293 = __VLS_292({
            ...{ class: ("mr-2 text-lg") },
            icon: ((__VLS_ctx.faPlusCircle)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_292));
        __VLS_288.slots.default;
        var __VLS_288;
        const __VLS_297 = {}.IonButton;
        /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
        // @ts-ignore
        const __VLS_298 = __VLS_asFunctionalComponent(__VLS_297, new __VLS_297({
            ...{ 'onClick': {} },
            routerLink: ("/dashboard/scan"),
            color: ("primary"),
        }));
        const __VLS_299 = __VLS_298({
            ...{ 'onClick': {} },
            routerLink: ("/dashboard/scan"),
            color: ("primary"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_298));
        let __VLS_303;
        const __VLS_304 = {
            onClick: (__VLS_ctx.routeToUploadPhoto)
        };
        let __VLS_300;
        let __VLS_301;
        const __VLS_305 = {}.FontAwesomeIcon;
        /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
        // @ts-ignore
        const __VLS_306 = __VLS_asFunctionalComponent(__VLS_305, new __VLS_305({
            ...{ class: ("mr-2 text-lg") },
            icon: ((__VLS_ctx.faArrowRotateBack)),
        }));
        const __VLS_307 = __VLS_306({
            ...{ class: ("mr-2 text-lg") },
            icon: ((__VLS_ctx.faArrowRotateBack)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_306));
        __VLS_302.slots.default;
        var __VLS_302;
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mt-4 w-full px-8") },
        });
        const __VLS_311 = {}.IonCard;
        /** @type { [typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, typeof __VLS_components.IonCard, typeof __VLS_components.ionCard, ] } */ ;
        // @ts-ignore
        const __VLS_312 = __VLS_asFunctionalComponent(__VLS_311, new __VLS_311({
            ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg") },
        }));
        const __VLS_313 = __VLS_312({
            ...{ class: ("p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_312));
        const __VLS_317 = {}.IonCardHeader;
        /** @type { [typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, typeof __VLS_components.IonCardHeader, typeof __VLS_components.ionCardHeader, ] } */ ;
        // @ts-ignore
        const __VLS_318 = __VLS_asFunctionalComponent(__VLS_317, new __VLS_317({}));
        const __VLS_319 = __VLS_318({}, ...__VLS_functionalComponentArgsRest(__VLS_318));
        const __VLS_323 = {}.IonCardTitle;
        /** @type { [typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, typeof __VLS_components.IonCardTitle, typeof __VLS_components.ionCardTitle, ] } */ ;
        // @ts-ignore
        const __VLS_324 = __VLS_asFunctionalComponent(__VLS_323, new __VLS_323({}));
        const __VLS_325 = __VLS_324({}, ...__VLS_functionalComponentArgsRest(__VLS_324));
        const __VLS_329 = {}.FontAwesomeIcon;
        /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
        // @ts-ignore
        const __VLS_330 = __VLS_asFunctionalComponent(__VLS_329, new __VLS_329({
            icon: ((__VLS_ctx.faSadTear)),
        }));
        const __VLS_331 = __VLS_330({
            icon: ((__VLS_ctx.faSadTear)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_330));
        __VLS_328.slots.default;
        var __VLS_328;
        __VLS_322.slots.default;
        var __VLS_322;
        const __VLS_335 = {}.IonCardContent;
        /** @type { [typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, typeof __VLS_components.IonCardContent, typeof __VLS_components.ionCardContent, ] } */ ;
        // @ts-ignore
        const __VLS_336 = __VLS_asFunctionalComponent(__VLS_335, new __VLS_335({}));
        const __VLS_337 = __VLS_336({}, ...__VLS_functionalComponentArgsRest(__VLS_336));
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_340.slots.default;
        var __VLS_340;
        __VLS_316.slots.default;
        var __VLS_316;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-row items-center justify-center gap-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-center mt-4") },
        });
        const __VLS_341 = {}.IonButton;
        /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
        // @ts-ignore
        const __VLS_342 = __VLS_asFunctionalComponent(__VLS_341, new __VLS_341({
            ...{ 'onClick': {} },
            color: ("primary"),
        }));
        const __VLS_343 = __VLS_342({
            ...{ 'onClick': {} },
            color: ("primary"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_342));
        let __VLS_347;
        const __VLS_348 = {
            onClick: (__VLS_ctx.routeToDashBoard)
        };
        let __VLS_344;
        let __VLS_345;
        const __VLS_349 = {}.FontAwesomeIcon;
        /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
        // @ts-ignore
        const __VLS_350 = __VLS_asFunctionalComponent(__VLS_349, new __VLS_349({
            ...{ class: ("mr-2") },
            icon: ((__VLS_ctx.faArrowLeft)),
        }));
        const __VLS_351 = __VLS_350({
            ...{ class: ("mr-2") },
            icon: ((__VLS_ctx.faArrowLeft)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_350));
        __VLS_346.slots.default;
        var __VLS_346;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-center mt-4") },
        });
        const __VLS_355 = {}.IonButton;
        /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
        // @ts-ignore
        const __VLS_356 = __VLS_asFunctionalComponent(__VLS_355, new __VLS_355({
            ...{ 'onClick': {} },
            color: ("primary"),
        }));
        const __VLS_357 = __VLS_356({
            ...{ 'onClick': {} },
            color: ("primary"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_356));
        let __VLS_361;
        const __VLS_362 = {
            onClick: (__VLS_ctx.routeToUploadPhoto)
        };
        let __VLS_358;
        let __VLS_359;
        const __VLS_363 = {}.FontAwesomeIcon;
        /** @type { [typeof __VLS_components.FontAwesomeIcon, typeof __VLS_components.FontAwesomeIcon, ] } */ ;
        // @ts-ignore
        const __VLS_364 = __VLS_asFunctionalComponent(__VLS_363, new __VLS_363({
            icon: ((__VLS_ctx.faArrowRotateBack)),
            ...{ class: ("mr-2") },
        }));
        const __VLS_365 = __VLS_364({
            icon: ((__VLS_ctx.faArrowRotateBack)),
            ...{ class: ("mr-2") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_364));
        __VLS_360.slots.default;
        var __VLS_360;
    }
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_5.slots.default;
    var __VLS_5;
    ['w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'mt-[22rem]', 'w-full', 'px-8', 'flex', 'justify-center', 'items-center', 'flex-col', 'gap-6', 'w-1/2', 'h-1/2', 'rounded-lg', 'shadow-lg', 'border-2', 'border-primary', 'flex', 'flex-col', 'gap-6', 'relative', 'p-2', 'w-full', 'border-2', 'to-primary', 'from-primary/50', 'bg-gradient-to-l', 'border-primary', 'rounded-2xl', 'shadow-lg', 'absolute', 'top-2', 'right-2', 'flex', 'flex-row', 'items-center', 'justify-center', 'rounded-lg', 'bg-white', 'p-2', 'gap-2', 'text-primary', 'text-xs', 'text-primary', 'text-lg', 'text-white', 'text-xs', 'text-white', 'p-2', 'w-full', 'border-2', 'to-yellow-500', 'from-yellow-300/50', 'bg-gradient-to-l', 'border-yellow-500', 'rounded-2xl', 'shadow-lg', 'flex', 'flex-row', 'gap-6', 'justify-center', 'p-2', 'border-2', 'to-light', 'from-medium', 'bg-gradient-to-l', 'border-medium-shade', 'rounded-2xl', 'shadow-lg', 'flex-grow', 'text-lg', 'text-xs', 'p-2', 'border-2', 'to-light', 'from-medium', 'bg-gradient-to-l', 'border-medium-shade', 'rounded-2xl', 'shadow-lg', 'flex-grow', 'text-lg', 'text-xs', 'flex', 'justify-center', 'mt-4', 'gap-2', 'mr-2', 'text-lg', 'mr-2', 'text-lg', 'mt-4', 'w-full', 'px-8', 'p-2', 'border-2', 'to-light', 'from-medium', 'bg-gradient-to-l', 'border-medium-shade', 'rounded-2xl', 'shadow-lg', 'flex', 'flex-row', 'items-center', 'justify-center', 'gap-4', 'flex', 'justify-center', 'mt-4', 'mr-2', 'flex', 'justify-center', 'mt-4', 'mr-2',];
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
            formatNutritionString: formatNutritionString,
            faCircleCheck: faCircleCheck,
            faSadTear: faSadTear,
            FontAwesomeIcon: FontAwesomeIcon,
            faArrowLeft: faArrowLeft,
            faArrowRotateBack: faArrowRotateBack,
            faPlusCircle: faPlusCircle,
            scanStore: scanStore,
            nutritionData: nutritionData,
            isLoading: isLoading,
            routeToDashBoard: routeToDashBoard,
            routeToUploadPhoto: routeToUploadPhoto,
            handleAddFood: handleAddFood,
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
