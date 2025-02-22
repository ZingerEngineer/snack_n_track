-- AlterTable
ALTER TABLE "MealScan" ALTER COLUMN "scanDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- CreateTable
CREATE TABLE "_FoodItemToMealScan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodItemToMealScan_AB_unique" ON "_FoodItemToMealScan"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodItemToMealScan_B_index" ON "_FoodItemToMealScan"("B");

-- AddForeignKey
ALTER TABLE "_FoodItemToMealScan" ADD CONSTRAINT "_FoodItemToMealScan_A_fkey" FOREIGN KEY ("A") REFERENCES "FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodItemToMealScan" ADD CONSTRAINT "_FoodItemToMealScan_B_fkey" FOREIGN KEY ("B") REFERENCES "MealScan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
