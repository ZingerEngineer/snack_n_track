# Food Item and Ingredient Types and Schemas

This document explains how to use the created types and Zod schemas for managing food items and ingredients in your application.

## Overview

The system provides:

- **TypeScript types** for type safety
- **Zod schemas** for runtime validation
- **Utility functions** for parsing and conversion
- **Service layer** with proper error handling

## Types

### Ingredient Types (`src/types/ingredient.ts`)

```typescript
// Basic ingredient type matching Prisma schema
export type TIngredient = {
  id: string
  ingredientName: string
  calories: number
  caloriesUnit: NutritionUnit
  // ... all nutrition fields
}

// For connecting ingredients to food items
export type TIngredientForFoodItem = {
  id: string
}

// For creating new ingredients
export type TCreateIngredient = Omit<TIngredient, 'id' | 'FoodIngredient'>
```

## Schemas

### Ingredient Schemas (`src/schemas/ingredient/ingredient.zod.ts`)

```typescript
// Validate array of ingredient IDs for food item creation
IngredientsForFoodItemSchema: z.array(z.object({ id: z.string().uuid() }))

// Validate array of ingredient names
IngredientNamesSchema: z.array(z.string().min(1))

// Full ingredient validation
IngredientSchema: z.object({
  /* all nutrition fields */
})
```

### Food Item Schemas (`src/schemas/meal/foodItem.zod.ts`)

```typescript
// Create food item with ingredient names
CreateFoodItemWithNamesSchema: z.object({
  foodName: z.string(),
  portionUnit: PortionUnitSchema,
  portionSizeValue: z.number(),
  ingredientString: z.string(),
  ingredients: IngredientNamesSchema
})

// Create food item with proper Prisma relations
CreateFoodItemSchema: z.object({
  // ... same fields but ingredients use connect syntax
  ingredients: z.object({
    connect: IngredientsForFoodItemSchema
  })
})
```

## Usage Examples

### 1. Creating Food Items with Ingredient Names (Recommended)

```typescript
import FoodItemService from '../services/foodItem.service'
import { PortionUnit } from '@prisma/client'

const foodItemService = new FoodItemService()

// Example: Create a sandwich
const sandwichData = {
  foodName: 'Ham Sandwich',
  portionUnit: PortionUnit.PIECE,
  portionSizeValue: 1,
  ingredientString: '2 slices bread, 100g ham, 1 tbsp mayonnaise',
  ingredients: ['bread', 'ham', 'mayonnaise'] // ingredient names
}

try {
  const newFoodItem =
    await foodItemService.createFoodItemWithNames(sandwichData)
  console.log('Created food item:', newFoodItem)
} catch (error) {
  console.error('Validation or creation error:', error.message)
}
```

### 2. Creating Food Items with Ingredient IDs (More Efficient)

```typescript
// If you already have ingredient IDs
const saladData = {
  foodName: 'Greek Salad',
  portionUnit: PortionUnit.SERVING,
  portionSizeValue: 1,
  ingredientString: 'lettuce, tomato, cucumber, olives, feta cheese',
  ingredientIds: [
    'uuid-lettuce',
    'uuid-tomato',
    'uuid-cucumber',
    'uuid-olives',
    'uuid-feta'
  ]
}

try {
  const newFoodItem = await foodItemService.createFoodItemWithIds(saladData)
  console.log('Created food item:', newFoodItem)
} catch (error) {
  console.error('Error:', error.message)
}
```

### 3. Using the Parser Utility Directly

```typescript
import { ingredientParser } from '../utils/ingredientParser'

// Validate ingredient names
try {
  const validNames = ingredientParser.parseIngredientNames([
    'chicken breast',
    'brown rice',
    'broccoli'
  ])
  console.log('Valid ingredient names:', validNames)
} catch (error) {
  console.error('Invalid ingredient names:', error.message)
}

// Convert names to IDs
try {
  const ingredientIds = await ingredientParser.convertNamesToIds([
    'chicken breast',
    'brown rice'
  ])
  console.log('Ingredient IDs:', ingredientIds)
  // Output: [{ id: "uuid-1" }, { id: "uuid-2" }]
} catch (error) {
  console.error('Ingredient not found:', error.message)
}
```

### 4. In Controllers (Express Example)

```typescript
import { Request, Response } from 'express'
import FoodItemService from '../services/foodItem.service'

const foodItemService = new FoodItemService()

export const createFoodItem = async (req: Request, res: Response) => {
  try {
    // The service handles all validation automatically
    const newFoodItem = await foodItemService.createFoodItemWithNames(req.body)

    res.status(201).json({
      success: true,
      data: newFoodItem
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        message: error.message
      })
    } else if (error instanceof NotFoundError) {
      res.status(404).json({
        success: false,
        message: error.message
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
}
```

## Key Benefits

1. **Type Safety**: Full TypeScript support prevents runtime type errors
2. **Runtime Validation**: Zod schemas catch invalid data before database operations
3. **Automatic Conversion**: Parser utilities handle ingredient name ↔ ID conversion
4. **Proper Error Handling**: Clear error messages for different failure scenarios
5. **Prisma Integration**: Correct relation syntax for creating connected records

## Database Schema Alignment

The schemas perfectly match your Prisma schema:

- `FoodItem` has many `FoodIngredient` (junction table)
- `FoodIngredient` connects `FoodItem` to `Ingredient`
- All nutrition units are validated against the `NutritionUnit` enum
- Portion units are validated against the `PortionUnit` enum

This ensures data integrity and leverages Prisma's relationship features properly.

