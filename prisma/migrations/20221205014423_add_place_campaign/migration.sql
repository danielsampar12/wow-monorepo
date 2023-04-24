-- CreateTable
CREATE TABLE "place_campaigns" (
    "uuid" TEXT NOT NULL,
    "investment" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "place_uuid" TEXT NOT NULL,
    "created_user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_user_uuid" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_campaigns_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "place_campaigns" ADD CONSTRAINT "place_campaigns_place_uuid_fkey" FOREIGN KEY ("place_uuid") REFERENCES "places"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_campaigns" ADD CONSTRAINT "place_campaigns_created_user_uuid_fkey" FOREIGN KEY ("created_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_campaigns" ADD CONSTRAINT "place_campaigns_updated_user_uuid_fkey" FOREIGN KEY ("updated_user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
