/*
  Warnings:

  - The primary key for the `event_schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[date,event_uuid]` on the table `event_schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "event_schedules" DROP CONSTRAINT "event_schedules_pkey",
ADD CONSTRAINT "event_schedules_pkey" PRIMARY KEY ("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "event_schedules_date_event_uuid_key" ON "event_schedules"("date", "event_uuid");
