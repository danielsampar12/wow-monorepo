-- DropForeignKey
ALTER TABLE "application_logs" DROP CONSTRAINT "application_logs_article_uuid_fkey";

-- DropForeignKey
ALTER TABLE "application_logs" DROP CONSTRAINT "application_logs_event_detail_uuid_fkey";

-- DropForeignKey
ALTER TABLE "application_logs" DROP CONSTRAINT "application_logs_place_detail_uuid_fkey";

-- AlterTable
ALTER TABLE "application_logs" ALTER COLUMN "initial_date" DROP NOT NULL,
ALTER COLUMN "final_date" DROP NOT NULL,
ALTER COLUMN "event_detail_uuid" DROP NOT NULL,
ALTER COLUMN "place_detail_uuid" DROP NOT NULL,
ALTER COLUMN "article_uuid" DROP NOT NULL,
ALTER COLUMN "search_text" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_event_detail_uuid_fkey" FOREIGN KEY ("event_detail_uuid") REFERENCES "event_details"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_place_detail_uuid_fkey" FOREIGN KEY ("place_detail_uuid") REFERENCES "place_details"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "articles"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
