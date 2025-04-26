-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "_FoodItemToMealScan" ADD CONSTRAINT "_FoodItemToMealScan_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_FoodItemToMealScan_AB_unique";
