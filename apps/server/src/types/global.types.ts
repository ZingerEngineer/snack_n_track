type TTypeOfFood =
  | 'Vegetable'
  | 'Fruit'
  | 'Grain'
  | 'Dessert'
  | 'Beverage'
  | 'Meal'

interface INutritionData {
  id: string
  certainty_percentage: number
  isSure: boolean
  name: string
  keywords: Array<string>
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
  certainty_percentage: number
  isSure: boolean
  estimated_name: string
  estimated_typeOfFood: TTypeOfFood
}

interface IFailureObject {
  status: 'failed'
}

export { IEstimatedNutritionData, INutritionData, IFailureObject, TTypeOfFood }

