-- AlterTable
ALTER TABLE "MealScan" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'New Meal Scan';

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
