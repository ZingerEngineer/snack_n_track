type TTypeOfFood = 'Vegetable' | 'Fruit' | 'Grain' | 'Dessert' | 'Beverage' | 'Meal'
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
interface IFailureObject {
  status: 'failed'
}

export type { IEstimatedNutritionData, INutritionData, IFailureObject, TTypeOfFood }
