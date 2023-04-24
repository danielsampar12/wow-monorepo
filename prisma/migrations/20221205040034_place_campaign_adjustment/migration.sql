/*
  Warnings:

  - You are about to drop the column `active` on the `place_campaigns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "place_campaigns" DROP COLUMN "active",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
