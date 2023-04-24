/*
  Warnings:

  - A unique constraint covering the columns `[user_uuid,place_uuid]` on the table `place_users_ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "place_users_ratings_user_uuid_place_uuid_key" ON "place_users_ratings"("user_uuid", "place_uuid");
