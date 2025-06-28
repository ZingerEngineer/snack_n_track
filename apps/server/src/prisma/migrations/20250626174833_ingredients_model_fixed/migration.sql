/*
  Warnings:

  - You are about to drop the column `amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `calciumAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `calciumUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `cholesterolAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `cholesterolUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `fiberAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `fiberUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `magnesiumAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `magnesiumUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `saturatedFatAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `saturatedFatUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `sugarsAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `sugarsUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `transFatAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `transFatUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `unsaturatedFatAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `unsaturatedFatUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminAAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminAUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB12Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB1Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB1Unit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB2Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB2Unit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB3Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB3Unit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB5Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB5Unit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB6Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB7Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB7Unit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB9Amount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminB9Unit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminCAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminDAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminDUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminEAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminEUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminKAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `vitaminKUnit` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `zincAmount` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `zincUnit` on the `Ingredient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ingredientName]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "amount",
DROP COLUMN "calciumAmount",
DROP COLUMN "calciumUnit",
DROP COLUMN "cholesterolAmount",
DROP COLUMN "cholesterolUnit",
DROP COLUMN "fiberAmount",
DROP COLUMN "fiberUnit",
DROP COLUMN "magnesiumAmount",
DROP COLUMN "magnesiumUnit",
DROP COLUMN "saturatedFatAmount",
DROP COLUMN "saturatedFatUnit",
DROP COLUMN "sugarsAmount",
DROP COLUMN "sugarsUnit",
DROP COLUMN "transFatAmount",
DROP COLUMN "transFatUnit",
DROP COLUMN "unsaturatedFatAmount",
DROP COLUMN "unsaturatedFatUnit",
DROP COLUMN "vitaminAAmount",
DROP COLUMN "vitaminAUnit",
DROP COLUMN "vitaminB12Amount",
DROP COLUMN "vitaminB1Amount",
DROP COLUMN "vitaminB1Unit",
DROP COLUMN "vitaminB2Amount",
DROP COLUMN "vitaminB2Unit",
DROP COLUMN "vitaminB3Amount",
DROP COLUMN "vitaminB3Unit",
DROP COLUMN "vitaminB5Amount",
DROP COLUMN "vitaminB5Unit",
DROP COLUMN "vitaminB6Amount",
DROP COLUMN "vitaminB7Amount",
DROP COLUMN "vitaminB7Unit",
DROP COLUMN "vitaminB9Amount",
DROP COLUMN "vitaminB9Unit",
DROP COLUMN "vitaminCAmount",
DROP COLUMN "vitaminDAmount",
DROP COLUMN "vitaminDUnit",
DROP COLUMN "vitaminEAmount",
DROP COLUMN "vitaminEUnit",
DROP COLUMN "vitaminKAmount",
DROP COLUMN "vitaminKUnit",
DROP COLUMN "zincAmount",
DROP COLUMN "zincUnit",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "caloriesUnit" "NutritionUnit" NOT NULL DEFAULT 'kcal',
ADD COLUMN     "sugarAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sugarUnit" "NutritionUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "vitaminB12" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminB6" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vitaminC" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredientName_key" ON "Ingredient"("ingredientName");
