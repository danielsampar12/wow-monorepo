-- AlterTable
ALTER TABLE "users" ADD COLUMN     "apple_id" TEXT,
ADD COLUMN     "is_private_email" BOOLEAN NOT NULL DEFAULT false;
