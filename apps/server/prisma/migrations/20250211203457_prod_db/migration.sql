-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '7 days';
