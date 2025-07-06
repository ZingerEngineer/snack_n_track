-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FoodType" ADD VALUE 'DAIRY';
ALTER TYPE "FoodType" ADD VALUE 'FATS';
ALTER TYPE "FoodType" ADD VALUE 'NUTS';
ALTER TYPE "FoodType" ADD VALUE 'MEAT';

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "introComplete" BOOLEAN NOT NULL DEFAULT false;
