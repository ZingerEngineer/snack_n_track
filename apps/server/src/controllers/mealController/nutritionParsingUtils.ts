import { TNutritionValue } from '../../schemas/meal/scanMeal.zod'

/**
 * Utility functions for handling nutrition value parsing and conversion
 */
export class NutritionParsingUtils {
  /**
   * Parse a nutrition string value (e.g., "150mg", "20g") into amount and unit
   */
  static parseNutritionString(value: string | number): TNutritionValue {
    if (typeof value === 'number') {
      return { amount: value, unit: 'g' }
    }

    const str = String(value).trim()

    // Match patterns like "150mg", "20g", "1.5kg", etc.
    const match = str.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/)

    if (match) {
      const amount = parseFloat(match[1])
      let unit = match[2].toLowerCase()

      // Normalize common unit variations
      switch (unit) {
        case 'milligrams':
        case 'milligram':
          unit = 'mg'
          break
        case 'grams':
        case 'gram':
          unit = 'g'
          break
        case 'kilograms':
        case 'kilogram':
          unit = 'kg'
          break
        case 'micrograms':
        case 'microgram':
          unit = 'mcg'
          break
        case 'liters':
        case 'liter':
          unit = 'L'
          break
        case 'milliliters':
        case 'milliliter':
          unit = 'mL'
          break
        case 'ounces':
        case 'ounce':
          unit = 'oz'
          break
        case 'pounds':
        case 'pound':
          unit = 'lb'
          break
        case 'calories':
        case 'cal':
          unit = 'kcal'
          break
      }

      const validUnits = [
        'g',
        'kg',
        'mg',
        'mcg',
        'L',
        'mL',
        'mcL',
        'kcal',
        'kJ',
        'oz',
        'lb'
      ]

      if (validUnits.includes(unit)) {
        return { amount, unit: unit as any }
      }
    }

    // Fallback: try to parse as number with default unit
    const numericValue = parseFloat(str)
    if (!isNaN(numericValue)) {
      return { amount: numericValue, unit: 'g' }
    }

    // If all parsing fails, return zero with default unit
    return { amount: 0, unit: 'g' }
  }

  /**
   * Format a nutrition value back to a string (e.g., { amount: 150, unit: 'mg' } -> "150mg")
   */
  static formatNutritionValue(nutrition: TNutritionValue): string {
    return `${nutrition.amount}${nutrition.unit}`
  }

  /**
   * Convert between different units (basic conversions)
   */
  static convertUnit(
    value: TNutritionValue,
    targetUnit: string
  ): TNutritionValue {
    const { amount, unit } = value

    // Mass conversions
    if (unit === 'g' && targetUnit === 'mg') {
      return { amount: amount * 1000, unit: 'mg' }
    }
    if (unit === 'mg' && targetUnit === 'g') {
      return { amount: amount / 1000, unit: 'g' }
    }
    if (unit === 'kg' && targetUnit === 'g') {
      return { amount: amount * 1000, unit: 'g' }
    }
    if (unit === 'g' && targetUnit === 'kg') {
      return { amount: amount / 1000, unit: 'kg' }
    }

    // Volume conversions
    if (unit === 'L' && targetUnit === 'mL') {
      return { amount: amount * 1000, unit: 'mL' }
    }
    if (unit === 'mL' && targetUnit === 'L') {
      return { amount: amount / 1000, unit: 'L' }
    }

    // If no conversion available, return original
    return value
  }

  /**
   * Normalize nutrition values to standard units
   * - Mass: grams (g)
   * - Volume: milliliters (mL)
   * - Energy: kilocalories (kcal)
   */
  static normalizeToStandardUnits(nutrition: TNutritionValue): TNutritionValue {
    const { unit } = nutrition

    // Convert to grams for mass units
    if (['mg', 'kg', 'mcg'].includes(unit)) {
      return this.convertUnit(nutrition, 'g')
    }

    // Convert to mL for volume units
    if (['L', 'mcL'].includes(unit)) {
      return this.convertUnit(nutrition, 'mL')
    }

    // Convert to kcal for energy units
    if (unit === 'kJ') {
      return { amount: nutrition.amount / 4.184, unit: 'kcal' }
    }

    return nutrition
  }

  /**
   * Validate that a nutrition value has a valid unit
   */
  static isValidNutritionUnit(unit: string): boolean {
    const validUnits = [
      'g',
      'kg',
      'mg',
      'mcg',
      'L',
      'mL',
      'mcL',
      'kcal',
      'kJ',
      'oz',
      'lb'
    ]
    return validUnits.includes(unit.toLowerCase())
  }

  /**
   * Get appropriate unit for a nutrition type
   */
  static getDefaultUnitForNutritionType(
    nutritionType: 'protein' | 'carbs' | 'fats' | 'calories' | 'vitamin'
  ): string {
    switch (nutritionType) {
      case 'protein':
      case 'carbs':
      case 'fats':
        return 'g'
      case 'calories':
        return 'kcal'
      case 'vitamin':
        return 'mg'
      default:
        return 'g'
    }
  }
}

