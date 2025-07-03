import type { FoodType, PortionUnit } from './shared.types'
import type { TIngredient } from './ingredient.types'

export type TFoodItem = {
  id: string
  foodName: string
  foodType: FoodType
  portionUnit: PortionUnit
  portionSizeValue: number
  ingredientString?: string
  ingredients?: TIngredient[]
}
