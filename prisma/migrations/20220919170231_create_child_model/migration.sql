-- CreateEnum
CREATE TYPE "Kinship" AS ENUM ('son', 'daughter', 'grandson', 'granddaughter', 'nephew', 'niece', 'godson', 'goddaughter', 'stepson', 'stepdaughter');

-- CreateTable
CREATE TABLE "children" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "kinship" "Kinship" NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
