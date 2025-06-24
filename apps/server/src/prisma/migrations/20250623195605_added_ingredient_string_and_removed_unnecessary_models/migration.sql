/*
  Warnings:

  - You are about to drop the column `caloriesBurned` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `caloriesTarget` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `currentWeight` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `dateMeasured` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `goalWeight` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IngredientNutrition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealScan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodItemToMealScan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredientString` to the `FoodItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IngredientNutrition" DROP CONSTRAINT "IngredientNutrition_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "MealScan" DROP CONSTRAINT "MealScan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_goalId_fkey";

-- DropForeignKey
ALTER TABLE "UserGoal" DROP CONSTRAINT "UserGoal_goalId_fkey";

-- DropForeignKey
ALTER TABLE "UserGoal" DROP CONSTRAINT "UserGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "_FoodItemToMealScan" DROP CONSTRAINT "_FoodItemToMealScan_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodItemToMealScan" DROP CONSTRAINT "_FoodItemToMealScan_B_fkey";

-- AlterTable
ALTER TABLE "FoodItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "ingredientString" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "calciumAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "calciumUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "carbohydratesAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "carbohydratesUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "cholesterolAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "cholesterolUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "fatsAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fatsUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "fiberAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fiberUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "ironAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ironUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "magnesiumAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "magnesiumUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "potassiumAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "potassiumUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "proteinsAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "proteinsUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "saturatedFatAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "saturatedFatUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "sodiumAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sodiumUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "sugarsAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sugarsUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "transFatAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "transFatUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "unsaturatedFatAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "unsaturatedFatUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "vitaminAAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminAUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminB12Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB12Unit" "NutritionUnit" NOT NULL DEFAULT 'mcg',
ADD COLUMN     "vitaminB1Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB1Unit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminB2Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB2Unit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminB3Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB3Unit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminB5Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB5Unit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminB6Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB6Unit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminB7Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB7Unit" "NutritionUnit" NOT NULL DEFAULT 'mcg',
ADD COLUMN     "vitaminB9Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB9Unit" "NutritionUnit" NOT NULL DEFAULT 'mcg',
ADD COLUMN     "vitaminCAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminCUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminDAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminDUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminEAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminEUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "vitaminKAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminKUnit" "NutritionUnit" NOT NULL DEFAULT 'mg',
ADD COLUMN     "zincAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "zincUnit" "NutritionUnit" NOT NULL DEFAULT 'mg';

-- AlterTable
ALTER TABLE "MedicalCondition" ADD COLUMN     "decscription" TEXT,
ADD COLUMN     "medications" TEXT,
ADD COLUMN     "symptoms" TEXT,
ADD COLUMN     "treatment" TEXT;

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "caloriesBurned",
DROP COLUMN "caloriesTarget",
DROP COLUMN "currentWeight",
DROP COLUMN "dateMeasured",
DROP COLUMN "goalWeight",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "progressGoal" TEXT NOT NULL DEFAULT 'WEIGHT',
ADD COLUMN     "progressStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "progressType" TEXT NOT NULL DEFAULT 'WEIGHT',
ADD COLUMN     "progressUnit" TEXT NOT NULL DEFAULT 'kg',
ADD COLUMN     "progressValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "softDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- DropTable
DROP TABLE "Goal";

-- DropTable
DROP TABLE "IngredientNutrition";

-- DropTable
DROP TABLE "MealScan";

-- DropTable
DROP TABLE "UserGoal";

-- DropTable
DROP TABLE "_FoodItemToMealScan";
