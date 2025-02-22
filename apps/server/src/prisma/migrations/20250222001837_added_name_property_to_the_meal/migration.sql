-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'New Meal';

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
