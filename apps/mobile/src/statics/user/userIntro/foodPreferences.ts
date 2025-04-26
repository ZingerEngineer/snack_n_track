import { type Option } from './shared'

export interface FoodPreference extends Option {
  value:
    | 'vegan'
    | 'vegetarian'
    | 'pescatarian'
    | 'gluten_free'
    | 'low_carb'
    | 'keto'
    | 'paleo'
    | 'halal'
    | 'kosher'
    | 'organic'
    | 'no_added_sugar'
    | 'no_artificial_sweeteners'
    | 'no_caffeine'
    | 'no_alcohol'
}

export const foodPreferences: FoodPreference[] = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Pescatarian', value: 'pescatarian' },
  { label: 'Gluten-Free', value: 'gluten_free' },
  { label: 'Low-Carb', value: 'low_carb' },
  { label: 'Keto', value: 'keto' },
  { label: 'Paleo', value: 'paleo' },
  { label: 'Halal', value: 'halal' },
  { label: 'Kosher', value: 'kosher' },
  { label: 'Organic', value: 'organic' },
  { label: 'No Added Sugar', value: 'no_added_sugar' },
  { label: 'No Artificial Sweeteners', value: 'no_artificial_sweeteners' },
  { label: 'No Caffeine', value: 'no_caffeine' },
  { label: 'No Alcohol', value: 'no_alcohol' },
]
