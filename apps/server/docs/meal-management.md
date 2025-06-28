# Meal Management System - Complete Implementation

## Overview

This document explains the comprehensive meal management system with full CRUD operations, validation, and relationship handling.

## Key Components

### 1. Updated Types (`src/types/meal/meal.types.ts`)

- `TMeal` - Core meal type matching Prisma schema
- `TMealWithUser` - Meal with user relation
- `TMealWithFoodItems` - Meal with food items
- `TMealFull` - Complete meal with all relations
- `TCreateMeal` - Type for creating meals
- `TUpdateMeal` - Type for updating meals

### 2. Zod Schemas (`src/schemas/meal/meal.zod.ts`)

- `CreateMealSchema` - Validates meal creation data
- `CreateMealWithFoodItemsSchema` - Validates meal creation with food items array
- `UpdateMealSchema` - Validates meal update data
- `MealSearchSchema` - Validates search parameters with date ranges and calorie filters
- `AddFoodItemsToMealSchema` - Validates adding food items to existing meals
- `RemoveFoodItemsFromMealSchema` - Validates removing food items from meals

### 3. Meal Parser (`src/utils/mealParser.ts`)

- `parseCreateMeal()` - Validates meal creation
- `parseCreateMealWithAutoCalories()` - Creates meals with automatic calorie calculation
- `validateFoodItemIds()` - Ensures food items exist
- `calculateTotalCalories()` - Calculates calories from food items
- `calculateAccurateTotalCalories()` - More precise calculation using ingredient data

### 4. Enhanced Meal DAO (`src/daos/meal.dao.ts`)

- **CRUD Operations**: Complete create, read, update, delete functionality
- **Relationship Management**: Handles meal-fooditem relationships
- **Search Capabilities**: Advanced filtering by user, date, calories
- **Food Item Management**: Add/remove food items from meals

### 5. Meal Service (`src/services/meal.service.ts`)

- High-level meal operations with validation
- Automatic calorie calculation
- Statistical analysis
- Error handling with proper validation messages

## Usage Examples

### Creating Meals

#### Basic Meal Creation

```typescript
import MealService from '../services/meal.service'

const mealService = new MealService()

// Create a basic meal
const newMeal = await mealService.createMeal({
  name: 'Breakfast',
  userId: 'user-uuid',
  totalCalories: 450
})
```

#### Meal with Food Items

```typescript
// Create meal with food items (array format)
const mealWithFoodItems = await mealService.createMealWithFoodItems({
  name: 'Lunch',
  userId: 'user-uuid',
  totalCalories: 650,
  foodItems: [
    { foodId: 'food-uuid-1' },
    { foodId: 'food-uuid-2' },
    { foodId: 'food-uuid-3' }
  ]
})
```

#### Automatic Calorie Calculation

```typescript
// Create meal with automatic calorie calculation
const smartMeal = await mealService.createMealWithAutoCalories({
  name: 'Dinner',
  userId: 'user-uuid',
  foodItemIds: ['food-uuid-1', 'food-uuid-2'],
  useAccurateCalculation: true // Uses ingredient nutritional data
})
```

### Updating Meals

```typescript
// Update meal details
const updatedMeal = await mealService.updateMeal({
  id: 'meal-uuid',
  name: 'Updated Breakfast',
  totalCalories: 500,
  foodItemIds: ['new-food-uuid-1', 'new-food-uuid-2'] // Updates food items
})
```

### Managing Food Items in Meals

```typescript
// Add food items to existing meal
await mealService.addFoodItemsToMeal({
  mealId: 'meal-uuid',
  foodItemIds: ['food-uuid-4', 'food-uuid-5']
})

// Remove food items from meal
await mealService.removeFoodItemsFromMeal({
  mealId: 'meal-uuid',
  foodItemIds: ['food-uuid-1']
})
```

### Searching and Filtering

```typescript
// Advanced meal search
const searchResults = await mealService.searchMeals({
  name: 'breakfast',
  userId: 'user-uuid',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-01-31'),
  minCalories: 300,
  maxCalories: 600,
  limit: 20,
  offset: 0
})

// Get user's meals
const userMeals = await mealService.getMealsByUserId('user-uuid', 10, 0)
```

### Retrieving Meals with Relations

```typescript
// Get meal with all relations
const fullMeal = await mealService.getMealById('meal-uuid', {
  includeUser: true,
  includeFoodItems: true
})

// Result includes:
// - Basic meal data
// - User information (id, name, email)
// - Food items with ingredients and nutrition data
```

### Statistics and Analytics

```typescript
// Get meal statistics for a user
const stats = await mealService.getMealStats({
  userId: 'user-uuid',
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-01-31'),
  groupBy: 'day' // or "week" or "month"
})

// Returns:
// {
//   totalMeals: 45,
//   totalCalories: 67500,
//   averageCalories: 1500,
//   groupedData: {
//     "2025-01-01": { count: 3, totalCalories: 4500 },
//     "2025-01-02": { count: 2, totalCalories: 3000 },
//     // ...
//   }
// }
```

### Parser Utilities

```typescript
import { mealParser } from '../utils/mealParser'

// Validate meal data before processing
const validatedMealData = mealParser.parseCreateMeal({
  name: 'Test Meal',
  totalCalories: 500
})

// Calculate calories from food items
const totalCalories = await mealParser.calculateAccurateTotalCalories([
  'food-uuid-1',
  'food-uuid-2'
])

// Validate food item existence
await mealParser.validateFoodItemIds(['food-uuid-1', 'food-uuid-2'])
```

## Key Features

### 🔍 **Advanced Search & Filtering**

- Search by name, user, date range, calorie range
- Pagination support
- Case-insensitive text search

### 📊 **Automatic Calorie Calculation**

- Basic estimation for quick operations
- Accurate calculation using ingredient nutritional data
- Portion size consideration

### 🔗 **Relationship Management**

- Seamless meal-fooditem relationship handling
- Bulk add/remove operations
- Duplicate prevention

### 📈 **Analytics & Statistics**

- Meal count and calorie totals
- Time-based grouping (day/week/month)
- User-specific statistics

### ✅ **Comprehensive Validation**

- Runtime validation with Zod schemas
- Type safety with TypeScript
- Detailed error messages

### 🛡️ **Error Handling**

- Proper error types (NotFoundError, ValidationError)
- Prisma error code handling
- Graceful fallbacks

## Database Relationships

The system properly handles the Prisma schema relationships:

- **User ↔ Meal**: One-to-many (user can have multiple meals)
- **Meal ↔ MealFoodItem**: One-to-many (meal can have multiple food items)
- **FoodItem ↔ MealFoodItem**: One-to-many (food item can be in multiple meals)
- **FoodItem ↔ FoodIngredient**: One-to-many (food item has multiple ingredients)
- **Ingredient ↔ FoodIngredient**: One-to-many (ingredient can be in multiple food items)

This provides a complete, validated, and efficient meal management system for your nutrition tracking application! 🚀

