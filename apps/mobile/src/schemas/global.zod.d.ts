import z from 'zod';
declare const NutritionDataSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    percentage_of_certainty: z.ZodNumber;
    isSure: z.ZodBoolean;
    name: z.ZodString;
    type_of_food: z.ZodEnum<["Vegetable", "Fruit", "Grain", "Dessert", "Beverage", "Meal"]>;
    proteins: z.ZodString;
    carbs: z.ZodString;
    fats: z.ZodString;
    vitamins: z.ZodArray<z.ZodObject<{
        vitamin_name: z.ZodString;
        vitamin_portion: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        vitamin_name: string;
        vitamin_portion: string;
    }, {
        vitamin_name: string;
        vitamin_portion: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    percentage_of_certainty: number;
    isSure: boolean;
    type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    proteins: string;
    carbs: string;
    fats: string;
    vitamins: {
        vitamin_name: string;
        vitamin_portion: string;
    }[];
}, {
    name: string;
    percentage_of_certainty: number;
    isSure: boolean;
    type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    proteins: string;
    carbs: string;
    fats: string;
    vitamins: {
        vitamin_name: string;
        vitamin_portion: string;
    }[];
    id?: string | undefined;
}>;
declare const EstimatedNutritionDataSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    percentage_of_certainty: z.ZodNumber;
    isSure: z.ZodBoolean;
    estimated_name: z.ZodString;
    estimated_typeOfFood: z.ZodEnum<["Vegetable", "Fruit", "Grain", "Dessert", "Beverage", "Meal"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    percentage_of_certainty: number;
    isSure: boolean;
    estimated_name: string;
    estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
}, {
    percentage_of_certainty: number;
    isSure: boolean;
    estimated_name: string;
    estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    id?: string | undefined;
}>;
declare const FailureObjectSchema: z.ZodObject<{
    status: z.ZodLiteral<"failed">;
}, "strip", z.ZodTypeAny, {
    status: "failed";
}, {
    status: "failed";
}>;
export { NutritionDataSchema, EstimatedNutritionDataSchema, FailureObjectSchema };
