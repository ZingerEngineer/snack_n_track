import { type Option } from './shared'

export interface FoodAllergy extends Option {
  value:
    | 'milk'
    | 'eggs'
    | 'peanuts'
    | 'tree_nuts'
    | 'wheat'
    | 'soy'
    | 'fish'
    | 'shellfish'
    | 'sesame'
    | 'mustard'
    | 'sulphites'
    | 'celery'
    | 'lupin'
}

export const foodAllergies: FoodAllergy[] = [
  { label: 'Milk', value: 'milk' },
  { label: 'Eggs', value: 'eggs' },
  { label: 'Peanuts', value: 'peanuts' },
  { label: 'Tree Nuts', value: 'tree_nuts' },
  { label: 'Wheat', value: 'wheat' },
  { label: 'Soy', value: 'soy' },
  { label: 'Fish', value: 'fish' },
  { label: 'Shellfish', value: 'shellfish' },
  { label: 'Sesame', value: 'sesame' },
  { label: 'Mustard', value: 'mustard' },
  { label: 'Sulphites', value: 'sulphites' },
  { label: 'Celery', value: 'celery' },
  { label: 'Lupin', value: 'lupin' },
]
