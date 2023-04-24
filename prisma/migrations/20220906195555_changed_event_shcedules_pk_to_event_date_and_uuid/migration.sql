/*
  Warnings:

  - The primary key for the `event_schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "event_schedules_date_key";

-- AlterTable
ALTER TABLE "event_schedules" DROP CONSTRAINT "event_schedules_pkey",
ADD CONSTRAINT "event_schedules_pkey" PRIMARY KEY ("date", "event_uuid", "uuid");
