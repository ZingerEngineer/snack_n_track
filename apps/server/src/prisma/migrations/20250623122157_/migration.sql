/*
  Warnings:

  - The primary key for the `_FoodItemToMealScan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_FoodItemToMealScan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "_FoodItemToMealScan" DROP CONSTRAINT "_FoodItemToMealScan_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_FoodItemToMealScan_AB_unique" ON "_FoodItemToMealScan"("A", "B");
