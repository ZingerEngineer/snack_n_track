import { type Option } from './shared'

export interface DietaryRestriction extends Option {
  value: 'none' | 'lactose_intolerant'
}

export const dietaryRestrictions = [
  { label: 'None', value: 'none' },
  { label: 'Lactose Intolerant', value: 'lactose_intolerant' },
]
