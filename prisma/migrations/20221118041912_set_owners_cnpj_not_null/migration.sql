/*
  Warnings:

  - You are about to drop the column `cnpj` on the `owners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "owners" DROP COLUMN "cnpj",
ADD COLUMN     "cpnj" TEXT;
