/*
  Warnings:

  - You are about to drop the column `portionSize` on the `FoodItem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PortionUnit" AS ENUM ('TEASPOON', 'TABLESPOON', 'CUP', 'MILLILITER', 'LITER', 'PINT', 'QUART', 'GALLON', 'GRAM', 'KILOGRAM', 'OUNCE', 'POUND', 'PINCH', 'DASH', 'PIECE', 'SLICE', 'SERVING');

-- AlterTable
ALTER TABLE "FoodItem" DROP COLUMN "portionSize",
ADD COLUMN     "portionSizeValue" DOUBLE PRECISION NOT NULL DEFAULT 1,
ADD COLUMN     "portionUnit" "PortionUnit" NOT NULL DEFAULT 'SERVING';

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
