<template>
  <ion-page>
    <ion-content>
      <div class="tool-bar-safe-margin ion-padding flex flex-col items-center gap-6">
        <img
          :src="scannedImage"
          alt="Scanned Food"
          class="food-image object-cover aspect-square rounded-lg shadow-lg border-2 border-primary mt-2 w-full max-w-96"
        />

        <!-- Total Stats Summary -->
        <ion-card
          class="stats-summary-card w-full max-w-96 flex justify-center flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg min-h-[11rem]"
        >
          <ion-card-header>
            <ion-card-title class="font-bold">Total Nutritional Stats</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="stats-grid flex flex-wrap gap-4 justify-between items-center">
              <div class="stat-item flex flex-col items-center flex-1 min-w-[90px]">
                <span class="stat-label font-medium text-gray-600">Calories</span>
                <span class="stat-value text-lg font-bold text-black"
                  >{{ totalStats.calories }} kcal</span
                >
              </div>
              <div class="stat-item flex flex-col items-center flex-1 min-w-[90px]">
                <span class="stat-label font-medium text-gray-600">Protein</span>
                <span class="stat-value text-lg font-bold text-black"
                  >{{ totalStats.protein }}g</span
                >
              </div>
              <div class="stat-item flex flex-col items-center flex-1 min-w-[90px]">
                <span class="stat-label font-medium text-gray-600">Carbs</span>
                <span class="stat-value text-lg font-bold text-black">{{ totalStats.carbs }}g</span>
              </div>
              <div class="stat-item flex flex-col items-center flex-1 min-w-[90px]">
                <span class="stat-label font-medium text-gray-600">Fats</span>
                <span class="stat-value text-lg font-bold text-black">{{ totalStats.fats }}g</span>
              </div>
              <div class="stat-item flex flex-col items-center flex-1 min-w-[90px]">
                <span class="stat-label font-medium text-gray-600">Sugar</span>
                <span class="stat-value text-lg font-bold text-black">{{ totalStats.sugar }}g</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Meals Section -->
        <div
          v-for="(mealItem, mealIndex) in meals"
          :key="mealIndex"
          class="meals-section w-full max-w-96 flex flex-col gap-4 mb-4"
        >
          <ion-card
            class="flex justify-center flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg w-full min-h-[11rem]"
          >
            <ion-card-header>
              <ion-card-title class="font-bold">{{ mealItem.name }} </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <!-- Food Items -->
              <div
                v-for="(foodItem, foodIndex) in mealItem.foodItems"
                :key="foodIndex"
                class="food-item"
              >
                <ion-card
                  class="food-item-card flex justify-center flex-col p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg w-full"
                >
                  <ion-card-content>
                    <!-- Ingredients Section -->
                    <div
                      class="ingredients-section font-semibold flex flex-col w-full gap-4 max-w-96"
                    >
                      <h2>Ingredients & Nutrition:</h2>

                      <div
                        v-for="(ingredient, ingredientIndex) in foodItem.ingredients"
                        :key="ingredientIndex"
                        class="ingredient-item rounded-md shadow-lg mb-4"
                      >
                        <div
                          class="ingredient-controls border-t-4 border-primary flex flex-col gap-2 w-full p-2 bg-white rounded-t-lg"
                        >
                          <div
                            class="ingredient-name flex justify-between items-center font-semibold text-base"
                          >
                            <div
                              class="flex items-center justify-center p-2 border-2 border-primary rounded-full gap-2"
                            >
                              <img
                                v-if="foodItem.foodType === FoodType.MEAL"
                                :src="meal"
                                alt="Meal"
                                class="text-black w-4 h-4"
                              />
                              <img
                                v-else-if="foodItem.foodType === FoodType.MEAT"
                                :src="meat"
                                alt="Meat"
                                class="text-black border-2 border-primary rounded-full w-4 h-4"
                              />
                              <img
                                v-else-if="foodItem.foodType === FoodType.GRAIN"
                                :src="grain"
                                alt="Grain"
                                class="text-black border-2 border-primary rounded-full w-4 h-4"
                              />
                              <img
                                v-else-if="foodItem.foodType === FoodType.DAIRY"
                                :src="dairy"
                                alt="Dairy"
                                class="text-black border-2 border-primary rounded-full w-4 h-4"
                              />
                              <img
                                v-else-if="foodItem.foodType === FoodType.BEVERAGE"
                                :src="beverage"
                                alt="Beverage"
                                class="text-black border-2 border-primary rounded-full w-4 h-4"
                              />
                              <img
                                v-else-if="foodItem.foodType === FoodType.VEGETABLE"
                                :src="vegetable"
                                alt="Vegetable"
                                class="text-black border-2 border-primary rounded-full w-4 h-4"
                              />
                              <img
                                v-else-if="foodItem.foodType === FoodType.FRUIT"
                                :src="fruit"
                                alt="Fruit"
                                class="text-black border-2 border-primary rounded-full w-4 h-4"
                              />
                              <img
                                v-else-if="foodItem.foodType === FoodType.FATS"
                                :src="fats"
                                alt="Fats"
                                class="text-black border-2 border-primary rounded-full w-4 h-4"
                              />
                              <p>
                                {{ foodItem.foodType.toLowerCase() }}
                              </p>
                            </div>

                            <span>{{ ingredient.ingredientName }}</span>
                            <ion-button
                              fill="clear"
                              color="danger"
                              size="small"
                              @click="() => removeIngredient(mealIndex, foodIndex, ingredientIndex)"
                              class="ml-2"
                            >
                              <FontAwesomeIcon :icon="faTrash" class="text-red-500" />
                            </ion-button>
                          </div>
                          <div class="flex flex-row justify-between gap-2 items-center">
                            <ion-input
                              v-model.number="foodItem.portionSizeValue"
                              type="number"
                              placeholder="Amount"
                              class="ingredient-calories w-24 ml-4"
                              min="0"
                            ></ion-input>
                            <ion-select
                              v-model="foodItem.portionUnit"
                              placeholder="Unit"
                              class="ingredient-calories-unit w-28"
                            >
                              <ion-select-option
                                v-for="unit in Object.values(PortionUnit)"
                                :key="unit"
                                :value="unit"
                              >
                                {{ unit }}
                              </ion-select-option>
                            </ion-select>
                          </div>
                        </div>

                        <!-- Nutrition values for this ingredient -->
                        <div class="ingredient-nutrition flex flex-col">
                          <div class="ingredient-field flex flex-col w-full gap-2 p-2">
                            <label class="font-medium text-gray-600">Calories:</label>
                            <div>{{ ingredient.calories }} {{ ingredient.caloriesUnit }}</div>
                          </div>
                          <div class="p-2 flex flex-col gap-4">
                            <p>Nutrients:</p>
                            <div class="nutrients-fields grid grid-cols-2 gap-4">
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Protein</label>
                                <div>
                                  {{ ingredient.proteinsAmount }} {{ ingredient.proteinsUnit }}
                                </div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Carbs</label>
                                <div>
                                  {{ ingredient.carbohydratesAmount }}
                                  {{ ingredient.carbohydratesUnit }}
                                </div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Fats</label>
                                <div>{{ ingredient.fatsAmount }} {{ ingredient.fatsUnit }}</div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Sugar</label>
                                <div>{{ ingredient.sugarAmount }} {{ ingredient.sugarUnit }}</div>
                              </div>
                            </div>
                          </div>

                          <div class="ingredient-minerals flex flex-col gap-4 p-2">
                            <p>Minerals:</p>
                            <div class="grid grid-cols-2 gap-4">
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Iron</label>
                                <div>{{ ingredient.ironAmount }} {{ ingredient.ironUnit }}</div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Potassium</label>
                                <div>
                                  {{ ingredient.potassiumAmount }} {{ ingredient.potassiumUnit }}
                                </div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Sodium</label>
                                <div>{{ ingredient.sodiumAmount }} {{ ingredient.sodiumUnit }}</div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Vitamin C</label>
                                <div>{{ ingredient.vitaminC }} {{ ingredient.vitaminCUnit }}</div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Vitamin B6</label>
                                <div>{{ ingredient.vitaminB6 }} {{ ingredient.vitaminB6Unit }}</div>
                              </div>
                              <div class="ingredient-field flex flex-col">
                                <label class="font-medium text-gray-600">Vitamin B12</label>
                                <div>
                                  {{ ingredient.vitaminB12 }} {{ ingredient.vitaminB12Unit }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ion-button
                        fill="outline"
                        @click="addIngredient(mealIndex, foodIndex)"
                        class="add-ingredient-btn"
                      >
                        <ion-icon name="add-outline" slot="start"></ion-icon>
                        Add Ingredient
                      </ion-button>
                    </div>

                    <!-- Food Item Stats -->
                    <div
                      class="food-item-stats mt-4 p-3 rounded-xl bg-gradient-to-r from-white to-gray-100 border border-primary shadow flex flex-col items-start gap-2"
                    >
                      <h5 class="font-semibold text-black mb-2">Food Item Total:</h5>
                      <div
                        class="mini-stats flex flex-wrap gap-3 text-sm font-medium text-gray-700"
                      >
                        <span class="px-2 py-1 rounded bg-primary/10"
                          >{{ getFoodItemStats(foodItem).calories }} kcal</span
                        >
                        <span class="px-2 py-1 rounded bg-primary/10"
                          >{{ getFoodItemStats(foodItem).protein }}g protein</span
                        >
                        <span class="px-2 py-1 rounded bg-primary/10"
                          >{{ getFoodItemStats(foodItem).carbs }}g carbs</span
                        >
                        <span class="px-2 py-1 rounded bg-primary/10"
                          >{{ getFoodItemStats(foodItem).fats }}g fats</span
                        >
                        <span class="px-2 py-1 rounded bg-primary/10"
                          >{{ getFoodItemStats(foodItem).sugar }}g sugar</span
                        >
                      </div>
                    </div>
                  </ion-card-content>
                </ion-card>
              </div>

              <!-- Add Food Item Section -->
              <div class="add-food-section">
                <ion-searchbar
                  v-model="searchQuery"
                  placeholder="Search for food items..."
                  @ionInput="handleSearch"
                  show-clear-button="focus"
                ></ion-searchbar>

                <!-- Recommended Food Tags -->
                <div class="recommended-tags">
                  <h5>Recommended:</h5>
                  <div class="tags-container">
                    <ion-chip
                      v-for="food in recommendedFoods"
                      :key="food.name"
                      @click="
                        addFoodItem(mealIndex, {
                          id: Math.random().toString(36).substr(2, 9),
                          foodName: food.name,
                          foodType: FoodType.MEAL,
                          portionSizeValue: 100,
                          portionUnit: PortionUnit.SERVING,
                          ingredients: [],
                        })
                      "
                      class="food-tag"
                    >
                      <ion-label>{{ food.name }}</ion-label>
                    </ion-chip>
                  </div>
                </div>

                <!-- Search Results -->
                <div v-if="searchResults.length > 0" class="search-results">
                  <h5>Search Results:</h5>
                  <ion-list>
                    <ion-item
                      v-for="food in searchResults"
                      :key="food.foodName"
                      button
                      @click="addFoodItem(mealIndex, food)"
                    >
                      <ion-label>{{ food.foodName }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Add New Meal Button -->
        <ion-button expand="block" fill="outline" @click="addMeal" class="add-meal-btn">
          <ion-icon name="add-outline" slot="start"></ion-icon>
          Add Another Meal
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonList,
  IonItem,
} from '@ionic/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import fats from '../../assets/fats.svg'
import meat from '../../assets/meat.svg'
import grain from '../../assets/grain.svg'
import dairy from '../../assets/dairy.svg'
import beverage from '../../assets/beverage.svg'
import vegetable from '../../assets/vegetable.svg'
import fruit from '../../assets/fruit.svg'
import meal from '../../assets/meal.svg'

import type { TMeal } from '../../types/meal.types'
import { FoodType, NutritionUnit, PortionUnit } from '../../types/shared.types'
import type { TFoodItem } from '../../types/food.types'
import type { TIngredient } from '../../types/ingredient.types'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
// Mock scanned image
const scannedImage = ref('/placeholder.svg?height=300&width=400')

// Search functionality
const searchQuery = ref('')
const searchResults = ref<TFoodItem[]>([])

// Sample food database
const foodDataBase: TMeal[] = [
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    totalCalories: 275,
    mealType: 'LUNCH',
    certaintyPercentage: 95,
    foodItems: [
      {
        id: '1-1',
        foodName: 'Grilled Chicken Breast',
        portionSizeValue: 150,
        portionUnit: PortionUnit.SERVING,
        foodType: FoodType.MEAL,
        ingredients: [
          {
            id: '1-1-1',
            ingredientName: 'Chicken Breast',
            calories: 231,
            caloriesUnit: NutritionUnit.kcal,
            proteinsAmount: 43.5,
            proteinsUnit: NutritionUnit.g,
            carbohydratesAmount: 0,
            carbohydratesUnit: NutritionUnit.g,
            fatsAmount: 5,
            fatsUnit: NutritionUnit.g,
            sugarAmount: 0,
            sugarUnit: NutritionUnit.g,
            ironAmount: 0.9,
            ironUnit: NutritionUnit.mg,
            potassiumAmount: 0.2,
            potassiumUnit: NutritionUnit.mg,
            sodiumAmount: 70,
            sodiumUnit: NutritionUnit.mg,
            vitaminC: 0,
            vitaminCUnit: NutritionUnit.mg,
            vitaminB6: 0.6,
            vitaminB6Unit: NutritionUnit.mg,
            vitaminB12: 0,
            vitaminB12Unit: NutritionUnit.mcg,
          },
          {
            id: '1-1-2',
            ingredientName: 'Olive Oil',
            calories: 200,
            caloriesUnit: NutritionUnit.kcal,
            proteinsAmount: 40,
            proteinsUnit: NutritionUnit.g,
            carbohydratesAmount: 0,
            carbohydratesUnit: NutritionUnit.g,
            fatsAmount: 4,
            fatsUnit: NutritionUnit.g,
            sugarAmount: 0,
            sugarUnit: NutritionUnit.g,
            ironAmount: 0.7,
            ironUnit: NutritionUnit.mg,
            potassiumAmount: 0.15,
            potassiumUnit: NutritionUnit.mg,
            sodiumAmount: 60,
            sodiumUnit: NutritionUnit.mg,
            vitaminC: 0,
            vitaminCUnit: NutritionUnit.mg,
            vitaminB6: 0.5,
            vitaminB6Unit: NutritionUnit.mg,
            vitaminB12: 0,
            vitaminB12Unit: NutritionUnit.mcg,
          },
        ],
      },
    ],
  },
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    totalCalories: 275,
    mealType: 'LUNCH',
    certaintyPercentage: 95,
    foodItems: [
      {
        id: '1-1',
        foodName: 'Grilled Chicken Breast',
        portionSizeValue: 150,
        portionUnit: PortionUnit.SERVING,
        foodType: FoodType.MEAL,
        ingredients: [
          {
            id: '1-1-1',
            ingredientName: 'Chicken Breast',
            calories: 231,
            caloriesUnit: NutritionUnit.kcal,
            proteinsAmount: 43.5,
            proteinsUnit: NutritionUnit.g,
            carbohydratesAmount: 0,
            carbohydratesUnit: NutritionUnit.g,
            fatsAmount: 5,
            fatsUnit: NutritionUnit.g,
            sugarAmount: 0,
            sugarUnit: NutritionUnit.g,
            ironAmount: 0.9,
            ironUnit: NutritionUnit.mg,
            potassiumAmount: 0.2,
            potassiumUnit: NutritionUnit.mg,
            sodiumAmount: 70,
            sodiumUnit: NutritionUnit.mg,
            vitaminC: 0,
            vitaminCUnit: NutritionUnit.mg,
            vitaminB6: 0.6,
            vitaminB6Unit: NutritionUnit.mg,
            vitaminB12: 0,
            vitaminB12Unit: NutritionUnit.mcg,
          },
          {
            id: '1-1-2',
            ingredientName: 'Olive Oil',
            calories: 200,
            caloriesUnit: NutritionUnit.kcal,
            proteinsAmount: 40,
            proteinsUnit: NutritionUnit.g,
            carbohydratesAmount: 0,
            carbohydratesUnit: NutritionUnit.g,
            fatsAmount: 4,
            fatsUnit: NutritionUnit.g,
            sugarAmount: 0,
            sugarUnit: NutritionUnit.g,
            ironAmount: 0.7,
            ironUnit: NutritionUnit.mg,
            potassiumAmount: 0.15,
            potassiumUnit: NutritionUnit.mg,
            sodiumAmount: 60,
            sodiumUnit: NutritionUnit.mg,
            vitaminC: 0,
            vitaminCUnit: NutritionUnit.mg,
            vitaminB6: 0.5,
            vitaminB6Unit: NutritionUnit.mg,
            vitaminB12: 0,
            vitaminB12Unit: NutritionUnit.mcg,
          },
        ],
      },
    ],
  },
]

// Recommended foods
const recommendedFoods = ref([
  { name: 'Grilled Chicken Breast' },
  { name: 'Brown Rice' },
  { name: 'Caesar Salad' },
])

// Mock meal data (simulating AI scan results)
const meals = ref(foodDataBase)

// Computed total stats
const totalStats = computed(() => {
  const totals = { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 }

  meals.value.forEach((meal) => {
    if (!meal.foodItems) return
    meal.foodItems.forEach((foodItem) => {
      if (!foodItem.ingredients) return
      foodItem.ingredients.forEach((ingredient) => {
        totals.calories += ingredient.calories || 0
        totals.protein += ingredient.proteinsAmount || 0
        totals.carbs += ingredient.carbohydratesAmount || 0
        totals.fats += ingredient.fatsAmount || 0
        totals.sugar += ingredient.sugarAmount || 0
      })
    })
  })

  return {
    calories: Math.round(totals.calories * 10) / 10,
    protein: Math.round(totals.protein * 10) / 10,
    carbs: Math.round(totals.carbs * 10) / 10,
    fats: Math.round(totals.fats * 10) / 10,
    sugar: Math.round(totals.sugar * 10) / 10,
  }
})

// Methods
const getFoodItemStats = (foodItem: TFoodItem) => {
  const stats = { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 }

  if (!foodItem.ingredients) return stats
  foodItem.ingredients.forEach((ingredient) => {
    stats.calories += ingredient.calories || 0
    stats.protein += ingredient.proteinsAmount || 0
    stats.carbs += ingredient.carbohydratesAmount || 0
    stats.fats += ingredient.fatsAmount || 0
    stats.sugar += ingredient.sugarAmount || 0
  })

  return {
    calories: Math.round(stats.calories * 10) / 10,
    protein: Math.round(stats.protein * 10) / 10,
    carbs: Math.round(stats.carbs * 10) / 10,
    fats: Math.round(stats.fats * 10) / 10,
    sugar: Math.round(stats.sugar * 10) / 10,
  }
}

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  const query = target.value.toLowerCase()
  if (query.length > 2) {
    // Flatten all foodItems from all meals and filter by foodName
    searchResults.value = foodDataBase
      .flatMap((meal) => meal.foodItems || [])
      .filter((foodItem) => foodItem.foodName && foodItem.foodName.toLowerCase().includes(query))
  } else {
    searchResults.value = []
  }
}

const addFoodItem = (mealIndex: number, food: TFoodItem) => {
  const newFoodItem = {
    id: food.id || Math.random().toString(36).substr(2, 9),
    foodName: food.foodName || food.foodName || 'New Food Item',
    foodType: food.foodType || FoodType.MEAL,
    portionSizeValue: food.portionSizeValue || 100,
    portionUnit: food.portionUnit || PortionUnit.SERVING,
    ingredients: food.ingredients || [],
  }
  if (!meals.value[mealIndex].foodItems) {
    meals.value[mealIndex].foodItems = []
  }
  meals.value[mealIndex].foodItems.push(newFoodItem)
  searchQuery.value = ''
  searchResults.value = []
}

const removeFoodItem = (mealIndex: number, foodIndex: number) => {
  if (!meals.value[mealIndex].foodItems) return
  meals.value[mealIndex].foodItems.splice(foodIndex, 1)
}

const addIngredient = (mealIndex: number, foodIndex: number) => {
  const newIngredient: TIngredient = {
    id: Math.random().toString(36).substr(2, 9),
    ingredientName: 'New Ingredient',
    calories: 0,
    caloriesUnit: NutritionUnit.kcal,
    proteinsAmount: 0,
    proteinsUnit: NutritionUnit.g,
    carbohydratesAmount: 0,
    carbohydratesUnit: NutritionUnit.g,
    fatsAmount: 0,
    fatsUnit: NutritionUnit.g,
    sugarAmount: 0,
    sugarUnit: NutritionUnit.g,
    ironAmount: 0,
    ironUnit: NutritionUnit.mg,
    potassiumAmount: 0,
    potassiumUnit: NutritionUnit.mg,
    sodiumAmount: 0,
    sodiumUnit: NutritionUnit.mg,
    vitaminC: 0,
    vitaminCUnit: NutritionUnit.mg,
    vitaminB6: 0,
    vitaminB6Unit: NutritionUnit.mg,
    vitaminB12: 0,
    vitaminB12Unit: NutritionUnit.mcg,
  }
  if (!meals.value) {
    meals.value = []
  }
  if (!meals.value[mealIndex].foodItems) {
    meals.value[mealIndex].foodItems = []
  }
  if (!meals.value[mealIndex].foodItems[foodIndex].ingredients) {
    meals.value[mealIndex].foodItems[foodIndex].ingredients = []
    meals.value[mealIndex].foodItems[foodIndex].ingredients.push(newIngredient)
  }
}

const removeIngredient = (mealIndex: number, foodIndex: number, ingredientIndex: number) => {
  if (!meals.value[mealIndex].foodItems || !meals.value[mealIndex].foodItems[foodIndex].ingredients)
    return
  if (
    ingredientIndex < 0 ||
    ingredientIndex >= meals.value[mealIndex].foodItems[foodIndex].ingredients.length
  )
    return
  meals.value[mealIndex].foodItems[foodIndex].ingredients.splice(ingredientIndex, 1)
}
const addMeal = () => {
  meals.value.push({
    id: Math.random().toString(36).substr(2, 9),
    name: 'New Meal',
    totalCalories: 0,
    mealType: 'OTHER',
    certaintyPercentage: 100,
    foodItems: [],
  })
}
</script>
