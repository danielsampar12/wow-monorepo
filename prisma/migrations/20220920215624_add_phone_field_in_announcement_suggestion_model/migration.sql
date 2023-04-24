/*
  Warnings:

  - Added the required column `phone` to the `announcement_suggetions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcement_suggetions" ADD COLUMN     "phone" TEXT NOT NULL;
