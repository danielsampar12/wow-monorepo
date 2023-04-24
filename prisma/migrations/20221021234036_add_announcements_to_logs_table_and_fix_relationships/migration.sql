/*
  Warnings:

  - The values [eventDetail,placeDetail,articleDetail] on the enum `LogType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `event_detail_uuid` on the `application_logs` table. All the data in the column will be lost.
  - You are about to drop the column `place_detail_uuid` on the `application_logs` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LogType_new" AS ENUM ('navigation', 'event', 'place', 'article', 'search', 'location', 'announcement');
ALTER TABLE "application_logs" ALTER COLUMN "type" TYPE "LogType_new" USING ("type"::text::"LogType_new");
ALTER TYPE "LogType" RENAME TO "LogType_old";
ALTER TYPE "LogType_new" RENAME TO "LogType";
DROP TYPE "LogType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "application_logs" DROP CONSTRAINT "application_logs_event_detail_uuid_fkey";

-- DropForeignKey
ALTER TABLE "application_logs" DROP CONSTRAINT "application_logs_place_detail_uuid_fkey";

-- AlterTable
ALTER TABLE "application_logs" DROP COLUMN "event_detail_uuid",
DROP COLUMN "place_detail_uuid",
ADD COLUMN     "annoucement_uuid" TEXT,
ADD COLUMN     "event_uuid" TEXT,
ADD COLUMN     "place_uuid" TEXT;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_annoucement_uuid_fkey" FOREIGN KEY ("annoucement_uuid") REFERENCES "announcements"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_event_uuid_fkey" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
