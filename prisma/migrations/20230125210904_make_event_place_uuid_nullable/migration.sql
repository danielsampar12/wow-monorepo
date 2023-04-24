-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_place_uuid_fkey";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "place_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
