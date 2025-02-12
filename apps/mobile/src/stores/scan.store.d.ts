import type { INutritionData, IEstimatedNutritionData } from '../types/global.types';
export declare const useScanStore: import("pinia").StoreDefinition<"scan", Pick<{
    imagePath: import("vue").Ref<string | null, string | null>;
    nutritionData: import("vue").Ref<{
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        name: string;
        type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
        proteins: string;
        carbs: string;
        fats: string;
        vitamins: {
            vitamin_name: string;
            vitamin_portion: string;
        }[];
    } | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        estimated_name: string;
        estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    } | null, INutritionData | IEstimatedNutritionData | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        name: string;
        type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
        proteins: string;
        carbs: string;
        fats: string;
        vitamins: {
            vitamin_name: string;
            vitamin_portion: string;
        }[];
    } | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        estimated_name: string;
        estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    } | null>;
    pickPhotoHandler: () => Promise<void>;
    resetPhoto: () => void;
    anaylsePhotoHandler: () => Promise<void>;
}, "imagePath" | "nutritionData">, Pick<{
    imagePath: import("vue").Ref<string | null, string | null>;
    nutritionData: import("vue").Ref<{
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        name: string;
        type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
        proteins: string;
        carbs: string;
        fats: string;
        vitamins: {
            vitamin_name: string;
            vitamin_portion: string;
        }[];
    } | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        estimated_name: string;
        estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    } | null, INutritionData | IEstimatedNutritionData | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        name: string;
        type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
        proteins: string;
        carbs: string;
        fats: string;
        vitamins: {
            vitamin_name: string;
            vitamin_portion: string;
        }[];
    } | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        estimated_name: string;
        estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    } | null>;
    pickPhotoHandler: () => Promise<void>;
    resetPhoto: () => void;
    anaylsePhotoHandler: () => Promise<void>;
}, never>, Pick<{
    imagePath: import("vue").Ref<string | null, string | null>;
    nutritionData: import("vue").Ref<{
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        name: string;
        type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
        proteins: string;
        carbs: string;
        fats: string;
        vitamins: {
            vitamin_name: string;
            vitamin_portion: string;
        }[];
    } | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        estimated_name: string;
        estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    } | null, INutritionData | IEstimatedNutritionData | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        name: string;
        type_of_food: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
        proteins: string;
        carbs: string;
        fats: string;
        vitamins: {
            vitamin_name: string;
            vitamin_portion: string;
        }[];
    } | {
        id: string;
        percentage_of_certainty: number;
        isSure: boolean;
        estimated_name: string;
        estimated_typeOfFood: "Vegetable" | "Fruit" | "Grain" | "Dessert" | "Beverage" | "Meal";
    } | null>;
    pickPhotoHandler: () => Promise<void>;
    resetPhoto: () => void;
    anaylsePhotoHandler: () => Promise<void>;
}, "pickPhotoHandler" | "resetPhoto" | "anaylsePhotoHandler">>;
