/*
  Warnings:

  - You are about to drop the column `typeOfMeal` on the `Meal` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'OTHER');

-- CreateEnum
CREATE TYPE "FoodType" AS ENUM ('VEGETABLE', 'FRUIT', 'GRAIN', 'DESSERT', 'BEVERAGE', 'MEAL');

-- AlterTable
ALTER TABLE "FoodItem" ADD COLUMN     "foodType" "FoodType" NOT NULL DEFAULT 'MEAL';

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "typeOfMeal",
ADD COLUMN     "certaintyPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "mealType" "MealType" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
