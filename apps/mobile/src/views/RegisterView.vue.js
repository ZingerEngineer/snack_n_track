import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import ToastService from '../services/ToastService.ts';
import { useRouter } from 'vue-router';
const router = useRouter();
// Define Zod validation schemas
const emailSchema = zod
    .string()
    .min(1, { message: 'This is required' })
    .email({ message: 'Must be a valid email' });
const passwordSchema = zod.string().min(1, { message: 'This is required' });
// Combine schemas
const validationSchema = toTypedSchema(zod.object({
    email: emailSchema,
    password: passwordSchema,
}));
// Initialize Vee-Validate form
const { handleSubmit } = useForm({
    validationSchema,
});
// Fields with error messages
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
// Submit handler
const onSubmit = handleSubmit(async (values) => {
    try {
        await axios.post('http://localhost:3000/v1/auth/register', values);
        ToastService.success('Register success');
        router.push('/login');
    }
    catch (error) {
        ToastService.error('Register failed');
        return;
    }
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
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        ...{ class: ("ion-padding") },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: ("ion-padding") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full flex justify-center items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    const __VLS_13 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        ...{ class: ("text-white") },
        to: ("/login"),
    }));
    const __VLS_21 = __VLS_20({
        ...{ class: ("text-white") },
        to: ("/login"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_24.slots.default;
    var __VLS_24;
    __VLS_18.slots.default;
    var __VLS_18;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("login-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.onSubmit) },
    });
    const __VLS_25 = {}.IonItem;
    /** @type { [typeof __VLS_components.IonItem, typeof __VLS_components.ionItem, typeof __VLS_components.IonItem, typeof __VLS_components.ionItem, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const __VLS_31 = {}.IonLabel;
    /** @type { [typeof __VLS_components.IonLabel, typeof __VLS_components.ionLabel, typeof __VLS_components.IonLabel, typeof __VLS_components.ionLabel, ] } */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        position: ("floating"),
    }));
    const __VLS_33 = __VLS_32({
        position: ("floating"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_36.slots.default;
    var __VLS_36;
    const __VLS_37 = {}.IonInput;
    /** @type { [typeof __VLS_components.IonInput, typeof __VLS_components.ionInput, typeof __VLS_components.IonInput, typeof __VLS_components.ionInput, ] } */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        ...{ class: ("mt-2") },
        name: ("email"),
        modelValue: ((__VLS_ctx.email)),
        type: ("email"),
    }));
    const __VLS_39 = __VLS_38({
        ...{ class: ("mt-2") },
        name: ("email"),
        modelValue: ((__VLS_ctx.email)),
        type: ("email"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("error-message") },
    });
    (__VLS_ctx.emailError);
    __VLS_30.slots.default;
    var __VLS_30;
    const __VLS_43 = {}.IonItem;
    /** @type { [typeof __VLS_components.IonItem, typeof __VLS_components.ionItem, typeof __VLS_components.IonItem, typeof __VLS_components.ionItem, ] } */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({}));
    const __VLS_45 = __VLS_44({}, ...__VLS_functionalComponentArgsRest(__VLS_44));
    const __VLS_49 = {}.IonLabel;
    /** @type { [typeof __VLS_components.IonLabel, typeof __VLS_components.ionLabel, typeof __VLS_components.IonLabel, typeof __VLS_components.ionLabel, ] } */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        position: ("floating"),
    }));
    const __VLS_51 = __VLS_50({
        position: ("floating"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_54.slots.default;
    var __VLS_54;
    const __VLS_55 = {}.IonInput;
    /** @type { [typeof __VLS_components.IonInput, typeof __VLS_components.ionInput, typeof __VLS_components.IonInput, typeof __VLS_components.ionInput, ] } */ ;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        ...{ class: ("mt-2") },
        name: ("password"),
        modelValue: ((__VLS_ctx.password)),
        type: ("password"),
    }));
    const __VLS_57 = __VLS_56({
        ...{ class: ("mt-2") },
        name: ("password"),
        modelValue: ((__VLS_ctx.password)),
        type: ("password"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("error-message") },
    });
    (__VLS_ctx.passwordError);
    __VLS_48.slots.default;
    var __VLS_48;
    const __VLS_61 = {}.IonButton;
    /** @type { [typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, typeof __VLS_components.IonButton, typeof __VLS_components.ionButton, ] } */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        expand: ("block"),
        ...{ class: ("login-btn") },
        type: ("submit"),
    }));
    const __VLS_63 = __VLS_62({
        expand: ("block"),
        ...{ class: ("login-btn") },
        type: ("submit"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    __VLS_66.slots.default;
    var __VLS_66;
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_5.slots.default;
    var __VLS_5;
    ['ion-padding', 'w-full', 'flex', 'justify-center', 'items-center', 'text-white', 'login-container', 'mt-2', 'error-message', 'mt-2', 'error-message', 'login-btn',];
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
            IonItem: IonItem,
            IonLabel: IonLabel,
            IonInput: IonInput,
            IonButton: IonButton,
            email: email,
            emailError: emailError,
            password: password,
            passwordError: passwordError,
            onSubmit: onSubmit,
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
