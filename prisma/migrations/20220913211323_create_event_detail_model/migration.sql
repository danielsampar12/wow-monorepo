-- CreateTable
CREATE TABLE "event_details" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "event_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_details_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "event_details" ADD CONSTRAINT "event_details_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_details" ADD CONSTRAINT "event_details_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_details" ADD CONSTRAINT "event_details_event_uuid_fkey" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
