// Food item types
// This file contains types specifically for food items and food management

export type TFoodType = 'VEGETABLE' | 'FRUIT' | 'GRAIN' | 'DESSERT' | 'BEVERAGE' | 'MEAL'

export type TPortionUnit =
  // Volume (liquid) measurements
  | 'TEASPOON'
  | 'TABLESPOON'
  | 'CUP'
  | 'MILLILITER'
  | 'LITER'
  | 'PINT'
  | 'QUART'
  | 'GALLON'
  // Weight measurements
  | 'GRAM'
  | 'KILOGRAM'
  | 'OUNCE'
  | 'POUND'
  // Other generic or small quantity measures
  | 'PINCH'
  | 'DASH'
  | 'PIECE'
  | 'SLICE'
  | 'SERVING'

export interface IFoodItem {
  id: string
  foodName: string
  foodType: TFoodType
  portionUnit: TPortionUnit
  portionSizeValue: number
  ingredientString: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

// Legacy type for backward compatibility (deprecated - use TFoodType instead)
export type TTypeOfFood = 'Vegetable' | 'Fruit' | 'Grain' | 'Dessert' | 'Beverage' | 'Meal'
