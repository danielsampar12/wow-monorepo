-- Create postgis extension
CREATE EXTENSION postgis;

-- AlterTable
ALTER TABLE "application_logs" ADD COLUMN     "location" geometry(Point, 4326);

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "location" geometry(Point, 4326);

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "location" geometry(Point, 4326);

-- CreateIndex
CREATE INDEX "log_location_idx" ON "application_logs" USING GIST ("location");

-- CreateIndex
CREATE INDEX "event_location_idx" ON "events" USING GIST ("location");

-- CreateIndex
CREATE INDEX "place_location_idx" ON "places" USING GIST ("location");
