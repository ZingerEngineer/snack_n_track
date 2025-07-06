import type { FoodType, PortionUnit } from './shared.types'
import type { TScanIngredient } from './ingredient.types'

export type TScanFoodItem = {
  foodName: string
  foodType: FoodType
  portionUnit: PortionUnit
  portionSizeValue: number
  ingredientString?: string
  ingredients?: TScanIngredient[]
}

