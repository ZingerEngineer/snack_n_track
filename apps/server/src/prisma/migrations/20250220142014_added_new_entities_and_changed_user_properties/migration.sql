/*
  Warnings:

  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dietary_preferences` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `medical_conditions` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days',
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RefreshToken_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "dietary_preferences",
DROP COLUMN "goals",
DROP COLUMN "medical_conditions",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER',
ADD COLUMN     "softDelete" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "notifications" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHealthTracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "BMI" DOUBLE PRECISION,
    "sugarLevel" DOUBLE PRECISION,
    "bloodPressure" TEXT,
    "cholesterolLevel" DOUBLE PRECISION,
    "dietaryPreference" TEXT,
    "activityLevel" TEXT,
    "dateRecorded" TIMESTAMP(3),

    CONSTRAINT "UserHealthTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "goalName" TEXT NOT NULL DEFAULT 'New Goal',
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoal" (
    "userId" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("userId","goalId")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "goalId" TEXT,
    "userId" TEXT,
    "goalWeight" DOUBLE PRECISION NOT NULL,
    "currentWeight" DOUBLE PRECISION NOT NULL,
    "caloriesTarget" DOUBLE PRECISION NOT NULL,
    "caloriesBurned" DOUBLE PRECISION NOT NULL,
    "dateMeasured" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "mealTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalCalories" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealFoodItem" (
    "mealId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "MealFoodItem_pkey" PRIMARY KEY ("mealId","foodId")
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "portionSize" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodIngredient" (
    "foodId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "FoodIngredient_pkey" PRIMARY KEY ("foodId","ingredientId")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "ingredientName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientNutrition" (
    "id" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "proteins" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "saturatedFat" DOUBLE PRECISION NOT NULL,
    "unsaturatedFat" DOUBLE PRECISION NOT NULL,
    "transFat" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION NOT NULL,
    "sugars" DOUBLE PRECISION NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "sodium" DOUBLE PRECISION NOT NULL,
    "potassium" DOUBLE PRECISION NOT NULL,
    "calcium" DOUBLE PRECISION NOT NULL,
    "iron" DOUBLE PRECISION NOT NULL,
    "magnesium" DOUBLE PRECISION NOT NULL,
    "zinc" DOUBLE PRECISION NOT NULL,
    "vitaminA" DOUBLE PRECISION NOT NULL,
    "vitaminB1" DOUBLE PRECISION NOT NULL,
    "vitaminB2" DOUBLE PRECISION NOT NULL,
    "vitaminB3" DOUBLE PRECISION NOT NULL,
    "vitaminB5" DOUBLE PRECISION NOT NULL,
    "vitaminB6" DOUBLE PRECISION NOT NULL,
    "vitaminB7" DOUBLE PRECISION NOT NULL,
    "vitaminB9" DOUBLE PRECISION NOT NULL,
    "vitaminB12" DOUBLE PRECISION NOT NULL,
    "vitaminC" DOUBLE PRECISION NOT NULL,
    "vitaminD" DOUBLE PRECISION NOT NULL,
    "vitaminE" DOUBLE PRECISION NOT NULL,
    "vitaminK" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IngredientNutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealScan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "scanDate" TIMESTAMP(3) NOT NULL,
    "confidenceScore" DOUBLE PRECISION NOT NULL,
    "approvalStatus" TEXT NOT NULL,

    CONSTRAINT "MealScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCondition" (
    "id" TEXT NOT NULL,
    "conditionName" TEXT NOT NULL,

    CONSTRAINT "MedicalCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMedicalCondition" (
    "userId" TEXT NOT NULL,
    "medicalConditionId" TEXT NOT NULL,

    CONSTRAINT "UserMedicalCondition_pkey" PRIMARY KEY ("userId","medicalConditionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItem_foodName_key" ON "FoodItem"("foodName");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientNutrition_ingredientId_key" ON "IngredientNutrition"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHealthTracking" ADD CONSTRAINT "UserHealthTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealFoodItem" ADD CONSTRAINT "MealFoodItem_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealFoodItem" ADD CONSTRAINT "MealFoodItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodIngredient" ADD CONSTRAINT "FoodIngredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodIngredient" ADD CONSTRAINT "FoodIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientNutrition" ADD CONSTRAINT "IngredientNutrition_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealScan" ADD CONSTRAINT "MealScan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealScan" ADD CONSTRAINT "MealScan_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedicalCondition" ADD CONSTRAINT "UserMedicalCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedicalCondition" ADD CONSTRAINT "UserMedicalCondition_medicalConditionId_fkey" FOREIGN KEY ("medicalConditionId") REFERENCES "MedicalCondition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
