/*
  Warnings:

  - You are about to drop the column `calcium` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrates` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `cholesterol` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `fats` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `fiber` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `iron` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `magnesium` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `potassium` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `proteins` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `saturatedFat` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `sodium` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `sugars` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `transFat` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `unsaturatedFat` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminA` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB1` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB12` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB2` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB3` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB5` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB6` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB7` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB9` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminC` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminD` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminE` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminK` on the `IngredientNutrition` table. All the data in the column will be lost.
  - You are about to drop the column `zinc` on the `IngredientNutrition` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NutritionUnit" AS ENUM ('g', 'kg', 'mg', 'mcg', 'L', 'mL', 'mcL', 'kcal', 'kJ', 'oz', 'lb');

-- AlterTable
ALTER TABLE "IngredientNutrition" DROP COLUMN "calcium",
DROP COLUMN "carbohydrates",
DROP COLUMN "cholesterol",
DROP COLUMN "fats",
DROP COLUMN "fiber",
DROP COLUMN "iron",
DROP COLUMN "magnesium",
DROP COLUMN "potassium",
DROP COLUMN "proteins",
DROP COLUMN "saturatedFat",
DROP COLUMN "sodium",
DROP COLUMN "sugars",
DROP COLUMN "transFat",
DROP COLUMN "unsaturatedFat",
DROP COLUMN "vitaminA",
DROP COLUMN "vitaminB1",
DROP COLUMN "vitaminB12",
DROP COLUMN "vitaminB2",
DROP COLUMN "vitaminB3",
DROP COLUMN "vitaminB5",
DROP COLUMN "vitaminB6",
DROP COLUMN "vitaminB7",
DROP COLUMN "vitaminB9",
DROP COLUMN "vitaminC",
DROP COLUMN "vitaminD",
DROP COLUMN "vitaminE",
DROP COLUMN "vitaminK",
DROP COLUMN "zinc",
ADD COLUMN     "calciumAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
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
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
