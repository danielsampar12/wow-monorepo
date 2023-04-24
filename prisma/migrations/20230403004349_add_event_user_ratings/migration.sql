-- AlterTable
ALTER TABLE "events" ADD COLUMN     "rate" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "event_rating" DECIMAL(65,30);

-- CreateTable
CREATE TABLE "event_users_ratings" (
    "uuid" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_uuid" TEXT NOT NULL,
    "event_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_users_ratings_pkey" PRIMARY KEY ("uuid","user_uuid","event_uuid")
);

-- AddForeignKey
ALTER TABLE "event_users_ratings" ADD CONSTRAINT "event_users_ratings_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_users_ratings" ADD CONSTRAINT "event_users_ratings_event_uuid_fkey" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_users_ratings" ADD CONSTRAINT "event_users_ratings_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_users_ratings" ADD CONSTRAINT "event_users_ratings_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
