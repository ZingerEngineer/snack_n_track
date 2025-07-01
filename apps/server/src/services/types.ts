import { INutritionData, IEstimatedNutritionData } from '../types/global.types'

type GPTCalculatorResponse = {
  status: string
  calculatorResponse: INutritionData | IEstimatedNutritionData | null
  attempts: number
}

export interface ICalculator {
  calculateCalories(
    imageURL: string
  ): Promise<INutritionData | IEstimatedNutritionData | null>
}

export class Calculator implements ICalculator {
  public readonly calculateCalories = async (
    imageURL: string
  ): Promise<INutritionData | IEstimatedNutritionData | null> => {
    // Mock implementation for demonstration purposes
    const mockNutritionData: INutritionData = {
      id: '1',
      certainty_percentage: 100,
      isSure: true,
      keywords: ['apple', 'تفاحة', 'tofaha'],
      name: 'Apple',
      type_of_food: 'Fruit',
      proteins: '1g',
      carbs: '25g',
      fats: '0g',
      vitamins: [
        {
          vitamin_name: 'Vitamin A',
          vitamin_portion: '10%'
        },
        {
          vitamin_name: 'Vitamin C',
          vitamin_portion: '20%'
        }
      ]
    }

    const mockEstimatedNutritionData: IEstimatedNutritionData = {
      id: '1',
      certainty_percentage: 100,
      isSure: true,
      estimated_name: 'Apple',
      estimated_typeOfFood: 'Fruit'
    }

    // Return either mockNutritionData or mockEstimatedNutritionData based on some condition
    return mockEstimatedNutritionData.estimated_name
      ? mockNutritionData
      : mockEstimatedNutritionData || null
  }

  public readonly recursiveCalculateCalories = async (
    imageURL: string,
    attempts = 0,
    maxAttempts = 3
  ): Promise<GPTCalculatorResponse> => {
    let mockedCalculatorResponse: INutritionData = {
      id: '1',
      certainty_percentage: 100,
      isSure: true,
      name: 'Apple',
      keywords: ['apple', 'تفاحة', 'tofaha'],
      type_of_food: 'Fruit',
      proteins: '1g',
      carbs: '25g',
      fats: '0g',
      vitamins: [
        {
          vitamin_name: 'Vitamin A',
          vitamin_portion: '10%'
        },
        {
          vitamin_name: 'Vitamin C',
          vitamin_portion: '20%'
        }
      ]
    }
    let mockedEstimatedCalculatorResponse: IEstimatedNutritionData = {
      id: '1',
      certainty_percentage: 100,
      isSure: true,
      estimated_name: 'Apple',
      estimated_typeOfFood: 'Fruit'
    }
    return {
      status: maxAttempts === attempts ? 'failed' : 'success',
      calculatorResponse: mockedEstimatedCalculatorResponse.estimated_name
        ? mockedCalculatorResponse
        : mockedEstimatedCalculatorResponse || null,
      attempts
    }
  }
}

