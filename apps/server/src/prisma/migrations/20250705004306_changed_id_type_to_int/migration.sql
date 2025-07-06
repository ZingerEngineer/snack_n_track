/*
  Warnings:

  - The primary key for the `FoodIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FoodItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `FoodItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `MealFoodItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - Changed the type of `foodId` on the `FoodIngredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `foodId` on the `MealFoodItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "FoodIngredient" DROP CONSTRAINT "FoodIngredient_foodId_fkey";

-- DropForeignKey
ALTER TABLE "MealFoodItem" DROP CONSTRAINT "MealFoodItem_foodId_fkey";

-- DropIndex
DROP INDEX "User_googleId_key";

-- AlterTable
ALTER TABLE "FoodIngredient" DROP CONSTRAINT "FoodIngredient_pkey",
DROP COLUMN "foodId",
ADD COLUMN     "foodId" INTEGER NOT NULL,
ADD CONSTRAINT "FoodIngredient_pkey" PRIMARY KEY ("foodId", "ingredientId");

-- AlterTable
ALTER TABLE "FoodItem" DROP CONSTRAINT "FoodItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MealFoodItem" DROP CONSTRAINT "MealFoodItem_pkey",
DROP COLUMN "foodId",
ADD COLUMN     "foodId" INTEGER NOT NULL,
ADD CONSTRAINT "MealFoodItem_pkey" PRIMARY KEY ("mealId", "foodId");

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleId";

-- AddForeignKey
ALTER TABLE "MealFoodItem" ADD CONSTRAINT "MealFoodItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodIngredient" ADD CONSTRAINT "FoodIngredient_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
