-- AlterTable
ALTER TABLE "events" ADD COLUMN     "has_accessibility" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_kid_caregiver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_parking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_wifi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_pet_friendly" BOOLEAN NOT NULL DEFAULT false;
