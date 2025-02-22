/*
  Warnings:

  - You are about to drop the column `mealId` on the `MealScan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MealScan" DROP CONSTRAINT "MealScan_mealId_fkey";

-- AlterTable
ALTER TABLE "MealScan" DROP COLUMN "mealId",
ADD COLUMN     "isChatGPTMade" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
