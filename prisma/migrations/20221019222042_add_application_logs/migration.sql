-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('navigation', 'eventDetail', 'placeDetail', 'articleDetail', 'search', 'location');

-- CreateTable
CREATE TABLE "application_logs" (
    "uuid" TEXT NOT NULL,
    "initial_date" TIMESTAMP(3) NOT NULL,
    "final_date" TIMESTAMP(3) NOT NULL,
    "type" "LogType" NOT NULL,
    "event_detail_uuid" TEXT NOT NULL,
    "place_detail_uuid" TEXT NOT NULL,
    "article_uuid" TEXT NOT NULL,
    "search_text" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_logs_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_event_detail_uuid_fkey" FOREIGN KEY ("event_detail_uuid") REFERENCES "event_details"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_place_detail_uuid_fkey" FOREIGN KEY ("place_detail_uuid") REFERENCES "place_details"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_article_uuid_fkey" FOREIGN KEY ("article_uuid") REFERENCES "articles"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_logs" ADD CONSTRAINT "application_logs_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
