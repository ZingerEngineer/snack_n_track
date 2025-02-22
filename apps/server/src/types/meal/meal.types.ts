interface IIngredientNutrition {
  id: string
  ingredientId: string
  carbohydrates: number
  proteins: number
  fats: number
  saturatedFat: number
  unsaturatedFat: number
  transFat: number
  fiber: number
  sugars: number
  cholesterol: number
  sodium: number
  potassium: number
  calcium: number
  iron: number
  magnesium: number
  zinc: number
  vitaminA: number
  vitaminB1: number
  vitaminB2: number
  vitaminB3: number
  vitaminB5: number
  vitaminB6: number
  vitaminB7: number
  vitaminB9: number
  vitaminB12: number
  vitaminC: number
  vitaminD: number
  vitaminE: number
  vitaminK: number
}

type TTypeOfFood =
  | 'Vegetable'
  | 'Fruit'
  | 'Grain'
  | 'Dessert'
  | 'Beverage'
  | 'Meal'
interface INutritionData {
  id: string
  percentage_of_certainty: number
  isSure: boolean
  name: string
  type_of_food: TTypeOfFood
  proteins: string
  carbs: string
  fats: string
  vitamins: Array<{
    vitamin_name: string
    vitamin_portion: string
  }>
}

interface IEstimatedNutritionData {
  id: string
  percentage_of_certainty: number
  isSure: boolean
  estimated_name: string
  estimated_typeOfFood: TTypeOfFood
}

export type { IEstimatedNutritionData, INutritionData, TTypeOfFood }

export type { IIngredientNutrition }

