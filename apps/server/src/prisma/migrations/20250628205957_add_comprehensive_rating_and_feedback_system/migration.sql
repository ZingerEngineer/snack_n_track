-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('APP_OVERALL', 'MEAL_RECOMMENDATION', 'FOOD_RECOGNITION', 'NUTRITION_ACCURACY', 'USER_EXPERIENCE', 'FEATURE_SPECIFIC');

-- CreateEnum
CREATE TYPE "RatingScale" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'SnackModel',
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "typeOfMeal" TEXT NOT NULL DEFAULT 'Other',
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';

-- CreateTable
CREATE TABLE "UserRating" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ratingType" "RatingType" NOT NULL,
    "rating" "RatingScale" NOT NULL,
    "comment" TEXT,
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppFeedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "feedbackType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "status" TEXT NOT NULL DEFAULT 'open',
    "category" TEXT,
    "reproducible" BOOLEAN NOT NULL DEFAULT false,
    "deviceInfo" JSONB,
    "appVersion" TEXT,
    "attachments" TEXT[],
    "adminResponse" TEXT,
    "adminRespondedAt" TIMESTAMP(3),
    "adminRespondedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AppFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureUsageAnalytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "featureName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "sessionId" TEXT,
    "duration" INTEGER,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "errorCode" TEXT,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureUsageAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRating_userId_ratingType_key" ON "UserRating"("userId", "ratingType");

-- CreateIndex
CREATE INDEX "FeatureUsageAnalytics_userId_featureName_idx" ON "FeatureUsageAnalytics"("userId", "featureName");

-- CreateIndex
CREATE INDEX "FeatureUsageAnalytics_timestamp_idx" ON "FeatureUsageAnalytics"("timestamp");

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppFeedback" ADD CONSTRAINT "AppFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureUsageAnalytics" ADD CONSTRAINT "FeatureUsageAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
