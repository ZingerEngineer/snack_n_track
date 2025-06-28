# Ingredient and Food Item Management - Updated Implementation

## Overview

This document explains the new structure for managing ingredients and food items with proper validation using Zod schemas and type safety.

## Key Components

### 1. Types (`src/types/ingredient.ts`)

- `TIngredient` - Main ingredient type matching Prisma schema
- `TIngredientForFoodItem` - Simplified type for connecting ingredients to food items
- `TCreateIngredient` - Type for creating new ingredients

### 2. Zod Schemas (`src/schemas/ingredient/ingredient.zod.ts`)

- `IngredientSchema` - Full ingredient validation with nutrition data
- `CreateIngredientSchema` - Validation for creating ingredients (without ID)
- `IngredientsForFoodItemSchema` - Validates arrays of ingredient IDs for food items
- `IngredientNamesSchema` - Validates arrays of ingredient names

### 3. Parser Utilities (`src/utils/ingredientParser.ts`)

- `parseIngredientIds()` - Validates ingredient ID arrays
- `parseIngredientNames()` - Validates ingredient name arrays
- `parseCreateIngredient()` - Validates full ingredient creation data
- `convertNamesToIds()` - Converts ingredient names to IDs
- `validateNutritionUnits()` - Ensures proper nutrition unit values

### 4. Data Access Layer (`src/daos/ingredient.dao.ts`)

- `createIngredient()` - Creates ingredient with nutrition data
- `createIngredientWithFoodItems()` - Creates ingredient and links to food items
- All methods use schema validation internally

### 5. Service Layer (`src/services/ingredient.service.ts`)

- `createIngredient()` - High-level ingredient creation with validation
- `createBasicIngredient()` - Simplified creation for basic use cases
- `searchIngredients()` - Search with parameter validation

## Usage Examples

### Creating a Basic Ingredient

```typescript
import IngredientService from '../services/ingredient.service'

const ingredientService = new IngredientService()

// Basic ingredient with minimal nutrition data
const newIngredient = await ingredientService.createBasicIngredient({
  ingredientName: 'Chicken Breast',
  calories: 165,
  carbohydratesAmount: 0,
  proteinsAmount: 31,
  fatsAmount: 3.6
})
```

### Creating a Full Ingredient

```typescript
const fullIngredient = await ingredientService.createIngredient({
  ingredientName: 'Spinach',
  calories: 23,
  caloriesUnit: NutritionUnit.kcal,
  carbohydratesAmount: 3.6,
  carbohydratesUnit: NutritionUnit.g,
  proteinsAmount: 2.9,
  proteinsUnit: NutritionUnit.g,
  fatsAmount: 0.4,
  fatsUnit: NutritionUnit.g,
  ironAmount: 2.7,
  ironUnit: NutritionUnit.mg,
  vitaminC: 28.1,
  vitaminCUnit: NutritionUnit.mg
})
```

### Creating Food Items with Ingredients

```typescript
import FoodItemService from '../services/foodItem.service'

const foodItemService = new FoodItemService()

// Using ingredient names (automatic conversion to IDs)
const newFoodItem = await foodItemService.createFoodItemWithNames({
  foodName: 'Chicken Salad',
  portionUnit: PortionUnit.SERVING,
  portionSizeValue: 1,
  ingredientString: 'chicken breast, spinach, tomato',
  ingredients: ['Chicken Breast', 'Spinach', 'Tomato'] // names
})

// Using ingredient IDs directly (more efficient)
const newFoodItemWithIds = await foodItemService.createFoodItemWithIds({
  foodName: 'Green Smoothie',
  portionUnit: PortionUnit.CUP,
  portionSizeValue: 1.5,
  ingredientString: 'spinach, banana, apple',
  ingredientIds: ['uuid-1', 'uuid-2', 'uuid-3'] // IDs
})
```

### Search and Validation

```typescript
// Search ingredients
const searchResults = await ingredientService.searchIngredients({
  name: 'chicken',
  limit: 10,
  offset: 0
})

// Parser utilities for custom validation
import { ingredientParser } from '../utils/ingredientParser'

// Validate ingredient names before processing
const validatedNames = ingredientParser.parseIngredientNames([
  'chicken breast',
  'spinach',
  'tomato'
])

// Convert names to IDs for database operations
const ingredientIds = await ingredientParser.convertNamesToIds(validatedNames)
```

## Benefits

1. **Type Safety**: Full TypeScript support prevents runtime errors
2. **Runtime Validation**: Zod catches invalid data before database operations
3. **Flexibility**: Support both ingredient names and IDs for food item creation
4. **Database Aligned**: Perfect match with Prisma schema relationships
5. **Error Handling**: Clear validation messages and proper error types
6. **Performance**: Direct ID-based creation when you already have ingredient IDs

## Database Schema Alignment

The implementation correctly handles the Prisma schema where:

- `Ingredient` model contains all nutrition data directly
- `FoodIngredient` is a junction table connecting `FoodItem` and `Ingredient`
- No separate `IngredientNutrition` table exists

This provides a clean, validated, and type-safe approach to managing the complex relationships between ingredients and food items in your nutrition tracking application.

