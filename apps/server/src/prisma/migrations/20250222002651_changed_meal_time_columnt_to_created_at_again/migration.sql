/*
  Warnings:

  - You are about to drop the column `mealTime` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "mealTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
